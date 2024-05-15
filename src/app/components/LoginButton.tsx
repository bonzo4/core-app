import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "../../components/ui/button";
import { BsDiscord } from "react-icons/bs";
import { toast } from "react-toastify";

type LoginButtonProps = {
  supabase: SupabaseClient<Database>;
};

export default function LoginButton({ supabase }: LoginButtonProps) {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}`,
      },
    });
    if (error) {
      toast.error("Error logging in with Discord");
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className="flex flex-row space-x-2 items-center justify-center"
    >
      <BsDiscord />
      <span>Login with Discord</span>
    </Button>
  );
}
