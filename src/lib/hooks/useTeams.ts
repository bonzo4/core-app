import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

export type TeamProfile = Database["public"]["Views"]["team_view"]["Row"];

type useTeamsOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
};

export function useTeams({ supabase, refetch }: useTeamsOptions) {
  const [profiles, setProfiles] = useState<TeamProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserWallet = async () => {
      refetch;
      const { data: profiles } = await supabase.from("team_view").select("*");
      if (profiles) {
        setProfiles(profiles);
      }
      setLoading(false);
    };
    getUserWallet();
  }, [supabase, refetch, setLoading]);

  return [profiles, loading] as const;
}
