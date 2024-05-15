import { useEffect, useState } from "react";
import { Database } from "../supabase/types";
import { toast } from "react-toastify";
import { TeamProfile } from "./useTeams";

type UseTeamProfileOptions = {
  supabase: any;
  teamId?: number;
};

export function useTeamProfile({ supabase, teamId }: UseTeamProfileOptions) {
  const [profile, setProfile] = useState<TeamProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvoice = async () => {
      if (!teamId) {
        return;
      }
      const { data: profile, error } = await supabase
        .from("team_view")
        .select("*")
        .eq("id", teamId)
        .single();
      if (error) {
        toast.error("Error fetching invoice");
      }
      if (profile) {
        setProfile(profile);
      }
      setLoading(false);
    };
    getInvoice();
  }, [supabase, setLoading, teamId]);

  return [profile, loading] as const;
}
