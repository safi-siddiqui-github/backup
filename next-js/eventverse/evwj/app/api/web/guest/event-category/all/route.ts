import { GetEventCategoriesServerHelper } from "@/lib-server/lib-event-category";
import { EventCategoriesDTO } from "@/lib/lib-dto";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  return ApiResponseHelper(async () => {
    // const body = await request.json();

    const eventCategoriesRes = await GetEventCategoriesServerHelper();

    if (!eventCategoriesRes?.success) {
      throw new ZodError(eventCategoriesRes?.error ?? []);
    }

    return NextResponse.json({
      success: true,
      message: "Event Categories Fetched",
      data: {
        eventCategories: EventCategoriesDTO(
          eventCategoriesRes?.data?.eventCategories,
        ),
      },
    });
  });
}
