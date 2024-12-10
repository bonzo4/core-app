import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllUserWallets } from "@/lib/hooks/admin/useAllUserWallets";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import Image from "next/image";
import PayButton from "@/app/dashboard/admin/components/PayUserButton";
import {
  TeamMemberWithProfile,
  useTeamMembers,
} from "@/lib/hooks/teams/useTeamMembers";
import PayMemberButton from "@/app/dashboard/team/[id]/components/PayMemberButton";
import { SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import FallbackImage from "@/components/FallbackImage";

type MembersTableProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  members: TeamMemberWithProfile[];
  setSelectMembers: (args_0: SetStateAction<TeamMemberWithProfile[]>) => void;
  selectMembers: TeamMemberWithProfile[];
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function MembersTable({
  supabase,
  wallet,
  connection,
  teamId,
  members,
  setSelectMembers,
  selectMembers,
  setRefetch,
}: MembersTableProps) {
  const onMemberSelect = (member: TeamMemberWithProfile) => {
    setSelectMembers((prev) => {
      if (prev.includes(member)) {
        return prev.filter((m) => m.user_id !== member.user_id);
      }
      return [...prev, member];
    });
  };

  return (
    <Table className="">
      <TableCaption>All Payable Member</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Added</TableHead>
          <TableHead className="w-[200px]">User</TableHead>
          <TableHead>Pay Amount</TableHead>
          <TableHead className="text-right">Pay</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.user_id}>
            <TableCell>
              <Checkbox
                className="border-white"
                checked={selectMembers.includes(member)}
                onCheckedChange={() => onMemberSelect(member)}
              />
            </TableCell>
            <TableCell>
              {new Date(member.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="flex flex-row space-x-2 items-center justify-start">
              {member.profile.icon_url && (
                <FallbackImage
                  fallbackSrc="https://api.syndicatenetwork.io/storage/v1/object/public/News%20Images/square%20rainbow%20logo.png"
                  src={member.profile.icon_url}
                  alt="User Icon"
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              )}
              {member.profile.username && (
                <span>{member.profile.username}</span>
              )}
            </TableCell>
            <TableCell>${member.payment_amount}</TableCell>
            <TableCell className="text-right">
              <PayMemberButton
                setRefetch={setRefetch}
                supabase={supabase}
                wallet={wallet}
                userId={member.user_id}
                teamId={teamId}
                connection={connection}
                pay={member.payment_amount}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
