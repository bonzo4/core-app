import { utils } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { encodeUUID } from "../utils";

export function getUserPDA(userId: string) {
  const encodedUserId = encodeUUID(userId);
  const [userPDA] = PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode("user"), utils.bytes.utf8.encode(encodedUserId)],
    new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
  );

  return userPDA;
}

export function getTeamPDA(teamId: number) {
  const [teamPDA] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("team"),
      utils.bytes.utf8.encode(teamId.toString()),
    ],
    new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
  );

  return teamPDA;
}

export function getTeamMemberPDA(teamId: number, userId: string) {
  const encodedUserId = encodeUUID(userId);
  const [teamMemberPDA] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("team_member"),
      utils.bytes.utf8.encode(teamId.toString()),
      utils.bytes.utf8.encode(userId),
    ],
    new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
  );

  return teamMemberPDA;
}
