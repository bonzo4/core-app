import ConfirmButton from "@/components/ConfirmButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentsWithUser } from "@/lib/hooks/admin/useAdminUserPayment";
import { Database } from "@/lib/supabase/types";
import { Connection } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import { SetStateAction } from "react";

type PaymentTableProps = {
  supabase: SupabaseClient<Database>;
  payments: PaymentsWithUser[];
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  connection: Connection;
};

export default function PaymentTable({
  payments,
  supabase,
  setRefetch,
  connection,
}: PaymentTableProps) {
  return (
    <Table className="">
      <TableCaption>All Past Payments</TableCaption>
      <TableHeader className="sticky top-0 bg-black">
        <TableRow>
          <TableHead className="w-[50px] ">Confirmed</TableHead>
          <TableHead className="w-[150px] ">Date</TableHead>
          <TableHead className="w-[200px]">User</TableHead>
          <TableHead className="w-[200px]">Memo</TableHead>
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
            <TableCell className="flex flex-row space-x-2 items-center justify-start">
              {payment.user_wallets.icon_url && (
                <Image
                  src={payment.user_wallets.icon_url}
                  alt={payment.user_wallets.username}
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              )}
              <span>{payment.user_wallets.username}</span>
            </TableCell>
            <TableCell>{payment.memo}</TableCell>
            <TableCell className="text-right">${payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
