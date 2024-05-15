import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserClaims } from "@/lib/hooks/useUserClaims";
import { useUserInvoices } from "@/lib/hooks/useUserInvoices";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import Link from "next/link";

type InvoicesProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  isUserLoading: boolean;
  refetch: boolean;
};

export default function Invoices({
  supabase,
  user,
  isUserLoading,
  refetch,
}: InvoicesProps) {
  const [invoices, loading] = useUserInvoices({
    supabase,
    user,
    isUserLoading,
    refetch,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button disabled={loading}>Invoices</Button>
      </DialogTrigger>
      <DialogContent className="bg-black h-3/4 flex flex-col items-start justify-start">
        <DialogHeader>
          <DialogTitle>Invoices</DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-auto">
          <Table className="">
            <TableCaption>All Invoices</TableCaption>
            <TableHeader className="sticky top-0 bg-black">
              <TableRow>
                <TableHead className="w-[150px] ">Date</TableHead>
                <TableHead className="w-[150px]">Title</TableHead>
                <TableHead className="w-[150px]">Amount</TableHead>
                <TableHead className="w-[150px]">Link</TableHead>
                <TableHead className="text-right">Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="">
                    {new Date(invoice.created_at).toDateString()}
                  </TableCell>
                  <TableCell className="">{invoice.memo}</TableCell>
                  <TableCell className="">${invoice.amount}</TableCell>
                  <TableCell className="flex flex-row">
                    <Button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${process.env.NEXT_PUBLIC_URL}/invoice/${invoice.id}`
                        )
                      }
                    >
                      Copy
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.is_paid ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
