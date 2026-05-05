"use server";

import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const StoreEventFaqServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventFaq } = creds ?? {};

    if (!event) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Data is required",
          path: ["event"],
        },
      ]);
    }

    if (!eventFaq) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Faq data is required",
          path: ["eventFaq"],
        },
      ]);
    }

    const slug = `event-faq-${LibDateCurrentTimestampHelper()}`;

    const { question, answer } = eventFaq;

    const eventFaqItem = await prisma.eventFaq.create({
      data: {
        eventModelId: event?.id,
        slug,
        question,
        answer,
      },
    });

    return {
      success: true,
      message: "Event Faq Stored",
      data: {
        eventFaq: eventFaqItem,
      },
    };
  });
};
