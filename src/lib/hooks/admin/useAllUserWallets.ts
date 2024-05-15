import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../../supabase/types";
import { useEffect, useState } from "react";

export type UserWallet = Database["public"]["Tables"]["user_wallets"]["Row"];

type UseAllUserWalletsOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
};

export function useAllUserWallets({
  supabase,
  refetch,
}: UseAllUserWalletsOptions) {
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getUserWallet = async () => {
      const { data: walletData, error } = await supabase
        .from("user_wallets")
        .select("*");
      if (walletData) {
        setUserWallets(walletData);
      }
      setLoading(false);
    };
    getUserWallet();
  }, [supabase, setLoading, refetch]);

  return [userWallets, loading] as const;
}
