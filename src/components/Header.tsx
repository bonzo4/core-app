import { motion } from "framer-motion";
import UserCard from "./auth/UserCard";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { UserWallet } from "@/lib/hooks/useUserWallet";

type UserCardProps = {
  supabase: SupabaseClient<Database>;
  userWallet: UserWallet;
};

export default function Header({ supabase, userWallet }: UserCardProps) {
  return (
    <motion.header className="flex flex-row items-center justify-between w-full text-white border-b-4 border-white border-opacity-10 p-4">
      <h1 className="text-2xl font-semibold">C.O.R.E.</h1>
      <UserCard
        supabase={supabase}
        username={userWallet.username}
        iconUrl={userWallet.icon_url}
        walletKey={userWallet.authority}
      />
    </motion.header>
  );
}
