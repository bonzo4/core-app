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
import PayInvoiceButton from "./PayTeamInvoiceButton";
import { useTeamInvoice } from "@/app/dashboard/team/[id]/components/useTeamInvoice";
import { useTeamProfile } from "@/lib/hooks/useTeamProfile";
import Image from "next/image";
import FallbackImage from "@/components/FallbackImage";

type TeamInvoicePageProps = {
  invoiceId: number;
};

export default function TeamInvoicePage({ invoiceId }: TeamInvoicePageProps) {
  const supabase = createSupabaseClient();

  const [invoice, loading] = useTeamInvoice({
    supabase,
    invoiceId,
  });

  const [teamProfile, teamLoading] = useTeamProfile({
    supabase,
    teamId: invoice?.team_id,
  });

  const wallet = useWallet();
  const { connection } = useConnection();

  if (loading || teamLoading) {
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
        <div className="flex flex-col space-y-2 w-full">
          {teamProfile && teamProfile.name && (
            <div className="flex flex-row space-x-2 items-center">
              <span className="text-lg">From: </span>

              <div className="flex flex-row space-x-1 items-center">
                {" "}
                {teamProfile.image_url && (
                  <FallbackImage
                    fallbackSrc="https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/square%20rainbow%20logo.png"
                    src={teamProfile.image_url}
                    width={24}
                    height={24}
                    alt="Icon"
                    className="rounded-full"
                  />
                )}
                <span className="text-lg">{teamProfile.name}</span>
              </div>
            </div>
          )}
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
