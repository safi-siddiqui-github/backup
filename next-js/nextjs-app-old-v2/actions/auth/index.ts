'use server';

import { ConstantMessage } from '@/constants/messages';
import resend from '@/email-service/resend/lib';
import VerifyEmail from '@/email-service/resend/template/auth/verify-email';
import { ApiResponse } from '@/lib/general/response';
import { generateRandomString, slugify } from '@/lib/utils';
import prisma from '@/object-relational-mappers/prisma/client';
import { loginFormSchemaZod, registerFormSchemaZod } from '@/zod/auth';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
const RESEND_EMAIL_FROM = process.env.RESEND_EMAIL_FROM;

export async function registerUserPrisma(
  values: z.infer<typeof registerFormSchemaZod>,
): Promise<ApiResponse> {
  const { email, name, password } = values;

  //   await prisma.user.deleteMany();

  const username = slugify(email);
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return {
      success: false,
      param: 'email',
      error: ConstantMessage.response.emailAlreadyExist,
    };
  }

  const salt = await bcrypt.genSalt(Number(BCRYPT_SALT_ROUNDS));
  const hashed = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashed,
      username,
    },
  });

  if (!user) {
    return {
      success: false,
      param: 'email',
      error: ConstantMessage.response.userNotCreated,
    };
  }

  const code = generateRandomString(6);

  const resendRes = await resend.emails.send({
    from: RESEND_EMAIL_FROM,
    subject: ConstantMessage.response.successregister,
    to: email,
    react: VerifyEmail({ email, code }),
  });

  if (resendRes.error) {
  }

  console.log(user);

  return {
    success: true,
    message: ConstantMessage.response.successregister,
  };
}

export async function loginUserPrisma(
  values: z.infer<typeof loginFormSchemaZod>,
): Promise<ApiResponse> {
  const { email, password } = values;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      success: false,
      param: 'email',
      error: ConstantMessage.response.invalidEmail,
    };
  }

  const check = await bcrypt.compare(password, user.password);

  if (!check) {
    return {
      success: false,
      param: 'email',
      error: ConstantMessage.response.invalidCredentials,
    };
  }

  return {
    success: true,
    message: ConstantMessage.response.sucesslogin,
  };
}
