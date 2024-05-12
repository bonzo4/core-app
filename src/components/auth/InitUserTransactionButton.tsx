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
import { SupabaseClient, UserMetadata } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { toast } from "react-toastify";
import { SetStateAction, useState } from "react";
import { initUserInstruction } from "@/lib/solana/instructions/initUser";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { set } from "@coral-xyz/anchor/dist/cjs/utils/features";

type InitUserTransactionButtonProps = {
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  wallet: WalletContextState;
  sendTransaction: WalletAdapterProps["sendTransaction"];
  connection: Connection;
  userId: string;
  supabase: SupabaseClient<Database>;
  userProfile: UserMetadata;
};

export default function InitUserTransactionButton({
  setRefetch,
  wallet,
  sendTransaction,
  connection,
  supabase,
  userId,
  userProfile,
}: InitUserTransactionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
    setLoading(true);
    if (!wallet.publicKey) {
      toast.error("No signer key found, please connect a wallet");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    const instruction = await initUserInstruction({
      wallet,
      connection,
      userId,
    });

    if (!instruction) {
      toast.error("Error creating transaction");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }
    const transaction = new Transaction().add(instruction.initUserTx);
    transaction.recentBlockhash = instruction.blockhash;
    transaction.feePayer = wallet.publicKey;

    try {
      const { error } = await supabase.from("user_wallets").upsert({
        user_id: userId,
        authority: wallet.publicKey.toBase58(),
        username: userProfile.full_name,
        icon_url: userProfile.avatar_url,
      });
      if (error) {
        toast.error("Error saving wallet PDA");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
      }

      await sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      // Wait for 3 seconds after the transaction is sent before refetching and setting loading to false
      setTimeout(() => {
        setRefetch((prev) => !prev);
        setLoading(false);
      }, 3000);
    } catch (error: any) {
      toast.error("Error sending transaction: " + error.message);
      setLoading(false); // Ensure loading is reset if the operation fails
    }
  };

  return (
    <Button disabled={loading} onClick={handleSign}>
      Sign Transaction
    </Button>
  );
}
