"use server";

import prisma from "@/prisma/database";
import {
  Color,
  GuestGroup,
  GuestList,
  Prisma,
  RsvpPlatform,
  RsvpReminder,
  RsvpResponse,
  RsvpTemplate,
} from "@/prisma/generated";

// Guest Group FUNCTIONS

export async function findGuestGroupWhereModuleId(
  moduleId: number,
): Promise<GuestGroup[]> {
  return await prisma.guestGroup.findMany({
    where: {
      moduleId,
    },
  });
}

export async function findGuestGroupWhereEventId(
  eventId: number,
): Promise<GuestGroup[]> {
  return await prisma.guestGroup.findMany({
    where: {
      module: {
        event: {
          id: eventId,
        },
      },
    },
  });
}

type guestGroupAddons = {
  moduleId?: string;
  memberLimit?: string;
};

export async function upsertGuestGroup(
  data: Partial<Omit<GuestGroup, "moduleId" | "memberLimit">> &
    guestGroupAddons,
): Promise<GuestGroup> {
  const { id, name, description, moduleId, memberLimit, color } = data;
  try {
    return await prisma.guestGroup.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        slug: `guest-group-${Date.now()}`,
        description,
        moduleId: Number(moduleId ?? 0),
        memberLimit: Number(memberLimit ?? 0),
        color,
      },
      update: {
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(memberLimit ? { memberLimit: Number(memberLimit) } : {}),
        ...(color ? { color } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function findGuestGroup(id: number): Promise<GuestGroup | null> {
  return await prisma.guestGroup.findFirst({
    where: {
      id,
    },
  });
}

export async function deleteGuestGroup(id: number): Promise<null> {
  await prisma.guestGroup.delete({
    where: {
      id,
    },
  });
  return null;
}

// Guest Group END

// Guest List FUNCTIONS

type GuestListaddons = {
  moduleId?: string;
  plusOne?: string;
  guestGroupId?: string;
};

export async function upsertGuestList(
  data: Partial<Omit<GuestList, "moduleId" | "plusOne" | "guestGroupId">> &
    GuestListaddons,
): Promise<GuestList> {
  const {
    id,
    name,
    email,
    phone,
    plusOne,
    dietryRestriction,
    note,
    moduleId,
    guestGroupId,
  } = data;

  try {
    return await prisma.guestList.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        slug: `guest-list-${Date.now()}`,
        email,
        phone,
        plusOne: Number(plusOne ?? 0),
        dietryRestriction,
        note,
        moduleId: Number(moduleId ?? 0),
        ...(guestGroupId ? { guestGroupId: Number(guestGroupId) } : {}),
      },
      update: {
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(plusOne ? { plusOne: Number(plusOne) } : {}),
        ...(dietryRestriction ? { dietryRestriction } : {}),
        ...(note ? { note } : {}),
        ...(guestGroupId ? { guestGroupId: Number(guestGroupId) } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

export type BulkGuestList = {
  moduleId?: string;
  guestGroupId?: string;
  emailAddresses?: string;
};

export async function createBulkGuestList(data: BulkGuestList): Promise<void> {
  const { moduleId, guestGroupId, emailAddresses } = data;

  if (emailAddresses !== "") {
    const emails = emailAddresses
      ?.split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    for (const each of emails ?? []) {
      const email = each;
      const name = email.split("@")[0];

      try {
        await prisma.guestList.create({
          data: {
            name,
            slug: `guest-list-${Date.now()}`,
            email,
            moduleId: Number(moduleId ?? 0),
            ...(guestGroupId ? { guestGroupId: Number(guestGroupId) } : {}),
          },
        });
      } catch (error) {
        throw error;
      }
    }
  }
}

export type GuestListWithSubs = Prisma.GuestListGetPayload<{
  include: { guestGroup: true };
}>;

export async function findGuestListWhereModuleId(
  moduleId: number,
): Promise<GuestListWithSubs[]> {
  return await prisma.guestList.findMany({
    where: {
      moduleId,
    },
    include: {
      guestGroup: true,
    },
  });
}

export async function findGuestListWhereEventId(
  eventId: number,
): Promise<GuestListWithSubs[]> {
  return await prisma.guestList.findMany({
    where: {
      module: {
        event: {
          id: eventId,
        },
      },
    },
    include: {
      guestGroup: true,
    },
  });
}

export async function findGuestList(id: number): Promise<GuestList | null> {
  return await prisma.guestList.findFirst({
    where: {
      id,
    },
  });
}

export async function deleteGuestList(id: number): Promise<null> {
  await prisma.guestList.delete({
    where: {
      id,
    },
  });
  return null;
}

// Guest List END

// Enums
export async function findColors(): Promise<Color[]> {
  return Object.values(Color);
}
export async function findRsvpResponses(): Promise<RsvpResponse[]> {
  return Object.values(RsvpResponse);
}
export async function findRsvpPlatforms(): Promise<RsvpPlatform[]> {
  return Object.values(RsvpPlatform);
}
export async function findRsvpInvitationTemplates(): Promise<RsvpTemplate[]> {
  return Object.values(RsvpTemplate);
}
export async function findRsvpReminderSchedules(): Promise<RsvpReminder[]> {
  return Object.values(RsvpReminder);
}
