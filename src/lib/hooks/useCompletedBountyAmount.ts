import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type UseCompletedBountyAmountOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
  userId: string;
};

export function useCompletedBountyAmount({
  supabase,
  refetch,
  userId,
}: UseCompletedBountyAmountOptions) {
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getTotalPaymentAmount = async () => {
      const { count, error } = await supabase
        .from("ambassador_bounties")
        .select("", { count: "exact" })
        .eq("completer_id", userId);

      if (count) setTotalPaymentAmount(count);
      setLoading(false);
    };
    getTotalPaymentAmount();
  }, [supabase, setLoading, refetch, userId]);

  return [totalPaymentAmount, loading] as const;
}
