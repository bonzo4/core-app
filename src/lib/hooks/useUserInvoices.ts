import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type UserInvoice = Database["public"]["Tables"]["user_invoices"]["Row"];

type UseUserInvoicesOptions = {
  supabase: SupabaseClient<Database>;
  user?: User;
  refetch?: boolean;
  isUserLoading: boolean;
};

export function useUserInvoices({
  supabase,
  user,
  refetch,
  isUserLoading,
}: UseUserInvoicesOptions) {
  const [invoices, setInvoices] = useState<UserInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvoices = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: invoices, error } = await supabase
        .from("user_invoices")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_confirmed", true)
        .order("created_at", { ascending: false });
      if (error) {
        toast.error(error.message);
      }
      if (invoices) {
        setInvoices(invoices);
      }
      setLoading(false);
    };
    getInvoices();
  }, [supabase, setLoading, user, refetch, isUserLoading]);

  return [invoices, loading] as const;
}
