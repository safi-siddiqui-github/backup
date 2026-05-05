import {
  ForgotPasswordCheckEmailSchema,
  ForgotPasswordCheckEmailSchemaInfer,
} from "@/app/(web)/(guest)/forgot-password/check-email/_components/validation";
import {
  AmplifyResponseHelper,
  ApiAmplifyResponseHelper,
} from "@/lib/lib-responses";
import { resetPassword } from "aws-amplify/auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiAmplifyResponseHelper(async () => {
    const body = await request.json();
    ForgotPasswordCheckEmailSchema.parse(body);
    type bodyType = ForgotPasswordCheckEmailSchemaInfer;
    const { email }: bodyType = body;
    const ampRes = await AmplifyResponseHelper(
      async () =>
        await resetPassword({
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
