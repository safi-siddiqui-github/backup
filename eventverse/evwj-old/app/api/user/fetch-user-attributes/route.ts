import { ApiAmplifyResponseHelper } from "@/lib/lib-responses";
import { AmplifyServerResponseHelper } from "@/lib/lib-server-responses";
import { fetchUserAttributes } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  return ApiAmplifyResponseHelper(async () => {
    const ampRes = await AmplifyServerResponseHelper(
      async (ctx) => await fetchUserAttributes(ctx),
      request,
      response,
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
