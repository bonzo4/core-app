import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type UncompleteBountyButtonProps = {
  supabase: SupabaseClient<Database>;
  bountyId: number;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  status: StatusEnum;
};

export default function UncompleteBountyButton({
  supabase,
  bountyId,
  setRefetch,
  status,
}: UncompleteBountyButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClaimBounty = async () => {
    const { error } = await supabase
      .from("ambassador_bounties")
      .update({
        status: "CLAIMED",
      })
      .eq("id", bountyId);

    if (error) {
      toast.error("Error uncompleting bounty");
    }

    toast.success("Bounty uncompleted.");
    setRefetch((prev) => !prev);
  };

  const buttonDisabled = status !== "COMPLETED" || loading;

  return (
    <Button onClick={handleClaimBounty} className="" disabled={buttonDisabled}>
      Uncomplete
    </Button>
  );
}
