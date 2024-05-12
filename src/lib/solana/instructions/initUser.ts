import { WalletContextState } from "@solana/wallet-adapter-react";
import { getCoreContract } from "../program";
import { Connection, PublicKey } from "@solana/web3.js";
import { encodeUUID } from "@/lib/utils";
import { getUserPDA } from "../pdas";

type InitUserInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId?: string;
};

export async function initUserInstruction({
  wallet,
  connection,
  userId,
}: InitUserInstructionOptions) {
  if (!userId) return;
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const userPDA = getUserPDA(userId);
  const initUserTx = await program.methods
    .initUser(encodeUUID(userId))
    .accountsPartial({
      signer: wallet.publicKey,
      user: userPDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { initUserTx, blockhash };
}
