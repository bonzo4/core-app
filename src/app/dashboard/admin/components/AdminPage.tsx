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

export default function DashboardPage() {
  const supabase = createSupabaseClient();

  const { loading, user, userRoles, userWallet, teamData, wallet, connection } =
    useDashboardData({ supabase });

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

  if (userRoles.filter((role) => role === "ADMIN").length > 0) {
    return (
      <DashboardLayout
        supabase={supabase}
        userWallet={userWallet}
        teamData={teamData}
        userRoles={userRoles}
        currentPage="admin"
      >
        <div className="flex flex-col space-y-4 items-center grow h-full">
          <div className="h-1/2 overflow-auto w-full">
            <UsersTable
              supabase={supabase}
              wallet={wallet}
              connection={connection}
              user={user}
            />
          </div>
          <div className="h-1/2 overflow-auto w-full">
            <PaymentTable supabase={supabase} user={user} />
          </div>
        </div>
      </DashboardLayout>
    );
  } else {
    redirect("/dashboard");
  }
}
