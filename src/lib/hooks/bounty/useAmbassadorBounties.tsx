import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export type AmbassadorBounty =
  Database["public"]["Tables"]["ambassador_bounties"]["Row"];

export type BountyWithClaimer = AmbassadorBounty & {
  claimer?: Database["public"]["Views"]["user_wallets_view"]["Row"];
  completer?: Database["public"]["Views"]["user_wallets_view"]["Row"];
  requester?: Database["public"]["Views"]["user_wallets_view"]["Row"];
};

type UseAmbassadorBountiesOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
  search?: string;
  tags: string[];
  status?: string;
  userId?: string;
  isPublic?: boolean;
  isFixer?: boolean;
  isNew?: boolean;
  isDaily?: boolean;
  isBroken?: boolean;
};

export function useAmbassadorBounties({
  supabase,
  refetch,
  search,
  tags,
  status,
  userId,
  isPublic = true,
  isFixer = false,
  isNew = false,
  isDaily = false,
  isBroken = false,
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
      const query = supabase.from("ambassador_bounties").select("*");

      if (isPublic) {
        query
          .neq("status", "REQUESTED")
          .order("created_at", { ascending: false });
      }

      if (!isFixer) {
        query.neq("is_broken", true);
      }

      if (isNew) {
        query.eq("is_new", true);
      }

      if (isDaily) {
        query.eq("is_daily", true);
      }

      if (isBroken) {
        query.eq("is_broken", true);
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
      if (userId) {
        if (status === "REQUESTED") {
          query.eq("requester_id", userId);
        } else if (status === "CLAIMED" || status === "COMPLETED") {
          query.eq("claimer_id", userId);
        } else if (status === "AUDITED") {
          query.eq("completer_id", userId);
        } else {
          query.or(
            `claimer_id.eq.${userId},completer_id.eq.${userId}, requester_id.eq.${userId}`
          );
        }
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
              if (bounty.completer_id) {
                const { data: completerData, error } = await supabase
                  .from("user_wallets_view")
                  .select("*")
                  .eq("user_id", bounty.completer_id)
                  .single();
                if (error) {
                  return bounty;
                }
                return { ...bounty, completer: completerData };
              }
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
              }
              if (bounty.requester_id) {
                const { data: requesterData, error } = await supabase
                  .from("user_wallets_view")
                  .select("*")
                  .eq("user_id", bounty.requester_id)
                  .single();
                if (error) {
                  return bounty;
                }
                return { ...bounty, requester: requesterData };
              }
              return bounty;
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
    userId,
    isPublic,
    tagRef,
    isFixer,
    isNew,
    isDaily,
    isBroken,
  ]);

  return [ambassadorBounties, loading] as const;
}