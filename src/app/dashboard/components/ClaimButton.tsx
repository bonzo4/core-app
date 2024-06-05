import { Button } from "@/components/ui/button";
import { claimInstruction } from "@/lib/solana/instructions/claim";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  Connection,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type ClaimButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  balance?: number;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function ClaimButton({
  supabase,
  wallet,
  connection,
  userId,
  balance,
  setRefetch,
}: ClaimButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    if (!balance) return;
    setLoading(true);

    if (!wallet.publicKey) {
      toast.error("No signer key found, please connect a wallet");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    let toastId = toast.loading("Waiting for transaction to be confirmed...", {
      autoClose: false,
    });

    try {
      const { data, error } = await supabase
        .from("claims")
        .insert({
          user_id: userId,
          amount: balance,
        })
        .select("id")
        .single();

      if (error) {
        throw new Error("Error creating claim");
      }

      const instruction = await claimInstruction({
        wallet,
        connection,
        userId,
        claimId: data.id,
      });

      if (!instruction) {
        throw new Error("Error creating transaction");
      }
      const transaction = new Transaction().add(instruction.claimTx);
      const latestBlockHash = await connection.getLatestBlockhash({
        commitment: "finalized",
      });
      transaction.recentBlockhash = latestBlockHash.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await supabase
        .from("claims")
        .update({
          transaction: tx,
        })
        .eq("id", data.id);

      setRefetch((prev) => !prev);
      toast.dismiss(toastId);
      toastId = toast.loading("Transaction sent, awaiting confirmation...", {
        autoClose: false,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000 * 20));
      const status = await connection.getSignatureStatus(tx);

      if (
        status.value?.confirmationStatus === "confirmed" ||
        status.value?.confirmationStatus === "finalized"
      ) {
        await supabase
          .from("claims")
          .update({ is_confirmed: true })
          .eq("id", data.id);
        toast.success("Transaction confirmed!");
      } else {
        toast.info("Transaction not yet confirmed");
      }

      toast.dismiss(toastId);

      setRefetch((prev) => !prev);
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error("Error sending transaction: " + error.message);
      setLoading(false); // Ensure loading is reset if the operation fails
    }
  };

  const claimable = balance && balance > 0 && !loading;

  return (
    <Button onClick={() => handleSign()} disabled={!claimable}>
      Claim
    </Button>
  );
}
