import { Button } from "@/components/ui/button";
import { AmbassadorBounty } from "@/lib/hooks/bounty/useAmbassadorBounties";
import { Database } from "@/lib/supabase/types";
import { SetStateAction } from "react";
import PaySelectedButton from "./PaySelected";
import { SupabaseClient } from "@supabase/supabase-js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

type AdminBountyMenuProps = {
  status: Database["public"]["Enums"]["bounty_status"] | undefined;
  setStatus: (
    args_0: SetStateAction<
      Database["public"]["Enums"]["bounty_status"] | undefined
    >
  ) => void;
  supabase: SupabaseClient<Database>;
  wallet: WalletContextState;
  connection: Connection;
  userId: string;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
  selectedBounties: AmbassadorBounty[];
};

export default function AdminBountyMenu({
  status,
  setStatus,
  selectedBounties,
  supabase,
  wallet,
  connection,
  userId,
  setRefetch,
}: AdminBountyMenuProps) {
  const handleStatusChange = (
    newStatus: Database["public"]["Enums"]["bounty_status"]
  ) => {
    if (status === newStatus) {
      setStatus(undefined);
    } else {
      setStatus(newStatus);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-wrap gap-2">
        <Button
          className="border-2"
          onClick={() => handleStatusChange("REQUESTED")}
          style={{ borderColor: status === "REQUESTED" ? "purple" : undefined }}
        >
          REQUESTED
        </Button>
        <Button
          className="border-2"
          onClick={() => handleStatusChange("CLAIMED")}
          style={{
            borderColor: status === "CLAIMED" ? "green" : undefined,
          }}
        >
          CLAIMED
        </Button>
        <Button
          className="border-2"
          onClick={() => handleStatusChange("COMPLETED")}
          style={{
            borderColor: status === "COMPLETED" ? "blue" : undefined,
          }}
        >
          COMPLETED
        </Button>
        <Button
          className="border-2"
          onClick={() => handleStatusChange("UNCLAIMED")}
          style={{
            borderColor: status === "UNCLAIMED" ? "gray" : undefined,
          }}
        >
          UNCLAIMED
        </Button>
        <Button
          className="border-2"
          onClick={() => handleStatusChange("AUDITED")}
          style={{
            borderColor: status === "AUDITED" ? "cyan" : undefined,
          }}
        >
          AUDITED
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedBounties.length > 0 &&
          selectedBounties.filter((bounty) => bounty.status === "COMPLETED")
            .length === selectedBounties.length && (
            <PaySelectedButton
              selectedBounties={selectedBounties}
              supabase={supabase}
              wallet={wallet}
              connection={connection}
              payerUserId={userId}
              setRefetch={setRefetch}
            />
          )}
      </div>
    </div>
  );
}
