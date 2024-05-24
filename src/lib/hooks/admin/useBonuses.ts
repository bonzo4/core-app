import { SupabaseClient } from "@supabase/supabase-js";
import { Profile } from "../teams/useTeamMembers";
import { Database } from "@/lib/supabase/types";
import { useEffect, useState } from "react";

type Bonus = Database["public"]["Tables"]["user_bonus"]["Row"];

export type ProfileWithBonuses = {
  profile: Profile;
  bonuses: Bonus[];
  totalPaymentAmount: number;
};

type UseCompletedBountyAmountOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
};

export function useBonuses({
  supabase,
  refetch,
}: UseCompletedBountyAmountOptions) {
  const [profiles, setProfiles] = useState<ProfileWithBonuses[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getProfiles = async () => {
      const { data, error } = await supabase
        .from("user_bonus")
        .select("*")
        .eq("is_paid", false);

      if (data) {
        const userIds = Array.from(new Set(data.map((d) => d.user_id)));
        const bonuses = await Promise.all(
          userIds.map(async (userId) => {
            const { data: profileData, error: profileError } = await supabase
              .from("user_wallets_view")
              .select("*")
              .eq("user_id", userId)
              .single();

            if (profileData) {
              const profile = profileData;
              const totalPaymentAmount = data
                .filter((d) => d.user_id === userId)
                .reduce((acc, curr) => acc + curr.pay_amount, 0);

              return {
                profile,
                bonuses: data.filter((d) => d.user_id === userId),
                totalPaymentAmount,
              };
            }
          })
        );
        setProfiles(
          bonuses.filter((b) => b !== undefined) as ProfileWithBonuses[]
        );
      }
    };

    getProfiles();
  }, [supabase, setLoading, refetch]);

  return [profiles, loading] as const;
}
