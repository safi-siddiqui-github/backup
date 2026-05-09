import { prisma } from "@/services/prisma/prismaClient";
import bcrypt from 'bcrypt';

export default async function CreateUserDatabase(formData: FormData) {
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