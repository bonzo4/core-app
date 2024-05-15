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
      utils.bytes.utf8.encode(encodedUserId),
    ],
    new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
  );

  return teamMemberPDA;
}

export function getTeamInvoicePDA(teamId: number, invoiceId: number) {
  const [teamInvoicePDA] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("team_invoice"),
      utils.bytes.utf8.encode(teamId.toString()),
      utils.bytes.utf8.encode(invoiceId.toString()),
    ],
    new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
  );

  return teamInvoicePDA;
}

export function getUserInvoicePDA(userId: string, invoiceId: number) {
  const [userInvoicePDA] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("user_invoice"),
      utils.bytes.utf8.encode(encodeUUID(userId)),
      utils.bytes.utf8.encode(invoiceId.toString()),
    ],
    new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!)
  );

  return userInvoicePDA;
}
