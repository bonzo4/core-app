import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export type AmbassadorBounty =
  Database["public"]["Tables"]["ambassador_bounties"]["Row"];

export type BountyWithClaimer = AmbassadorBounty & {
  claimer?: Database["public"]["Views"]["user_wallets_view"]["Row"];
};

type UseAmbassadorBountiesOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
  search?: string;
  tags: string[];
  status?: string;
  claimerId?: string;
  isPublic?: boolean;
};

export function useAmbassadorBounties({
  supabase,
  refetch,
  search,
  tags,
  status,
  claimerId,
  isPublic = true,
}: UseAmbassadorBountiesOptions) {
  const [ambassadorBounties, setAmbassadorBounties] = useState<
    BountyWithClaimer[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [tagRef, setTagRef] = useState<string>(JSON.stringify(tags));

  useEffect(() => {
    setTagRef(JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    refetch;
    const getAmbassadorBounties = async () => {
      console.log("useAmbassadorBounties");
      const query = supabase.from("ambassador_bounties").select("*");

      if (isPublic) {
        query
          .neq("status", "REQUESTED")
          .neq("status", "COMPLETED")
          .neq("status", "AUDITED")
          .order("created_at", { ascending: false });
      }

      if (JSON.parse(tagRef).length > 0) {
        query.overlaps("tags", JSON.parse(tagRef));
      }
      if (search) {
        query.textSearch("guild_name", search);
      }
      if (status) {
        query.eq("status", status);
      }
      if (claimerId) {
        query
          .eq("claimer_id", claimerId)
          .order("claim_date", { ascending: false });
      }

      const { data: ambassadorBountiesData, error } = await query;
      if (error) {
        console.error("Error fetching ambassador bounties", error);
        return;
      }
      if (ambassadorBountiesData) {
        setAmbassadorBounties(
          await Promise.all(
            ambassadorBountiesData.map(async (bounty) => {
              if (bounty.claimer_id) {
                const { data: claimerData, error } = await supabase
                  .from("user_wallets_view")
                  .select("*")
                  .eq("user_id", bounty.claimer_id)
                  .single();
                if (error) {
                  return bounty;
                }
                return { ...bounty, claimer: claimerData };
              } else {
                return bounty;
              }
            })
          )
        );
      }
      setLoading(false);
    };
    getAmbassadorBounties();
  }, [
    supabase,
    setLoading,
    refetch,
    status,
    search,
    claimerId,
    isPublic,
    tagRef,
  ]);

  return [ambassadorBounties, loading] as const;
}
