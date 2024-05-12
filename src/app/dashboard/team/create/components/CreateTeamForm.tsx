import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/supabase/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  teamName: z.string().min(2, {
    message: "Team name must be at least 2 characters long",
  }),
});

type CreateTeamFormProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  wallet: WalletContextState;
  connection: Connection;
};

export default function CreateTeamForm({
  supabase,
  user,
  wallet,
  connection,
}: CreateTeamFormProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    if (!wallet.publicKey) {
      toast.error("No signer key found, please connect a wallet");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    try {
      const { data, error } = await supabase
        .from("teams")
        .insert({
          name: data.teamName,
          owner_id: user.id,
        })
        .select("id")
        .single();
      if (error) throw error;
    } catch (error) {
      toast.error("Failed to create team");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }

    const instruction = await init({
      wallet,
      connection,
      userId,
      payerUserId,
      amount: parseFloat(amount),
      paymentId: data.id,
    });
  });

  const buttonEnabled = !loading && form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={`"Team C.O.R.E."`}
                  {...field}
                  className="text-black"
                />
              </FormControl>
              <FormDescription className="text-white opacity-50">
                The name of your team. This can be changed later.
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
  );
}
