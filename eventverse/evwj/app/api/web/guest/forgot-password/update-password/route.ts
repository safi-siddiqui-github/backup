import {
  EmailForgotPasswordUpdatePasswordComponentFN,
  EmailForgotPasswordUpdatePasswordComponentType,
} from "@/emails/web/forgot-password/EmailForgotPasswordUpdatePasswordComponent";
import { VerifyOTPServerHelper } from "@/lib-server/lib-otp-server";
import {
  UpdateUserEmailServerHelper,
  VerifyUserEmailExistServerHelper,
} from "@/lib-server/lib-user-server";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { WebForgotPasswordUpdatePasswordSchema } from "./_private/validation";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const body = await request.json();
    const { email, code, password } =
      WebForgotPasswordUpdatePasswordSchema.parse(body);

    const userRes = await VerifyUserEmailExistServerHelper({
      user: body,
    });
    if (!userRes?.success) {
      throw new ZodError(userRes?.error ?? []);
    }

    const otpRes = await VerifyOTPServerHelper({
      otp: {
        userId: userRes?.data?.user?.id,
        code: Number(code),
      },
    });
    if (!otpRes?.success) {
      throw new ZodError(otpRes?.error ?? []);
    }

    const userUpdateRes = await UpdateUserEmailServerHelper({
      user: {
        email,
        password,
      },
    });
    if (!userUpdateRes?.success) {
      throw new ZodError(userUpdateRes?.error ?? []);
    }

    await EmailForgotPasswordUpdatePasswordComponentFN({
      toAddress: userUpdateRes?.data?.user?.email,
      props: {
        user: userUpdateRes?.data?.user,
      } satisfies EmailForgotPasswordUpdatePasswordComponentType,
    });

    return NextResponse.json({
      success: true,
      message: "FP Success",
    });
  });
}
