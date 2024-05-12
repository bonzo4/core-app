import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getTeamMemberPDA, getTeamPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";
import { encodeUUID } from "@/lib/utils";

type EditMemberInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  userId: string;
  newPay: number;
  editId: number;
};

export async function editMemberInstructions({
  wallet,
  connection,
  teamId,
  userId,
  newPay,
  editId,
}: EditMemberInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const teamPDA = getTeamPDA(teamId);
  const teamMemberPDA = getTeamMemberPDA(teamId, userId);
  const editMemberTx = await program.methods
    .editMember({
      teamId: new BN(teamId),
      userId: encodeUUID(userId),
      newPay: new BN(newPay),
      editId: new BN(editId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      team: teamPDA,
      teamMember: teamMemberPDA,
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { editMemberTx, blockhash };
}
