import { ComputeBudgetProgram, Connection } from "@solana/web3.js";

type ComputeBudgetInstructionOptions = { connection: Connection };

export const computeBudgetInstruction = async ({
  connection,
}: ComputeBudgetInstructionOptions) => {
  const priorityFees = await connection.getRecentPrioritizationFees();
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
