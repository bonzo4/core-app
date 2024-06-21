import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AmbassadorBounty } from "@/lib/hooks/bounty/useAmbassadorBounties";
import { computeBudgetInstruction } from "@/lib/solana/instructions/computeBudget";
import { initUserInstruction } from "@/lib/solana/instructions/initUser";
import { payUserInstruction } from "@/lib/solana/instructions/payUser";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type PayBountyButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  payerUserId: string;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  bounty: AmbassadorBounty;
};

export default function PayBountyButton({
  supabase,
  wallet,
  connection,
  payerUserId,
  setRefetch,
  bounty,
}: PayBountyButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    setLoading(true);

    if (!wallet.publicKey) {
      toast.error("No signer key found, please connect a wallet");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    if (!bounty.claimer_id) {
      toast.error("No claimer found for bounty");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    if (!bounty.reward_amount) {
      toast.error("No reward amount found for bounty");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    let toastId = toast.loading("Waiting for transaction to be confirmed...", {
      autoClose: false,
    });

    try {
      const { data, error } = await supabase
        .from("payments")
        .insert({
          user_id: bounty.claimer_id,
          amount: bounty.reward_amount,
          payer_id: payerUserId,
          memo: bounty.is_broken
            ? `Fixed: ${bounty.guild_name}`
            : bounty.guild_name,
        })
        .select("id")
        .single();
      if (error) {
        throw new Error("Error creating payment");
      }

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
        throw new Error("Error updating bounty");
      }

      const instruction = await payUserInstruction({
        wallet,
        connection,
        userId: bounty.claimer_id,
        payerUserId,
        amount: bounty.reward_amount,
        paymentId: data.id,
      });

      if (!instruction) {
        throw new Error("Error creating transaction");
      }

      const { addPriorityFee } = await computeBudgetInstruction({
        connection,
      });

      const transaction = new Transaction()
        .add(addPriorityFee)
        .add(instruction.payUserTx);
      const latestBlockHash = await connection.getLatestBlockhash({
        commitment: "finalized",
      });
      transaction.recentBlockhash = latestBlockHash.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await supabase
        .from("payments")
        .update({ transaction: tx })
        .eq("id", data.id);

      setRefetch((prev) => !prev);
      toast.dismiss(toastId);
      toastId = toast.loading("Transaction sent, awaiting confirmation...", {
        autoClose: false,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000 * 20));

      const status = await connection.getSignatureStatus(tx);
      if (!status.value) {
        throw new Error("Transaction failed to send");
      }

      if (
        status.value?.confirmationStatus === "confirmed" ||
        status.value?.confirmationStatus === "finalized"
      ) {
        await supabase
          .from("payments")
          .update({ is_confirmed: true })
          .eq("id", data.id);
        toast.success("User Paid!");
      } else {
        toast.info("Transaction not yet confirmed");
      }

      toast.dismiss(toastId);
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
      Pay
    </Button>
  );
}
