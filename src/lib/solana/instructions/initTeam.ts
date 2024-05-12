import { WalletContextState } from "@solana/wallet-adapter-react";
import { getCoreContract } from "../program";
import { Connection, PublicKey } from "@solana/web3.js";
import { encodeUUID } from "@/lib/utils";
import { getTeamPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";

type InitTeamInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
};

export async function initTeamInstruction({
  wallet,
  connection,
  teamId,
}: InitTeamInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const teamPDA = getTeamPDA(teamId);
  const initTeamTx = await program.methods
    .initTeam(new BN(teamId))
    .accountsPartial({
      signer: wallet.publicKey,
      team: teamPDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { initTeamTx, blockhash };
}
