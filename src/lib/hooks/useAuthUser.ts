import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { SetStateAction, useLayoutEffect, useState } from "react";

export type WalletPDA = Database["public"]["Tables"]["wallets"]["Row"];
export type TeamMember = Database["public"]["Tables"]["_team_members"]["Row"];
export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];

type UseAuthUserOptions = {
  supabase: SupabaseClient<Database>;
  setLoading: (args_0: SetStateAction<boolean>) => void;
  refetch: boolean;
};

export function useAuthUser({
  supabase,
  refetch,
  setLoading,
}: UseAuthUserOptions) {
  const [user, setUser] = useState<User | undefined>();
  const [walletPDA, setWalletPDA] = useState<WalletPDA | undefined>();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);

  useLayoutEffect(() => {
    const getUser = async () => {
      setLoading(true);
      refetch;
      const {
        data: { user: userData },
      } = await supabase.auth.getUser();
      if (userData) {
        setUser(userData);
        const { data: walletData, error } = await supabase
          .from("wallets")
          .select("*")
          .eq("user_id", userData.id)
          .single();
        if (error) {
          setWalletPDA(undefined);
        } else {
          setWalletPDA(walletData);
          const { data: userRoles, error } = await supabase
            .from("user_roles")
            .select("*")
            .eq("user_id", userData.id);
          if (error) {
            setUserRoles([]);
          } else {
            setUserRoles(userRoles);
            const { data: teamData, error } = await supabase
              .from("_team_members")
              .select("*")
              .eq("user_id", userData.id);
            if (error) {
              setTeamMembers([]);
            } else {
              setTeamMembers(teamData);
            }
          }
        }
      }
      setLoading(false);
    };
    getUser();
  }, [supabase, refetch, setLoading]);

  return [user, walletPDA, teamMembers, userRoles] as const;
}
