import { ApiResponseHelper } from "@/lib/lib-responses";
import { EventRecurringPattern } from "@/prisma/generated/enums";
import { NextResponse } from "next/server";

export async function GET() {
  return ApiResponseHelper(async () => {
    const eventRecurringPatterns = Object.values(EventRecurringPattern);
    return NextResponse.json({
      success: true,
      data: {
        eventRecurringPatterns,
      },
    });
  });
}
