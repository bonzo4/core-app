import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamMemberWithProfile } from "@/lib/hooks/teams/useTeamMembers";
import { payMemberInstruction } from "@/lib/solana/instructions/payMember";
import { payTeamInstruction } from "@/lib/solana/instructions/payTeam";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type PayButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  selectMembers: TeamMemberWithProfile[];
  balance: number;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function PaySelectMembersButton({
  supabase,
  wallet,
  connection,
  selectMembers,
  balance,
  setRefetch,
}: PayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    setLoading(true);
    if (!wallet.publicKey) {
      toast.error("No signer key found, please connect a wallet");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    const toastId = toast.loading(
      "Waiting for transaction to be confirmed...",
      {
        autoClose: false,
      }
    );

    try {
      const instructions = await Promise.all(
        selectMembers.map(async (member) => {
          const { data, error } = await supabase
            .from("payments")
            .insert({
              user_id: member.user_id,
              team_id: member.team_id,
              amount: member.payment_amount,
            })
            .select("id")
            .single();
          if (error) {
            toast.error("Error saving wallet Data");
            setLoading(false); // Ensure loading is reset if the operation cannot proceed
            return;
          }

          const instruction = await payMemberInstruction({
            wallet,
            connection,
            teamId: member.team_id,
            userId: member.user_id,
            amount: member.payment_amount,
            paymentId: data.id,
          });

          if (!instruction) {
            toast.error("Error creating transaction");
            setLoading(false); // Ensure loading is reset if the operation cannot proceed
            return;
          }

          return instruction;
        })
      );

      const validInstructions = instructions.filter(
        (i): i is { payMemberTx: TransactionInstruction; blockhash: string } =>
          !!i
      );

      const transaction = new Transaction();

      validInstructions.forEach((i) => transaction.add(i.payMemberTx));

      transaction.recentBlockhash = validInstructions[0].blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      toast.success("User Paid!");
      setRefetch((prev) => !prev);
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error("Error sending transaction: " + error.message);
      setLoading(false); // Ensure loading is reset if the operation fails
    }
  };

  const buttonEnabled =
    !loading &&
    selectMembers.length > 0 &&
    selectMembers.reduce((acc, member) => acc + member.payment_amount, 0) <=
      balance;

  return (
    <div className="flex flex-row space-x-2 items-center justify-end">
      <Button onClick={() => handleSign()} disabled={!buttonEnabled}>
        Pay Selected
      </Button>
    </div>
  );
}
