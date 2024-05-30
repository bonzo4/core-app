import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];

export type Role = Database["public"]["Enums"]["user_role_types"];

type UseUserRolesOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
  user: User | undefined;
  isUserLoading: boolean;
};

export function useUserRoles({
  supabase,
  refetch,
  user,
  isUserLoading,
}: UseUserRolesOptions) {
  const [userRoles, setUserRoles] = useState<Role | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserRoles = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: userRolesData } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (userRolesData) {
        setUserRoles(userRolesData.user_role);
      }
      setLoading(false);
    };
    getUserRoles();
  }, [supabase, refetch, user, setLoading, isUserLoading]);

  return [userRoles, loading] as const;
}
