import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getTeamInvoicePDA, getTeamPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";

type CreateTeamInvoiceInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  invoiceId: number;
  amount: number;
};

export async function createTeamInvoiceInstruction({
  wallet,
  connection,
  teamId,
  invoiceId,
  amount,
}: CreateTeamInvoiceInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const teamPDA = getTeamPDA(teamId);
  const invoicePDA = getTeamInvoicePDA(teamId, invoiceId);
  const invoiceInstruction = await program.methods
    .createTeamInvoice({
      teamId: new BN(teamId),
      invoiceId: new BN(invoiceId),
      requestedAmount: new BN(amount * 10 ** 6),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      team: teamPDA,
      invoice: invoicePDA,
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { invoiceInstruction, blockhash };
}
