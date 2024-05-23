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
  announce_channel_id: z.string().min(1),
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
  const [showTags, setShowTags] = useState(false);
  const [tags, setTags] = useState<TagEnum[]>([]);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildName: "",
      discordInvite: "",
      announce_channel_id: "",
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
          requester_id: userId,
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
                  <FormLabel>Discord name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`MonkeDAO`}
                      {...field}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Name of the Discord Server
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Guild Tags</FormLabel>
              <div className="flex flex-wrap gap-3 w-full">
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleTagSelect("SOL")}
                    style={{
                      borderColor: tags.includes("SOL") ? "white" : "black",
                    }}
                    className="px-4 pt-[3px]  rounded-full bg-gradient-to-r from-sol-1 to-sol-2 border-[3px]"
                  >
                    <span className="text-sm">SOL</span>
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleTagSelect("ETH")}
                    style={{
                      borderColor: tags.includes("ETH") ? "white" : "black",
                    }}
                    className="px-4 pt-[3px]  rounded-full bg-eth border-[3px]"
                  >
                    <span className="text-sm">ETH</span>
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleTagSelect("BTC")}
                    style={{
                      borderColor: tags.includes("BTC") ? "white" : "black",
                    }}
                    className="px-4 pt-[3px]  rounded-full bg-btc border-[3px]"
                  >
                    <span className="text-sm">BTC</span>
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleTagSelect("POLY")}
                    style={{
                      borderColor: tags.includes("POLY") ? "white" : "black",
                    }}
                    className="px-4 pt-[3px] rounded-full bg-polygon border-[3px]"
                  >
                    <span className="text-sm">POLY</span>
                  </button>
                </div>
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("APTOS")}
                      style={{
                        borderColor: tags.includes("APTOS") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-aptos border-[3px]"
                    >
                      <span className="text-sm text-black">APTOS</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("SUI")}
                      style={{
                        borderColor: tags.includes("SUI") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-sui border-[3px]"
                    >
                      <span className="text-sm">SUI</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("BASE")}
                      style={{
                        borderColor: tags.includes("BASE") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-base border-[3px]"
                    >
                      <span className="text-sm">BASE</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("XRP")}
                      style={{
                        borderColor: tags.includes("XRP") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-xrp border-[3px]"
                    >
                      <span className="text-sm">XRP</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("CARD")}
                      style={{
                        borderColor: tags.includes("CARD") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-cardano border-[3px]"
                    >
                      <span className="text-sm">CARDANO</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("AVAX")}
                      style={{
                        borderColor: tags.includes("AVAX") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-avax border-[3px]"
                    >
                      <span className="text-sm">AVAX</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("COSM")}
                      style={{
                        borderColor: tags.includes("COSM") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-cosmos border-[3px]"
                    >
                      <span className="text-sm">COSMOS</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("NEAR")}
                      style={{
                        borderColor: tags.includes("NEAR") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-near border-[3px]"
                    >
                      <span className="text-sm text-black">NEAR</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("BNB")}
                      style={{
                        borderColor: tags.includes("BNB") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-bnb border-[3px]"
                    >
                      <span className="text-sm text-black">BNB</span>
                    </button>
                  </div>
                )}
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleTagSelect("TEZOS")}
                      style={{
                        borderColor: tags.includes("TEZOS") ? "white" : "black",
                      }}
                      className="px-4 pt-[3px] rounded-full bg-tezos border-[3px]"
                    >
                      <span className="text-sm">TEZOS</span>
                    </button>
                  </div>
                )}
                {showTags ? (
                  <Button type="button" onClick={() => setShowTags(false)}>
                    Hide
                  </Button>
                ) : (
                  <Button type="button" onClick={() => setShowTags(true)}>
                    Show More
                  </Button>
                )}
              </div>
              <FormDescription className="text-white opacity-50">
                Chains the Guild is associated with
              </FormDescription>
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="announce_channel_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Announcement Channel ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`992328231...`}
                      {...field}
                      value={field.value || ""}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Announcement Channel ID of the Discord
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
