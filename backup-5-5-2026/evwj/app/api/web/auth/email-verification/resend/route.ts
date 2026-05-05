import {
  EmailWebEmailVerificationComponentFN,
  EmailWebEmailVerificationType,
} from "@/emails/web/email-verification/EmailWebEmailVerificationComponent";
import { CreateOTPServerHelper } from "@/lib-server/lib-otp-server";
import { VerifyTokenServerHelper } from "@/lib-server/lib-token-server";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const verifyRes = await VerifyTokenServerHelper(request);
    if (!verifyRes?.success) {
      throw new ZodError(verifyRes?.error ?? []);
    }

    const otpRes = await CreateOTPServerHelper({
      user: {
        id: verifyRes?.data?.token?.userId ?? 0,
      },
    });
    if (!otpRes?.success) {
      throw new ZodError(otpRes?.error ?? []);
    }

    await EmailWebEmailVerificationComponentFN({
      toAddress: verifyRes?.data?.token?.user?.email,
      props: {
        otp: otpRes?.data?.otp,
      } satisfies EmailWebEmailVerificationType,
    });
    return NextResponse.json({
      success: true,
      message: "Email Sent",
    });
  });
}
