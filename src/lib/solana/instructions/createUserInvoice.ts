import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getUserInvoicePDA, getUserPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";
import { encodeUUID } from "@/lib/utils";

type CreateUserInvoiceInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  invoiceId: number;
  amount: number;
};

export async function createUserInvoiceInstruction({
  wallet,
  connection,
  userId,
  invoiceId,
  amount,
}: CreateUserInvoiceInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const userPDA = getUserPDA(userId);
  const invoicePDA = getUserInvoicePDA(userId, invoiceId);
  const invoiceInstruction = await program.methods
    .createUserInvoice({
      userId: encodeUUID(userId),
      invoiceId: new BN(invoiceId),
      requestedAmount: new BN(amount * 10 ** 6),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      user: userPDA,
      invoice: invoicePDA,
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { invoiceInstruction, blockhash };
}
