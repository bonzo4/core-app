import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"];

type Role = "ADMIN" | "FOUNDER";

type UseUserRolesOptions = {
  supabase: SupabaseClient<Database>;
  refetch: boolean;
  user: User | undefined;
  isUserLoading: boolean;
};

export function useUserRoles({
  supabase,
  refetch,
  user,
  isUserLoading,
}: UseUserRolesOptions) {
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      if (!isUserLoading) {
        setLoading(false);
      }
      return;
    }
    const getUserRoles = async () => {
      refetch;
      const { data: userRolesData } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", user.id);
      if (userRolesData) {
        setUserRoles(userRolesData.map((role) => role.user_role));
      }
      setLoading(false);
    };
    getUserRoles();
  }, [supabase, refetch, user, setLoading, isUserLoading]);

  return [userRoles, loading] as const;
}
