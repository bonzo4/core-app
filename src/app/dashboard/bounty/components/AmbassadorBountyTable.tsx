import {
  AmbassadorBounty,
  BountyWithClaimer,
} from "@/lib/hooks/bounty/useAmbassadorBounties";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ClaimBountyButton from "./ClaimBountyButton";

type AmbassadorBountyTableProps = {
  ambassadorBounties: BountyWithClaimer[];
  loading: boolean;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  supabase: SupabaseClient<Database>;
  userId: string;
  bountyAmount?: number;
};

export default function AmbassadorBountyTable({
  ambassadorBounties,
  loading,
  setRefetch,
  supabase,
  userId,
  bountyAmount,
}: AmbassadorBountyTableProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-5 items">
      {ambassadorBounties.map((bounty, index) => {
        return (
          <motion.div
            key={bounty.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 100, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="flex flex-col  bg-black text-white w-[250px] min-h-[450px]"
              style={{
                borderWidth: 4,
                borderColor:
                  bounty.status === "CLAIMED"
                    ? "#efc254"
                    : bounty.status === "UNCLAIMED"
                    ? "#e83030"
                    : "gray",
              }}
            >
              <CardHeader>
                <CardTitle className="text-center flex flex-col space-y-3">
                  <span className="text-sm">{bounty.status}</span>
                  <span>{bounty.guild_name}</span>
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    {bounty.tags &&
                      bounty.tags.map((tag) => (
                        <div
                          key={tag}
                          className="w-8 h-3 bg-white rounded-full"
                          style={{
                            background:
                              tag === "SOL"
                                ? "linear-gradient(90deg, #9945ff 0%, #14f195 100%)"
                                : tag === "ETH"
                                ? "#8991b3"
                                : tag === "BTC"
                                ? "#ff5500"
                                : tag === "POLY"
                                ? "#6c00f6"
                                : tag === "APTOS"
                                ? "#06f7f7"
                                : "gray",
                          }}
                        />
                      ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-5">
                {bounty.twitter_icon ? (
                  <Image
                    src={bounty.twitter_icon}
                    alt="icon"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="https://pbs.twimg.com/profile_images/1670651001697607685/rcZsTuuE_400x400.jpg"
                    alt="icon"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
                <div className="flex flex-col items-center justify-center space-y-2">
                  {bounty.reward_amount && (
                    <span className="text-xl text-center">
                      Reward: ${bounty.reward_amount.toFixed(2)}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center grow justify-end space-y-5">
                {!bounty.claimer_id && (
                  <ClaimBountyButton
                    bountyId={bounty.id}
                    setRefetch={setRefetch}
                    supabase={supabase}
                    userId={userId}
                    status={bounty.status}
                    bountyAmount={bountyAmount}
                  />
                )}
                {bounty.claimer_id && bounty.claimer && (
                  <div className="flex flex-col space-y-2 items-center justify-center">
                    <span>Claimed by:</span>{" "}
                    <div className="flex flex-row space-x-2 items-center justify-center">
                      {bounty.claimer.icon_url && (
                        <Image
                          src={bounty.claimer.icon_url}
                          width={24}
                          height={24}
                          alt="icon"
                          className="rounded-full"
                        />
                      )}
                      <span>{bounty.claimer.username}</span>
                    </div>
                  </div>
                )}
                <div className="flex flex-row items-end justify-center space-x-2">
                  {bounty.discord_invite && (
                    <a href={bounty.discord_invite} target="_blank">
                      <BsDiscord size={24} />
                    </a>
                  )}
                  {bounty.twitter_url && (
                    <a href={bounty.twitter_url} target="_blank">
                      <BsTwitter size={24} />
                    </a>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
