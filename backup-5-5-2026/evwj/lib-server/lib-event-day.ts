"use server";

import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const StoreEventDayServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventDay } = creds ?? {};

    if (!event) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Data is required",
          path: ["event"],
        },
      ]);
    }

    if (!eventDay) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Day data is required",
          path: ["eventDay"],
        },
      ]);
    }

    const slug = `event-day-${LibDateCurrentTimestampHelper()}`;

    const {
      eventDateType,
      eventDate,
      timezone,
      startTime,
      endTime,
      eventRecurringPattern,
      eventRecurringEnd,
      recurringEndDate,
      recurringEndOccurrences,
    } = eventDay;

    const eventDayItem = await prisma.eventDay.create({
      data: {
        eventModelId: event?.id,
        slug,
        eventDateType,
        eventDate,
        timezone,
        startTime,
        endTime,
        eventRecurringPattern,
        eventRecurringEnd,
        recurringEndDate,
        recurringEndOccurrences,
      },
    });

    return {
      success: true,
      message: "Event Day Stored",
      data: {
        eventDay: eventDayItem,
      },
    };
  });
};
