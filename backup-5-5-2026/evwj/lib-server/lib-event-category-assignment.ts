"use server";

import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const StoreEventCategoryAssignmentServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventCategoryAssignments } = creds ?? {};

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
          message: "Event Id is required",
          path: ["event"],
        },
      ]);
    }

    if (!eventCategoryAssignments || !Array.isArray(eventCategoryAssignments)) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Category Assignment data array is required",
          path: ["eventCategoryAssignments"],
        },
      ]);
    }

    const existing = await prisma.eventCategoryAssignment.findMany({
      where: { eventModelId: eventId },
      select: { eventCategoryId: true },
    });

    const existingIds = existing.map((e) => e.eventCategoryId);

    const newIds = [
      ...new Set(
        eventCategoryAssignments
          .map((e) => e.eventCategoryId)
          .filter((id): id is number => typeof id === "number"),
      ),
    ];

    const toDelete = existingIds.filter((id) => !newIds.includes(id));
    const toCreate = newIds.filter((id) => !existingIds.includes(id));

    if (toDelete.length) {
      await prisma.eventCategoryAssignment.deleteMany({
        where: {
          eventModelId: eventId,
          eventCategoryId: { in: toDelete },
        },
      });
    }

    if (toCreate.length) {
      await prisma.eventCategoryAssignment.createMany({
        data: toCreate.map((id) => ({
          eventModelId: eventId,
          eventCategoryId: id,
        })),
        skipDuplicates: true,
      });
    }

    return {
      success: true,
      message: "Event Category Assignemnt Stored",
      data: {},
    };
  });
};
