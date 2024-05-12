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
import { useUserPayments } from "@/lib/hooks/useUserPayments";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import Image from "next/image";

type PaymentHistoryProps = {
  supabase: SupabaseClient<Database>;
  user: User;
};

export default function PaymentHistory({
  supabase,
  user,
}: PaymentHistoryProps) {
  const [payments, loading] = useUserPayments({ supabase, user });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Payment History</Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
        </DialogHeader>
        <Table className="">
          <TableCaption>All Past Payments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] ">Confirmed</TableHead>
              <TableHead className="w-[150px] ">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="">
                  {payment.is_confirmed ? "Yes" : "No"}
                </TableCell>
                <TableCell className="">
                  {new Date(payment.created_at).toDateString()}
                </TableCell>
                <TableCell className="text-right">${payment.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
