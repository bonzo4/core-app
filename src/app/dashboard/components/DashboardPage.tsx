import { createSupabaseClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useDashboardData } from "@/lib/hooks/dashboard/useDashboardData";
import UserBalance from "./UserBalance";
import DashboardLayout from "@/components/DashboardLayout";
import { useUserBalance } from "@/lib/hooks/dashboard/useUserBalance";
import { useState } from "react";
import UserStatsCard from "./UserStatsCard";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

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

  if (!user || !userWallet) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <span>
          Please go back to the login page to complete the Onboarding process.
        </span>
        <Link href="/">
          <IoArrowBack />
        </Link>
      </motion.div>
    ); // Redirect to login page if user is not logged in
  }

  const userProfile = user.user_metadata;

  return (
    <DashboardLayout
      user={user}
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
        {userWallet ? (
          <UserStatsCard
            username={userWallet.username}
            iconUrl={userWallet.icon_url || userProfile.avatar_url}
            onboardDate={user.created_at}
            userRole={userRole}
            teamsOwned={ownedTeams.length}
            supabase={supabase}
            userId={user.id}
            refetch={refetch}
          />
        ) : (
          <UserStatsCard
            username={userProfile.full_name}
            iconUrl={userProfile.avatar_url}
            onboardDate={user.created_at}
            userRole={userRole}
            teamsOwned={ownedTeams.length}
            supabase={supabase}
            userId={user.id}
            refetch={refetch}
          />
        )}
        {userWallet.authority &&
          wallet.publicKey &&
          wallet.publicKey.toBase58() === userWallet.authority && (
            <UserBalance
              loading={loading}
              setBalance={setBalance}
              balance={balance}
              supabase={supabase}
              user={user}
              wallet={wallet}
              connection={connection}
            />
          )}
        {userWallet.authority &&
          userWallet.authority !== wallet.publicKey?.toBase58() && (
            <span>This is not the right wallet to claim your balance.</span>
          )}
        {(!wallet.publicKey ||
          userWallet.authority !== wallet.publicKey?.toBase58()) && (
          <WalletMultiButton />
        )}

        <div className="flex flex-col space-y-2 items-center justify-center lg:hidden">
          {!userWallet.is_confirmed && (
            <a
              href="/dashboard/connect"
              className="text-white underline hover:no-underline"
            >
              Connect Wallet
            </a>
          )}
          <a
            href="/dashboard/bounty"
            className="text-white underline hover:no-underline"
          >
            Bounties
          </a>
        </div>

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
