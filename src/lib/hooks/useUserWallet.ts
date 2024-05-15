import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

export type UserWallet = Database["public"]["Tables"]["user_wallets"]["Row"];

type UseUserWalletOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
  user: User | undefined;
  isUserLoading: boolean;
};

export function useUserWallet({
  supabase,
  refetch,
  user,
  isUserLoading,
}: UseUserWalletOptions) {
  const [walletPDA, setWalletPDA] = useState<UserWallet | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserWallet = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: walletData, error } = await supabase
        .from("user_wallets")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (walletData) {
        setWalletPDA(walletData);
      }
      setLoading(false);
    };
    getUserWallet();
  }, [supabase, refetch, user, setLoading, isUserLoading]);

  return [walletPDA, loading] as const;
}
