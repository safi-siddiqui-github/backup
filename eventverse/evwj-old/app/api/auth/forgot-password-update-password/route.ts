import {
  ForgotPasswordUpdatePasswordSchema,
  ForgotPasswordUpdatePasswordSchemaInfer,
} from "@/app/(web)/(guest)/forgot-password/update-password/_components/validation";
import {
  AmplifyResponseHelper,
  ApiAmplifyResponseHelper,
} from "@/lib/lib-responses";
import { confirmResetPassword } from "aws-amplify/auth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiAmplifyResponseHelper(async () => {
    const body = await request.json();
    ForgotPasswordUpdatePasswordSchema.parse(body);
    type bodyType = ForgotPasswordUpdatePasswordSchemaInfer;
    const { email, token, password }: bodyType = body;
    const ampRes = await AmplifyResponseHelper(
      async () =>
        await confirmResetPassword({
          username: email,
          confirmationCode: token,
          newPassword: password,
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
