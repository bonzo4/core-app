import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeamMember } from "@/lib/hooks/teams/useTeamMembers";
import { addMemberInstructions } from "@/lib/solana/instructions/addMember";
import { payMemberInstruction } from "@/lib/solana/instructions/payMember";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { toast } from "react-toastify";

type AddMemberButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  teamId: number;
  members: TeamMember[];
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function AddMemberButton({
  supabase,
  wallet,
  connection,
  userId,
  teamId,
  members,
  setRefetch,
}: AddMemberButtonProps) {
  const [pay, setPay] = useState("");
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
      const { error } = await supabase.from("_team_members").insert({
        user_id: userId,
        payment_amount: parseFloat(pay),
        team_id: teamId,
      });
      if (error) {
        throw new Error("Error adding user to team");
      }

      const instruction = await addMemberInstructions({
        wallet,
        connection,
        userId,
        teamId,
        pay: parseFloat(pay),
      });

      if (!instruction) {
        throw new Error("Error creating instruction");
      }
      const transaction = new Transaction().add(instruction.addMemberTx);
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      toast.success("User added to the team!");
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
    setPay(normalizedValue.toString());
  };

  const buttonEnabled =
    parseFloat(pay) > 0 &&
    !loading &&
    !members.map((member) => member.user_id).includes(userId);

  return (
    <div className="flex flex-row space-x-2 items-center justify-end">
      <Input
        type="number"
        value={pay}
        placeholder="Intial Pay"
        onChange={handleAmountChange}
        className="w-[100px] text-black"
      />
      <Button onClick={() => handleSign()} disabled={!buttonEnabled}>
        Add
      </Button>
    </div>
  );
}
