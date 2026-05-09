import {
  SignupEmailVerificationResendSchema,
  SignupEmailVerificationResendSchemaInfer,
} from "@/app/(web)/(guest)/signup-email-verification/_components/validation";
import {
  AmplifyResponseHelper,
  ApiAmplifyResponseHelper,
} from "@/lib/lib-responses";
import { resendSignUpCode } from "aws-amplify/auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiAmplifyResponseHelper(async () => {
    const body = await request.json();
    SignupEmailVerificationResendSchema.parse(body);
    type bodyType = SignupEmailVerificationResendSchemaInfer;
    const { email }: bodyType = body;
    const ampRes = await AmplifyResponseHelper(
      async () =>
        await resendSignUpCode({
          username: email,
        }),
    );
    if (ampRes?.error) {
      throw new ZodError(ampRes?.error);
    }
    return NextResponse.json({
      success: true,
      data: ampRes?.data,
    });
  });
}
