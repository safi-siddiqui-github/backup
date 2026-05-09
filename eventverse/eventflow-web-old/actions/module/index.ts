"use server";

import prisma from "@/prisma/database";
import { Module, Prisma } from "@/prisma/generated";

export type ModuleWithSubsTwo = Prisma.ModuleGetPayload<{
  include: {
    category: true;
    event: true;
    scheduleDays: {
      include: {
        scheduleItems: true;
      };
    };
  };
}> | null;

export async function findModule(slug: string): Promise<ModuleWithSubsTwo> {
  return await prisma.module.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: true,
      event: true,
      scheduleDays: {
        include: {
          scheduleItems: true,
        },
      },
    },
  });
}

type moduleAddons = {
  rsvpCapacityLimit?: string;
  rsvpPlusOneLimit?: string;
};

export async function upsertModule(
  data: Partial<Omit<Module, "rsvpCapacityLimit" | "rsvpPlusOneLimit">> &
    moduleAddons,
): Promise<Module> {
  const {
    id,
    rsvpDeadline,
    rsvpCapacityLimit,
    rsvpPlusOneLimit,
    rsvpResponse,
    rsvpAllowPlusOne,
    rsvpEnableWaitlist,
    rsvpCollectDietryInformation,
    rsvpEnableCustomField,
    //
    rsvpPublicRegistration,
    rsvpRequireApproval,
    rsvpAutomaticReminder,
    //
    rsvpPlatform,
    rsvpGiftName,
    rsvpGiftUrl,
    rsvpGiftDescription,
    //
    rsvpTemplate,
    rsvpReminder,
    rsvpCommunicationMessage,
    rsvpCommunicationSmsNotification,
    //
    scheduleMode,
  } = data;

  try {
    return await prisma.module.update({
      where: {
        id: id ?? 0,
      },
      data: {
        ...(rsvpDeadline ? { rsvpDeadline: new Date(rsvpDeadline) } : {}),
        ...(rsvpCapacityLimit
          ? { rsvpCapacityLimit: Number(rsvpCapacityLimit) }
          : {}),
        ...(rsvpPlusOneLimit
          ? { rsvpPlusOneLimit: Number(rsvpPlusOneLimit) }
          : {}),
        ...(rsvpResponse ? { rsvpResponse } : {}),
        rsvpAllowPlusOne: rsvpAllowPlusOne,
        rsvpEnableWaitlist: rsvpEnableWaitlist,
        rsvpCollectDietryInformation: rsvpCollectDietryInformation,
        rsvpEnableCustomField: rsvpEnableCustomField,
        //
        rsvpPublicRegistration: rsvpPublicRegistration,
        rsvpRequireApproval: rsvpRequireApproval,
        rsvpAutomaticReminder: rsvpAutomaticReminder,
        //
        ...(rsvpPlatform ? { rsvpPlatform } : {}),
        ...(rsvpGiftName ? { rsvpGiftName } : {}),
        ...(rsvpGiftUrl ? { rsvpGiftUrl } : {}),
        ...(rsvpGiftDescription ? { rsvpGiftDescription } : {}),
        //
        ...(rsvpTemplate ? { rsvpTemplate } : {}),
        ...(rsvpReminder ? { rsvpReminder } : {}),
        ...(rsvpCommunicationMessage ? { rsvpCommunicationMessage } : {}),
        rsvpCommunicationSmsNotification: rsvpCommunicationSmsNotification,
        //
        ...(scheduleMode ? { scheduleMode } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}
