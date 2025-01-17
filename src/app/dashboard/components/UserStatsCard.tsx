import FallbackImage from "@/components/FallbackImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCompletedBountyAmount } from "@/lib/hooks/useCompletedBountyAmount";
import { useTotalPaymentAmount } from "@/lib/hooks/useTotalPaymentAmount";
import { Role } from "@/lib/hooks/useUserRoles";
import { UserWallet } from "@/lib/hooks/useUserWallet";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type UserStatsCardProps = {
  username: string;
  iconUrl?: string;
  onboardDate: string;
  userRole: Role | undefined;
  teamsOwned: number;
  supabase: SupabaseClient<Database>;
  refetch: boolean;
  userId: string;
};

export default function UserStatsCard({
  username,
  iconUrl,
  onboardDate,
  userRole,
  teamsOwned,
  supabase,
  refetch,
  userId,
}: UserStatsCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [totalPayments, paymentLoading] = useTotalPaymentAmount({
    supabase,
    refetch,
    userId,
  });
  const [completedBounties, bountyLoading] = useCompletedBountyAmount({
    supabase,
    refetch,
    userId,
  });

  if (paymentLoading || bountyLoading) {
    return <LoaderCircleIcon className="w-10 h-10 animate-spin" />;
  }

  return (
    <Card
      className="bg-black text-white border-[3px] min-w-[350px]"
      style={{
        borderColor:
          userRole === "ADMIN"
            ? "#efc254"
            : userRole === "FOUNDER"
            ? "#ed7f2f"
            : userRole === "NETWORK_LEAD"
            ? "#35d1c2"
            : userRole === "AMBASSADOR"
            ? "#833db6"
            : "white",
      }}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-2 space-x-2">
        <CardTitle className="flex flex-col items-start justify-start space-y-2 ">
          <div className="flex flex-row items-center justify-start space-x-2">
            {iconUrl && (
              <FallbackImage
                fallbackSrc="https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/square%20rainbow%20logo.png"
                src={iconUrl}
                width={30}
                height={30}
                alt="icon"
                className="rounded-full"
              />
            )}
            <span className="mt-1">{username}</span>
          </div>
          <span className="text-sm font-normal opacity-80">
            Joined: {new Date(onboardDate).toDateString()}
          </span>
        </CardTitle>

        <CardDescription className="flex flex-col items-end justify-start ">
          <span className="text-center">
            {userRole === "ADMIN"
              ? "Admin ⚪"
              : userRole === "FOUNDER"
              ? "Founder 💼"
              : userRole === "NETWORK_LEAD"
              ? "Network Lead 🌐"
              : userRole === "AMBASSADOR"
              ? "Ambassador 🦾"
              : "User 👤"}
          </span>
        </CardDescription>
      </CardHeader>
      {(completedBounties > 0 || totalPayments > 0 || teamsOwned > 0) && (
        <CardContent className="flex flex-col space-y-4 items-start justify-start">
          {showMore && (
            <div className="flex flex-row items-start justify-between w-full px-5">
              {teamsOwned > 0 && (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg">
                    {teamsOwned} Team{teamsOwned === 1 ? "" : "s"}
                  </span>
                  <span>Owned</span>
                </div>
              )}
              {completedBounties > 0 && (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg">
                    {completedBounties} Bount
                    {completedBounties === 1 ? "y" : "ies"}
                  </span>
                  <span>Completed</span>
                </div>
              )}
              {totalPayments > 0 && (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg">${totalPayments.toFixed(2)}</span>
                  <span>Earned</span>
                </div>
              )}
            </div>
          )}
          {showMore ? (
            <Button onClick={() => setShowMore(false)}>Show less</Button>
          ) : (
            <Button onClick={() => setShowMore(true)}>Show more</Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}
