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
import { useProfiles } from "@/lib/hooks/useProfiles";
import { useUserClaims } from "@/lib/hooks/useUserClaims";
import { TeamMember } from "@/lib/hooks/useUserMembers";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import AddMemberButton from "./AddMemberButton";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { SetStateAction, useState } from "react";
import FallbackImage from "@/components/FallbackImage";

type AddMemberProps = {
  supabase: SupabaseClient<Database>;
  teamId: number;
  members: TeamMember[];
  wallet: WalletContextState;
  connection: Connection;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function AddMember({
  supabase,
  teamId,
  members,
  wallet,
  connection,
  setRefetch,
}: AddMemberProps) {
  const [profiles, loading] = useProfiles({ supabase });

  return (
    <Dialog>
      <DialogTrigger>
        <Button disabled={loading}>Add Member</Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <Table className="">
          <TableCaption>All Available Members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] ">User</TableHead>
              <TableHead className="text-right">Add</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((profile) => (
              <TableRow key={profile.user_id}>
                <TableCell className="flex flex-row space-x-2 items-center justify-start">
                  {profile.icon_url && (
                    <FallbackImage
                      fallbackSrc="https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/square%20rainbow%20logo.png"
                      src={profile.icon_url}
                      alt="User Icon"
                      className="w-6 h-6 rounded-full"
                      width={24}
                      height={24}
                    />
                  )}
                  {profile.username && <span>{profile.username}</span>}
                </TableCell>
                <TableCell className="text-right">
                  {profile.user_id && (
                    <AddMemberButton
                      setRefetch={setRefetch}
                      members={members}
                      supabase={supabase}
                      userId={profile.user_id}
                      teamId={teamId}
                      wallet={wallet}
                      connection={connection}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
