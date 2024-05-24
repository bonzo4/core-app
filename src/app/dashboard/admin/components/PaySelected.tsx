import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AmbassadorBounty } from "@/lib/hooks/bounty/useAmbassadorBounties";
import { initUserInstruction } from "@/lib/solana/instructions/initUser";
import { payUserInstruction } from "@/lib/solana/instructions/payUser";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type PaySelectedButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  payerUserId: string;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  selectedBounties: AmbassadorBounty[];
};

export default function PaySelectedButton({
  supabase,
  wallet,
  connection,
  payerUserId,
  setRefetch,
  selectedBounties,
}: PaySelectedButtonProps) {
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
      const validBounties = selectedBounties.filter(
        (bounty) =>
          bounty.status === "COMPLETED" &&
          bounty.claimer_id &&
          bounty.reward_amount
      ) as AmbassadorBounty[];

      const { data, error } = await supabase
        .from("payments")
        .insert(
          validBounties.map((bounty) => ({
            user_id: bounty.claimer_id || "",
            amount: bounty.reward_amount || 0,
            payer_id: payerUserId,
            memo: bounty.is_broken
              ? `Fixed: ${bounty.guild_name}`
              : bounty.guild_name,
          }))
        )
        .select("*");
      if (error) {
        throw new Error("Error creating payment");
      }

      await Promise.all(
        validBounties.map(async (bounty) => {
          const { error: bountyError } = await supabase
            .from("ambassador_bounties")
            .update({
              status: "AUDITED",
              completed_date: new Date().toISOString(),
              completer_id: bounty.claimer_id,
              claimer_id: null,
            })
            .eq("id", bounty.id);

          if (bountyError) {
            toast.error("Error updating bounty status");
            setLoading(false); // Ensure loading is reset if the operation cannot proceed
            return;
          }
        })
      );

      console.log(data);
      const instructions = await Promise.all(
        data.map(
          async (payment) =>
            await payUserInstruction({
              wallet,
              connection,
              userId: payment.user_id || "",
              payerUserId,
              amount: payment.amount || 0,
              paymentId: payment.id,
            })
        )
      );

      if (instructions.includes(undefined)) {
        throw new Error("Error creating transaction");
      }

      const transaction = new Transaction();
      instructions.forEach((instruction) =>
        transaction.add(instruction!.payUserTx)
      );
      transaction.recentBlockhash = instructions[0]!.blockhash;
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
      toast.error("Error paying user: " + error.message);
      setLoading(false); // Ensure loading is reset if the operation fails
    }
  };

  const buttonEnabled = !loading;

  return (
    <Button onClick={() => handleSign()} disabled={!buttonEnabled}>
      Pay Completed Bounties
    </Button>
  );
}
