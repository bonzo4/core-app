import { Button } from "@/components/ui/button";
import { useUserInvoice } from "@/lib/hooks/useUserInvoice";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import PayInvoiceButton from "./PayInvoiceButton";

type InvoicePageProps = {
  invoiceId: number;
};

export default function InvoicePage({ invoiceId }: InvoicePageProps) {
  const supabase = createSupabaseClient();

  const [invoice, loading] = useUserInvoice({
    supabase,
    invoiceId,
  });

  const wallet = useWallet();
  const { connection } = useConnection();

  if (loading) {
    return (
      <motion.div
        className="flex flex-col space-y-4 items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
      >
        <LoaderCircleIcon size={48} className="animate-spin" />
        <span>Loading...</span>
      </motion.div>
    );
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  if (invoice.is_paid) {
    return <div>Invoice is paid</div>;
  }

  return (
    <div className="flex flex-col space-y-5 w-full items-center">
      <h1 className="text-[30px]">Invoice</h1>
      <div className="flex flex-col space-y-3 justify-center items-start bg-white bg-opacity-[2.5%] rounded-lg p-4 min-w-[350px]">
        <span className="text-[50px]">${invoice.amount.toFixed(2)}</span>
        <div className="flex flex-col space-y-2">
          <span className="text-lg">From: {invoice.from_name}</span>
          <span className="text-lg">To: {invoice.to_name}</span>
          <span className="text-lg">Memo: {invoice.memo}</span>
        </div>
        {wallet.publicKey && (
          <div className="flex flex-row w-full justify-between items-center ">
            <WalletMultiButton />
            <PayInvoiceButton
              supabase={supabase}
              wallet={wallet}
              connection={connection}
              invoice={invoice}
            />
          </div>
        )}
        {!wallet.publicKey && (
          <div className="flex flex-row w-full justify-between items-center ">
            <WalletMultiButton />
          </div>
        )}
      </div>
    </div>
  );
}
