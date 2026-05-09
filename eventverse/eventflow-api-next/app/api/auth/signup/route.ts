import { ApiHandler } from "@/lib/apiHandler";
import { hashPassword } from "@/lib/bcrypt";
import { sligifyEmail } from "@/lib/helper";
import prisma from "@/prisma/database";
import { SignupSchema } from "@/zod/auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = ApiHandler(async (req: Request) => {
  const body = await req.json();
  const result = SignupSchema.parse(body); // throws if invalid
  //
  const hashedPassword = await hashPassword(result?.password);
  const slug = await sligifyEmail(result?.email);
  //
  const existingUser =
    (await prisma.user.findUnique({
      where: {
        email: result?.email,
      },
    })) ?? null;
  //
  if (existingUser) {
    throw new ZodError([
      {
        code: "custom",
        path: ["email"],
        message: "Email is already registered",
      },
    ]);
  }
  //
  const newUser = await prisma.user.create({
    data: {
      firstname: result?.name,
      email: result?.email,
      username: slug,
      password: hashedPassword,
    },
  });
  //
  return NextResponse.json({ success: true, user: newUser });
});
