import SupabaseClient from "@supabase/supabase-js/dist/module/SupabaseClient";
import { Database } from "../../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Team } from "../useUserTeams";

type UseTeamDataOptions = {
  supabase: SupabaseClient<Database>;
  teamId: number;
};

export function useTeamData({ supabase, teamId }: UseTeamDataOptions) {
  const [team, setTeam] = useState<Team>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeam = async () => {
      const { data: team, error } = await supabase
        .from("teams")
        .select("*")
        .eq("id", teamId)
        .single();
      if (error) {
        toast.error(error.message);
      }
      if (team) {
        setTeam(team);
      }
      setLoading(false);
    };
    getTeam();
  }, [teamId, supabase]);

  return [team, loading] as const;
}
