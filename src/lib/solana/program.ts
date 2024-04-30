import { Program, AnchorProvider, Provider } from "@coral-xyz/anchor";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";

import { CoreContract, IDL } from "./coreContract";
import { WalletContextState } from "@solana/wallet-adapter-react";

export function getCoreContract(
  wallet: WalletContextState,
  connection: Connection
) {
  const { publicKey, signTransaction, signAllTransactions } = wallet;
  if (!publicKey || !signTransaction || !signAllTransactions) return;
  const provider = new AnchorProvider(connection, {
    publicKey,
    signTransaction,
    signAllTransactions,
  });

  const program = new Program(
    IDL,
    provider
  ) as unknown as Program<CoreContract>;

  return program;
}
