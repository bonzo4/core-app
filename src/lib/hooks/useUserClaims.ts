import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export type Claim = Database["public"]["Tables"]["claims"]["Row"];

type UseUserClaimsOptions = {
  supabase: SupabaseClient<Database>;
  user?: User;
  refetch?: boolean;
  isUserLoading: boolean;
};

export function useUserClaims({
  supabase,
  user,
  refetch,
  isUserLoading,
}: UseUserClaimsOptions) {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClaims = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: claims, error } = await supabase
        .from("claims")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        toast.error(error.message);
      }
      if (claims) {
        setClaims(claims);
      }
      setLoading(false);
    };
    getClaims();
  }, [supabase, setLoading, user, refetch, isUserLoading]);

  return [claims, loading] as const;
}
