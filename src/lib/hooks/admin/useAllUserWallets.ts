import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../../supabase/types";
import { useEffect, useState } from "react";
import { Role } from "../useUserRoles";

export type UserWallet = Database["public"]["Tables"]["user_wallets"]["Row"];

export type UserWalletAndRole = {
  role: Role | undefined;
} & UserWallet;

type UseAllUserWalletsOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
};

export function useAllUserWallets({
  supabase,
  refetch,
}: UseAllUserWalletsOptions) {
  const [userWallets, setUserWallets] = useState<UserWalletAndRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refetch;
    const getUserWallet = async () => {
      const { data: walletData, error } = await supabase
        .from("user_wallets")
        .select("*");
      if (walletData) {
        setUserWallets(
          await Promise.all(
            walletData.map(async (wallet) => {
              const { data: userData, error } = await supabase
                .from("user_roles")
                .select("*")
                .eq("user_id", wallet.user_id)
                .single();
              if (userData) {
                return { ...wallet, role: userData.user_role };
              }
              return { ...wallet, role: undefined };
            })
          )
        );
      }
      setLoading(false);
    };
    getUserWallet();
  }, [supabase, setLoading, refetch]);

  return [userWallets, loading] as const;
}
