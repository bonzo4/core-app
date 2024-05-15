import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  VersionedTransaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { Button } from "../../components/ui/button";
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

    const toastId = toast.loading(
      "Waiting for transaction to be confirmed...",
      {
        autoClose: false,
      }
    );

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
      const encodedMessage = new TextEncoder().encode("Init User");

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

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      toast.success("Transaction confirmed!");
      setRefetch((prev) => !prev); // Trigger a refetch of the user data (if necessary)
      setLoading(false); // Ensure loading is reset after the operation is complete
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
