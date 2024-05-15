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
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";

type PaymentHistoryProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  isUserLoading: boolean;
};

export default function PaymentHistory({
  supabase,
  user,
  isUserLoading,
}: PaymentHistoryProps) {
  const [payments, loading] = useUserPayments({
    supabase,
    user,
    isUserLoading,
  });

  if (loading) {
    <Button disabled>Payment History</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Payment History</Button>
      </DialogTrigger>
      <DialogContent className="bg-black h-3/4 flex flex-col items-start justify-start">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-auto">
          <Table>
            <TableCaption>All Past Payments</TableCaption>
            <TableHeader className="sticky top-0 bg-black">
              <TableRow>
                <TableHead className="w-[50px] ">Confirmed</TableHead>
                <TableHead className="w-[150px] ">Date</TableHead>
                <TableHead className="w-[150px] ">Source</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="">
                    {payment.is_confirmed ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="">
                    {new Date(payment.created_at).toDateString()}
                  </TableCell>
                  <TableCell className="">
                    {payment.team?.name || payment.user?.username}
                  </TableCell>
                  <TableCell className="text-right">
                    ${payment.amount}
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
