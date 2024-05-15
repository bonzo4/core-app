import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Payment } from "./admin/useAdminUserPayment";
import { TeamProfile } from "./useTeams";
import { Profile } from "./teams/useTeamMembers";

export type PaymentsWithPayer = {
  team?: TeamProfile;
  user?: Profile;
} & Payment;

type UseUserPaymentsOptions = {
  supabase: SupabaseClient<Database>;
  user?: User;
  refetch?: boolean;
  isUserLoading: boolean;
};

export function useUserPayments({
  supabase,
  user,
  refetch,
  isUserLoading,
}: UseUserPaymentsOptions) {
  const [payments, setPayments] = useState<PaymentsWithPayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPayments = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      refetch;
      const { data: payments, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        toast.error(error.message);
      }
      if (payments) {
        const paymentsWithTeams = await Promise.all(
          payments.map(async (payment) => {
            if (payment.team_id) {
              const { data: team } = await supabase
                .from("team_view")
                .select("*")
                .eq("id", payment.team_id)
                .single();
              if (team) {
                return { ...payment, team };
              }
            }
            if (payment.payer_id) {
              const { data: user } = await supabase
                .from("user_wallets_view")
                .select("*")
                .eq("user_id", payment.payer_id)
                .single();
              if (user) {
                return { ...payment, user };
              }
            }
            return payment;
          })
        );
        setPayments(paymentsWithTeams);
      }
      setLoading(false);
    };
    getPayments();
  }, [supabase, setLoading, user, refetch, isUserLoading]);

  return [payments, loading] as const;
}
