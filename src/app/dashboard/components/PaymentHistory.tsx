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
import ConfirmButton from "@/components/ConfirmButton";
import { Connection } from "@solana/web3.js";
import { SetStateAction } from "react";

type PaymentHistoryProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  isUserLoading: boolean;
  connection: Connection;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function PaymentHistory({
  supabase,
  user,
  isUserLoading,
  connection,
  setRefetch,
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
      <DialogContent className="bg-black h-3/4 flex flex-col items-start justify-start max-w-3xl">
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
                <TableHead className="w-[200px] ">Memo</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="">
                    {payment.is_confirmed === true && "✔️"}
                    {payment.is_confirmed === false && "❌"}
                    {payment.is_confirmed === null && payment.transaction && (
                      <ConfirmButton
                        createdAt={payment.created_at}
                        supabase={supabase}
                        tableName="payments"
                        setRefetch={setRefetch}
                        connection={connection}
                        transaction={payment.transaction}
                      />
                    )}
                  </TableCell>
                  <TableCell className="">
                    {new Date(payment.created_at).toDateString()}
                  </TableCell>
                  <TableCell className="">
                    {payment.team?.name || payment.user?.username}
                  </TableCell>
                  <TableCell className="">{payment.memo}</TableCell>
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
