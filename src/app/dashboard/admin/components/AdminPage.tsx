import UserCard from "@/components/auth/UserCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useDashboardData } from "@/lib/hooks/dashboard/useDashboardData";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import UsersTable from "./UsersTable";
import PaymentTable from "./PaymentTable";
import { useState } from "react";
import { useAllUserWallets } from "@/lib/hooks/admin/useAllUserWallets";
import { useAdminUserPayments } from "@/lib/hooks/admin/useAdminUserPayment";
import AdminMenu from "./AdminMenu";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
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

  const [userWallets, isUserWalletsLoading] = useAllUserWallets({
    refetch,
    supabase,
  });
  const [payments, isUserPaymentsLoading] = useAdminUserPayments({
    supabase,
    user,
    isUserLoading: loading,
    refetch,
  });

  if (loading || isUserWalletsLoading || isUserPaymentsLoading) {
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
    !userWallet.authority ||
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

  const userProfile = user.user_metadata;

  if (!wallet.publicKey) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard
          username={userWallet.username}
          iconUrl={userWallet.icon_url || userProfile.avatar_url}
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
          iconUrl={userWallet.icon_url || userProfile.avatar_url}
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

  if (userRole === "ADMIN") {
    return (
      <DashboardLayout
        user={user}
        ownedTeams={ownedTeams}
        supabase={supabase}
        userWallet={userWallet}
        userRole={userRole}
        currentPage="admin"
      >
        <div className="flex flex-col items-center grow h-full">
          <AdminMenu
            supabase={supabase}
            wallet={wallet}
            connection={connection}
            setRefetch={setRefetch}
            loading={loading}
            refetch={refetch}
            userId={user.id}
          />
          <div className="w-full h-1/2 max-h-[350px] overflow-auto">
            <UsersTable
              refetch={refetch}
              setRefetch={setRefetch}
              supabase={supabase}
              wallet={wallet}
              connection={connection}
              user={user}
              userWallets={userWallets}
            />
          </div>
          <div className="w-full h-1/2 max-h-[350px] overflow-auto">
            <PaymentTable payments={payments} />
          </div>
        </div>
      </DashboardLayout>
    );
  } else {
    redirect("/dashboard");
  }
}
