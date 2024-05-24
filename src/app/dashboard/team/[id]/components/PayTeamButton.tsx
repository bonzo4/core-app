import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { payTeamInstruction } from "@/lib/solana/instructions/payTeam";
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
  teamId: number;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function PayTeamButton({
  supabase,
  wallet,
  connection,
  teamId,
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

    const toastId = toast.loading(
      "Waiting for transaction to be confirmed...",
      {
        autoClose: false,
      }
    );

    try {
      const { data, error } = await supabase
        .from("team_payments")
        .insert({
          team_id: teamId,
          amount: parseFloat(amount),
        })
        .select("id")
        .single();
      if (error) {
        throw new Error("Error creating payment");
      }

      const instruction = await payTeamInstruction({
        wallet,
        connection,
        teamId,
        amount: parseFloat(amount),
        paymentId: data.id,
      });

      if (!instruction) {
        throw new Error("Error creating payment instruction");
      }
      const transaction = new Transaction().add(instruction.payTeamTx);
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      toast.success("Team Paid!");
      setRefetch((prev) => !prev);
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error: any) {
      toast.dismiss(toastId);
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
        Pay Team Vault
      </Button>
    </div>
  );
}
