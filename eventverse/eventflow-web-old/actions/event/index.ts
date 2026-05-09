"use server";

import prisma from "@/prisma/database";
import {
  Event,
  LaunchStrategy,
  Prisma,
  RecurringEnd,
  RecurringPattern,
  Timezone,
  VenueType,
} from "@/prisma/generated";
import { getUser } from "../user";

type addons = {
  hostId?: string;
  categoryId?: string;
  recurringRepeat?: string;
  recurringEndId?: string;
  recurringOccerrence?: string;
  venueCapacity?: string;
};

export async function upsertEvent(
  data: Partial<
    Omit<
      Event,
      | "hostId"
      | "categoryId"
      | "recurringRepeat"
      | "recurringEndId"
      | "recurringOccerrence"
      | "venueCapacity"
    >
  > &
    addons,
): Promise<Event> {
  const {
    id,
    hostId,
    categoryId,
    name,
    description,
    slug,
    isPublic,
    recurringRepeat,
    recurringEndId,
    recurringOccerrence,
    isVenueEnabled,
    venueName,
    venueType,
    venueAddress,
    venueLink,
    venueCapacity,
    venueFeature,
    launchStrategy,
    isDraft,
    step,
  } = data;

  try {
    const user = await getUser(hostId ?? "");

    return await prisma.event.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name: `Event-${Date.now()}`,
        slug: `event-${Date.now()}`,
        hostId: user?.id ?? 0,
        isDraft: true,
      },
      update: {
        // isDraft: isDraft,
        ...(step ? { step } : {}),
        //
        ...(name ? { name } : {}),
        ...(slug ? { slug } : {}),
        isPublic: isPublic,
        ...(description ? { description } : {}),
        ...(categoryId ? { categoryId: Number(categoryId) } : {}),
        //
        isVenueEnabled: isVenueEnabled,
        ...(venueName ? { venueName } : {}),
        ...(venueType ? { venueType } : {}),
        ...(venueCapacity ? { venueCapacity: Number(venueCapacity) } : {}),
        ...(venueFeature ? { venueFeature } : {}),
        ...(venueAddress ? { venueAddress } : {}),
        ...(venueLink ? { venueLink } : {}),
        ...(isVenueEnabled === false
          ? {
              venueName: null,
              venueType: "NONE",
              venueAddress: null,
              venueLink: null,
              venueCapacity: null,
              venueFeature: null,
            }
          : {}),
        //
        ...(launchStrategy ? { launchStrategy } : {}),
        //
        // ...(startTime ? { startTime } : {}),
        // ...(startDate ? { startDate: new Date(startDate) } : {}),
        // isMultiDayEvent: isMultiDayEvent,
        // ...(endTime ? { endTime } : {}),
        // ...(endDate ? { endDate: new Date(endDate) } : {}),
        // ...(isMultiDayEvent === false ? { endDate: null } : {}),
        // ...(timezone ? { timezone } : {}),
        //
        // isRecurringEvent: isRecurringEvent,
        // ...(recurringPatternId
        //   ? { recurringPatternId: Number(recurringPatternId) }
        //   : {}),
        // ...(recurringRepeat
        //   ? { recurringRepeat: Number(recurringRepeat) }
        //   : {}),
        // ...(recurringEndId ? { recurringEndId: Number(recurringEndId) } : {}),
        // ...(recurringOccerrence
        //   ? { recurringOccerrence: Number(recurringOccerrence) }
        //   : {}),
        // ...(recurringEndDate
        //   ? { recurringEndDate: new Date(recurringEndDate) }
        //   : {}),
        // ...(isRecurringEvent === false
        //   ? {
        //       recurringPatternId: null,
        //       recurringRepeat: null,
        //       recurringEndId: null,
        //       recurringOccerrence: null,
        //       recurringEndDate: null,
        //     }
        //   : {}),
        //
      },
    });
  } catch (error) {
    throw error;
  }
}

// Find Events

export type EventWithSubs = Prisma.EventGetPayload<{
  include: { category: true };
}>;

export async function findEvents(): Promise<EventWithSubs[]> {
  return await prisma.event.findMany({
    include: {
      category: true,
    },
  });
}

export type EventWithSubsTwo = Prisma.EventGetPayload<{
  include: {
    category: true;
    modules: {
      include: {
        category: true;
      };
    };
  };
}> | null;

export async function findEvent(slug: string): Promise<EventWithSubsTwo> {
  return await prisma.event.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          subCategories: true,
        },
      },
      modules: {
        include: {
          category: true,
        },
      },
    },
  });
}

export async function deleteEvent(id: number): Promise<null> {
  await prisma.event.delete({
    where: {
      id,
    },
  });
  return null;
}

// Find Category

export type CategoryWithSubs = Prisma.CategoryGetPayload<{
  include: { subCategories: true };
}>;

export async function findCategories(
  debounceSearchCategory?: string,
): Promise<CategoryWithSubs[]> {
  return await prisma.category.findMany({
    where: debounceSearchCategory
      ? {
          OR: [
            { name: { contains: debounceSearchCategory, mode: "insensitive" } },
            {
              subCategories: {
                some: {
                  name: {
                    contains: debounceSearchCategory,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        }
      : {
          parentId: null,
        },
    include: {
      subCategories: true,
    },
  });
}

// Find Module Categories

export type ModuleCategoryWithSubs = Prisma.ModuleCategoryGetPayload<{
  include: { subCategories: true };
}>;

export async function findModuleCategories(): Promise<
  ModuleCategoryWithSubs[]
> {
  return await prisma.moduleCategory.findMany({
    where: {
      parentId: null,
    },
    include: {
      subCategories: true,
    },
  });
}

// Upsert Modules
type UpsertModules = {
  moduleCategoryIds: number[];
  eventId: number;
};

export async function upsertModules(values: UpsertModules) {
  const { moduleCategoryIds, eventId } = values;

  moduleCategoryIds?.forEach(async (each) => {
    const category = await prisma.moduleCategory.findFirst({
      where: {
        id: each,
      },
    });

    await prisma.module.upsert({
      where: {
        categoryId_eventId: {
          categoryId: each,
          eventId,
        },
      },
      create: {
        slug: `${category?.slug}-${Date.now()}`,
        categoryId: each,
        eventId,
      },
      update: {
        isActive: true,
      },
    });
  });

  await prisma.module.updateMany({
    where: {
      categoryId: {
        notIn: moduleCategoryIds,
      },
    },
    data: {
      isActive: false,
    },
  });
}

// Find Event Modules

export type ModuleWithSubs = Prisma.ModuleGetPayload<{
  include: { category: true };
}>;

export async function findModulesWhereEventId(
  eventId: number,
): Promise<ModuleWithSubs[]> {
  return await prisma.module.findMany({
    where: {
      eventId,
      isActive: true,
    },
    include: {
      category: true,
    },
  });
}

// Enums
export async function findTimezones(): Promise<Timezone[]> {
  return Object.values(Timezone);
}
export async function findRecurringPatterns(): Promise<RecurringPattern[]> {
  return Object.values(RecurringPattern);
}
export async function findRecurringEnds(): Promise<RecurringEnd[]> {
  return Object.values(RecurringEnd);
}
export async function findVenueTypes(): Promise<VenueType[]> {
  return Object.values(VenueType);
}
export async function findLaunchStrategies(): Promise<LaunchStrategy[]> {
  return Object.values(LaunchStrategy);
}
