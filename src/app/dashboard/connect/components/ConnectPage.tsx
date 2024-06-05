import { createSupabaseClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useDashboardData } from "@/lib/hooks/dashboard/useDashboardData";
import DashboardLayout from "@/components/DashboardLayout";
import { useUserBalance } from "@/lib/hooks/dashboard/useUserBalance";
import { useState } from "react";
import InitUserTransactionButton from "@/app/components/InitUserTransactionButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import ConfirmButton from "@/components/ConfirmButton";

export default function ConnectPage() {
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
      currentPage="connect"
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center grow h-full"
      >
        {userWallet.authority && userWallet.is_confirmed ? (
          <span>
            You have already connected a wallet to C.O.R.E. please contact an
            admin to change it.
          </span>
        ) : userWallet.transaction && userWallet.is_confirmed === null ? (
          <ConfirmButton
            setRefetch={setRefetch}
            supabase={supabase}
            tableName="user_wallets"
            connection={connection}
            transaction={userWallet.transaction}
            createdAt={userWallet.created_at}
          />
        ) : wallet.publicKey ? (
          <InitUserTransactionButton
            setRefetch={setRefetch}
            userId={user.id}
            supabase={supabase}
            sendTransaction={wallet.sendTransaction}
            wallet={wallet}
            connection={connection}
            userProfile={userProfile}
          />
        ) : (
          <span>Please Connect a Wallet to continue</span>
        )}
        <WalletMultiButton />
      </motion.div>
    </DashboardLayout>
  );
}
