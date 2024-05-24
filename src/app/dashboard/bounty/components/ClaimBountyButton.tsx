import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type ClaimBountyButtonProps = {
  supabase: SupabaseClient<Database>;
  bountyId: number;
  userId: string;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  status: StatusEnum;
  bountyAmount: number;
};

export default function ClaimBountyButton({
  supabase,
  bountyId,
  userId,
  setRefetch,
  status,
  bountyAmount,
}: ClaimBountyButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClaimBounty = async () => {
    setLoading(true);
    if (bountyAmount >= 5) {
      toast.error("You can only claim 5 bounties at a time");
      return;
    }

    const { error } = await supabase
      .from("ambassador_bounties")
      .update({
        status: "CLAIMED",
        claimer_id: userId,
        claim_date: new Date().toISOString(),
      })
      .eq("id", bountyId);
    if (error) {
      toast.error("Error claiming bounty");
    } else {
      toast.success("Bounty claimed!");
      setRefetch((prev) => !prev);
    }
    setLoading(false);
  };

  const buttonDisabled = status !== "UNCLAIMED" || loading || bountyAmount >= 5;

  return (
    <Button onClick={handleClaimBounty} className="" disabled={buttonDisabled}>
      Claim
    </Button>
  );
}
