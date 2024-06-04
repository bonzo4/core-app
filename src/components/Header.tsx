import { motion } from "framer-motion";
import UserCard from "./auth/UserCard";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { UserWallet } from "@/lib/hooks/useUserWallet";

type UserCardProps = {
  supabase: SupabaseClient<Database>;
  username: string;
  iconUrl?: string;
  walletKey?: string;
  onboardDate: string;
  isDashboard?: boolean;
};

export default function Header({
  supabase,
  isDashboard,
  username,
  iconUrl,
  walletKey,
  onboardDate,
}: UserCardProps) {
  return (
    <motion.header className="flex flex-row items-center justify-between w-full text-white border-b-4 border-white border-opacity-10 p-4">
      <h1 className="text-2xl font-semibold ">C.O.R.E.</h1>
      {!isDashboard && (
        <UserCard
          onboardDate={onboardDate}
          supabase={supabase}
          username={username}
          iconUrl={iconUrl}
          walletKey={walletKey}
        />
      )}
    </motion.header>
  );
}
