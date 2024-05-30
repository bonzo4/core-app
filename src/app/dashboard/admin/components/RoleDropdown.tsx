import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserWalletAndRole } from "@/lib/hooks/admin/useAllUserWallets";
import { Role } from "@/lib/hooks/useUserRoles";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { SetStateAction } from "react";
import { toast } from "react-toastify";

export type RoleDropdownProps = {
  userWallet: UserWalletAndRole;
  supabase: SupabaseClient<Database>;
  setRefetch: (args_0: SetStateAction<boolean>) => void;
};

export default function RoleDropdown({
  userWallet,
  supabase,
  setRefetch,
}: RoleDropdownProps) {
  const changeRole = async (role: Role) => {
    const { error } = await supabase
      .from("user_roles")
      .upsert({ user_id: userWallet.user_id, user_role: role });

    if (error) {
      toast.error("Failed to change role");
      return;
    }

    setRefetch(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{userWallet.role}🔽</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => changeRole("AMBASSADOR")}>
          AMBASSADOR
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeRole("NETWORK_LEAD")}>
          NETWORK LEAD
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeRole("FOUNDER")}>
          FOUNDER
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeRole("ADMIN")}>
          ADMIN
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
