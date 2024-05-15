import AddMember from "@/app/dashboard/team/[id]/components/AddMember";
import PaySelectMembersButton from "@/app/dashboard/team/[id]/components/PaySelectButton";
import PayTeamButton from "@/app/dashboard/team/[id]/components/PayTeamButton";
import { TeamMemberWithProfile } from "@/lib/hooks/teams/useTeamMembers";
import { TeamMember } from "@/lib/hooks/useUserMembers";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import TeamInvoices from "./TeamInvoices";
import CreateTeamInvoice from "./CreateTeamInvoice";

type ManageTeamButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  teamId: number;
  members: TeamMemberWithProfile[];
  balance: number;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  loading: boolean;
  refetch: boolean;
};

export default function ManageTeamButtons({
  supabase,
  members,
  wallet,
  connection,
  teamId,
  balance,
  setRefetch,
  loading,
  refetch,
}: ManageTeamButtonProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full p-2">
      <div className="flex flex-row space-x-2 items-center justify-start">
        <TeamInvoices
          supabase={supabase}
          teamId={teamId}
          isTeamLoading={loading}
          refetch={refetch}
        />
        <CreateTeamInvoice
          setRefetch={setRefetch}
          supabase={supabase}
          teamId={teamId}
          wallet={wallet}
          connection={connection}
        />
      </div>
      <div className="flex flex-row items-center justify-end w-full p-2 space-x-2">
        <span>Team Balance: ${balance}</span>
        <PayTeamButton
          setRefetch={setRefetch}
          supabase={supabase}
          wallet={wallet}
          connection={connection}
          teamId={teamId}
        />
        <PaySelectMembersButton
          setRefetch={setRefetch}
          supabase={supabase}
          wallet={wallet}
          connection={connection}
          balance={balance}
          selectMembers={members}
        />
        <AddMember
          setRefetch={setRefetch}
          supabase={supabase}
          members={members}
          wallet={wallet}
          connection={connection}
          teamId={teamId}
        />
      </div>
    </div>
  );
}
