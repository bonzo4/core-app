import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useUserTeams } from "@/lib/hooks/useUserTeams";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import Image from "next/image";
import FallbackImage from "@/components/FallbackImage";

type TeamTableProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  wallet: WalletContextState;
  connection: Connection;
  refetch: boolean;
};

export default function TeamTable({
  supabase,
  user,
  wallet,
  connection,
  refetch,
}: TeamTableProps) {
  const [teams, loading] = useUserTeams({
    supabase,
    user,
    wallet,
    connection,
    isUserLoading: false,
    refetch,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table className="">
      <TableCaption>All Owned Teams</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">Confirmed</TableHead>
          <TableHead className="w-[150px] ">Date</TableHead>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[100px]">Balance</TableHead>
          <TableHead className="text-right">Manage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teams.map((team) => (
          <TableRow key={team.id}>
            <TableCell className="">
              {team.is_confirmed ? "Yes" : "No"}
            </TableCell>
            <TableCell className="">
              {new Date(team.created_at).toDateString()}
            </TableCell>
            <TableCell className="flex flex-row space-x-2 items-center">
              {team.image_url && (
                <FallbackImage
                  fallbackSrc="https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/square%20rainbow%20logo.png"
                  src={team.image_url}
                  width={24}
                  height={24}
                  alt="icon"
                  className="rounded-full"
                />
              )}
              <span>{team.name}</span>
            </TableCell>
            <TableCell className="">
              <span>${team.balance}</span>
            </TableCell>
            <TableCell className="text-right">
              <Button disabled={!team.is_confirmed}>
                <Link href={`/dashboard/team/${team.id}`}>Manage</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
