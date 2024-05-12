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
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  amount: z.number().min(0, {
    message: "Amount to pay must be greater than 0",
  }),
});

type PayUserFormProps = {
  supabase: SupabaseClient<Database>;
  recipientId?: string;
};

export default function PayUser({ supabase, recipientId }: PayUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      if (!recipientId) throw new Error("Recipient ID is required");
      if (data.amount <= 0) throw new Error("Amount must be greater than 0");
      const { error } = await supabase.from("payments").insert({
        user_id: recipientId,
        amount: data.amount,
      });
      if (error) throw error;
    } catch (error) {
      toast.error("Failed to pay user");
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={`$0.00`}
                  {...field}
                  className="text-black"
                />
              </FormControl>
              <FormDescription className="text-white opacity-50">
                Amount to Pay
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Pay</Button>
      </form>
    </Form>
  );
}
