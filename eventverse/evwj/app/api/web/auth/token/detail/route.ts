import { VerifyTokenServerHelper } from "@/lib-server/lib-token-server";
import { TokenDTO } from "@/lib/lib-dto";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const verifyRes = await VerifyTokenServerHelper(request);
    if (!verifyRes?.success) {
      throw new ZodError(verifyRes?.error ?? []);
    }

    return NextResponse.json({
      success: true,
      message: "Token Details",
      data: {
        token: TokenDTO(verifyRes?.data?.token),
      },
    });
  });
}
