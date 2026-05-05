import {
  EmailWebEmailVerificationComponentFN,
  EmailWebEmailVerificationType,
} from "@/emails/web/email-verification/EmailWebEmailVerificationComponent";
import { CreateOTPServerHelper } from "@/lib-server/lib-otp-server";
import { CreateTokenServerHelper } from "@/lib-server/lib-token-server";
import {
  CreateUserEmailServerHelper,
  VerifyUserEmailUniqueServerHelper,
  VerifyUserPhoneUniqueServerHelper,
} from "@/lib-server/lib-user-server";
import { TokenDTO } from "@/lib/lib-dto";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { WebSignupSchema } from "./_private/validation";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const body = await request.json();
    WebSignupSchema.parse(body);

    const userEmailRes = await VerifyUserEmailUniqueServerHelper({
      user: body,
    });
    if (!userEmailRes?.success) {
      throw new ZodError(userEmailRes?.error ?? []);
    }

    const userPhoneRes = await VerifyUserPhoneUniqueServerHelper({
      user: body,
    });
    if (!userPhoneRes?.success) {
      throw new ZodError(userPhoneRes?.error ?? []);
    }

    const userNewRes = await CreateUserEmailServerHelper({ user: body });
    if (!userNewRes?.success) {
      throw new ZodError(userNewRes?.error ?? []);
    }

    const tokenRes = await CreateTokenServerHelper({
      user: userNewRes?.data?.user,
    });
    if (!tokenRes?.success) {
      throw new ZodError(tokenRes?.error ?? []);
    }

    const otpRes = await CreateOTPServerHelper({
      user: userNewRes?.data?.user,
    });
    if (!otpRes?.success) {
      throw new ZodError(otpRes?.error ?? []);
    }

    await EmailWebEmailVerificationComponentFN({
      toAddress: userNewRes?.data?.user?.email,
      props: {
        otp: otpRes?.data?.otp,
      } satisfies EmailWebEmailVerificationType,
    });

    return NextResponse.json({
      success: true,
      message: "Signup Success",
      data: {
        token: TokenDTO(tokenRes?.data?.token),
      },
    });
  });
}
