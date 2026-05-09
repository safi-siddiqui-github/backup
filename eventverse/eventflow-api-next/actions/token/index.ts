import prisma from "@/prisma/database";
import { randomBytes } from "crypto";

export async function generateToken(userId: number) {
  //
  const token = randomBytes(40).toString("hex"); // raw token
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  //
  await prisma.token.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });
  //
  return token;
}
