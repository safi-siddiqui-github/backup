import { ApiResponseHelper } from "@/lib/lib-responses";
import { EventRecurringEnd } from "@/prisma/generated/enums";
import { NextResponse } from "next/server";

export async function GET() {
  return ApiResponseHelper(async () => {
    const eventRecurringEnds = Object.values(EventRecurringEnd);
    return NextResponse.json({
      success: true,
      data: {
        eventRecurringEnds,
      },
    });
  });
}
