import { getUserPDA } from "@/lib/solana/pdas";
import { getCoreContract } from "@/lib/solana/program";
import { BN } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";

type UseUserBalanceOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId?: string;
  isUserLoading: boolean;
  refetch?: boolean;
};

export function useUserBalance({
  wallet,
  connection,
  userId,
  isUserLoading,
  refetch,
}: UseUserBalanceOptions) {
  const [balance, setBalance] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBalance = async () => {
      if (!userId) {
        if (!isUserLoading) {
          setLoading(false);
        }
        return;
      }
      refetch;
      const program = getCoreContract(wallet, connection);
      if (!program) return;
      const user = await program.account.user.fetch(getUserPDA(userId));
      if (!user) return;
      setBalance(user.balance.toNumber() / 10 ** 6);
    };
    getBalance().then(() => setLoading(false));
  }, [wallet, connection, userId, isUserLoading, refetch]);

  return [balance, setBalance, loading] as const;
}
