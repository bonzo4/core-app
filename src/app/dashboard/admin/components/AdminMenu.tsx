import AddMember from "@/app/dashboard/team/[id]/components/AddMember";
import PaySelectMembersButton from "@/app/dashboard/team/[id]/components/PaySelectButton";
import PayTeamButton from "@/app/dashboard/team/[id]/components/PayTeamButton";
import { Button } from "@/components/ui/button";
import { TeamMemberWithProfile } from "@/lib/hooks/teams/useTeamMembers";
import { Database } from "@/lib/supabase/types";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import CreateBounty from "./CreateBounty";
import ManageBounties from "./ManageBounties";

type ManageTeamButtonProps = {
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  loading: boolean;
  refetch: boolean;
  userId: string;
};

export default function AdminMenu({
  supabase,
  wallet,
  connection,
  setRefetch,
  loading,
  refetch,
  userId,
}: ManageTeamButtonProps) {
  return (
    <div className="flex flex-row items-center justify-between w-full p-2">
      <div className="flex flex-row space-x-2 items-center justify-start"></div>
      <div className="flex flex-row items-center justify-end w-full p-2 space-x-2">
        <ManageBounties
          supabase={supabase}
          refetch={refetch}
          setRefetch={setRefetch}
          wallet={wallet}
          connection={connection}
          userId={userId}
        />
        <CreateBounty setRefetch={setRefetch} supabase={supabase} />
      </div>
    </div>
  );
}
