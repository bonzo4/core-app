import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { SetStateAction, useState } from "react";
import AmbassadorBountyMenu from "./AmbassadorBountyMenu";
import { useAmbassadorBounties } from "@/lib/hooks/bounty/useAmbassadorBounties";
import AmbassadorBountyTable from "./AmbassadorBountyTable";
import { useBountyAmount } from "@/lib/hooks/bounty/useBountyAmount";

type TagEnum = Database["public"]["Enums"]["guild_tag"];
type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type AmbassadorBountiesProps = {
  supabase: SupabaseClient<Database>;
  userId: string;
};

export default function AmbassadorBounties({
  supabase,
  userId,
}: AmbassadorBountiesProps) {
  const [refetch, setRefetch] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusEnum | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const [tags, setTags] = useState<TagEnum[]>([]);

  const [bounties, loading] = useAmbassadorBounties({
    supabase,
    refetch,
    search,
    tags: tags.map((tag) => tag.toString()),
    status,
  });

  const [bountyAmount, bountyAmountLoading] = useBountyAmount({
    supabase,
    userId,
    refetch,
  });

  return (
    <div className="flex flex-col space-y-5">
      <AmbassadorBountyMenu
        supabase={supabase}
        setRefetch={setRefetch}
        userId={userId}
        search={search}
        setSearch={setSearch}
        tags={tags}
        setTags={setTags}
        status={status}
        setStatus={setStatus}
        bountyAmount={bountyAmount}
      />
      <AmbassadorBountyTable
        ambassadorBounties={bounties}
        loading={loading}
        setRefetch={setRefetch}
        supabase={supabase}
        userId={userId}
        bountyAmount={bountyAmount}
      />
    </div>
  );
}
