import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import UserCard from "@/components/auth/UserCard";
import { useAuthUser } from "@/lib/hooks/useAuthUser";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
  const supabase = createSupabaseClient();

  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, walletPDA, teamData, staffUser] = useAuthUser({
    supabase,
    refetch,
    setLoading,
  });
  const wallet = useWallet();

  if (loading) {
    return <LoaderCircleIcon className="animate-spin" />;
  }

  if (
    !user ||
    !walletPDA ||
    !walletPDA.is_confirmed ||
    staffUser.filter((role) => role.user_role === "ADMIN").length === 0
  ) {
    redirect("/");
  }

  const userData = user.user_metadata;

  if (!wallet.publicKey) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard userData={userData} supabase={supabase} />
        <span>Please connect your C.O.R.E. wallet.</span>
        <WalletMultiButton />
      </motion.div>
    );
  }

  if (walletPDA.public_key !== wallet.publicKey.toString()) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard userData={userData} supabase={supabase} />
        <span>Please connect the correct wallet to access C.O.R.E.</span>
        <span>
          {walletPDA?.public_key.slice(0, 5)}
          ...
          {walletPDA?.public_key.slice(-5)}
        </span>
        <WalletMultiButton />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-start justify-start w-full grow"
    >
      <Header
        supabase={supabase}
        userData={userData}
        walletKey={walletPDA.public_key}
      />
      <div className="flex flex-row items-start justify-start w-full grow">
        <Sidebar
          teamData={teamData}
          staffUser={staffUser}
          currentPage="admin"
        />
        <div className="flex flex-col space-y-4 items-center justify-center grow h-full">
          <span>Welcome C.O.R.E Admin</span>
          <UserCard
            userData={userData}
            supabase={supabase}
            walletKey={walletPDA.public_key}
          />
        </div>
      </div>
    </motion.div>
  );
}
