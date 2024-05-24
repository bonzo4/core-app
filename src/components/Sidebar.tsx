import { TeamMember } from "@/lib/hooks/useUserMembers";
import { Team } from "@/lib/hooks/useUserTeams";
import { motion } from "framer-motion";
import Image from "next/image";

type SideBarProps = {
  ownedTeams: Team[];
  userRoles: string[];
  currentPage: string;
  currentTeamId?: string;
};

export default function Sidebar({
  ownedTeams,
  userRoles,
  currentPage,
}: SideBarProps) {
  return (
    <motion.nav className="lg:flex flex-col space-y-5 p-4 border-r-4 border-white border-opacity-10 h-full hidden min-w-36">
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
      <a
        href="/dashboard/bounty"
        className="text-white"
        style={{
          textDecoration: currentPage === "bounty" ? "underline" : undefined,
        }}
      >
        Bounties
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
      {ownedTeams.length > 0 && <span>Teams:</span>}
      {ownedTeams.map((team) => (
        <a
          key={team.id}
          href={`/dashboard/team/${team.id}`}
          className="text-white flex flex-row items-center space-x-2"
          style={{
            textDecoration:
              currentPage === team.id.toString() ? "underline" : undefined,
          }}
        >
          {team.image_url && (
            <Image
              src={team.image_url}
              width={24}
              height={24}
              alt="Icon"
              className="rounded-full"
            />
          )}
          <span>{team.name}</span>
        </a>
      ))}
    </motion.nav>
  );
}
