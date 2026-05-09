import { createSession } from "@/actions/session";
import { generateToken } from "@/actions/token";
import { ApiHandler } from "@/lib/apiHandler";
import { comparePassword } from "@/lib/bcrypt";
import prisma from "@/prisma/database";
import { SigninSchema } from "@/zod/auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = ApiHandler(async (req: Request) => {
  const body = await req.json();
  const result = SigninSchema.parse(body); // throws if invalid
  //
  const existingUser =
    (await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: result?.emailOrUsername,
          },
          {
            username: result?.emailOrUsername,
          },
        ],
      },
    })) ?? null;
  //
  if (!existingUser) {
    throw new ZodError([
      {
        code: "custom",
        path: ["email"],
        message: "Email or Username is invalid",
      },
    ]);
  }
  //
  const compare = await comparePassword(
    result?.password,
    existingUser?.password ?? "",
  );
  //
  if (!compare) {
    throw new ZodError([
      {
        code: "custom",
        path: ["password"],
        message: "Password is incorrect",
      },
    ]);
  }
  //
  const token = await createSession(existingUser?.id ?? 0);
  //
  return NextResponse.json({ success: true, user: existingUser, token });
});
