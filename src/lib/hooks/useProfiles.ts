import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { Profile } from "./teams/useTeamMembers";

type UseUserWalletOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
};

export function useProfiles({ supabase, refetch }: UseUserWalletOptions) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserWallet = async () => {
      setLoading(true);
      refetch;
      const { data: profiles, error } = await supabase
        .from("user_wallets_view")
        .select("*");
      if (profiles) {
        setProfiles(profiles);
      }
      setLoading(false);
    };
    getUserWallet();
  }, [supabase, refetch, setLoading]);

  return [profiles, loading] as const;
}
