import DeleteWalletButton from "@/components/auth/DeleteWalletButton";
import LoginButton from "@/components/auth/LoginButton";
import SignTransactionButton from "@/components/auth/SignTransactionButton";
import UserCard from "@/components/auth/UserCard";
import { useAuthUser } from "@/lib/hooks/useAuthUser";
import useSignInstructions from "@/lib/hooks/useSignInstructions";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import { LoaderCircleIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const supabase = createSupabaseClient();

  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, walletPDA, teamData, userRoles] = useAuthUser({
    supabase,
    refetch,
    setLoading,
  });
  const wallet = useWallet();
  const { connection } = useConnection();
  const [signupTransaction, latestBlockhash] = useSignInstructions({
    userId: user?.id,
    wallet,
    connection,
  });

  if (loading) {
    return <LoaderCircleIcon className="animate-spin" />;
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
        <UserCard userData={userProfile} supabase={supabase} />
        <WalletMultiButton />
      </motion.div>
    );
  }

  if (!wallet.sendTransaction || !signupTransaction) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
      >
        Something seems to be wrong. 🤔
      </motion.span>
    );
  }

  if (!walletPDA) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <UserCard userData={userProfile} supabase={supabase} />
        <SignTransactionButton
          setRefetch={setRefetch}
          userId={user.id}
          supabase={supabase}
          sendTransaction={wallet.sendTransaction}
          transactions={[signupTransaction]}
          latestBlockhash={latestBlockhash}
          signerKey={wallet.publicKey}
          connection={connection}
        />
        <WalletMultiButton />
      </motion.div>
    );
  }
  if (walletPDA.is_confirmed) {
    if ((teamData && teamData?.length > 0) || userRoles.length > 0) {
      redirect("/dashboard");
    }
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        className="flex flex-col space-y-4 items-center justify-center"
      >
        <span>Welcome to Core</span>
        <UserCard userData={userProfile} supabase={supabase} />
        <span>
          Wallet confirmed. Public Key: {walletPDA?.public_key.slice(0, 5)}
          ...
          {walletPDA?.public_key.slice(-5)}
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
        <UserCard userData={userProfile} supabase={supabase} />
        <span>
          Something went wrong. Please check again later or try a different
          wallet.
        </span>
        <SignTransactionButton
          setRefetch={setRefetch}
          userId={user.id}
          supabase={supabase}
          sendTransaction={wallet.sendTransaction}
          transactions={[signupTransaction]}
          latestBlockhash={latestBlockhash}
          signerKey={wallet.publicKey}
          connection={connection}
        />
        <div className="flex flex-row space-x-2 items-center justify-center">
          <span>
            {walletPDA?.public_key.slice(0, 5)}...
            {walletPDA?.public_key.slice(-5)}
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
