import {
  SignupEmailVerificationSchema,
  SignupEmailVerificationSchemaInfer,
} from "@/app/(web)/(guest)/signup-email-verification/_components/validation";
import {
  AmplifyResponseHelper,
  ApiAmplifyResponseHelper,
} from "@/lib/lib-responses";
import { confirmSignUp } from "aws-amplify/auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiAmplifyResponseHelper(async () => {
    const body = await request.json();
    SignupEmailVerificationSchema.parse(body);
    type bodyType = SignupEmailVerificationSchemaInfer;
    const { email, token }: bodyType = body;
    const ampRes = await AmplifyResponseHelper(
      async () =>
        await confirmSignUp({
          username: email,
          confirmationCode: token,
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
