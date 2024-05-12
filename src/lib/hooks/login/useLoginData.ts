import { useEffect, useState } from "react";
import { useUser } from "../useUser";
import { useUserRoles } from "../useUserRoles";
import { useUserWallet } from "../useUserWallet";
import { useTeamData } from "../useTeamData";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

type UseLoginDataOptions = {
  supabase: SupabaseClient<Database>;
};

export function useLoginData({ supabase }: UseLoginDataOptions) {
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, isUserLoading] = useUser({ supabase, refetch });
  console.log("user", isUserLoading);
  const [userRoles, isUserRolesLoading] = useUserRoles({
    supabase,
    refetch,
    user,
    isUserLoading,
  });
  console.log("userRoles", isUserRolesLoading);
  const [userWallet, isUserWalletLoading] = useUserWallet({
    supabase,
    refetch,
    user,
    isUserLoading,
  });
  console.log("userWallet", isUserWalletLoading);
  const [teamData, isTeamDataLoading] = useTeamData({
    supabase,
    refetch,
    user,
    isUserLoading,
  });
  console.log("teamData", isTeamDataLoading);

  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const totalLoading =
      isUserLoading ||
      isUserRolesLoading ||
      isUserWalletLoading ||
      isTeamDataLoading;
    setLoading(totalLoading);
  }, [
    isUserLoading,
    isUserRolesLoading,
    isUserWalletLoading,
    isTeamDataLoading,
    setLoading,
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
  } as const;
}
