import { ApiResponseHelper } from "@/lib/lib-responses";
import { EventAgeRestriction } from "@/prisma/generated/enums";
import { NextResponse } from "next/server";

export async function GET() {
  return ApiResponseHelper(async () => {
    const eventAgeRestrictions = Object.values(EventAgeRestriction);
    return NextResponse.json({
      success: true,
      data: {
        eventAgeRestrictions,
      },
    });
  });
}
