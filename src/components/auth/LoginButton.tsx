import { Database } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { BsDiscord } from "react-icons/bs";

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
      console.error("Error signing in with GitHub", error);
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
