import { encodeUUID } from "@/lib/utils";
import { BN } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getUserPDA } from "../pdas";
import { getCoreContract } from "../program";
import { getUsdcAccount } from "../accounts";

type PayUserInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  payerUserId?: string;
  amount: number;
  paymentId: number;
};

export async function payUserInstruction({
  wallet,
  connection,
  userId,
  payerUserId,
  amount,
  paymentId,
}: PayUserInstructionOptions) {
  if (!payerUserId) return;
  if (!wallet || !wallet.publicKey) return;

  const program = getCoreContract(wallet, connection);
  if (!program) return;

  const userPDA = getUserPDA(userId);
  const payerPDA = getUserPDA(payerUserId);
  const usdcPayerAccount = getUsdcAccount(wallet.publicKey);
  const payUserTx = await program.methods
    .payUser({
      userId: encodeUUID(userId),
      amount: new BN(amount * 10 ** 6),
      paymentId: new BN(paymentId),
      payerUserId: encodeUUID(payerUserId),
    })
    .accountsPartial({
      signer: wallet.publicKey,

      user: userPDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
      usdcPayerAccount,
      payerUser: payerPDA,
    })
    .instruction();

  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { payUserTx, blockhash };
}
