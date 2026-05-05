import { ApiResponseHelper } from "@/lib/lib-responses";
import { EventDateType } from "@/prisma/generated/enums";
import { NextResponse } from "next/server";

export async function GET() {
  return ApiResponseHelper(async () => {
    const eventDateTypes = Object.values(EventDateType);
    return NextResponse.json({
      success: true,
      data: {
        eventDateTypes,
      },
    });
  });
}
