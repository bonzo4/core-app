import { Connection, clusterApiUrl } from "@solana/web3.js";

export function createNewSolanaConnection() {
  return new Connection(
    process.env.NEXT_PUBLIC_RPC_URL || clusterApiUrl("devnet"),
    "confirmed"
  );
}
