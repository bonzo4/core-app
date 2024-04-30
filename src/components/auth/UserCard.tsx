import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

type UserCardProps = {
  supabase: SupabaseClient<Database>;
  userData: any;
  walletKey?: string;
};

export default function UserCard({
  supabase,
  userData,
  walletKey,
}: UserCardProps) {
  return (
    <div className="flex flex-row space-x-3 items-center justify-center">
      <Image
        className="rounded-full"
        src={userData.avatar_url}
        alt="User Avatar"
        width={40}
        height={40}
      />
      <div className="flex flex-col items-center justify-center">
        <span>{userData.full_name}</span>
        {walletKey && (
          <span>
            {walletKey.slice(0, 4)}...
            {walletKey.slice(-4)}
          </span>
        )}
      </div>

      <LogoutButton supabase={supabase} />
    </div>
  );
}
