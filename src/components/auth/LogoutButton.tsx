import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

type LogoutButtonProps = {
  supabase: SupabaseClient<Database>;
};

export default function LogoutButton({ supabase }: LogoutButtonProps) {
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
    }
    router.push("/");
  };

  return (
    <Button onClick={handleLogout}>
      <IoIosLogOut />
    </Button>
  );
}
