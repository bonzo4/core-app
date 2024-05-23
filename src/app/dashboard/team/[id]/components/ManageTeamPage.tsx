import UserCard from "@/components/auth/UserCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { useDashboardData } from "@/lib/hooks/dashboard/useDashboardData";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import UsersTable from "./MembersTable";
import PaymentTable from "./TeamPaymentTable";
import { useTeamData } from "@/lib/hooks/teams/useTeamData";
import {
  TeamMemberWithProfile,
  useTeamMembers,
} from "@/lib/hooks/teams/useTeamMembers";
import MembersTable from "./MembersTable";
import ManageTeamButtons from "./ManageTeamButtons";
import { useTeamBalance } from "@/lib/hooks/dashboard/useTeamBalance";
import { useState } from "react";
import TeamPaymentTable from "./TeamPaymentTable";
import { useTeamMemberPayments } from "@/lib/hooks/teams/useTeamPayments";

export default function ManageTeamPage({ id }: { id: number }) {
  const [selectMembers, setSelectMembers] = useState<TeamMemberWithProfile[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
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

  const [team, isTeamLoading] = useTeamData({
    supabase,
    teamId: id,
  });

  const [members, isTeamMembersLoading] = useTeamMembers({
    supabase,
    teamId: id,
    isTeamLoading,
    refetch,
  });

  const [payments, isPaymentsLoading] = useTeamMemberPayments({
    supabase,
    teamId: id,
    refetch,
  });

  const [balance, isBalanceLoading] = useTeamBalance({
    wallet,
    connection,
    teamId: id,
    isTeamLoading,
    refetch,
  });

  if (loading || isTeamLoading) {
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

  if (team?.owner_id === user.id || userRoles.includes("ADMIN")) {
    return (
      <DashboardLayout
        ownedTeams={ownedTeams}
        supabase={supabase}
        userWallet={userWallet}
        userRoles={userRoles}
        currentPage={id.toString()}
      >
        <div className="flex flex-col items-center grow h-full">
          <ManageTeamButtons
            loading={loading}
            refetch={refetch}
            setRefetch={setRefetch}
            balance={balance || 0}
            supabase={supabase}
            members={members}
            wallet={wallet}
            connection={connection}
            teamId={id}
          />
          <div className="overflow-auto w-full h-1/2 max-h-[480px]">
            <MembersTable
              setRefetch={setRefetch}
              supabase={supabase}
              wallet={wallet}
              connection={connection}
              teamId={id}
              members={members}
              setSelectMembers={setSelectMembers}
              selectMembers={selectMembers}
            />
          </div>
          <div className="overflow-auto w-full h-1/2 max-h-[480px]">
            <TeamPaymentTable payments={payments} />
          </div>
        </div>
      </DashboardLayout>
    );
  } else {
    redirect("/dashboard");
  }
}
