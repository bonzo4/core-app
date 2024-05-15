import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Payment, PaymentsWithUser } from "../admin/useAdminUserPayment";
import { Profile } from "./useTeamMembers";

type UseUserWalletsOptions = {
  supabase: SupabaseClient<Database>;
  teamId: number;
  refetch?: boolean;
};

export type PaymentsWithProfile = {
  user: Profile;
} & Payment;

export function useTeamMemberPayments({
  supabase,
  teamId,
  refetch,
}: UseUserWalletsOptions) {
  const [payments, setPayments] = useState<PaymentsWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPayments = async () => {
      refetch;
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*")
        .eq("team_id", teamId)
        .order("created_at", { ascending: false });
      if (payments) {
        const paymentsWithProfile = await Promise.all(
          payments.map(async (payment: Payment) => {
            const { data: user, error } = await supabase
              .from("user_wallets_view")
              .select("*")
              .eq("user_id", payment.user_id)
              .single();
            return { ...payment, user: user as Profile };
          })
        );
        setPayments(paymentsWithProfile);
      }
      setLoading(false);
    };
    getPayments();
  }, [supabase, setLoading, teamId, refetch]);

  return [payments, loading] as const;
}
