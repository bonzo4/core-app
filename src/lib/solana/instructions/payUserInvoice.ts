import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getCoreContract } from "../program";
import { getUserInvoicePDA, getUserPDA } from "../pdas";
import { BN } from "@coral-xyz/anchor";
import { getUsdcAccount } from "../accounts";
import { encodeUUID } from "@/lib/utils";

type PayUserInvoiceInstructionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  invoiceId: number;
};

export async function payUserInvoiceInstruction({
  wallet,
  connection,
  userId,
  invoiceId,
}: PayUserInvoiceInstructionOptions) {
  if (!wallet || !wallet.publicKey) return;
  const program = getCoreContract(wallet, connection);
  if (!program) return;
  const userPDA = getUserPDA(userId);
  const invoicePDA = getUserInvoicePDA(userId, invoiceId);
  const usdcPayerAccount = getUsdcAccount(wallet.publicKey);
  const invoiceInstruction = await program.methods
    .payUserInvoice({
      userId: encodeUUID(userId),
      invoiceId: new BN(invoiceId),
    })
    .accountsPartial({
      signer: wallet.publicKey,
      user: userPDA,
      invoice: invoicePDA,
      usdcMint: new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
      usdcPayerAccount,
    })
    .instruction();
  const blockhash = (await connection.getLatestBlockhash("finalized"))
    .blockhash;

  return { invoiceInstruction, blockhash };
}
