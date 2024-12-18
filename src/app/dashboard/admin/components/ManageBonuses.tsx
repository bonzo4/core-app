import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { Checkbox } from "@/components/ui/checkbox";
import { ProfileWithBonuses, useBonuses } from "@/lib/hooks/admin/useBonuses";
import PayBonusButton from "./PayBonusButton";
import FallbackImage from "@/components/FallbackImage";

type ManageBonusesProps = {
  supabase: SupabaseClient<Database>;
  refetch: boolean;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
};

export default function ManageBonuses({
  supabase,
  refetch,
  setRefetch,
  wallet,
  connection,
  userId,
}: ManageBonusesProps) {
  const [selectedBonuses, setSelectedBonuses] = useState<ProfileWithBonuses[]>(
    []
  );

  const [bonuses, loading] = useBonuses({
    supabase,
    refetch,
  });

  if (loading) {
    <Button disabled>Manage Bounties</Button>;
  }

  const handleSelectBonus = (bonus: ProfileWithBonuses) => {
    if (selectedBonuses.includes(bonus)) {
      setSelectedBonuses(
        selectedBonuses.filter(
          (b) => b.profile.user_id !== bonus.profile.user_id
        )
      );
    } else {
      setSelectedBonuses([...selectedBonuses, bonus]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Manage Bonuses</Button>
      </DialogTrigger>
      <DialogContent className="bg-black h-3/4 flex flex-col items-start justify-start max-w-[100rem]">
        <DialogHeader className="flex flex-col space-y-2 w-full">
          <DialogTitle>Bonuses</DialogTitle>
          {/* <AdminBountyMenu
            status={status}
            setStatus={setStatus}
            selectedBounties={selectedBounties}
            supabase={supabase}
            wallet={wallet}
            connection={connection}
            userId={userId}
            setRefetch={setRefetch}
          /> */}
        </DialogHeader>
        <div className="w-full overflow-auto">
          <Table>
            <TableCaption>All Bonuses</TableCaption>
            <TableHeader className="sticky top-0 bg-black">
              <TableRow>
                <TableHead className="w-[50px]">Selected</TableHead>
                <TableHead className="w-[150px] ">User</TableHead>
                <TableHead className="w-[200px] ">Bonus Due</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {bonuses.map((bonus) => (
                <TableRow key={bonus.profile.user_id}>
                  <TableCell className="">
                    <Checkbox
                      checked={selectedBonuses.includes(bonus)}
                      onCheckedChange={() => handleSelectBonus(bonus)}
                    />
                  </TableCell>
                  <TableCell className="space-x-2 items-center justify-center">
                    {bonus.profile.icon_url && (
                      <FallbackImage
                        fallbackSrc="https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/square%20rainbow%20logo.png"
                        src={bonus.profile.icon_url}
                        width={20}
                        height={20}
                        alt="icon"
                        className="rounded-full inline-block"
                      />
                    )}
                    <span>{bonus.profile.username}</span>
                  </TableCell>
                  <TableCell className="">
                    {bonus.totalPaymentAmount > 0 &&
                      `$${bonus.totalPaymentAmount.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <PayBonusButton
                      bonus={bonus}
                      supabase={supabase}
                      wallet={wallet}
                      connection={connection}
                      payerUserId={userId}
                      setRefetch={setRefetch}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
