import { getTeamPDA } from "@/lib/solana/pdas";
import { getCoreContract } from "@/lib/solana/program";
import { BN } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

type UseTeamBalanceOptions = {
  wallet: WalletContextState;
  connection: Connection;
  teamId?: number;
  isTeamLoading: boolean;
  refetch?: boolean;
};

export function useTeamBalance({
  wallet,
  connection,
  teamId,
  isTeamLoading,
  refetch,
}: UseTeamBalanceOptions) {
  const [balance, setBalance] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBalance = async () => {
      if (!teamId) {
        if (!isTeamLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const program = getCoreContract(wallet, connection);
      if (!program) return;
      const team = await program.account.team.fetch(getTeamPDA(teamId));
      if (!team) return;
      setBalance(team.balance.div(new BN(10 ** 6)).toNumber());
    };
    getBalance().then(() => setLoading(false));
  }, [wallet, connection, teamId, isTeamLoading, refetch]);

  return [balance, loading] as const;
}
