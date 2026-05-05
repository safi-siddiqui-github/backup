import { CreateTokenServerHelper } from "@/lib-server/lib-token-server";
import { VerifyUserEmailExistPasswordValidServerHelper } from "@/lib-server/lib-user-server";
import { TokenDTO } from "@/lib/lib-dto";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { WebSigninSchema } from "./_private/validation";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const body = await request.json();
    WebSigninSchema.parse(body);

    const userEepvRes = await VerifyUserEmailExistPasswordValidServerHelper({
      user: body,
    });
    if (!userEepvRes?.success) {
      throw new ZodError(userEepvRes?.error ?? []);
    }

    const tokenRes = await CreateTokenServerHelper({
      user: userEepvRes?.data?.user,
    });
    if (!tokenRes?.success) {
      throw new ZodError(tokenRes?.error ?? []);
    }

    return NextResponse.json({
      success: true,
      message: "Signin Success",
      data: {
        token: TokenDTO(tokenRes?.data?.token),
      },
    });
  });
}
