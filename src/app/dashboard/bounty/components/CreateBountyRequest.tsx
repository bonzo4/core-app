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
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

type TagEnum = Database["public"]["Enums"]["guild_tag"];

const formSchema = z.object({
  guildName: z.string().min(1),
  discordInvite: z.string().startsWith("https://discord.gg/"),
  twitterIcon: z.string().nullable(),
  twitterUrl: z.string().nullable(),
});

type CreateBountyRequestProps = {
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  userId: string;
};

export default function CreateBountyRequest({
  supabase,
  setRefetch,
  userId,
}: CreateBountyRequestProps) {
  const [tags, setTags] = useState<TagEnum[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildName: "",
      discordInvite: "",
      twitterIcon: null,
      twitterUrl: null,
    },
  });

  const handleTagSelect = (tag: TagEnum) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const onSubmit = form.handleSubmit(async (formData) => {
    setLoading(true);

    try {
      const { error: invoiceError } = await supabase
        .from("ambassador_bounties")
        .insert({
          guild_name: formData.guildName,
          reward_amount: 0,
          discord_invite: formData.discordInvite,
          twitter_icon: formData.twitterIcon,
          twitter_url: formData.twitterUrl,
          tags,
          status: "REQUESTED",
          claimer_id: userId,
        })
        .single();

      if (invoiceError) {
        throw invoiceError;
      }

      toast.success("Bounty request created successfully!");
      setRefetch((prev) => !prev);
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error) {
      toast.error("Failed to create Bounty");
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }
  });

  const buttonEnabled = !loading && form.formState.isValid;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Bounty Request</Button>
      </DialogTrigger>
      <DialogContent className="bg-black flex flex-col items-start justify-start">
        <DialogHeader>
          <DialogTitle>Create Bounty Request</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="w-full space-y-4">
            <FormField
              control={form.control}
              name="guildName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guild name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`MonkeDAO`}
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Name of the Guild
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Guild Tags</FormLabel>
              <div className="flex flex-wrap w-full gap-2">
                <Button
                  onClick={() => handleTagSelect("SOL")}
                  type="button"
                  style={{
                    borderColor: tags.includes("SOL") ? "purple" : "gray",
                    borderWidth: "4px",
                  }}
                  className=""
                >
                  SOL
                </Button>
                <Button
                  onClick={() => handleTagSelect("ETH")}
                  type="button"
                  style={{
                    borderColor: tags.includes("ETH") ? "blue" : "gray",
                    borderWidth: "4px",
                  }}
                  className=""
                >
                  ETH
                </Button>
                <Button
                  onClick={() => handleTagSelect("BTC")}
                  type="button"
                  style={{
                    borderColor: tags.includes("BTC") ? "orange" : "gray",
                    borderWidth: "4px",
                  }}
                  className=""
                >
                  BTC
                </Button>
                <Button
                  onClick={() => handleTagSelect("POLY")}
                  type="button"
                  style={{
                    borderColor: tags.includes("POLY") ? "violet" : "gray",
                    borderWidth: "4px",
                  }}
                  className=""
                >
                  POLY
                </Button>
                <Button
                  onClick={() => handleTagSelect("APTOS")}
                  type="button"
                  style={{
                    borderColor: tags.includes("APTOS") ? "green" : "gray",
                    borderWidth: "4px",
                  }}
                  className=""
                >
                  APTOS
                </Button>
              </div>
              <FormDescription className="text-white opacity-50">
                Name of the Guild
              </FormDescription>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="discordInvite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discord Invite</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`https://discord.gg/...`}
                      {...field}
                      value={field.value || ""}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Invite to the Discord
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterIcon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Icon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`https://pbs.twimg.com/...`}
                      {...field}
                      value={field.value || ""}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Icon of the Twitter account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`https://x.com/...`}
                      {...field}
                      value={field.value || undefined}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    URL of Twitter Account
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
