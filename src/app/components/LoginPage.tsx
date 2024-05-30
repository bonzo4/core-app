import InitUserTransactionButton from "@/app/components/InitUserTransactionButton";
import UserCard from "@/components/auth/UserCard";
import { createSupabaseClient } from "@/lib/supabase/client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useLoginData } from "@/lib/hooks/login/useLoginData";
import DeleteWalletButton from "./DeleteWalletButton";
import LoginButton from "./LoginButton";

export default function LoginPage() {
  const supabase = createSupabaseClient();

  const {
    setRefetch,
    loading,
    user,
    userRole,
    userWallet,
    teamData,
    wallet,
    connection,
  } = useLoginData({ supabase });

  if (loading) {
    return (
      <motion.div
        className="flex flex-col space-y-4 items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
      >
        <LoaderCircleIcon size={48} className="animate-spin" />
        <span>Loading...</span>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        className="flex flex-col space-y-4 items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
      >
        <span>Sign in to continue to C.O.R.E.</span>
        <LoginButton supabase={supabase} />
      </motion.div>
    );
  }

  const userProfile = user.user_metadata;

  if (!wallet.publicKey) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard
          username={userProfile.full_name}
          iconUrl={userProfile.avatar_url}
          supabase={supabase}
        />
        <WalletMultiButton />
      </motion.div>
    );
  }

  if (!userWallet) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard
          username={userProfile.full_name}
          iconUrl={userProfile.avatar_url}
          supabase={supabase}
        />
        <InitUserTransactionButton
          setRefetch={setRefetch}
          userId={user.id}
          supabase={supabase}
          sendTransaction={wallet.sendTransaction}
          wallet={wallet}
          connection={connection}
          userProfile={userProfile}
        />
        <WalletMultiButton />
      </motion.div>
    );
  }
  if (userWallet.is_confirmed) {
    if ((teamData && teamData?.length > 0) || userRole) {
      redirect("/dashboard");
    }
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <span>Welcome to Core</span>
        <UserCard
          username={userProfile.full_name}
          iconUrl={userProfile.avatar_url}
          supabase={supabase}
        />
        <span>
          Wallet confirmed. Public Key: {userWallet?.authority.slice(0, 5)}
          ...
          {userWallet?.authority.slice(-5)}
        </span>

        {/* <DeleteWalletButton
          userId={user.id}
          supabase={supabase}
          setRefetch={setRefetch}
        /> */}
        <span>Please wait to be added to a team.</span>
        {/* <WalletMultiButton /> */}
      </motion.div>
    );
  } else {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard
          username={userProfile.full_name}
          iconUrl={userProfile.avatar_url}
          supabase={supabase}
        />
        <span>
          Something went wrong. Please check again later or try a different
          wallet.
        </span>
        <InitUserTransactionButton
          setRefetch={setRefetch}
          userId={user.id}
          supabase={supabase}
          sendTransaction={wallet.sendTransaction}
          wallet={wallet}
          connection={connection}
          userProfile={userProfile}
        />
        <div className="flex flex-row space-x-2 items-center justify-center">
          <span>
            {userWallet?.authority.slice(0, 5)}...
            {userWallet?.authority.slice(-5)}
          </span>
          <DeleteWalletButton
            userId={user.id}
            supabase={supabase}
            setRefetch={setRefetch}
          />
        </div>
        {/* <WalletMultiButton /> */}
      </motion.div>
    );
  }
}
