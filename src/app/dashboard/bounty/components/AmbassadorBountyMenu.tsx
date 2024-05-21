import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import CreateBountyRequest from "./CreateBountyRequest";
import { Input } from "@/components/ui/input";
import AmbassadorUserBounties from "./AmbassadorUserBounties";

type TagEnum = Database["public"]["Enums"]["guild_tag"];
type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type AmbassadorBountyButtonProps = {
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  userId: string;
  search: string | undefined;
  setSearch: (args_0: SetStateAction<string | undefined>) => void;
  tags: TagEnum[];
  setTags: (args_0: SetStateAction<TagEnum[]>) => void;
  status: string | undefined;
  setStatus: (args_0: SetStateAction<StatusEnum | undefined>) => void;
  bountyAmount: number | undefined;
};

export default function AmbassadorBountyMenu({
  supabase,
  setRefetch,
  userId,
  search,
  setSearch,
  status,
  setStatus,
  tags,
  setTags,
  bountyAmount,
}: AmbassadorBountyButtonProps) {
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
    <div className="flex flex-row items-end justify-between w-full">
      <div className="flex flex-col space-y-3 items-start justify-start w-full">
        <div className="flex flex-wrap gap-2 w-full">
          <Button
            className="border-4"
            style={{
              background: tags.includes("SOL")
                ? "linear-gradient(transparent, transparent) padding-box, linear-gradient(to right, #9945ff, #14f195) border-box"
                : undefined,
              borderRadius: "0.5rem",
              borderColor: "transparent",
            }}
            onClick={() => handleTagChange("SOL")}
          >
            SOL
          </Button>
          <Button
            className="border-4 "
            style={{
              background: tags.includes("ETH")
                ? "linear-gradient(transparent, transparent) padding-box, #8991b3 border-box"
                : undefined,
              borderRadius: "0.5rem",
              borderColor: "transparent",
            }}
            onClick={() => handleTagChange("ETH")}
          >
            ETH
          </Button>
          <Button
            className="border-4 "
            style={{
              background: tags.includes("BTC")
                ? "linear-gradient(transparent, transparent) padding-box, #ff5500 border-box"
                : undefined,
              borderRadius: "0.5rem",
              borderColor: "transparent",
            }}
            onClick={() => handleTagChange("BTC")}
          >
            BTC
          </Button>
          <Button
            className="border-4"
            style={{
              borderColor: tags.includes("POLY") ? "violet" : undefined,
            }}
            onClick={() => handleTagChange("POLY")}
          >
            POLY
          </Button>
          <Button
            className="border-4"
            style={{
              borderColor: tags.includes("APTOS") ? "green" : undefined,
            }}
            onClick={() => handleTagChange("APTOS")}
          >
            APTOS
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 w-full">
          <Button
            className="border-4 "
            onClick={() => handleStatusChange("UNCLAIMED")}
            style={{
              borderColor: status === "UNCLAIMED" ? "purple" : undefined,
            }}
          >
            UNCLAIMED
          </Button>
          <Button
            className="border-4"
            onClick={() => handleStatusChange("CLAIMED")}
            style={{ borderColor: status === "CLAIMED" ? "green" : undefined }}
          >
            CLAIMED
          </Button>
        </div>
        <Input
          className="text-black bg-white w-full"
          placeholder="Search"
          onChange={handleSearchChange}
          value={search}
        />
        <div className="flex flex-wrap gap-3 w-full">
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-gradient-to-r from-sol-1 to-sol-2" />{" "}
            <span className="mt-1">SOL</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center bg-w">
            <div className="w-8 h-3 rounded-full bg-eth" />{" "}
            <span className="mt-1">ETH</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-btc" />{" "}
            <span className="mt-1">BTC</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-polygon" />{" "}
            <span className="mt-1">POLY</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-aptos" />{" "}
            <span className="mt-1">APTOS</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-sui" />{" "}
            <span className="mt-1">SUI</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-base" />{" "}
            <span className="mt-1">BASE</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-xrp" />{" "}
            <span className="mt-1">XRP</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-cardano" />{" "}
            <span className="mt-1">CARDANO</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-avax" />{" "}
            <span className="mt-1">AVAX</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-cosmos" />{" "}
            <span className="mt-1">COSMOS</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-near" />{" "}
            <span className="mt-1">NEAR</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-objkt border border-1 border-white" />{" "}
            <span className="mt-1">OBJKT</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center ">
            <div className="w-8 h-3 rounded-full bg-bnb " />{" "}
            <span className="mt-1">BNB</span>
          </div>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <div className="w-8 h-3 rounded-full bg-tezos" />{" "}
            <span className="mt-1">TEZOS</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end w-full space-x-2">
        <span className="mt-1">Active Bounties: {bountyAmount} / 5</span>
        <AmbassadorUserBounties supabase={supabase} userId={userId} />
        <CreateBountyRequest
          setRefetch={setRefetch}
          supabase={supabase}
          userId={userId}
        />
      </div>
    </div>
  );
}
