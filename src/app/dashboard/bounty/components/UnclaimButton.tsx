import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type UnclaimBountyButtonProps = {
  supabase: SupabaseClient<Database>;
  bountyId: number;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  status: StatusEnum;
};

export default function UnclaimBountyButton({
  supabase,
  bountyId,
  setRefetch,
  status,
}: UnclaimBountyButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClaimBounty = async () => {
    const { error } = await supabase
      .from("ambassador_bounties")
      .update({
        status: "UNCLAIMED",
        claimer_id: null,
        claim_date: null,
      })
      .eq("id", bountyId);

    if (error) {
      toast.error("Error unclaiming bounty");
    }

    toast.success("Bounty unclaimed.");
    setRefetch((prev) => !prev);
  };

  const buttonDisabled = status !== "CLAIMED" || loading;

  return (
    <Button onClick={handleClaimBounty} className="" disabled={buttonDisabled}>
      Unclaim
    </Button>
  );
}
