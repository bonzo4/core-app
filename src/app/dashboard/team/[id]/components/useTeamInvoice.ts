import { Database } from "@/lib/supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type TeamInvoice = Database["public"]["Tables"]["team_invoices"]["Row"];

type UseTeamInvoiceOptions = {
  supabase: any;
  invoiceId: number;
};

export function useTeamInvoice({ supabase, invoiceId }: UseTeamInvoiceOptions) {
  const [invoice, setInvoice] = useState<TeamInvoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvoice = async () => {
      const { data: invoice, error } = await supabase
        .from("team_invoices")
        .select("*")
        .eq("id", invoiceId)
        .single();
      if (error) {
        toast.error("Error fetching invoice");
      }
      if (invoice) {
        setInvoice(invoice);
      }
      setLoading(false);
    };
    getInvoice();
  }, [supabase, setLoading, invoiceId]);

  return [invoice, loading] as const;
}
