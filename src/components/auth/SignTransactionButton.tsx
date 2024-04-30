import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  VersionedTransaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { Button } from "../ui/button";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { toast } from "react-toastify";
import { SetStateAction } from "react";

type SignTransactionButtonProps = {
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  transactions: TransactionInstruction[];
  sendTransaction: WalletAdapterProps["sendTransaction"];
  connection: Connection;
  latestBlockhash?: string;
  signerKey?: PublicKey;
  userId: string;
  supabase: SupabaseClient<Database>;
};

export default function SignTransactionButton({
  setRefetch,
  transactions,
  sendTransaction,
  latestBlockhash,
  signerKey,
  connection,
  supabase,
  userId,
}: SignTransactionButtonProps) {
  const handleSign = async () => {
    if (!latestBlockhash) {
      toast.error("No blockhash found");
      return;
    }
    if (!signerKey) {
      toast.error("No signer key found, please connect a wallet");
      return;
    }
    const transaction = new Transaction().add(...transactions);
    transaction.recentBlockhash = latestBlockhash;
    transaction.feePayer = signerKey;

    try {
      await sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });
    } catch (error: any) {
      toast.error("Error sending transaction");
      return;
    }
    const { error } = await supabase.from("wallet_pdas").insert({
      user_id: userId,
      public_key: signerKey.toBase58(),
    });
    if (error) {
      toast.error("Error saving wallet PDA");
      return;
    }
    setTimeout(() => setRefetch((prev) => !prev), 2000);
  };

  return <Button onClick={handleSign}>Sign Transaction</Button>;
}
