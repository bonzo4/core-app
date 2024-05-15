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
import { initTeamInstruction } from "@/lib/solana/instructions/initTeam";
import { Database } from "@/lib/supabase/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection, Transaction } from "@solana/web3.js";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
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
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function CreateTeamForm({
  supabase,
  user,
  wallet,
  connection,
  setRefetch,
}: CreateTeamFormProps) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage(files[0]);
    }
  };

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
      const { data, error } = await supabase
        .from("teams")
        .insert({
          name: formData.teamName,
          owner_id: user.id,
        })
        .select("id")
        .single();
      if (error) {
        toast.error("Error saving team");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
      }
      if (image) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from("team_images")
          .upload(`${data.id}/${image.name}`, image);

        console.log(imageData);

        if (imageError) {
          console.log(imageError);
          toast.error("Error uploading image");
        }

        if (imageData) {
          const {
            data: { publicUrl },
          } = supabase.storage.from("team_images").getPublicUrl(imageData.path);

          const { error } = await supabase
            .from("teams")
            .update({
              image_url: publicUrl,
            })
            .match({ id: data.id });

          if (error) {
            console.log(error);
          }
        }
      }

      const instruction = await initTeamInstruction({
        wallet,
        connection,
        teamId: data.id,
      });

      if (!instruction) {
        toast.error("Error creating transaction");
        setLoading(false); // Ensure loading is reset if the operation cannot proceed
        return;
      }
      const transaction = new Transaction().add(instruction.initTeamTx);
      transaction.recentBlockhash = instruction.blockhash;
      transaction.feePayer = wallet.publicKey;

      const tx = await wallet.sendTransaction(transaction, connection, {
        preflightCommitment: "finalized",
      });

      form.reset();

      await connection.confirmTransaction(tx, "finalized");
      toast.dismiss(toastId);
      toast.success("Transaction confirmed!");
      setRefetch((prev) => !prev);
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to create team");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }
  });

  const buttonEnabled = !loading && form.formState.isValid;

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-x-8 flex flex-row items-center justify-center"
      >
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
        <FormItem>
          <FormLabel>Team Image</FormLabel>
          <FormControl>
            <Input
              type="file"
              className="text-black"
              onChange={handleImageChange}
            />
          </FormControl>
          <FormDescription className="text-white opacity-50">
            The name of your team. This can be changed later.
          </FormDescription>
          <FormMessage />
        </FormItem>
        <Button type="submit" disabled={!buttonEnabled}>
          Create
        </Button>
      </form>
    </Form>
  );
}
