"use server";

import { LibAWSS3UploadFilesFN } from "@/lib/lib-aws-s3";
import { LibDateCurrentTimestampHelper } from "@/lib/lib-date";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const StoreEventGuestServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventGuest } = creds ?? {};

    if (!event) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Data is required",
          path: ["event"],
        },
      ]);
    }

    const { id: eventId, userId } = event;

    if (!eventId) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event ID is required",
          path: ["eventId"],
        },
      ]);
    }

    if (!userId) {
      throw new ZodError([
        {
          code: "custom",
          message: "User ID is required",
          path: ["userId"],
        },
      ]);
    }

    if (!eventGuest) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Guest data is required",
          path: ["eventGuest"],
        },
      ]);
    }

    const { avatarFile } = eventGuest;

    if (!avatarFile) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Avatar file data is required",
          path: ["file"],
        },
      ]);
    }

    const slug = `event-guest-${LibDateCurrentTimestampHelper()}`;

    const { name, role, description, linkedInUrl, twitterUrl, websiteUrl } =
      eventGuest;

    const fileKey = await LibAWSS3UploadFilesFN({
      eventId,
      userId,
      file: avatarFile,
      fileName: slug,
      folderType: "guest",
      userType: "host",
    });

    if (!fileKey) {
      throw new ZodError([
        {
          code: "custom",
          message: "File Upload Failed",
          path: ["LibAWSS3UploadFiles"],
        },
      ]);
    }

    const eventGuestItem = await prisma.eventGuest.create({
      data: {
        eventModelId: event?.id,
        slug,
        name,
        role,
        description,
        linkedInUrl,
        twitterUrl,
        websiteUrl,
        avatar: fileKey,
      },
    });

    return {
      success: true,
      message: "Event Guest Stored",
      data: {
        eventGuest: eventGuestItem,
      },
    };
  });
};
