import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

type UnassignBountyProps = {
  bountyId: number;
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function UnassignBounty({
  bountyId,
  supabase,
  setRefetch,
}: UnassignBountyProps) {
  const handleUnassign = async () => {
    const { error } = await supabase
      .from("ambassador_bounties")
      .update({
        status: "UNCLAIMED",
        claimer_id: null,
        claim_date: null,
      })
      .eq("id", bountyId);

    if (error) {
      toast.error("Error unassigning bounty");
    } else {
      toast.success("Bounty unassigned");
      setRefetch((prev) => !prev);
    }
  };

  return <Button onClick={handleUnassign}>Unassign</Button>;
}
