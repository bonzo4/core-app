import { UserWallet } from "@/lib/hooks/useUserWallet";
import { Database } from "@/lib/supabase/types";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { TeamMember } from "@/lib/hooks/useUserMembers";
import { Team } from "@/lib/hooks/useUserTeams";
import { Role } from "@/lib/hooks/useUserRoles";

type DashboardLayoutProps = {
  supabase: SupabaseClient<Database>;
  user: User;
  userWallet?: UserWallet;
  ownedTeams: Team[];
  userRole: Role | undefined;
  currentPage: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function DashboardLayout({
  supabase,
  user,
  userWallet,
  ownedTeams,
  userRole,
  currentPage,
  ...props
}: DashboardLayoutProps) {
  const userProfile = user.user_metadata;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-start justify-start w-full grow"
    >
      {userWallet ? (
        <Header
          supabase={supabase}
          username={userWallet.username}
          iconUrl={userWallet.icon_url || userProfile.avatar_url}
          walletKey={userWallet.authority || undefined}
          onboardDate={user.created_at}
          isDashboard={currentPage === "dashboard"}
        />
      ) : (
        <Header
          supabase={supabase}
          username={userProfile.full_name}
          iconUrl={userProfile.avatar_url}
          onboardDate={user.created_at}
          isDashboard={currentPage === "dashboard"}
        />
      )}
      <div className="flex flex-row items-start justify-start w-full grow">
        <Sidebar
          ownedTeams={ownedTeams}
          userRole={userRole}
          currentPage={currentPage}
          walletKey={userWallet?.authority || undefined}
        />
        {props.children}
      </div>
    </motion.div>
  );
}
