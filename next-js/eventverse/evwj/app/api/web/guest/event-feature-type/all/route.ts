import { ApiResponseHelper } from "@/lib/lib-responses";
import { EventFeatureType } from "@/prisma/generated/enums";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return ApiResponseHelper(async () => {
    const eventFeatureTypes = Object.values(EventFeatureType);
    return NextResponse.json({
      success: true,
      data: {
        eventFeatureTypes,
      },
    });
  });
}
