import { TeamMember } from "@/lib/hooks/useTeamData";
import { motion } from "framer-motion";

type SideBarProps = {
  teamData: TeamMember[];
  userRoles: string[];
  currentPage: string;
  currentTeamId?: string;
};

export default function Sidebar({
  teamData,
  userRoles,
  currentPage,
}: SideBarProps) {
  return (
    <motion.nav className="lg:flex flex-col space-y-5 p-4 border-r-4 border-white border-opacity-10 h-full hidden">
      {userRoles.filter((role) => role === "ADMIN").length > 0 && (
        <a
          href="/dashboard/admin"
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
      {userRoles.filter((role) => role === "ADMIN" || role === "FOUNDER")
        .length > 0 && (
        <a
          href="/dashboard/team/create"
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
