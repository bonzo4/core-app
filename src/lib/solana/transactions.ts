import { TransactionInstruction } from "@solana/web3.js";
import { getCoreContract } from "./program";

const signInstruction = async (
  signerKey: string
): Promise<TransactionInstruction> => {
  const program = getCoreContract();

  return await program.methods
    .initWallet()
    .accounts({ signer: signerKey })
    .instruction();
};
