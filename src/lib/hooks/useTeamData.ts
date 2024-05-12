import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

export type TeamMember = Database["public"]["Tables"]["_team_members"]["Row"];

type UseTeamDataOptions = {
  supabase: SupabaseClient<Database>;
  refetch: boolean;
  user: User | undefined;
  isUserLoading: boolean;
};

export function useTeamData({
  supabase,
  refetch,
  user,
  isUserLoading,
}: UseTeamDataOptions) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeamData = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: teamData, error } = await supabase
        .from("_team_members")
        .select("*")
        .eq("user_id", user.id);
      if (teamData) {
        setTeamMembers(teamData);
      }
    };
    getTeamData().then(() => setLoading(false));
  }, [supabase, refetch, user, setLoading, isUserLoading]);

  return [teamMembers, loading] as const;
}
