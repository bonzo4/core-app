import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

export type UserWallet = Database["public"]["Tables"]["user_wallets"]["Row"];

type UseAllUserWalletsOptions = {
  supabase: SupabaseClient<Database>;
};

export function useAllUserWallets({ supabase }: UseAllUserWalletsOptions) {
  const [userWallets, setUserWallets] = useState<UserWallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [supabase, setLoading]);

  return [userWallets, loading] as const;
}
