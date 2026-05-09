'use server';

import { prisma } from "@/services/prisma/prismaClient";

export default async function ReadSingleUserDatabase(formData: FormData) {
  const email = formData.get('email') as string;
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
  })
  return user;
}