import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

type DeleteBountyProps = {
  bountyId: number;
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function DeleteBounty({
  bountyId,
  supabase,
  setRefetch,
}: DeleteBountyProps) {
  const handleDelete = async () => {
    const { error } = await supabase
      .from("ambassador_bounties")
      .delete()
      .eq("id", bountyId);

    if (error) {
      toast.error("Error deleting bounty");
    } else {
      toast.success("Bounty deleted");
      setRefetch((prev) => !prev);
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
