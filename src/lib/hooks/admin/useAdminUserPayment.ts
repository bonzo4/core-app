import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type Payment = Database["public"]["Tables"]["payments"]["Row"];

export type PaymentsWithUser = {
  user_wallets: Database["public"]["Tables"]["user_wallets"]["Row"];
} & Payment;

type UseUserWalletsOptions = {
  supabase: SupabaseClient<Database>;
  user?: User;
  isUserLoading: boolean;
  refetch?: boolean;
};

export function useAdminUserPayments({
  supabase,
  user,
  isUserLoading,
  refetch,
}: UseUserWalletsOptions) {
  const [payments, setPayments] = useState<PaymentsWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPayments = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*, user_wallets!payments_user_id_fkey1(*)")
        .eq("payer_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        toast.error(error.message);
      }
      if (payments) {
        setPayments(payments as any);
      }
      setLoading(false);
    };
    getPayments();
  }, [supabase, setLoading, user, isUserLoading, refetch]);

  return [payments, loading] as const;
}
