import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllUserWallets } from "@/lib/hooks/useAllUserWallets";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import Image from "next/image";
import { useUserTeams } from "@/lib/hooks/useUserTeams";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type UsersTableProps = {
  supabase: SupabaseClient<Database>;
  user: User;
};

export default function UsersTable({ supabase, user }: UsersTableProps) {
  const [teams, loading] = useUserTeams({ supabase, user });

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
            <TableCell className="">
              <span>{team.name}</span>
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/dashboard/team/${team.id}`}>
                <Button>Manage</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
