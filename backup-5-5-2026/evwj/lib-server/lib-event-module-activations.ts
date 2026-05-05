"use server";

import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const StoreEventModuleActivationServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { event, eventModuleActivations } = creds ?? {};

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

    if (!eventModuleActivations || !Array.isArray(eventModuleActivations)) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event Module Activation data array is required",
          path: ["eventModuleActivations"],
        },
      ]);
    }

    const existing = await prisma.eventModuleActivation.findMany({
      where: { eventModelId: eventId },
      select: { eventModuleId: true },
    });

    const existingIds = existing.map((e) => e.eventModuleId);

    const newIds = [
      ...new Set(
        eventModuleActivations
          .map((e) => e.eventModuleId)
          .filter((id): id is number => typeof id === "number"),
      ),
    ];

    const toDelete = existingIds.filter((id) => !newIds.includes(id));
    const toCreate = newIds.filter((id) => !existingIds.includes(id));

    if (toDelete.length) {
      await prisma.eventModuleActivation.deleteMany({
        where: {
          eventModelId: eventId,
          eventModuleId: { in: toDelete },
        },
      });
    }

    if (toCreate.length) {
      await prisma.eventModuleActivation.createMany({
        data: toCreate.map((id) => ({
          eventModelId: eventId,
          eventModuleId: id,
        })),
        skipDuplicates: true,
      });
    }

    return {
      success: true,
      message: "Event Module Activation Stored",
      data: {},
    };
  });
};
