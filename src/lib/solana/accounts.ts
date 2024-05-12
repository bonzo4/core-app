import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

export function getUsdcAccount(userKey: PublicKey) {
  return getAssociatedTokenAddressSync(
    new PublicKey(process.env.NEXT_PUBLIC_USDC_MINT!),
    userKey
  );
}
