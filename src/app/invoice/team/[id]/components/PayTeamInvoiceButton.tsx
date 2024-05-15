import { Button } from "@/components/ui/button";
import { TeamInvoice } from "@/lib/hooks/useTeamInvoices";
import { payTeamInvoiceInstruction } from "@/lib/solana/instructions/payTeamInvoice";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "react-toastify";

type PayInvoiceButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  invoice: TeamInvoice;
};

export default function PayInvoiceButton({
  supabase,
  wallet,
  connection,
  invoice,
}: PayInvoiceButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayInvoice = async () => {
    setLoading(true);
    if (!wallet.publicKey) {
      toast.error("No signer key found, please connect a wallet");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    const toastId = toast.loading(
      "Waiting for transaction to be confirmed...",
      {
        autoClose: false,
      }
    );

    try {
      const instruction = await payTeamInvoiceInstruction({
        wallet,
        connection,
        invoiceId: invoice.id,
        teamId: invoice.team_id,
      });

      if (!instruction) {
        toast.error("Error creating transaction");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
      }

      const transaction = new Transaction().add(instruction.invoiceInstruction);
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      toast.success("Transaction confirmed!");
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to pay invoice");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }
  };

  return (
    <Button onClick={() => handlePayInvoice()} disabled={loading}>
      {loading ? "Paying..." : "Pay Invoice"}
    </Button>
  );
}
