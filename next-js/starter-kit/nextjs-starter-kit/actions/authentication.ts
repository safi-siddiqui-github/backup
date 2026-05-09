"use server";

import { redirect } from 'next/navigation'
import { CreateSession, DeleteSession } from "@/lib/session";
import { SigninValidation, SignupValidation } from '@/services/zod/user';
import ReadSingleUserDatabase, { CheckUserDatabasePassword, CreateUserDatabase } from '@/lib/db/user';

export async function SignupAction(_previousState: unknown, formData: FormData) {

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

export async function SignoutAction(_previousState: unknown) {
  // Delete Sesion
  await DeleteSession();
  redirect('/authentication');
}

export async function SigninAction(_previousState: unknown, formData: FormData) {

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