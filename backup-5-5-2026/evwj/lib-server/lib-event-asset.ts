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

export const StoreEventAssetServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventAsset } = creds ?? {};

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

    if (!eventAsset) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Asset data is required",
          path: ["eventAsset"],
        },
      ]);
    }

    const { assetFile } = eventAsset;

    if (!assetFile) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Asset file data is required",
          path: ["file"],
        },
      ]);
    }

    const slug = `event-asset-${LibDateCurrentTimestampHelper()}`;

    const fileKey = await LibAWSS3UploadFilesFN({
      eventId,
      userId,
      file: assetFile,
      fileName: slug,
      folderType: "banner",
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

    const eventAssetItem = await prisma.eventAsset.create({
      data: {
        eventModelId: event?.id,
        slug,
        name: fileKey,
        size: assetFile?.size ?? 0,
        type: assetFile?.type ?? 0,
      },
    });

    return {
      success: true,
      message: "Event Asset Stored",
      data: {
        eventAsset: eventAssetItem,
      },
    };
  });
};
