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
import { useAmbassadorBounties } from "@/lib/hooks/bounty/useAmbassadorBounties";
import { useUserPayments } from "@/lib/hooks/useUserPayments";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import AdminBountyMenu from "./AdminBountyMenu";
import Image from "next/image";
import { BsDiscord, BsTwitter } from "react-icons/bs";
import { useState } from "react";

type ManageBountiesProps = {
  supabase: SupabaseClient<Database>;
};

export default function ManageBounties({ supabase }: ManageBountiesProps) {
  const [status, setStatus] = useState<
    Database["public"]["Enums"]["bounty_status"] | undefined
  >();
  const [ambassadorBounties, loading] = useAmbassadorBounties({
    supabase,
    tags: [],
    isPublic: false,
    status,
  });

  if (loading) {
    <Button disabled>Manage Bounties</Button>;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Manage Bounties</Button>
      </DialogTrigger>
      <DialogContent className="bg-black h-3/4 flex flex-col items-start justify-start max-w-5xl">
        <DialogHeader className="flex flex-col space-y-2">
          <DialogTitle>Bounties</DialogTitle>
          <AdminBountyMenu status={status} setStatus={setStatus} />
        </DialogHeader>
        <div className="w-full overflow-auto">
          <Table>
            <TableCaption>All Past Payments</TableCaption>
            <TableHeader className="sticky top-0 bg-black">
              <TableRow>
                <TableHead className="w-[150px] ">Status</TableHead>
                <TableHead className="w-[200px] ">Guild Name</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
                <TableHead className="w-[200px]">Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {ambassadorBounties.map((bounty) => (
                <TableRow key={bounty.id}>
                  <TableCell className="">{bounty.status}</TableCell>
                  <TableCell className="flex flex-row space-x-2 items-center">
                    {bounty.twitter_icon && (
                      <Image
                        src={bounty.twitter_icon}
                        width={20}
                        height={20}
                        alt="icon"
                        className="rounded-full"
                      />
                    )}
                    <span>{bounty.guild_name}</span>
                  </TableCell>
                  <TableCell className="">
                    ${bounty.reward_amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="flex flex-row space-x-2 items-center">
                    {bounty.claimer?.icon_url && (
                      <Image
                        src={bounty.claimer?.icon_url}
                        width={20}
                        height={20}
                        alt="icon"
                        className="rounded-full"
                      />
                    )}
                    <span>{bounty.claimer?.username || "Unclaimed"}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button>Pay</Button>
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
