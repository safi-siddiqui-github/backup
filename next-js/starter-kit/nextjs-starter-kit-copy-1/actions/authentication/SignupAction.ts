"use server";

import { redirect } from 'next/navigation'
import CreateUserDatabase from "@/lib/db/user/CreateUserDatabase";
import { CreateSession } from "@/lib/session";
import { SignupValidation } from '@/services/zod/user';
import ReadSingleUserDatabase from '@/lib/db/user/ReadSingleUserDatabase';

export default async function (_previousState: unknown, formData: FormData) {

  // validate
  const validationResult = SignupValidation.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      old: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      }
    }
  }

  // const { name, email, password } = validationResult.data;

  // Existing User
  let user = await ReadSingleUserDatabase(formData);
  if (!user) {
    // Create User
    user = await CreateUserDatabase(formData);
  }

  // Create Sesion
  await CreateSession(user);
  redirect('/authentication');
}