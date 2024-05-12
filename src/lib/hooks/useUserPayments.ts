import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Payment } from "./useAdminUserPayment";

type UseUserWalletsOptions = {
  supabase: SupabaseClient<Database>;
  user: User;
};

export function useUserPayments({ supabase, user }: UseUserWalletsOptions) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPayments = async () => {
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error.hint);
        toast.error(error.message);
      }
      if (payments) {
        setPayments(payments);
      }
      setLoading(false);
    };
    getPayments();
  }, [supabase, setLoading, user]);

  return [payments, loading] as const;
}
