"use server";

import prisma from "@/prisma/database";
import { User } from "@/prisma/generated";

export async function getUser(clerkId: string): Promise<User | null> {
  return await prisma.user.findFirst({
    where: {
      clerkId,
    },
  });
}
