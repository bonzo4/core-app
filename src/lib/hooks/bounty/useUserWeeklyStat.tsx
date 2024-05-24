import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type UseUserWeeklyStatOptions = {
  supabase: SupabaseClient<Database>;
  userId: string;
  refetch?: boolean;
};

export function useUserWeeklyStat({
  supabase,
  refetch,
  userId,
}: UseUserWeeklyStatOptions) {
  const [ambassadorBounties, setAmbassadorBounties] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getAmbassadorBounties = async () => {
      let today = new Date();

      // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
      let dayOfWeek = today.getDay();

      // Calculate the date of the last Sunday
      let lastSunday = new Date(today);
      lastSunday.setDate(today.getDate() - dayOfWeek);

      // Calculate the date of the next Sunday
      let nextSunday = new Date(today);
      nextSunday.setDate(today.getDate() + (7 - dayOfWeek));

      const { count } = await supabase
        .from("ambassador_bounties")
        .select("", { count: "exact" })
        .eq("completer_id", userId)
        .gt("created_at", lastSunday.toISOString())
        .lt("created_at", nextSunday.toISOString());

      if (count) setAmbassadorBounties(count);
      setLoading(false);
    };
    getAmbassadorBounties();
  }, [supabase, setLoading, refetch, userId]);

  return [ambassadorBounties, loading] as const;
}
