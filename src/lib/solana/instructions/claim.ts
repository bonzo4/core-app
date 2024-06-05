import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getUserPDA } from "../pdas";
import { encodeUUID } from "@/lib/utils";
import { BN } from "@coral-xyz/anchor";
import { getUsdcAccount } from "../accounts";

type ClaimInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId?: string;
  claimId: number;
};

export async function claimInstruction({
  wallet,
  connection,
  userId,
  claimId,
}: ClaimInstructionOptions) {
  if (!userId) return;
  if (!wallet || !wallet.publicKey) return;

  const program = getCoreContract(wallet, connection);
  if (!program) return;

  const userPDA = getUserPDA(userId);
  const recipientUsdcAccount = getUsdcAccount(wallet.publicKey);
  const claimTx = await program.methods
    .claim({
      userId: encodeUUID(userId),
      claimId: new BN(claimId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      user: userPDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
      recipientUsdcAccount,
    })
    .instruction();

  return { claimTx };
}
