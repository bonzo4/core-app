import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

type AuditBountyProps = {
  bountyId: number;
  claimerId: string;
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function AuditBounty({
  bountyId,
  claimerId,
  supabase,
  setRefetch,
}: AuditBountyProps) {
  const handleAudit = async () => {
    const { error } = await supabase
      .from("ambassador_bounties")
      .update({
        status: "AUDITED",
        completer_id: claimerId,
        completed_date: new Date().toISOString(),
        claimer_id: null,
      })
      .eq("id", bountyId);

    if (error) {
      toast.error("Error Auditing bounty");
    } else {
      toast.success("Bounty Audited");
      setRefetch((prev) => !prev);
    }
  };

  return <Button onClick={handleAudit}>Deny</Button>;
}
