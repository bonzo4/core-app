import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type TeamInvoice = Database["public"]["Tables"]["team_invoices"]["Row"];

type UseTteamInvoicesOptions = {
  supabase: SupabaseClient<Database>;
  teamId: number;
  refetch?: boolean;
  isTeamLoading: boolean;
};

export function useTeamInvoices({
  supabase,
  teamId,
  refetch,
  isTeamLoading,
}: UseTteamInvoicesOptions) {
  const [invoices, setInvoices] = useState<TeamInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvoices = async () => {
      if (!teamId) {
        if (!isTeamLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: invoices, error } = await supabase
        .from("team_invoices")
        .select("*")
        .eq("team_id", teamId)
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
  }, [supabase, setLoading, teamId, refetch, isTeamLoading]);

  return [invoices, loading] as const;
}
