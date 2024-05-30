import UserCard from "@/components/auth/UserCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useDashboardData } from "@/lib/hooks/dashboard/useDashboardData";
import UserBalance from "./UserBalance";
import DashboardLayout from "@/components/DashboardLayout";
import { useUserBalance } from "@/lib/hooks/dashboard/useUserBalance";
import { useState } from "react";
import { useUserClaims } from "@/lib/hooks/useUserClaims";
import { useUserPayments } from "@/lib/hooks/useUserPayments";
import Invoices from "./Invoices";
import CreateInvoice from "./CreateInvoice";
import UserStatsCard from "./UserStatsCard";

export default function DashboardPage() {
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseClient();

  const {
    user,
    userRole,
    userWallet,
    teamData,
    wallet,
    connection,
    ownedTeams,
  } = useDashboardData({ supabase, loading, setLoading });

  const [balance, setBalance, isBalanceLoading] = useUserBalance({
    userId: user?.id,
    wallet,
    connection,
    isUserLoading: loading,
  });

  if (loading || isBalanceLoading) {
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
    (teamData.length === 0 && !userRole)
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
      userRole={userRole}
      currentPage="dashboard"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="flex flex-col space-y-4 items-center justify-center grow h-full pb-[100px]"
      >
        <UserStatsCard
          userWallet={userWallet}
          userRole={userRole}
          teamsOwned={ownedTeams.length}
          supabase={supabase}
          userId={user.id}
          refetch={refetch}
        />
        <UserBalance
          loading={loading}
          setBalance={setBalance}
          balance={balance}
          supabase={supabase}
          user={user}
          wallet={wallet}
          connection={connection}
        />
        {/* <div className="flex flex-row space-x-2 items-center justify-center">
          <Invoices
            supabase={supabase}
            user={user}
            isUserLoading={loading}
            refetch={refetch}
          />
          <CreateInvoice
            setRefetch={setRefetch}
            supabase={supabase}
            user={user}
            wallet={wallet}
            connection={connection}
          />
        </div> */}
      </motion.div>
    </DashboardLayout>
  );
}
