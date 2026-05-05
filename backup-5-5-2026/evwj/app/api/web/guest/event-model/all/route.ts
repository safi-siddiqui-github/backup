import { AllEventModelServerHelper } from "@/lib-server/lib-event-model";
import { ApiResponseHelper, ResponseDataType } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const req = await request?.json();
    const eventModelInlcude = JSON.parse(
      req?.include,
    ) as ResponseDataType["eventModelInlcude"];

    const eventRes = await AllEventModelServerHelper({
      eventModelInlcude,
    });

    if (!eventRes?.success) {
      throw new ZodError(eventRes?.error ?? []);
    }

    return NextResponse.json({
      success: true,
      message: "Event Model All",
      data: {
        events: eventRes?.data?.events,
      },
    });
  });
}
