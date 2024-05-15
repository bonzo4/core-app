import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getTeamInvoicePDA, getTeamPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";
import { getUsdcAccount } from "../accounts";

type PayTeamInvoiceInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  invoiceId: number;
};

export async function payTeamInvoiceInstruction({
  wallet,
  connection,
  teamId,
  invoiceId,
}: PayTeamInvoiceInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const teamPDA = getTeamPDA(teamId);
  const invoicePDA = getTeamInvoicePDA(teamId, invoiceId);
  const usdcPayerAccount = getUsdcAccount(wallet.publicKey);
  const invoiceInstruction = await program.methods
    .payTeamInvoice({
      teamId: new BN(teamId),
      invoiceId: new BN(invoiceId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      team: teamPDA,
      invoice: invoicePDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
      usdcPayerAccount,
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { invoiceInstruction, blockhash };
}
