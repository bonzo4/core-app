import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../supabase/types";
import { useEffect, useState } from "react";

export type TeamMember = Database["public"]["Tables"]["_team_members"]["Row"];
export type Profile = Database["public"]["Views"]["user_wallets_view"]["Row"];

export type TeamMemberWithProfile = {
  profile: Profile;
} & TeamMember;

type UseTeamMemberOptions = {
  supabase: SupabaseClient<Database>;
  isTeamLoading: boolean;
  teamId?: number;
  refetch?: boolean;
};

export function useTeamMembers({
  supabase,
  teamId,
  isTeamLoading,
  refetch,
}: UseTeamMemberOptions) {
  const [teamMembers, setTeamMembers] = useState<TeamMemberWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeamData = async () => {
      if (!teamId) {
        if (!isTeamLoading) {
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      refetch;
      const { data: teamData } = await supabase
        .from("_team_members")
        .select("*")
        .eq("team_id", teamId);
      if (teamData) {
        setTeamMembers(
          await Promise.all(
            teamData.map(async (member) => {
              const { data } = await supabase
                .from("user_wallets_view")
                .select("*")
                .eq("user_id", member.user_id)
                .single();
              if (data) {
                return {
                  ...member,
                  profile: data,
                };
              }
              return {
                ...member,
                profile: {
                  user_id: null,
                  icon_url: null,
                  username: null,
                },
              };
            })
          )
        );
      }
    };
    getTeamData().then(() => setLoading(false));
  }, [supabase, teamId, setLoading, isTeamLoading, refetch]);

  return [teamMembers, loading] as const;
}
