import { GetEventModulesServerHelper } from "@/lib-server/lib-event-module";
import { EventModulesDTO } from "@/lib/lib-dto";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: Request) {
  return ApiResponseHelper(async () => {
    // const body = await request.json();

    const eventModulesRes = await GetEventModulesServerHelper();

    if (!eventModulesRes?.success) {
      throw new ZodError(eventModulesRes?.error ?? []);
    }

    return NextResponse.json({
      success: true,
      message: "Event Modules Fetched",
      data: {
        eventModules: EventModulesDTO(eventModulesRes?.data?.eventModules),
      },
    });
  });
}
