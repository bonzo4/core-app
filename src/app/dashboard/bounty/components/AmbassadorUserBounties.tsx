import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { useAmbassadorBounties } from "@/lib/hooks/bounty/useAmbassadorBounties";
import { Role } from "@/lib/hooks/useUserRoles";
import UnclaimBountyButton from "./UnclaimButton";
import CompleteBountyButton from "./CompleteButton";
import UncompleteBountyButton from "./UncompleteBounty";

type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type AmbassadorUserBountiesProps = {
  supabase: SupabaseClient<Database>;
  userId: string;
  refetch: boolean;
  userRole: Role | undefined;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function AmbassadorUserBounties({
  supabase,
  userId,
  refetch,
  userRole,
  setRefetch,
}: AmbassadorUserBountiesProps) {
  const [status, setStatus] = useState<StatusEnum | undefined>();
  const [ambassadorBounties, loading] = useAmbassadorBounties({
    supabase,
    userId,
    isPublic: false,
    refetch,
    isFixer: userRole === "ADMIN" || userRole === "NETWORK_LEAD",
    status,
    limit: 20,
  });

  const handleStatusChange = (newStatus: StatusEnum) => {
    if (status === newStatus) {
      setStatus(undefined);
    } else {
      setStatus(newStatus);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Manage My Bounties</Button>
      </DialogTrigger>
      <DialogContent className="bg-black flex flex-col items-start justify-start">
        <Label className="text-white text-xl">Your bounties</Label>
        <div className="flex flex-wrap gap-4">
          <Button
            className="border-[3px]"
            onClick={() => handleStatusChange("REQUESTED")}
            style={{
              borderColor: status === "REQUESTED" ? "#efc254" : undefined,
            }}
          >
            <span className="mt-[2px]">REQUESTED</span>
          </Button>
          <Button
            className="border-[3px]"
            onClick={() => handleStatusChange("CLAIMED")}
            style={{
              borderColor: status === "CLAIMED" ? "#efc254" : undefined,
            }}
          >
            <span className="mt-[2px]">CLAIMED</span>
          </Button>
          <Button
            className="border-[3px]"
            onClick={() => handleStatusChange("COMPLETED")}
            style={{
              borderColor: status === "COMPLETED" ? "#19b14c" : undefined,
            }}
          >
            <span className="mt-[2px]">COMPLETED</span>
          </Button>
          <Button
            className="border-[3px]"
            onClick={() => handleStatusChange("AUDITED")}
            style={{
              borderColor: status === "AUDITED" ? "#833db6" : undefined,
            }}
          >
            <span className="mt-[2px]">AUDITED</span>
          </Button>
        </div>
        <div className="flex flex-col w-full space-y-6 max-h-[600px] overflow-auto px-2">
          {ambassadorBounties.map((bounty, index) => (
            <div key={bounty.id} className="flex flex-col w-full">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col items-start justify-start space-y-2">
                  <Label className="text-white">{bounty.guild_name}</Label>
                  <Label className="text-white">{bounty.discord_invite}</Label>
                  <Label className="text-white">
                    {bounty.reward_amount &&
                      `$${bounty.reward_amount.toFixed(2)}`}
                  </Label>
                  <Label className="text-white">{bounty.status}</Label>
                </div>
                <div className="flex flex-row items-center justify-end space-x-2">
                  {bounty.status === "CLAIMED" && (
                    <CompleteBountyButton
                      setRefetch={setRefetch}
                      supabase={supabase}
                      bountyId={bounty.id}
                      status={bounty.status}
                    />
                  )}
                  {bounty.status === "CLAIMED" && (
                    <UnclaimBountyButton
                      setRefetch={setRefetch}
                      supabase={supabase}
                      bountyId={bounty.id}
                      status={bounty.status}
                    />
                  )}
                  {bounty.status === "COMPLETED" && (
                    <UncompleteBountyButton
                      setRefetch={setRefetch}
                      supabase={supabase}
                      bountyId={bounty.id}
                      status={bounty.status}
                    />
                  )}
                </div>
              </div>
              {bounty.id === ambassadorBounties.length - 1 ? null : <hr />}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
