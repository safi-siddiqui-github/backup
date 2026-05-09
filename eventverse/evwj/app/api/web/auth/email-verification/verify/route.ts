import {
  EmailWebWelcomeUserComponentFN,
  EmailWebWelcomeUserComponentType,
} from "@/emails/web/email-verification/EmailWebWelcomeUserComponent";
import { VerifyOTPServerHelper } from "@/lib-server/lib-otp-server";
import {
  CreateTokenServerHelper,
  VerifyTokenServerHelper,
} from "@/lib-server/lib-token-server";
import { UpdateUserEmailServerHelper } from "@/lib-server/lib-user-server";
import { TokenDTO } from "@/lib/lib-dto";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { EmailVerificationWebSchema } from "./_private/validation";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const body = await request.json();

    const verifyRes = await VerifyTokenServerHelper(request);
    if (!verifyRes?.success) {
      throw new ZodError(verifyRes?.error ?? []);
    }

    const { code } = EmailVerificationWebSchema.parse(body);

    const otpRes = await VerifyOTPServerHelper({
      otp: {
        code: Number(code),
        userId: verifyRes?.data?.token?.userId,
      },
    });
    if (!otpRes?.success) {
      throw new ZodError(otpRes?.error ?? []);
    }

    const userUpdateRes = await UpdateUserEmailServerHelper({
      user: {
        email: verifyRes?.data?.token?.user?.email,
        emailVerified: true,
      },
    });
    if (!userUpdateRes?.success) {
      throw new ZodError(userUpdateRes?.error ?? []);
    }

    const tokenRes = await CreateTokenServerHelper({
      user: userUpdateRes?.data?.user,
    });
    if (!tokenRes?.success) {
      throw new ZodError(tokenRes?.error ?? []);
    }

    await EmailWebWelcomeUserComponentFN({
      toAddress: userUpdateRes?.data?.user?.email,
      props: {
        user: userUpdateRes?.data?.user,
      } satisfies EmailWebWelcomeUserComponentType,
    });

    return NextResponse.json({
      success: true,
      message: "Email is Verified",
      data: {
        token: TokenDTO(tokenRes?.data?.token),
      },
    });
  });
}
