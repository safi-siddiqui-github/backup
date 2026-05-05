"use server";

import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const StoreEventFeatureServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventFeature } = creds ?? {};

    if (!event) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Data is required",
          path: ["event"],
        },
      ]);
    }

    const { id: eventId } = event;

    if (!eventId) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Data id is required",
          path: ["eventId"],
        },
      ]);
    }

    if (!eventFeature) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Feature data is required",
          path: ["eventFeature"],
        },
      ]);
    }

    const slug = `event-feature-${LibDateCurrentTimestampHelper()}`;

    const {
      featureType,
      startDate,
      endDate,
      price,
      nextBillingDate,
      autoRenew,
    } = eventFeature;

    const eventFeatureItem = await prisma.eventFeature.create({
      data: {
        eventModelId: eventId,
        slug,
        featureType,
        startDate,
        endDate,
        price,
        nextBillingDate,
        autoRenew,
      },
    });

    return {
      success: true,
      message: "Event Feature Stored",
      data: {
        eventFeature: eventFeatureItem,
      },
    };
  });
};
