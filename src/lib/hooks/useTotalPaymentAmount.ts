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
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getTotalPaymentAmount = async () => {
      const { data, error } = await supabase.rpc(
        "get_total_confirmed_payments",
        {
          payment_user_id: userId,
        }
      );

      if (data) setTotalPaymentAmount(data);
      setLoading(false);
    };
    getTotalPaymentAmount();
  }, [supabase, setLoading, refetch, userId]);

  return [totalPaymentAmount, loading] as const;
}
