import { encodeUUID } from "@/lib/utils";
import { BN } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getTeamPDA } from "../pdas";
import { getCoreContract } from "../program";
import { getUsdcAccount } from "../accounts";

type PayTeamInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  amount: number;
  paymentId: number;
};

export async function payTeamInstruction({
  wallet,
  connection,
  teamId,
  amount,
  paymentId,
}: PayTeamInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;

  const program = getCoreContract(wallet, connection);
  if (!program) return;

  const teamPDA = getTeamPDA(teamId);
  const usdcPayerAccount = getUsdcAccount(wallet.publicKey);
  const payTeamTx = await program.methods
    .payTeam({
      teamId: new BN(teamId),
      amount: new BN(amount * 10 ** 6),
      paymentId: new BN(paymentId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      team: teamPDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
      usdcPayerAccount,
    })
    .instruction();

  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { payTeamTx, blockhash };
}
