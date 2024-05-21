import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/types";
import { SetStateAction } from "react";

type AdminBountyMenuProps = {
  status: Database["public"]["Enums"]["bounty_status"] | undefined;
  setStatus: (
    args_0: SetStateAction<
      Database["public"]["Enums"]["bounty_status"] | undefined
    >
  ) => void;
};

export default function AdminBountyMenu({
  status,
  setStatus,
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
        onClick={() => handleStatusChange("NEW")}
        style={{
          borderColor: status === "NEW" ? "yellow" : undefined,
        }}
      >
        NEW
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
      <Button
        className="border-2"
        onClick={() => handleStatusChange("EXPIRED")}
        style={{
          borderColor: status === "EXPIRED" ? "red" : undefined,
        }}
      >
        EXPIRED
      </Button>
      <Button
        className="border-2"
        onClick={() => handleStatusChange("DAILY")}
        style={{
          borderColor: status === "DAILY" ? "orange" : undefined,
        }}
      >
        DAILY
      </Button>
    </div>
  );
}
