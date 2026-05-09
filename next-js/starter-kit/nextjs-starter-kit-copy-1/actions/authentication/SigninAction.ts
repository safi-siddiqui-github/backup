"use server";

import { redirect } from 'next/navigation'
import { CreateSession } from "@/lib/session";
import { SigninValidation } from '@/services/zod/user';
import ReadSingleUserDatabase from '@/lib/db/user/ReadSingleUserDatabase';
import CheckUserDatabasePassword from '@/lib/db/user/CheckUserDatabasePassword';

export default async function (_previousState: unknown, formData: FormData) {

  // validate
  const validationResult = SigninValidation.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      old: {
        email: formData.get('email') as string,
      }
    }
  }

  // const { name, email, password } = validationResult.data;

  // Existing User
  const user = await ReadSingleUserDatabase(formData);
  if (!user) {
    return {
      errors: {
        email: 'Incorrect Email'
      },
      old: {
        email: formData.get('email') as string,
      }
    }
  }

  // Check Password
  const check = await CheckUserDatabasePassword(user, formData);
  if (!check) {
    return {
      errors: {
        password: 'Incorrect Password'
      },
      old: {
        email: formData.get('email') as string,
      }
    }
  }

  // Create Sesion
  await CreateSession(user);
  redirect('/authentication');
}