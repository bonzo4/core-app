import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import CreateBountyRequest from "./CreateBountyRequest";
import { Input } from "@/components/ui/input";
import AmbassadorUserBounties from "./AmbassadorUserBounties";
import { Role } from "@/lib/hooks/useUserRoles";
import { useUserWeeklyStat } from "@/lib/hooks/bounty/useUserWeeklyStat";
import { useTeamWeeklyStat } from "@/lib/hooks/bounty/useTeamWeeklyStat";

type TagEnum = Database["public"]["Enums"]["guild_tag"];
type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type AmbassadorBountyButtonProps = {
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  refetch: boolean;
  userId: string;
  search: string | undefined;
  setSearch: (args_0: SetStateAction<string | undefined>) => void;
  tags: TagEnum[];
  setTags: (args_0: SetStateAction<TagEnum[]>) => void;
  status: string | undefined;
  setStatus: (args_0: SetStateAction<StatusEnum | undefined>) => void;
  bountyAmount: number | undefined;
  isDaily: boolean;
  setIsDaily: (args_0: SetStateAction<boolean>) => void;
  isNew: boolean;
  setIsNew: (args_0: SetStateAction<boolean>) => void;
  isBroken: boolean;
  setIsBroken: (args_0: SetStateAction<boolean>) => void;
  userRoles: Role[];
};

export default function AmbassadorBountyMenu({
  supabase,
  setRefetch,
  refetch,
  userId,
  search,
  setSearch,
  status,
  setStatus,
  tags,
  setTags,
  bountyAmount,
  isDaily,
  setIsDaily,
  isNew,
  setIsNew,
  isBroken,
  setIsBroken,
  userRoles,
}: AmbassadorBountyButtonProps) {
  const [showTags, setShowTags] = useState(false);

  const [userStat, userStatLoading] = useUserWeeklyStat({
    supabase,
    userId,
    refetch,
  });

  const [teamStat, teamStatLoading] = useTeamWeeklyStat({
    supabase,
    refetch,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setSearch(undefined);
    } else {
      setSearch(e.target.value);
    }
  };

  const handleStatusChange = (newStatus: StatusEnum) => {
    if (status === newStatus) {
      setStatus(undefined);
    } else {
      setStatus(newStatus);
    }
  };

  const handleTagChange = (tag: TagEnum) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="flex flex-row items-end justify-between w-full space-x-5 h-full">
      <div className="flex flex-col space-y-3 items-start justify-start w-full">
        <div className="flex flex-wrap gap-2 w-full">
          <Button
            className="border-[3px]"
            onClick={() => setIsDaily(!isDaily)}
            style={{
              borderColor: isDaily ? "#ed7f2f" : undefined,
            }}
          >
            <span className="mt-[2px]">DAILY</span>
          </Button>
          <Button
            className="border-[3px]"
            onClick={() => setIsNew(!isNew)}
            style={{
              borderColor: isNew ? "#35d1c2" : undefined,
            }}
          >
            <span className="mt-[2px]">NEW</span>
          </Button>
          <Button
            className="border-[3px]"
            onClick={() => handleStatusChange("UNCLAIMED")}
            style={{
              borderColor: status === "UNCLAIMED" ? "#e83030" : undefined,
            }}
          >
            <span className="mt-[2px]">UNCLAIMED</span>
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

          {(userRoles.includes("ADMIN") ||
            userRoles.includes("NETWORK_LEAD")) && (
            <Button
              className="border-[3px]"
              onClick={() => setIsBroken(!isBroken)}
              style={{
                borderColor: isBroken ? "#e83030" : undefined,
              }}
            >
              <span className="mt-[2px]">BROKEN</span>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 w-full">
          <div className="flex flex-row space-x-1 items-center justify-center">
            <button
              onClick={() => handleTagChange("SOL")}
              style={{
                borderColor: tags.includes("SOL") ? "white" : "black",
              }}
              className="px-4 pt-[3px]  rounded-full bg-gradient-to-r from-sol-1 to-sol-2 border-[3px]"
            >
              <span className="text-sm">SOL</span>
            </button>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <button
              onClick={() => handleTagChange("ETH")}
              style={{
                borderColor: tags.includes("ETH") ? "white" : "black",
              }}
              className="px-4 pt-[3px]  rounded-full bg-eth border-[3px]"
            >
              <span className="text-sm">ETH</span>
            </button>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <button
              onClick={() => handleTagChange("BTC")}
              style={{
                borderColor: tags.includes("BTC") ? "white" : "black",
              }}
              className="px-4 pt-[3px]  rounded-full bg-btc border-[3px]"
            >
              <span className="text-sm">BTC</span>
            </button>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <button
              onClick={() => handleTagChange("POLY")}
              style={{
                borderColor: tags.includes("POLY") ? "white" : "black",
              }}
              className="px-4 pt-[3px] rounded-full bg-polygon border-[3px]"
            >
              <span className="text-sm">POLY</span>
            </button>
          </div>
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("APTOS")}
                style={{
                  borderColor: tags.includes("APTOS") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-aptos border-[3px]"
              >
                <span className="text-sm text-black">APTOS</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("SUI")}
                style={{
                  borderColor: tags.includes("SUI") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-sui border-[3px]"
              >
                <span className="text-sm">SUI</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("BASE")}
                style={{
                  borderColor: tags.includes("BASE") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-base border-[3px]"
              >
                <span className="text-sm">BASE</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("XRP")}
                style={{
                  borderColor: tags.includes("XRP") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-xrp border-[3px]"
              >
                <span className="text-sm">XRP</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("CARD")}
                style={{
                  borderColor: tags.includes("CARD") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-cardano border-[3px]"
              >
                <span className="text-sm">CARDANO</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("AVAX")}
                style={{
                  borderColor: tags.includes("AVAX") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-avax border-[3px]"
              >
                <span className="text-sm">AVAX</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("COSM")}
                style={{
                  borderColor: tags.includes("COSM") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-cosmos border-[3px]"
              >
                <span className="text-sm">COSMOS</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("NEAR")}
                style={{
                  borderColor: tags.includes("NEAR") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-near border-[3px]"
              >
                <span className="text-sm text-black">NEAR</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("BNB")}
                style={{
                  borderColor: tags.includes("BNB") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-bnb border-[3px]"
              >
                <span className="text-sm text-black">BNB</span>
              </button>
            </div>
          )}
          {showTags && (
            <div className="flex flex-row space-x-1 items-center justify-center">
              <button
                onClick={() => handleTagChange("TEZOS")}
                style={{
                  borderColor: tags.includes("TEZOS") ? "white" : "black",
                }}
                className="px-4 pt-[3px] rounded-full bg-tezos border-[3px]"
              >
                <span className="text-sm">TEZOS</span>
              </button>
            </div>
          )}
          {showTags ? (
            <Button onClick={() => setShowTags(false)}>Hide</Button>
          ) : (
            <Button onClick={() => setShowTags(true)}>Show More</Button>
          )}
        </div>
        <Input
          className="text-black bg-white w-full"
          placeholder="Search"
          onChange={handleSearchChange}
          value={search}
        />
      </div>
      <div className="flex flex-col items-end justify-center space-y-2 w-full">
        <div className="flex flex-row grow h-full items-center justify-center w-full space-x-10 ">
          <div
            className="flex flex-col items-center justify-center border-[3px] p-2 rounded-md"
            style={{
              borderColor: userStat >= 5 ? "#833db6" : "white",
            }}
          >
            <span className="text-2xl">{userStat}/5</span>
            <span className="text-lg">Personal</span>
            <span className="text-lg">Weekly Goal</span>
          </div>
          <div
            className="flex flex-col items-center justify-center border-[3px] p-2 rounded-md"
            style={{
              borderColor: teamStat >= 100 ? "#833db6" : "white",
            }}
          >
            <span className="text-2xl">{teamStat}/100</span>
            <span className="text-lg">Team</span>
            <span className="text-lg">Weekly Goal</span>
          </div>
        </div>
        <CreateBountyRequest
          setRefetch={setRefetch}
          supabase={supabase}
          userId={userId}
        />
        <div className="flex flex-row items-center justify-end w-full space-x-2">
          <span className="mt-1">Active Bounties: {bountyAmount || 0} / 5</span>
          <AmbassadorUserBounties
            supabase={supabase}
            userId={userId}
            refetch={refetch}
            userRoles={userRoles}
            setRefetch={setRefetch}
          />
        </div>
      </div>
    </div>
  );
}
