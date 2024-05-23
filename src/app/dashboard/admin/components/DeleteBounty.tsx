import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";

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
      console.error(error);
    } else {
      setRefetch((prev) => !prev);
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
