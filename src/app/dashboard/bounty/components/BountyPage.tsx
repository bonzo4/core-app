import UserCard from "@/components/auth/UserCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useDashboardData } from "@/lib/hooks/dashboard/useDashboardData";
import DashboardLayout from "@/components/DashboardLayout";
import { useUserBalance } from "@/lib/hooks/dashboard/useUserBalance";
import { useState } from "react";
import { useUserClaims } from "@/lib/hooks/useUserClaims";
import { useUserPayments } from "@/lib/hooks/useUserPayments";
import Bounties from "./Bounties";

export default function BountyPage() {
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseClient();

  const {
    user,
    userRoles,
    userWallet,
    teamData,
    wallet,
    connection,
    ownedTeams,
  } = useDashboardData({ supabase, loading, setLoading });

  if (loading) {
    return (
      <motion.div
        className="flex flex-col space-y-4 items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
      >
        <LoaderCircleIcon size={48} className="animate-spin" />
        <span>Loading...</span>
      </motion.div>
    );
  }

  if (
    !user ||
    !userWallet ||
    !userWallet.is_confirmed ||
    (teamData.length === 0 && userRoles.length === 0)
  ) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <span>
          Please go back to the login page to complete the Onboarding process.
        </span>
      </motion.div>
    ); // Redirect to login page if user is not logged in
  }

  if (!wallet.publicKey) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard
          username={userWallet.username}
          iconUrl={userWallet.icon_url}
          walletKey={userWallet.authority}
          supabase={supabase}
        />
        <span>Please connect your C.O.R.E. Wallet</span>
        <WalletMultiButton />
      </motion.div>
    );
  }

  if (userWallet.authority !== wallet.publicKey.toString()) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard
          username={userWallet.username}
          iconUrl={userWallet.icon_url}
          walletKey={userWallet.authority}
          supabase={supabase}
        />
        <span>Please connect the correct wallet to access C.O.R.E.</span>
        <span>
          {userWallet.authority.slice(0, 5)}
          ...
          {userWallet.authority.slice(-5)}
        </span>
        <WalletMultiButton />
      </motion.div>
    );
  }

  return (
    <DashboardLayout
      ownedTeams={ownedTeams}
      supabase={supabase}
      userWallet={userWallet}
      teamData={teamData}
      userRoles={userRoles}
      currentPage="bounty"
    >
      <div className="flex flex-col space-y-4 items-center justify-center grow h-full">
        <Bounties supabase={supabase} userId={user.id} />
      </div>
    </DashboardLayout>
  );
}
