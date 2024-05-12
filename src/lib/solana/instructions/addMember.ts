import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getTeamMemberPDA, getTeamPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";
import { encodeUUID } from "@/lib/utils";

type AddMemberInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  userId: string;
  pay: number;
};

export async function addMemberInstructions({
  wallet,
  connection,
  teamId,
  userId,
  pay,
}: AddMemberInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const teamPDA = getTeamPDA(teamId);
  const teamMemberPDA = getTeamMemberPDA(teamId, userId);
  const addMemberTx = await program.methods
    .addMember({
      teamId: new BN(teamId),
      userId: encodeUUID(userId),
      intialPay: new BN(pay * 10 ** 6),
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
