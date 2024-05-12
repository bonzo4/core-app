import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getUserPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";
import { encodeUUID } from "@/lib/utils";

type EditUserInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId?: string;
  newAuthority: string;
  editId: number;
};

export async function EditUserInstructionOptions({
  wallet,
  connection,
  userId,
  newAuthority,
  editId,
}: EditUserInstructionOptions) {
  if (!userId) return;
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const userPDA = getUserPDA(userId);
  const editUserTx = await program.methods
    .editUser({
      userId: encodeUUID(userId),
      newAuthority: new PublicKey(newAuthority),
      editId: new BN(editId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      user: userPDA,
    })
    .instruction();

  const blockhash = await connection.getLatestBlockhash("finalized");

  return { editUserTx, blockhash };
}
