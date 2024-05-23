import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type UseBountyAmountOptions = {
  supabase: SupabaseClient<Database>;
  userId: string;
  refetch?: boolean;
};

export function useBountyAmount({
  supabase,
  refetch,
  userId,
}: UseBountyAmountOptions) {
  const [ambassadorBounties, setAmbassadorBounties] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getAmbassadorBounties = async () => {
      console.log("useAmbassadorBounties");
      const { count } = await supabase
        .from("ambassador_bounties")
        .select("", { count: "exact" })
        .eq("claimer_id", userId);

      if (count) setAmbassadorBounties(count);
      setLoading(false);
    };
    getAmbassadorBounties();
  }, [supabase, setLoading, refetch, userId]);

  return [ambassadorBounties, loading] as const;
}
