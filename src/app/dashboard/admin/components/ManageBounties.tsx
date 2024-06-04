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
import {
  AmbassadorBounty,
  useAmbassadorBounties,
} from "@/lib/hooks/bounty/useAmbassadorBounties";
import { useUserPayments } from "@/lib/hooks/useUserPayments";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import AdminBountyMenu from "./AdminBountyMenu";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import EditBounty from "./EditBounty";
import DeleteBounty from "./DeleteBounty";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import PayBountyButton from "./PayBountyButton";
import ApproveBounty from "./ApproveBounty";
import { Checkbox } from "@/components/ui/checkbox";

type ManageBountiesProps = {
  supabase: SupabaseClient<Database>;
  refetch: boolean;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
};

export default function ManageBounties({
  supabase,
  refetch,
  setRefetch,
  wallet,
  connection,
  userId,
}: ManageBountiesProps) {
  const [selectedBounties, setSelectedBounties] = useState<AmbassadorBounty[]>(
    []
  );
  const [page, setPage] = useState(1);

  const [status, setStatus] = useState<
    Database["public"]["Enums"]["bounty_status"] | undefined
  >();
  const [ambassadorBounties, loading] = useAmbassadorBounties({
    supabase,
    isPublic: false,
    status,
    refetch,
    isFixer: true,
  });

  if (loading) {
    <Button disabled>Manage Bounties</Button>;
  }

  const handleSelectBounty = (bounty: AmbassadorBounty) => {
    if (selectedBounties.includes(bounty)) {
      setSelectedBounties(selectedBounties.filter((b) => b.id !== bounty.id));
    } else {
      setSelectedBounties([...selectedBounties, bounty]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Manage Bounties</Button>
      </DialogTrigger>
      <DialogContent className="bg-black h-3/4 flex flex-col items-start justify-start max-w-[100rem]">
        <DialogHeader className="flex flex-col space-y-2 w-full">
          <DialogTitle>Bounties</DialogTitle>
          <AdminBountyMenu
            status={status}
            setStatus={setStatus}
            selectedBounties={selectedBounties}
            supabase={supabase}
            wallet={wallet}
            connection={connection}
            userId={userId}
            setRefetch={setRefetch}
          />
        </DialogHeader>
        <div className="w-full overflow-auto">
          <Table>
            <TableCaption>All Past Payments</TableCaption>
            <TableHeader className="sticky top-0 bg-black">
              <TableRow>
                <TableHead className="w-[50px]">Selected</TableHead>
                <TableHead className="w-[150px] ">Status</TableHead>
                <TableHead className="w-[200px] ">Guild Name</TableHead>
                <TableHead className="w-[100px]">Reward Amount</TableHead>
                <TableHead className="w-[150px]">Requested By</TableHead>
                <TableHead className="w-[150px]">Assigned To</TableHead>
                <TableHead className="w-[150px]">Date Claimed</TableHead>
                <TableHead className="w-[150px]">Completed By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {ambassadorBounties.map((bounty) => (
                <TableRow key={bounty.id}>
                  <TableCell className="">
                    <Checkbox
                      checked={selectedBounties.includes(bounty)}
                      onCheckedChange={() => handleSelectBounty(bounty)}
                    />
                  </TableCell>
                  <TableCell className="">{bounty.status}</TableCell>
                  <TableCell className="space-x-2 items-center justify-center">
                    {bounty.twitter_icon &&
                      bounty.twitter_icon.startsWith(
                        "https://pbs.twimg.com/profile_images/"
                      ) && (
                        <Image
                          src={bounty.twitter_icon}
                          width={20}
                          height={20}
                          alt="icon"
                          className="rounded-full inline-block"
                        />
                      )}
                    <span>{bounty.guild_name}</span>
                  </TableCell>
                  <TableCell className="">
                    {bounty.reward_amount &&
                      `$${bounty.reward_amount.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="space-x-2 items-center justify-center">
                    {bounty.requester?.icon_url && (
                      <Image
                        src={bounty.requester?.icon_url}
                        width={20}
                        height={20}
                        alt="icon"
                        className="rounded-full inline-block"
                      />
                    )}
                    <span className="">
                      {bounty.requester?.username || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2 items-center justify-center">
                    {bounty.claimer?.icon_url && (
                      <Image
                        src={bounty.claimer?.icon_url}
                        width={20}
                        height={20}
                        alt="icon"
                        className="rounded-full inline-block"
                      />
                    )}
                    <span className="">
                      {bounty.claimer?.username || "Unclaimed"}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2 items-center justify-center">
                    {(bounty.claim_date &&
                      new Date(bounty.claim_date).toLocaleDateString()) ||
                      "N/A"}
                  </TableCell>
                  <TableCell className="space-x-2 items-center justify-center">
                    {bounty.completer?.icon_url && (
                      <Image
                        src={bounty.completer?.icon_url}
                        width={20}
                        height={20}
                        alt="icon"
                        className="rounded-full inline-block"
                      />
                    )}
                    <span className="">
                      {bounty.completer?.username || "Incomplete"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {bounty.status === "COMPLETED" && (
                      <PayBountyButton
                        bounty={bounty}
                        supabase={supabase}
                        wallet={wallet}
                        connection={connection}
                        payerUserId={userId}
                        setRefetch={setRefetch}
                      />
                    )}
                    {bounty.status === "COMPLETED" && <Button>Deny</Button>}
                    {bounty.status === "CLAIMED" && <Button>Unassign</Button>}
                    {bounty.status === "REQUESTED" && (
                      <ApproveBounty
                        bounty={bounty}
                        supabase={supabase}
                        setRefetch={setRefetch}
                      />
                    )}
                    <EditBounty
                      bounty={bounty}
                      supabase={supabase}
                      setRefetch={setRefetch}
                    />
                    <DeleteBounty
                      bountyId={bounty.id}
                      supabase={supabase}
                      setRefetch={setRefetch}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <div className="flex flex-row w-full items-center justify-center space-x-2">
              <Button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Prev
              </Button>
              <span>{page}</span>
              <Button
                disabled={ambassadorBounties.length < 10}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
