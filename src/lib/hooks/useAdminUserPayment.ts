import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type Payment = Database["public"]["Tables"]["payments"]["Row"];

type PaymentsWithUser = {
  user_wallets: Database["public"]["Tables"]["user_wallets"]["Row"];
} & Payment;

type UseUserWalletsOptions = {
  supabase: SupabaseClient<Database>;
  user: User;
};

export function useAdminUserPayments({
  supabase,
  user,
}: UseUserWalletsOptions) {
  const [payments, setPayments] = useState<PaymentsWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPayments = async () => {
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*, user_wallets!payments_user_id_fkey1(*)")
        .eq("payer_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error.hint);
        toast.error(error.message);
      }
      if (payments) {
        setPayments(payments as any);
      }
      setLoading(false);
    };
    getPayments();
  }, [supabase, setLoading, user]);

  return [payments, loading] as const;
}
