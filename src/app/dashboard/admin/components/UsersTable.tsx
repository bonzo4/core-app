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
  UserWallet,
  useAllUserWallets,
} from "@/lib/hooks/admin/useAllUserWallets";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import PayButton from "./PayUserButton";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import Image from "next/image";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { SetStateAction } from "react";

type UsersTableProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  user: User;
  userWallets: UserWallet[];
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function UsersTable({
  supabase,
  wallet,
  connection,
  user,
  userWallets,
  setRefetch,
}: UsersTableProps) {
  return (
    <Table className="">
      <TableCaption>All Payable Users</TableCaption>
      <TableHeader className="sticky top-0 bg-black">
        <TableRow>
          <TableHead className="w-[200px]">User</TableHead>
          <TableHead>Wallet</TableHead>
          <TableHead className="text-right">Pay</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
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
                setRefetch={setRefetch}
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
