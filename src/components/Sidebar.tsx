import { UserRole, TeamMember } from "@/lib/hooks/useAuthUser";
import { motion } from "framer-motion";

type SideBarProps = {
  teamData: TeamMember[];
  staffUser: UserRole[];
  currentPage: string;
  currentTeamId?: string;
};

export default function Sidebar({
  teamData,
  staffUser,
  currentPage,
}: SideBarProps) {
  return (
    <motion.nav className="lg:flex flex-col space-y-5 p-4 border-r-4 border-white border-opacity-10 h-full hidden">
      {staffUser.filter((role) => role.user_role === "ADMIN").length > 0 && (
        <a
          href="/admin"
          className="text-white"
          style={{
            textDecoration: currentPage === "admin" ? "underline" : undefined,
          }}
        >
          Admin
        </a>
      )}
      <a
        href="/dashboard"
        className="text-white"
        style={{
          textDecoration: currentPage === "dashboard" ? "underline" : undefined,
        }}
      >
        Dashboard
      </a>
      {staffUser.filter(
        (role) => role.user_role === "ADMIN" || role.user_role === "FOUNDER"
      ).length > 0 && (
        <a
          href="/team/create"
          className="text-white"
          style={{
            textDecoration:
              currentPage === "create-a-team" ? "underline" : undefined,
          }}
        >
          Create a Team
        </a>
      )}
    </motion.nav>
  );
}
