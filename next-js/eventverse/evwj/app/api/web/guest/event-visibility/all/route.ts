import { ApiResponseHelper } from "@/lib/lib-responses";
import { EventVisibility } from "@/prisma/generated/enums";
import { NextResponse } from "next/server";

export async function GET() {
  return ApiResponseHelper(async () => {
    const eventVisibilities = Object.values(EventVisibility);
    return NextResponse.json({
      success: true,
      data: {
        eventVisibilities,
      },
    });
  });
}
