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
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";

type ClaimHistoryProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  isUserLoading: boolean;
  refetch: boolean;
};

export default function ClaimHistory({
  supabase,
  user,
  isUserLoading,
  refetch,
}: ClaimHistoryProps) {
  const [claims, loading] = useUserClaims({
    supabase,
    user,
    isUserLoading,
    refetch,
  });

  if (loading) {
    return <Button disabled>Claim History</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Claim History</Button>
      </DialogTrigger>
      <DialogContent className="bg-black h-3/4 flex flex-col items-start justify-start">
        <DialogHeader>
          <DialogTitle>Claim History</DialogTitle>
        </DialogHeader>
        <div className="w-full overflow-auto">
          <Table>
            <TableCaption>All Past Claims</TableCaption>
            <TableHeader className="sticky top-0 bg-black">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
