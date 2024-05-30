import { UserWallet } from "@/lib/hooks/useUserWallet";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { TeamMember } from "@/lib/hooks/useUserMembers";
import { Team } from "@/lib/hooks/useUserTeams";
import { Role } from "@/lib/hooks/useUserRoles";

type DashboardLayoutProps = {
  supabase: SupabaseClient<Database>;
  userWallet: UserWallet;
  ownedTeams: Team[];
  userRole: Role | undefined;
  currentPage: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function DashboardLayout({
  supabase,
  userWallet,
  ownedTeams,
  userRole,
  currentPage,
  ...props
}: DashboardLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-start justify-start w-full grow"
    >
      <Header
        supabase={supabase}
        userWallet={userWallet}
        isDashboard={currentPage === "dashboard"}
      />
      <div className="flex flex-row items-start justify-start w-full grow">
        <Sidebar
          ownedTeams={ownedTeams}
          userRole={userRole}
          currentPage={currentPage}
        />
        {props.children}
      </div>
    </motion.div>
  );
}
