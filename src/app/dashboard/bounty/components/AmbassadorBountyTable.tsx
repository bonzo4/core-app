import { BountyWithClaimer } from "@/lib/hooks/bounty/useAmbassadorBounties";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { motion } from "framer-motion";
import ClaimBountyButton from "./ClaimBountyButton";
import { Loader, LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type AmbassadorBountyTableProps = {
  ambassadorBounties: BountyWithClaimer[];
  loading: boolean;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  supabase: SupabaseClient<Database>;
  userId: string;
  bountyAmount: number;
  page: number;
  setPage: (args_0: number) => void;
};

export default function AmbassadorBountyTable({
  ambassadorBounties,
  loading,
  setRefetch,
  supabase,
  userId,
  bountyAmount,
  page,
  setPage,
}: AmbassadorBountyTableProps) {
  if (loading) {
    return (
      <motion.div
        className="flex flex-col space-y-4 items-center justify-center pt-20"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
      >
        <LoaderCircleIcon size={48} className="animate-spin" />
        <span>Loading...</span>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5 items pb-5">
      {ambassadorBounties.map((bounty, index) => {
        return (
          <div key={bounty.id}>
            <Card
              className="flex flex-col  bg-black text-white w-[258px] min-h-[450px]"
              style={{
                borderWidth: 4,
                borderColor:
                  bounty.status === "CLAIMED"
                    ? "#efc254"
                    : bounty.status === "UNCLAIMED"
                    ? "#e83030"
                    : bounty.status === "COMPLETED"
                    ? "#19b14c"
                    : bounty.status === "AUDITED"
                    ? "#833db6"
                    : "gray",
              }}
            >
              <CardHeader>
                <CardTitle className="text-center flex flex-col space-y-3">
                  <div className="flex flex-row space-x-2 items-center justify-center">
                    <span className="text-sm mt-[6px]">{bounty.status}</span>
                    {bounty.is_new && (
                      <span className="text-xs bg-new text-black rounded-full px-2 pt-1">
                        New
                      </span>
                    )}
                    {bounty.is_daily && (
                      <span className="text-xs bg-daily text-black rounded-full px-2 pt-1">
                        Daily
                      </span>
                    )}
                    {bounty.is_broken && (
                      <span className="text-sm bg-unclaimed rounded-full px-2 pt-1">
                        Broken
                      </span>
                    )}
                  </div>

                  <span className="truncate">{bounty.guild_name}</span>
                  <div className="flex flex-wrap gap-2 items-center justify-center">
                    <div
                      className="px-4 rounded-full "
                      style={{
                        color:
                          bounty.tag === "APTOS" ||
                          bounty.tag === "NEAR" ||
                          bounty.tag === "BNB"
                            ? "black"
                            : "white",
                        background:
                          bounty.tag === "SOL"
                            ? "linear-gradient(90deg, #9945ff 0%, #14f195 100%)"
                            : bounty.tag === "ETH"
                            ? "#8991b3"
                            : bounty.tag === "BTC"
                            ? "#ff5500"
                            : bounty.tag === "POLY"
                            ? "#6c00f6"
                            : bounty.tag === "APTOS"
                            ? "#06f7f7"
                            : bounty.tag === "SUI"
                            ? "#4ca3ff"
                            : bounty.tag === "BASE"
                            ? "#0052ff"
                            : bounty.tag === "XRP"
                            ? "#323063"
                            : bounty.tag === "CARD"
                            ? "#0033ad"
                            : bounty.tag === "AVAX"
                            ? "#e84142"
                            : bounty.tag === "COSM"
                            ? "#2e3148"
                            : bounty.tag === "NEAR"
                            ? "#00ec97"
                            : bounty.tag === "BNB"
                            ? "#f3ba2f"
                            : bounty.tag === "TEZOS"
                            ? "#007efc"
                            : "gray",
                      }}
                    >
                      <span className="text-sm font-normal">{bounty.tag}</span>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-5">
                {bounty.twitter_icon &&
                bounty.twitter_icon.startsWith(
                  "https://pbs.twimg.com/profile_images/"
                ) ? (
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
                {!bounty.claimer_id && !bounty.completer_id && (
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
                {bounty.completer_id && bounty.completer && (
                  <div className="flex flex-col space-y-2 items-center justify-center">
                    <span>Completed by:</span>{" "}
                    <div className="flex flex-row space-x-2 items-center justify-center">
                      {bounty.completer.icon_url && (
                        <Image
                          src={bounty.completer.icon_url}
                          width={24}
                          height={24}
                          alt="icon"
                          className="rounded-full"
                        />
                      )}
                      <span>{bounty.completer.username}</span>
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
          </div>
        );
      })}
      <div className="flex flex-row space-x-2 w-full items-center justify-center">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        <span>Page: {page}</span>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
