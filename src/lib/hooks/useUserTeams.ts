import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "../supabase/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCoreContract } from "../solana/program";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { getTeamPDA } from "../solana/pdas";
import { BN } from "@coral-xyz/anchor";

export type Team = Database["public"]["Tables"]["teams"]["Row"];

type TeamWithBalance = Team & { balance: number };

type UseUserTeamsOptions = {
  supabase: SupabaseClient<Database>;
  user?: User;
  wallet: WalletContextState;
  connection: Connection;
  isUserLoading: boolean;
  refetch?: boolean;
};

export function useUserTeams({
  supabase,
  user,
  wallet,
  connection,
  isUserLoading,
  refetch,
}: UseUserTeamsOptions) {
  const [teams, setTeams] = useState<TeamWithBalance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      if (!user) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const { data: teams, error } = await supabase
        .from("teams")
        .select("*")
        .eq("owner_id", user.id)
        .eq("is_confirmed", true)
        .order("created_at", { ascending: false });
      if (error) {
        toast.error(error.message);
      }
      if (teams) {
        setTeams(
          await Promise.all(
            teams.map(async (team) => {
              if (!team.is_confirmed) {
                return { ...team, balance: 0 };
              }
              const program = getCoreContract(wallet, connection);
              if (!program) return { ...team, balance: 0 };
              const teamPDA = getTeamPDA(team.id);
              const teamData = await program.account.team.fetch(teamPDA);
              return {
                ...team,
                balance: teamData.balance.div(new BN(10 ** 6)).toNumber(),
              };
            })
          )
        );
      }
      setLoading(false);
    };
    getTeams();
  }, [supabase, setLoading, user, wallet, connection, isUserLoading, refetch]);

  return [teams, loading] as const;
}
