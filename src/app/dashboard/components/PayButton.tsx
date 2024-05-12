import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initUserInstruction } from "@/lib/solana/instructions/initUser";
import { payUserInstruction } from "@/lib/solana/instructions/payUser";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "react-toastify";

type PayButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  payerUserId: string;
};

export default function PayButton({
  supabase,
  wallet,
  connection,
  userId,
  payerUserId,
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
        toast.error("Error saving wallet PDA");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
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
        toast.error("Error creating transaction");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
      }
      const transaction = new Transaction().add(instruction.payUserTx);
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
