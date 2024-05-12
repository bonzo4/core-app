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
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";

type ClaimHistoryProps = {
  supabase: SupabaseClient<Database>;
  user: User;
};

export default function ClaimHistory({ supabase, user }: ClaimHistoryProps) {
  const [claims, loading] = useUserClaims({ supabase, user });

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Claim History</Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>Claim History</DialogTitle>
        </DialogHeader>
        <Table className="">
          <TableCaption>All Past Claims</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] ">Confirmed</TableHead>
              <TableHead className="w-[150px] ">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="">
                  {claim.is_confirmed ? "Yes" : "No"}
                </TableCell>
                <TableCell className="">
                  {new Date(claim.created_at).toDateString()}
                </TableCell>
                <TableCell className="text-right">${claim.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
