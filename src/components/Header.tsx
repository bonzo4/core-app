import { motion } from "framer-motion";
import UserCard from "./auth/UserCard";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

type UserCardProps = {
  supabase: SupabaseClient<Database>;
  userData: any;
  walletKey: string;
};

export default function Header({
  supabase,
  userData,
  walletKey,
}: UserCardProps) {
  return (
    <motion.header className="flex flex-row items-center justify-between w-full text-white border-b-4 border-white border-opacity-10 p-4">
      <h1 className="text-2xl font-semibold">C.O.R.E.</h1>
      <UserCard supabase={supabase} userData={userData} walletKey={walletKey} />
    </motion.header>
  );
}
