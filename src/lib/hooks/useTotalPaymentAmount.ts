import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type UseTotalPaymentAmountOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
  userId: string;
};

export function useTotalPaymentAmount({
  supabase,
  refetch,
  userId,
}: UseTotalPaymentAmountOptions) {
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<
    number | undefined
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getTotalPaymentAmount = async () => {
      console.log("useTotalPaymentAmount");
      const { data } = await supabase.rpc("get_total_confirmed_payments", {
        user_id: userId,
      });

      if (data) setTotalPaymentAmount(data);
      setLoading(false);
    };
    getTotalPaymentAmount();
  }, [supabase, setLoading, refetch, userId]);

  return [totalPaymentAmount, loading] as const;
}
