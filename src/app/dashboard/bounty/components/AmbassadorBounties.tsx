import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { SetStateAction, useEffect, useState } from "react";
import AmbassadorBountyMenu from "./AmbassadorBountyMenu";
import { useAmbassadorBounties } from "@/lib/hooks/bounty/useAmbassadorBounties";
import AmbassadorBountyTable from "./AmbassadorBountyTable";
import { useBountyAmount } from "@/lib/hooks/bounty/useBountyAmount";
import { Role } from "@/lib/hooks/useUserRoles";

type TagEnum = Database["public"]["Enums"]["guild_tag"];
type StatusEnum = Database["public"]["Enums"]["bounty_status"];

type AmbassadorBountiesProps = {
  supabase: SupabaseClient<Database>;
  userId: string;
  userRole: Role | undefined;
};

export default function AmbassadorBounties({
  supabase,
  userId,
  userRole,
}: AmbassadorBountiesProps) {
  const [isDaily, setIsDaily] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isBroken, setIsBroken] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [status, setStatus] = useState<StatusEnum | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const [tag, setTag] = useState<TagEnum | undefined>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [search, tag, status, isBroken, isNew, isDaily]);

  const [bounties, loading] = useAmbassadorBounties({
    supabase,
    refetch,
    search,
    tag,
    status,
    isFixer: userRole === "ADMIN" || userRole === "NETWORK_LEAD",
    isNew,
    isDaily,
    isBroken,
    page,
  });

  const [bountyAmount, bountyAmountLoading] = useBountyAmount({
    supabase,
    userId,
    refetch,
  });

  return (
    <div className="flex flex-col space-y-5">
      <AmbassadorBountyMenu
        userRole={userRole}
        refetch={refetch}
        supabase={supabase}
        setRefetch={setRefetch}
        userId={userId}
        search={search}
        setSearch={setSearch}
        tag={tag}
        setTag={setTag}
        status={status}
        setStatus={setStatus}
        bountyAmount={bountyAmount}
        isBroken={isBroken}
        setIsBroken={setIsBroken}
        isNew={isNew}
        setIsNew={setIsNew}
        isDaily={isDaily}
        setIsDaily={setIsDaily}
      />
      <AmbassadorBountyTable
        ambassadorBounties={bounties}
        loading={loading}
        setRefetch={setRefetch}
        supabase={supabase}
        userId={userId}
        bountyAmount={bountyAmount}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
