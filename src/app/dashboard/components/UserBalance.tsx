import { SupabaseClient, User } from "@supabase/supabase-js";
import ClaimButton from "./ClaimButton";
import ClaimHistory from "./ClaimHistory";
import PaymentHistory from "./PaymentHistory";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { SetStateAction, useState } from "react";
import { Claim } from "@/lib/hooks/useUserClaims";
import { PaymentsWithUser } from "@/lib/hooks/admin/useAdminUserPayment";
import { PaymentsWithPayer } from "@/lib/hooks/useUserPayments";

type UserBalanceProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  balance?: number;
  wallet: WalletContextState;
  connection: Connection;
  setBalance: (balance: number) => void;
  loading: boolean;
};

export default function UserBalance({
  supabase,
  user,
  balance,
  wallet,
  connection,
  loading,
  setBalance,
}: UserBalanceProps) {
  const [refetch, setRefetch] = useState<boolean>(false);

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      <span className="text-lg">Claimable Balance</span>
      <div className="flex flex-row space-x-2 justify-center items-center">
        <p className="text-lg">${balance?.toFixed(2)}</p>
        <ClaimButton
          balance={balance}
          supabase={supabase}
          connection={connection}
          wallet={wallet}
          userId={user.id}
          setRefetch={setRefetch}
        />
      </div>
      <div className="flex flex-row space-x-2 justify-center items-center">
        <PaymentHistory
          supabase={supabase}
          user={user}
          isUserLoading={loading}
          connection={connection}
          setRefetch={setRefetch}
        />
        <ClaimHistory
          supabase={supabase}
          user={user}
          isUserLoading={loading}
          refetch={refetch}
          connection={connection}
          setRefetch={setRefetch}
        />
      </div>
    </div>
  );
}
