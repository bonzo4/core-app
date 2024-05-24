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
    if (!wallet.publicKey || !wallet.signMessage) {
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
      const encodedMessage = new TextEncoder().encode(
        "Welcome to Core!\n\nPlease sign this message to confirm your identity.\n\nThis message is only used to confirm your identity and will not be stored."
      );
      await wallet.signMessage(encodedMessage);

      const { error } = await supabase.from("user_wallets").upsert({
        user_id: userId,
        authority: wallet.publicKey.toBase58(),
        username: userProfile.full_name,
        icon_url: userProfile.avatar_url,
      });
      if (error) {
        throw new Error("Error changing user wallet");
      }

      const instruction = await initUserInstruction({
        wallet,
        connection,
        userId,
      });

      if (!instruction) {
        throw new Error("Error creating transaction");
      }

      const transaction = new Transaction().add(instruction.initUserTx);
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      toast.success("Transaction confirmed!");
      setRefetch((prev) => !prev); // Trigger a refetch of the user data (if necessary)
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error: any) {
      toast.dismiss(toastId);
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
