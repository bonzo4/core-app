import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import Image from "next/image";
import LogoutButton from "./LogoutButton";

type UserCardProps = {
  supabase: SupabaseClient<Database>;
  username: string;
  iconUrl: string;
  walletKey?: string;
  onboardDate?: string;
};

export default function UserCard({
  supabase,
  username,
  iconUrl,
  walletKey,
  onboardDate,
}: UserCardProps) {
  return (
    <div className="flex flex-row space-x-3 items-center justify-center">
      {onboardDate && (
        <div className="flex flex-col items-center justify-center ">
          <span>Onboarded:</span>
          <span>{new Date(onboardDate).toDateString()}</span>
        </div>
      )}
      <Image
        className="rounded-full"
        src={iconUrl}
        alt="User Avatar"
        width={40}
        height={40}
      />
      <div className="flex flex-col items-center justify-center">
        <span>{username}</span>
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
