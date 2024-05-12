import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getTeamMemberPDA, getUserPDA } from "../pdas";
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
  const userPDA = getUserPDA(userId);
  const teamMemberPDA = getTeamMemberPDA(teamId, userId);
  const addMemberTx = await program.methods
    .leaveTeam({
      teamId: new BN(teamId),
      userId: encodeUUID(userId),
      leaveId: new BN(leaveId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      user: userPDA,
      teamMember: teamMemberPDA,
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { addMemberTx, blockhash };
}
