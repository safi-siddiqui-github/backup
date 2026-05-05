"use server";

import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";
import { StoreEventAssetServerHelper } from "./lib-event-asset";
import { StoreEventCategoryAssignmentServerHelper } from "./lib-event-category-assignment";
import { StoreEventDayServerHelper } from "./lib-event-day";
import { StoreEventFaqServerHelper } from "./lib-event-faq";
import { StoreEventFeatureServerHelper } from "./lib-event-feature";
import { StoreEventGuestServerHelper } from "./lib-event-guest";
import { StoreEventModuleActivationServerHelper } from "./lib-event-module-activations";
import { StoreEventVenueServerHelper } from "./lib-event-venue";

export const StoreEventModelServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const {
      event,
      eventDays,
      eventVenues,
      eventAssets,
      eventFaqs,
      eventGuests,
    } = creds ?? {};

    if (!event) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Data is required",
          path: ["event"],
        },
      ]);
    }

    if (!event?.userId) {
      throw new ZodError([
        {
          code: "custom",
          message: "User Id is required",
          path: ["event"],
        },
      ]);
    }

    if (!eventDays) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Day Data is required",
          path: ["eventDays"],
        },
      ]);
    }

    if (!eventVenues) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Venue Data is required",
          path: ["eventVenues"],
        },
      ]);
    }

    if (!eventAssets) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Asset Data is required",
          path: ["eventAssets"],
        },
      ]);
    }

    if (!eventFaqs) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Faq Data is required",
          path: ["eventFaqs"],
        },
      ]);
    }

    if (!eventGuests) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Guest Data is required",
          path: ["eventGuests"],
        },
      ]);
    }

    const eventSlug = `event-model-${LibDateCurrentTimestampHelper()}`;

    const eventModel = await prisma.eventModel.create({
      data: {
        userId: event?.userId,
        name: event?.name,
        slug: eventSlug,
        visibility: event?.visibility,
        description: event?.description,
        ageRestriction: event?.ageRestriction,
      },
    });

    if (!eventModel) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event not saved",
          path: ["event"],
        },
      ]);
    }

    if (
      event?.eventCategoryAssignments &&
      Array.isArray(event.eventCategoryAssignments)
    ) {
      const evCatRes = await StoreEventCategoryAssignmentServerHelper({
        event: eventModel,
        eventCategoryAssignments: event.eventCategoryAssignments,
      });

      if (!evCatRes?.success) {
        throw new ZodError(evCatRes?.error ?? []);
      }
    }

    if (
      event?.eventModuleActivations &&
      Array.isArray(event.eventModuleActivations)
    ) {
      const evModAct = await StoreEventModuleActivationServerHelper({
        event: eventModel,
        eventModuleActivations: event.eventModuleActivations,
      });

      if (!evModAct?.success) {
        throw new ZodError(evModAct?.error ?? []);
      }
    }

    if (event?.eventFeatures && Array.isArray(event.eventFeatures)) {
      const evFetRes = await StoreEventFeatureServerHelper({
        event: eventModel,
        eventFeature: event.eventFeatures?.at(0),
      });

      if (!evFetRes?.success) {
        throw new ZodError(evFetRes?.error ?? []);
      }
    }

    if (eventDays && Array.isArray(eventDays)) {
      for (const eventDay of eventDays) {
        const evRes = await StoreEventDayServerHelper({
          event: eventModel,
          eventDay,
        });

        if (!evRes?.success) {
          throw new ZodError(evRes?.error ?? []);
        }
      }
    }

    if (eventVenues && Array.isArray(eventVenues)) {
      for (const eventVenue of eventVenues) {
        const evVenRes = await StoreEventVenueServerHelper({
          event: eventModel,
          eventVenue,
        });

        if (!evVenRes?.success) {
          throw new ZodError(evVenRes?.error ?? []);
        }
      }
    }

    if (eventGuests && Array.isArray(eventGuests)) {
      for (const eventGuestItem of eventGuests) {
        const evGstRes = await StoreEventGuestServerHelper({
          event: eventModel,
          eventGuest: eventGuestItem,
        });

        if (!evGstRes?.success) {
          throw new ZodError(evGstRes?.error ?? []);
        }
      }
    }

    if (eventFaqs && Array.isArray(eventFaqs)) {
      for (const eventFaqItem of eventFaqs) {
        const evFaqRes = await StoreEventFaqServerHelper({
          event: eventModel,
          eventFaq: eventFaqItem,
        });

        if (!evFaqRes?.success) {
          throw new ZodError(evFaqRes?.error ?? []);
        }
      }
    }

    if (eventAssets && Array.isArray(eventAssets)) {
      for (const eventAssetItem of eventAssets) {
        const evAstRes = await StoreEventAssetServerHelper({
          event: eventModel,
          eventAsset: eventAssetItem,
        });

        if (!evAstRes?.success) {
          throw new ZodError(evAstRes?.error ?? []);
        }
      }
    }

    return {
      success: true,
      message: "Event Model Stored",
      data: {
        // event: eventModel,
      },
    };
  });
};

export const AllEventModelServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { eventModelInlcude } = creds ?? {};

    const eventModels = await prisma.eventModel.findMany({
      include: eventModelInlcude,
    });

    return {
      success: true,
      message: "Event Model All",
      data: {
        events: eventModels,
      },
    };
  });
};
