import { ApiResponseHelper } from "@/lib/lib-responses";
import { EventVenueType } from "@/prisma/generated/enums";
import { NextResponse } from "next/server";

export async function GET() {
  return ApiResponseHelper(async () => {
    const eventVenueTypes = Object.values(EventVenueType);
    return NextResponse.json({
      success: true,
      data: {
        eventVenueTypes,
      },
    });
  });
}
