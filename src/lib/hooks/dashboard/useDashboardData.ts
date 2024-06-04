import { useEffect, useState } from "react";
import { useUser } from "../useUser";
import { useUserRoles } from "../useUserRoles";
import { useUserWallet } from "../useUserWallet";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { useUserBalance } from "./useUserBalance";
import { useUserMembers } from "../useUserMembers";
import { useUserTeams } from "../useUserTeams";

type UseDashboardDataOptions = {
  supabase: SupabaseClient<Database>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  refetch?: boolean;
};

export function useDashboardData({
  supabase,
  loading,
  setLoading,
}: UseDashboardDataOptions) {
  const [user, isUserLoading] = useUser({ supabase });
  const [userRole, isUserRolesLoading] = useUserRoles({
    supabase,
    user,
    isUserLoading,
  });
  const [userWallet, isUserWalletLoading] = useUserWallet({
    supabase,
    user,
    isUserLoading,
  });
  const [teamData, isTeamDataLoading] = useUserMembers({
    supabase,
    user,
    isUserLoading,
  });

  const wallet = useWallet();
  const { connection } = useConnection();

  const [ownedTeams, isOwnedTeamsLoading] = useUserTeams({
    supabase,
    user,
    wallet,
    connection,
    isUserLoading,
  });

  useEffect(() => {
    const totalLoading =
      isUserLoading ||
      isUserRolesLoading ||
      isUserWalletLoading ||
      isTeamDataLoading ||
      isOwnedTeamsLoading;
    setLoading(totalLoading);
  }, [
    isUserLoading,
    isUserRolesLoading,
    isUserWalletLoading,
    isTeamDataLoading,
    setLoading,
    wallet.publicKey,
    isOwnedTeamsLoading,
  ]);

  return {
    loading,
    user,
    userRole,
    userWallet,
    teamData,
    wallet,
    connection,
    ownedTeams,
  } as const;
}
