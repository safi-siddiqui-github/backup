"use server";

import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const StoreEventVenueServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventVenue } = creds ?? {};

    if (!event) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Data is required",
          path: ["event"],
        },
      ]);
    }

    if (!eventVenue) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Venue data is required",
          path: ["eventVenue"],
        },
      ]);
    }

    const slug = `event-venue-${LibDateCurrentTimestampHelper()}`;

    const {
      name,
      address,
      // latitude,
      // longitude,
      // lat,
      // lng,
      virtualLink,
      virtualLinkPass,
      venueType,
      addressType,
    } = eventVenue;

    const {
      displayName,
      location,
      id: placeId,
      formattedAddress,
    } = addressType ?? {};

    const eventVenueItem = await prisma.eventVenue.create({
      data: {
        eventModelId: event?.id,
        slug,
        name,
        address,
        virtualLink,
        virtualLinkPass,
        venueType,
        placeId,
        latitude: location?.lat,
        longitude: location?.lng,
        formattedAddress,
      },
    });

    return {
      success: true,
      message: "Event Venue Stored",
      data: {
        eventVenue: eventVenueItem,
      },
    };
  });
};
