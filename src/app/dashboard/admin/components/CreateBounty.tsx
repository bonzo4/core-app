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
import { Checkbox } from "@/components/ui/checkbox";

type TagEnum = Database["public"]["Enums"]["guild_tag"];

const formSchema = z.object({
  guildName: z.string().min(1),
  rewardAmount: z.coerce.number().min(0).nullable(),
  discordInvite: z.string().startsWith("https://discord.gg/").nullable(),
  twitterIcon: z.string().nullable(),
  twitterUrl: z.string().nullable(),
  announceChannelId: z.string().nullable(),
});

type CreateBountyProps = {
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function CreateBounty({
  supabase,
  setRefetch,
}: CreateBountyProps) {
  const [showTags, setShowTags] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isDaily, setIsDaily] = useState(false);
  const [tag, setTag] = useState<TagEnum | undefined>();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildName: "",
      rewardAmount: null,
      discordInvite: null,
      twitterIcon: null,
      twitterUrl: null,
      announceChannelId: null,
    },
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    setLoading(true);

    try {
      const { error: invoiceError } = await supabase
        .from("ambassador_bounties")
        .insert({
          guild_name: isBroken
            ? `Broken: ${formData.guildName}`
            : formData.guildName,
          reward_amount: formData.rewardAmount,
          discord_invite: formData.discordInvite,
          twitter_icon: formData.twitterIcon,
          twitter_url: formData.twitterUrl,
          announce_channel_id: formData.announceChannelId,
          tag,
          status: "UNCLAIMED",
          is_new: isNew,
          is_daily: isDaily,
          is_broken: isBroken,
        })
        .single();

      if (invoiceError) {
        throw invoiceError;
      }

      toast.success("Bounty created successfully!");
      setRefetch((prev) => !prev);
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error: any) {
      toast.error(
        "Failed to create Bounty:" + error.message || "Unknown error"
      );
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }
  });

  const buttonEnabled = !loading && form.formState.isValid;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Bounty</Button>
      </DialogTrigger>
      <DialogContent className="bg-black flex flex-col items-start justify-start max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create Bounty</DialogTitle>
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
              <div className="flex flex-wrap gap-3 w-full">
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setTag("SOL")}
                    style={{
                      borderColor: tag === "SOL" ? "white" : "black",
                    }}
                    className="px-4 pt-[3px]  rounded-full bg-gradient-to-r from-sol-1 to-sol-2 border-[3px]"
                  >
                    <span className="text-sm">SOL</span>
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setTag("ETH")}
                    style={{
                      borderColor: tag === "ETH" ? "white" : "black",
                    }}
                    className="px-4 pt-[3px]  rounded-full bg-eth border-[3px]"
                  >
                    <span className="text-sm">ETH</span>
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setTag("BTC")}
                    style={{
                      borderColor: tag === "BTC" ? "white" : "black",
                    }}
                    className="px-4 pt-[3px]  rounded-full bg-btc border-[3px]"
                  >
                    <span className="text-sm">BTC</span>
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setTag("POLY")}
                    style={{
                      borderColor: tag === "POLY" ? "white" : "black",
                    }}
                    className="px-4 pt-[3px] rounded-full bg-polygon border-[3px]"
                  >
                    <span className="text-sm">POLY</span>
                  </button>
                </div>
                <div className="flex flex-row space-x-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setTag("MULTI")}
                    style={{
                      borderColor: tag === "MULTI" ? "white" : "black",
                    }}
                    className="px-4 pt-[3px] rounded-full bg-black text-white border-[3px]"
                  >
                    <span className="text-sm">MULTI</span>
                  </button>
                </div>
                {showTags && (
                  <div className="flex flex-row space-x-1 items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setTag("APTOS")}
                      style={{
                        borderColor: tag === "APTOS" ? "white" : "black",
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
                      onClick={() => setTag("SUI")}
                      style={{
                        borderColor: tag === "SUI" ? "white" : "black",
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
                      onClick={() => setTag("BASE")}
                      style={{
                        borderColor: tag === "BASE" ? "white" : "black",
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
                      onClick={() => setTag("XRP")}
                      style={{
                        borderColor: tag === "XRP" ? "white" : "black",
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
                      onClick={() => setTag("CARD")}
                      style={{
                        borderColor: tag === "CARD" ? "white" : "black",
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
                      onClick={() => setTag("AVAX")}
                      style={{
                        borderColor: tag === "AVAX" ? "white" : "black",
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
                      onClick={() => setTag("COSM")}
                      style={{
                        borderColor: tag === "COSM" ? "white" : "black",
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
                      onClick={() => setTag("NEAR")}
                      style={{
                        borderColor: tag === "NEAR" ? "white" : "black",
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
                      onClick={() => setTag("BNB")}
                      style={{
                        borderColor: tag === "BNB" ? "white" : "black",
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
                      onClick={() => setTag("TEZOS")}
                      style={{
                        borderColor: tag === "TEZOS" ? "white" : "black",
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
                Blockchain tag
              </FormDescription>
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="announceChannelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Announce Channel ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`46345235...`}
                      {...field}
                      value={field.value || ""}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    ID of the announcement channel
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
                      value={field.value || ""}
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
            <FormField
              control={form.control}
              name="rewardAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reward Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={`$10`}
                      {...field}
                      value={field.value || undefined}
                      className="text-black"
                    />
                  </FormControl>
                  <FormDescription className="text-white opacity-50">
                    Reward amount in USD
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="flex flex-col">
              <FormLabel>Set Status</FormLabel>

              <div className="flex flex-row space-x-2 items-center">
                <Checkbox
                  checked={isNew}
                  onClick={() => {
                    setIsNew(!isNew);
                    setIsDaily(false);
                  }}
                  className="border-white"
                />
                <FormLabel>New</FormLabel>
                <Checkbox
                  checked={isDaily}
                  onClick={() => {
                    setIsDaily(!isDaily);
                    setIsNew(false);
                  }}
                  className="border-white"
                />
                <FormLabel>Daily</FormLabel>
                <Checkbox
                  checked={isBroken}
                  onClick={() => {
                    setIsBroken(!isBroken);
                  }}
                  className="border-white"
                />
                <FormLabel>Broken</FormLabel>
              </div>

              <FormDescription className="text-white opacity-50">
                Status of the Bounty
              </FormDescription>
              <FormMessage />
            </FormItem>
            <Button type="submit" disabled={!buttonEnabled}>
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
