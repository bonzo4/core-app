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
  setBalance: (balance: number) => void;
};

export default function ClaimButton({
  supabase,
  wallet,
  connection,
  userId,
  balance,
  setRefetch,
  setBalance,
}: ClaimButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    if (!balance) return;
    setLoading(true);
    const toastId = toast.loading(
      "Waiting for transaction to be confirmed...",
      {
        autoClose: false,
      }
    );
    if (!wallet.publicKey) {
      toast.error("No signer key found, please connect a wallet");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

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
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await connection.confirmTransaction(tx, "finalized");
      setBalance(0);
      toast.dismiss(toastId);
      toast.success("Transaction confirmed!");
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
