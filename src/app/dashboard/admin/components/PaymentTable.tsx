import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminUserPayments } from "@/lib/hooks/useAdminUserPayment";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import Image from "next/image";

type PaymentTableProps = {
  supabase: SupabaseClient<Database>;
  user: User;
};

export default function PaymentTable({ supabase, user }: PaymentTableProps) {
  const [payments, loading] = useAdminUserPayments({ supabase, user });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table className="">
      <TableCaption>All Past Payments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">Confirmed</TableHead>
          <TableHead className="w-[150px] ">Date</TableHead>
          <TableHead className="w-[200px]">User</TableHead>
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
            <TableCell className="flex flex-row space-x-2 items-center justify-start">
              <Image
                src={payment.user_wallets.icon_url}
                alt={payment.user_wallets.username}
                className="w-6 h-6 rounded-full"
                width={24}
                height={24}
              />
              <span>{payment.user_wallets.username}</span>
            </TableCell>
            <TableCell className="text-right">${payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
