'use server';

import { prisma } from "@/services/prisma/prismaClient";
import bcrypt from 'bcrypt';

type user = {
  password: string;
  id: number;
  email: string;
  name: string;
};

export async function CheckUserDatabasePassword(user: user, formData: FormData) {
  const compare = await bcrypt.compare(formData.get('password') as string, user?.password,);
  return compare;
}

export async function CreateUserDatabase(formData: FormData) {
  const hashed = await bcrypt.hash(formData.get('password') as string, 10);

  const user = await prisma.user.create({
    data: {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      password: hashed,
    }
  })
  return user;
}

export default async function ReadSingleUserDatabase(formData: FormData) {
  const email = formData.get('email') as string;
  const user = await prisma.user.findUnique({
    where: {
      email: email
    },
  })
  return user;
}