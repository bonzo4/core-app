import { Database } from "@/lib/supabase/types";
import { Connection } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

type ConfirmButtonProps = {
  supabase: SupabaseClient<Database>;
  tableName: keyof Database["public"]["Tables"];
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  connection: Connection;
  transaction: string;
  createdAt: string;
};

export default function ConfirmButton({
  supabase: supabase,
  tableName,
  setRefetch,
  connection,
  transaction,
  createdAt,
}: ConfirmButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const toastId = toast.loading(
      "Waiting for transaction to be confirmed...",
      {
        autoClose: false,
      }
    );
    try {
      const status = await connection.getSignatureStatus(transaction, {
        searchTransactionHistory: true,
      });
      if (!status.value) {
        await supabase
          .from(tableName)
          .update({ is_confirmed: false })
          .eq("transaction", transaction);
        toast.error("Transaction not found");
        toast.dismiss(toastId);
        setLoading(false);
        setRefetch((prev) => !prev);
        return;
      }

      if (
        status.value?.confirmationStatus === "confirmed" ||
        status.value?.confirmationStatus === "finalized"
      ) {
        await supabase
          .from(tableName)
          .update({ is_confirmed: true })
          .eq("transaction", transaction);
        toast.success("Transaction confirmed");
      }
      toast.info("Transaction not yet confirmed");
    } catch (error) {
      console.log(error);

      toast.error("Error confirming transaction");
    }
    toast.dismiss(toastId);
    setLoading(false);
    setRefetch((prev) => !prev);
  };

  const isAtLeast1MinutesOld =
    new Date(createdAt) < new Date(Date.now() - 1000 * 60 * 1);
  const disabled = loading || !isAtLeast1MinutesOld;

  return (
    <Button onClick={handleConfirm} disabled={disabled}>
      Confirm
    </Button>
  );
}
