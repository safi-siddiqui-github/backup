import {
  EmailForgotPasswordCheckEmailComponentFN,
  EmailForgotPasswordCheckEmailComponentType,
} from "@/emails/web/forgot-password/EmailForgotPasswordCheckEmailComponent";
import { CreateOTPServerHelper } from "@/lib-server/lib-otp-server";
import { VerifyUserEmailExistServerHelper } from "@/lib-server/lib-user-server";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { WebForgotPasswordCheckEmailSchema } from "./_private/validation";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const body = await request.json();
    WebForgotPasswordCheckEmailSchema.parse(body);

    const userRes = await VerifyUserEmailExistServerHelper({
      user: body,
    });
    if (!userRes?.success) {
      throw new ZodError(userRes?.error ?? []);
    }

    const otpRes = await CreateOTPServerHelper({
      user: userRes?.data?.user,
    });
    if (!otpRes?.success) {
      throw new ZodError(otpRes?.error ?? []);
    }

    await EmailForgotPasswordCheckEmailComponentFN({
      toAddress: userRes?.data?.user?.email,
      props: {
        otp: otpRes?.data?.otp,
      } satisfies EmailForgotPasswordCheckEmailComponentType,
    });
    return NextResponse.json({
      success: true,
      message: "FP Success",
    });
  });
}
