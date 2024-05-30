import { useEffect, useState } from "react";
import { useUser } from "../useUser";
import { useUserRoles } from "../useUserRoles";
import { useUserWallet } from "../useUserWallet";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { useUserMembers } from "../useUserMembers";

type UseLoginDataOptions = {
  supabase: SupabaseClient<Database>;
};

export function useLoginData({ supabase }: UseLoginDataOptions) {
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, isUserLoading] = useUser({ supabase, refetch });
  const [userRole, isUserRolesLoading] = useUserRoles({
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
  const [teamData, isTeamDataLoading] = useUserMembers({
    supabase,
    refetch,
    user,
    isUserLoading,
  });

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
    userRole,
    userWallet,
    teamData,
    wallet,
    connection,
  } as const;
}
