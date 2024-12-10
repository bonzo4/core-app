import FallbackImage from "@/components/FallbackImage";
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
import { PaymentsWithProfile } from "@/lib/hooks/teams/useTeamPayments";
import Image from "next/image";

type TeamPaymentTableProps = {
  payments: PaymentsWithProfile[];
};

export default function TeamPaymentTable({ payments }: TeamPaymentTableProps) {
  return (
    <Table className="">
      <TableCaption>All Past Payments</TableCaption>
      <TableHeader className="sticky top-0 bg-black">
        <TableRow>
          <TableHead className="w-[50px] ">Confirmed</TableHead>
          <TableHead className="w-[150px] ">Date</TableHead>
          <TableHead className="w-[200px]">User</TableHead>
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
            <TableCell className="flex flex-row space-x-2 items-center justify-start">
              {payment.user.icon_url && (
                <FallbackImage
                  fallbackSrc="https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/square%20rainbow%20logo.png"
                  src={payment.user.icon_url}
                  alt="icon"
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              )}
              <span>{payment.user.username}</span>
            </TableCell>
            <TableCell className="text-right">${payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
