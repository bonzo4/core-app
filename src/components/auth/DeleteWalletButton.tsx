import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { SetStateAction } from "react";

type DeleteWalletButtonProps = {
  userId: string;
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function DeleteWalletButton({
  userId,
  supabase,
  setRefetch,
}: DeleteWalletButtonProps) {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("user_wallets")
      .delete()
      .eq("user_id", userId);
    if (error) {
      console.error("Error deleting wallet PDA", error);
      return;
    }
    setRefetch((prev) => !prev);
  };

  return <Button onClick={handleDelete}>Delete Wallet</Button>;
}
