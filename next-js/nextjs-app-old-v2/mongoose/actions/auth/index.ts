'use server';

import { ApiResponse } from '@/lib/general/response';
import { slugify } from '@/lib/utils';
import connect from '@/mongoose/database';
import UserModelMongoose from '@/mongoose/models/user-model';
import { loginFormSchemaZod, registerFormSchemaZod } from '@/zod/auth';
import { z } from 'zod';

export async function loginMongoose(
  values: z.infer<typeof loginFormSchemaZod>,
): Promise<ApiResponse> {
  const { email } = values;

  await connect();

  const user = await UserModelMongoose.findOne({ email });

  if (!user) {
    return {
      success: false,
      param: 'email',
      error: 'Email is invalid',
    };
  }

  if (user) {
    // check password
  }

  return {
    success: true,
    message: 'User logged in',
  };
}

export async function registerMongoose(
  values: z.infer<typeof registerFormSchemaZod>,
): Promise<ApiResponse> {
  const { email, name, password } = values;

  await connect();
  const username = slugify(email);
  const existing = await UserModelMongoose.findOne({ email });

  if (existing) {
    return {
      success: false,
      param: 'email',
      error: 'Email already exists',
    };
  }

  const user = await UserModelMongoose.create({
    email,
    name,
    password,
    username,
  });

  if (!user) {
    return {
      success: false,
      param: 'email',
      error: 'User not created',
    };
  }

  return {
    success: true,
    message: 'User registered',
  };
}
