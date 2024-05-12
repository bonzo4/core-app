import { Button } from "@/components/ui/button";
import { claimInstruction } from "@/lib/solana/instructions/claim";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "react-toastify";

type ClaimButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  balance?: number;
};

export default function ClaimButton({
  supabase,
  wallet,
  connection,
  userId,
  balance,
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
        toast.error("Error saving wallet PDA");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
      }

      const instruction = await claimInstruction({
        wallet,
        connection,
        userId,
        claimId: data.id,
      });

      if (!instruction) {
        toast.error("Error creating transaction");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
      }
      const transaction = new Transaction().add(instruction.claimTx);
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      await wallet
        .sendTransaction(transaction, connection, {
          preflightCommitment: "finalized",
        })
        .then(() => toast.success("Transaction sent"));
    } catch (error: any) {
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
