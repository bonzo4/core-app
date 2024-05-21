import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useAmbassadorBounties } from "@/lib/hooks/bounty/useAmbassadorBounties";

type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type AmbassadorUserBountiesProps = {
  supabase: SupabaseClient<Database>;
  userId: string;
};

export default function AmbassadorUserBounties({
  supabase,
  userId,
}: AmbassadorUserBountiesProps) {
  const [status, setStatus] = useState<StatusEnum | undefined>();
  const [ambassadorBounties, loading] = useAmbassadorBounties({
    supabase,
    claimerId: userId,
    tags: [],
    isPublic: false,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Manage My Bounties</Button>
      </DialogTrigger>
      <DialogContent className="bg-black flex flex-col items-start justify-start">
        <Label className="text-white">Your bounties</Label>
        <div className="flex flex-col w-full space-y-6">
          {ambassadorBounties.map((bounty, index) => (
            <div key={bounty.id} className="flex flex-col w-full">
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-col items-start justify-start space-y-2">
                  <Label className="text-white">{bounty.guild_name}</Label>
                  <Label className="text-white">{bounty.discord_invite}</Label>
                  <Label className="text-white">
                    {bounty.reward_amount &&
                      `${bounty.reward_amount.toFixed(2)}`}
                  </Label>
                  <Label className="text-white">{bounty.status}</Label>
                </div>
                <div className="flex flex-row items-center justify-end space-x-2">
                  {bounty.status === "CLAIMED" && <Button>Complete</Button>}
                  {bounty.status === "CLAIMED" && <Button>Unclaim</Button>}
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
