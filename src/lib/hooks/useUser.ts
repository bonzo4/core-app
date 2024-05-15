import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";

type UseUserOptions = {
  supabase: SupabaseClient<Database>;
  refetch?: boolean;
};

export function useUser({ supabase, refetch }: UseUserOptions) {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      refetch;
      const {
        data: { user: userData },
      } = await supabase.auth.getUser();
      if (userData) {
        setUser(userData);
      }
      setLoading(false);
    };
    getUser();
  }, [supabase, refetch]);

  return [user, loading] as const;
}
