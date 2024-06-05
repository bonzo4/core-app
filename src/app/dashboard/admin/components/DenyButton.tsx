import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

type DenyBountyProps = {
  bountyId: number;
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function DenyBounty({
  bountyId,
  supabase,
  setRefetch,
}: DenyBountyProps) {
  const handleUnassign = async () => {
    const { error } = await supabase
      .from("ambassador_bounties")
      .update({
        status: "CLAIMED",
      })
      .eq("id", bountyId);

    if (error) {
      toast.error("Error denying bounty");
    } else {
      toast.success("Bounty Deny");
      setRefetch((prev) => !prev);
    }
  };

  return <Button onClick={handleUnassign}>Deny</Button>;
}
