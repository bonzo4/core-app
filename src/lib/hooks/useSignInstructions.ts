import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { getCoreContract } from "../solana/program";
import { Wallet } from "@coral-xyz/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";

type UseSignTransactionOptions = {
  wallet: WalletContextState;
  connection: Connection;
  userId?: string;
};

export default function useSignInstructions({
  wallet,
  connection,
  userId,
}: UseSignTransactionOptions) {
  const [signInstructions, setSignInstructions] = useState<
    TransactionInstruction | undefined
  >();
  const [recentBlockHash, setRecentBlockHash] = useState<string | undefined>();

  useEffect(() => {
    const getSignInstructions = async () => {
      if (!userId) return;
      if (!wallet || !wallet.publicKey) return;
      const program = getCoreContract(wallet, connection);
      if (!program) return;
      const initWalletTx = await program.methods
        .initWallet(Buffer.from(userId, "utf-8").toString("base64"))
        .accounts({ signer: wallet.publicKey })
        .instruction();
      const blockhash = (await connection.getLatestBlockhash("finalized"))
        .blockhash;
      setSignInstructions(initWalletTx);
      setRecentBlockHash(blockhash);
    };
    getSignInstructions();
  }, [wallet, connection, userId]);

  return [signInstructions, recentBlockHash] as const;
}
