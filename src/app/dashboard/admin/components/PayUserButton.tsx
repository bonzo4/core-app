import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initUserInstruction } from "@/lib/solana/instructions/initUser";
import { payUserInstruction } from "@/lib/solana/instructions/payUser";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type PayButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  payerUserId: string;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function PayUserButton({
  supabase,
  wallet,
  connection,
  userId,
  payerUserId,
  setRefetch,
}: PayButtonProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSign = async () => {
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
        .from("payments")
        .insert({
          user_id: userId,
          amount: parseFloat(amount),
          payer_id: payerUserId,
        })
        .select("id")
        .single();
      if (error) {
        throw new Error("Error creating payment");
      }

      const instruction = await payUserInstruction({
        wallet,
        connection,
        userId,
        payerUserId,
        amount: parseFloat(amount),
        paymentId: data.id,
      });

      if (!instruction) {
        throw new Error("Error creating transaction");
      }
      const transaction = new Transaction().add(instruction.payUserTx);
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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Remove leading zeros and ensure it's a number or empty
    const normalizedValue = inputValue === "" ? "" : +inputValue;
    setAmount(normalizedValue.toString());
  };

  const buttonEnabled = parseFloat(amount) > 0 && !loading;

  return (
    <div className="flex flex-row space-x-2 items-center justify-end">
      <Input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="w-[100px] text-black"
      />
      <Button onClick={() => handleSign()} disabled={!buttonEnabled}>
        Pay
      </Button>
    </div>
  );
}
