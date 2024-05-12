import { encodeUUID } from "@/lib/utils";
import { BN } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getTeamMemberPDA, getTeamPDA, getUserPDA } from "../pdas";
import { getCoreContract } from "../program";
import { getUsdcAccount } from "../accounts";

type PayMemberInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  userId: string;
  amount: number;
  paymentId: number;
};

export async function payMemberInstruction({
  wallet,
  connection,
  teamId,
  userId,
  amount,
  paymentId,
}: PayMemberInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;

  const program = getCoreContract(wallet, connection);
  if (!program) return;

  const teamPDA = getTeamPDA(teamId);
  const userPDA = getUserPDA(userId);
  const teamMemberPDA = getTeamMemberPDA(teamId, userId);
  const payMemberTx = await program.methods
    .payMember({
      teamId: new BN(teamId),
      userId: encodeUUID(userId),
      amount: new BN(amount * 10 ** 6),
      paymentId: new BN(paymentId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      team: teamPDA,
      teamMember: teamMemberPDA,
      user: userPDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
    })
    .instruction();

  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { payMemberTx, blockhash };
}
