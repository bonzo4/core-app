import { useEffect, useState } from "react";
import { useUser } from "../useUser";
import { useUserRoles } from "../useUserRoles";
import { useUserWallet } from "../useUserWallet";
import { useTeamData } from "../useTeamData";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { useUserBalance } from "./useUserBalance";

type UseDashboardDataOptions = {
  supabase: SupabaseClient<Database>;
};

export function useDashboardData({ supabase }: UseDashboardDataOptions) {
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, isUserLoading] = useUser({ supabase, refetch });
  const [userRoles, isUserRolesLoading] = useUserRoles({
    supabase,
    refetch,
    user,
    isUserLoading,
  });
  const [userWallet, isUserWalletLoading] = useUserWallet({
    supabase,
    refetch,
    user,
    isUserLoading,
  });
  const [teamData, isTeamDataLoading] = useTeamData({
    supabase,
    refetch,
    user,
    isUserLoading,
  });

  const wallet = useWallet();
  const { connection } = useConnection();

  const [balance, isLoadingBalance] = useUserBalance({
    wallet,
    connection,
    userId: user?.id,
    isUserLoading,
  });

  useEffect(() => {
    const totalLoading =
      isUserLoading ||
      isUserRolesLoading ||
      isUserWalletLoading ||
      isTeamDataLoading ||
      isLoadingBalance ||
      wallet.publicKey === null;
    setLoading(totalLoading);
  }, [
    isUserLoading,
    isUserRolesLoading,
    isUserWalletLoading,
    isTeamDataLoading,
    setLoading,
    isLoadingBalance,
    wallet.publicKey,
  ]);

  return {
    setRefetch,
    loading,
    user,
    userRoles,
    userWallet,
    teamData,
    wallet,
    connection,
    balance,
  } as const;
}
