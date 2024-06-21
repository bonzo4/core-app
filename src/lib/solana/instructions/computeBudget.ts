import {
  ComputeBudgetProgram,
  Connection,
  TransactionInstruction,
} from "@solana/web3.js";

type ComputeBudgetInstructionOptions = {
  connection: Connection;
  transactionInstructions: TransactionInstruction[];
};

export const computeBudgetInstruction = async ({
  connection,
  transactionInstructions,
}: ComputeBudgetInstructionOptions) => {
  const priorityFees = await connection.getRecentPrioritizationFees({
    lockedWritableAccounts: transactionInstructions
      .map((ti) => ti.keys.filter((a) => a.isWritable).map((a) => a.pubkey))
      .flat(),
  });
  // get average priority fee
  const avgPriorityFee =
    priorityFees.reduce((acc, fee) => acc + fee.prioritizationFee, 0) /
    priorityFees.length;
  //   const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
  //     units: 1000000,
  //   });

  const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: avgPriorityFee,
  });

  return {
    // modifyComputeUnits,
    addPriorityFee,
  };
};
