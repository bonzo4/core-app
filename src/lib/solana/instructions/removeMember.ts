import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getTeamMemberPDA, getTeamPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";
import { encodeUUID } from "@/lib/utils";

type LeaveTeamInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  userId: string;
  leaveId: number;
};

export async function leaveTeamInstructions({
  wallet,
  connection,
  teamId,
  userId,
  leaveId,
}: LeaveTeamInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const teamPDA = getTeamPDA(teamId);
  const teamMemberPDA = getTeamMemberPDA(teamId, userId);
  const addMemberTx = await program.methods
    .removeMember({
      teamId: new BN(teamId),
      userId: encodeUUID(userId),
      removeId: new BN(leaveId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      team: teamPDA,
      teamMember: teamMemberPDA,
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { addMemberTx, blockhash };
}
