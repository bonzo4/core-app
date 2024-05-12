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
import PayButton from "../../components/PayButton";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import Image from "next/image";

type UsersTableProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  user: User;
};

export default function UsersTable({
  supabase,
  wallet,
  connection,
  user,
}: UsersTableProps) {
  const [userWallets, loading] = useAllUserWallets({ supabase });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table className="">
      <TableCaption>All Payable Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">User</TableHead>
          <TableHead>Wallet</TableHead>
          <TableHead className="text-right">Pay</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userWallets.map((userWallet) => (
          <TableRow key={userWallet.user_id}>
            <TableCell className="flex flex-row space-x-2 items-center justify-start">
              <Image
                src={userWallet.icon_url}
                alt={userWallet.username}
                className="w-6 h-6 rounded-full"
                width={24}
                height={24}
              />
              <span>{userWallet.username}</span>
            </TableCell>
            <TableCell>{userWallet.authority}</TableCell>
            <TableCell className="text-right">
              <PayButton
                supabase={supabase}
                wallet={wallet}
                userId={userWallet.user_id}
                payerUserId={user.id}
                connection={connection}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
