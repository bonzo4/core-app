import { useEffect, useState } from "react";
import { useUser } from "../useUser";
import { useUserRoles } from "../useUserRoles";
import { useUserWallet } from "../useUserWallet";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";

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

  const wallet = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const totalLoading =
      isUserLoading ||
      isUserRolesLoading ||
      isUserWalletLoading ||
      wallet.publicKey === null;
    setLoading(totalLoading);
  }, [
    isUserLoading,
    isUserRolesLoading,
    isUserWalletLoading,
    setLoading,
    wallet.publicKey,
  ]);

  return {
    setRefetch,
    loading,
    user,
    userRoles,
    userWallet,
    wallet,
    connection,
  } as const;
}
