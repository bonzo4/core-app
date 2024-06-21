import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserClaims } from "@/lib/hooks/useUserClaims";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { toast } from "react-toastify";
import { createUserInvoiceInstruction } from "@/lib/solana/instructions/createUserInvoice";
import { computeBudgetInstruction } from "@/lib/solana/instructions/computeBudget";

const formSchema = z.object({
  memo: z.string().min(1),
  toName: z.string().min(1),
  fromName: z.string().min(1),
  amount: z.coerce.number().min(0),
});

type CreateInvoiceProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  wallet: WalletContextState;
  connection: Connection;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function CreateInvoice({
  supabase,
  user,
  wallet,
  connection,
  setRefetch,
}: CreateInvoiceProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memo: "",
      toName: "",
      fromName: "",
      amount: 0,
    },
  });

  const onSubmit = form.handleSubmit(async (formData) => {
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
      const { data: invoiceData, error: invoiceError } = await supabase
        .from("user_invoices")
        .insert({
          memo: formData.memo,
          to_name: formData.toName,
          from_name: formData.fromName,
          amount: formData.amount,
          user_id: user.id,
        })
        .select("id")
        .single();

      if (invoiceError) {
        throw invoiceError;
      }

      const instruction = await createUserInvoiceInstruction({
        wallet,
        connection,
        invoiceId: invoiceData.id,
        amount: formData.amount,
        userId: user.id,
      });

      if (!instruction) {
        throw new Error("Error creating transaction");
      }

      const { addPriorityFee } = await computeBudgetInstruction({
        connection,
      });

      const transaction = new Transaction()
        .add(addPriorityFee)
        .add(instruction.invoiceInstruction);
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      form.reset();

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      setRefetch((prev) => !prev);
      toast.success("Transaction confirmed!");
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to create invoice");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }
  });

  const buttonEnabled = !loading && form.formState.isValid;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create an Invoice</Button>
      </DialogTrigger>
      <DialogContent className="bg-black flex flex-col items-start justify-start">
        <DialogHeader>
          <DialogTitle>Create an Invoice</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`"For Advertising..."`}
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Memo
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`"Syndicate Network"`}
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Recipient of the invoice
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fromName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Your Name`}
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Your Name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={`$100`}
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Amount to Invoice
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!buttonEnabled}>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
