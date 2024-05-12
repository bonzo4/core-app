import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type Claim = Database["public"]["Tables"]["teams"]["Row"];

type UseUserTeamsOptions = {
  supabase: SupabaseClient<Database>;
  user: User;
};

export function useUserTeams({ supabase, user }: UseUserTeamsOptions) {
  const [teams, setTeams] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      const { data: teams, error } = await supabase
        .from("teams")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error.hint);
        toast.error(error.message);
      }
      if (teams) {
        setTeams(teams);
      }
      setLoading(false);
    };
    getTeams();
  }, [supabase, setLoading, user]);

  return [teams, loading] as const;
}
