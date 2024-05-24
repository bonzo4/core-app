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
import { AmbassadorBounty } from "@/lib/hooks/bounty/useAmbassadorBounties";

type TagEnum = Database["public"]["Enums"]["guild_tag"];

const formSchema = z.object({
  guildName: z.string().min(1),
  rewardAmount: z.coerce.number().min(0).nullable(),
  discordInvite: z.string().startsWith("https://discord.gg/"),
  twitterIcon: z.string().nullable(),
  twitterUrl: z.string().nullable(),
});

type ApproveBountyProps = {
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  bounty: AmbassadorBounty;
};

export default function ApproveBounty({
  supabase,
  setRefetch,
  bounty,
}: ApproveBountyProps) {
  const [bonus, setBonus] = useState<number | undefined>();
  const [showTags, setShowTags] = useState(false);
  const [isBroken, setIsBroken] = useState(bounty.is_broken);
  const [isNew, setIsNew] = useState(bounty.is_new);
  const [isDaily, setIsDaily] = useState(bounty.is_daily);
  const [tags, setTags] = useState<TagEnum[]>(bounty.tags || []);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildName: bounty.guild_name,
      rewardAmount: bounty.reward_amount,
      discordInvite: bounty.discord_invite,
      twitterIcon: bounty.twitter_icon,
      twitterUrl: bounty.twitter_url,
    },
  });

  const handleTagSelect = (tag: TagEnum) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleBonus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBonus(Number(event.target.value));
  };

  const onSubmit = form.handleSubmit(async (formData) => {
    setLoading(true);

    try {
      const { error: invoiceError } = await supabase
        .from("ambassador_bounties")
        .update({
          guild_name: isBroken
            ? `Broken: ${formData.guildName}`
            : formData.guildName,
          reward_amount: formData.rewardAmount,
          discord_invite: formData.discordInvite,
          twitter_icon: formData.twitterIcon,
          twitter_url: formData.twitterUrl,
          tags,
          status: "UNCLAIMED",
          is_new: isNew,
          is_daily: isDaily,
          is_broken: isBroken,
        })
        .eq("id", bounty.id);

      if (invoiceError) {
        throw invoiceError;
      }

      if (bonus && bonus > 0 && bounty.requester_id) {
        const { error: bonusError } = await supabase.from("user_bonus").insert({
          user_id: bounty.requester_id,
          pay_amount: bonus,
          memo: `Request Bonus for ${bounty.guild_name}`,
        });

        if (bonusError) {
          throw bonusError;
        }
      }

      toast.success("Bounty approved successfully!");
      setRefetch((prev) => !prev);
      setLoading(false); // Ensure loading is reset after the operation is complete
    } catch (error: any) {
      toast.error("Failed to approve Bounty: " + error.message);
      setLoading(false); // Ensure loading is reset if the operation cannot proceed
      return;
    }
  });

  const buttonEnabled = !loading && form.formState.isValid;

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Approve</Button>
      </DialogTrigger>
      <DialogContent className="bg-black flex flex-col items-start justify-start">
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
            <div className="flex flex-row space-x-2 items-center justify-between w-full">
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
                  Bounty addons
                </FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem className="flex flex-col">
                <FormLabel>Add Bonus</FormLabel>
                <Input
                  type="number"
                  placeholder={`$0.25`}
                  value={bonus || ""}
                  onChange={handleBonus}
                  className="text-black"
                />
                <FormDescription className="text-white opacity-50">
                  Bonus for Request
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
            <Button type="submit" disabled={!buttonEnabled}>
              Approve
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
