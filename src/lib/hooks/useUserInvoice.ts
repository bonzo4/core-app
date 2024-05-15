import { useEffect, useState } from "react";
import { Database } from "../supabase/types";
import { toast } from "react-toastify";

export type UserInvoice = Database["public"]["Tables"]["user_invoices"]["Row"];

type UseUserInvoicesOptions = {
  supabase: any;
  invoiceId: number;
};

export function useUserInvoice({
  supabase,
  invoiceId,
}: UseUserInvoicesOptions) {
  const [invoice, setInvoice] = useState<UserInvoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInvoice = async () => {
      const { data: invoice, error } = await supabase
        .from("user_invoices")
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
