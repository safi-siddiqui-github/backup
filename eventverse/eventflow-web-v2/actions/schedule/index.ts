"use server";

import prisma from "@/prisma/database";
import {
  Prisma,
  ScheduleAgenda,
  ScheduleDay,
  ScheduleItem,
  ScheduleNotification,
  ScheduleSession,
  ScheduleTrack,
  SkillLevel,
} from "@/prisma/generated";

export async function upsertScheduleDay(
  data: Partial<ScheduleDay>,
): Promise<void> {
  const { id, name, day, moduleId } = data;
  try {
    await prisma.scheduleDay.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        moduleId,
        slug: `schedula-day-${Date.now()}`,
        day: day ? new Date(day) : null,
      },
      update: {
        ...(name ? { name } : {}),
        ...(day ? { day: new Date(day) } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

export type ScheduleDayWithSubs = Prisma.ScheduleDayGetPayload<{
  include: {
    scheduleItems: true;
    scheduleSessions: {
      include: {
        scheduleTrack: true;
      };
    };
  };
}>;

export async function findScheduleDayWhereModuleId(
  moduleId: number,
): Promise<ScheduleDayWithSubs[]> {
  return await prisma.scheduleDay.findMany({
    where: {
      moduleId,
    },
    include: {
      scheduleItems: true,
      scheduleSessions: {
        include: {
          scheduleTrack: true,
        },
      },
    },
  });
}

export type ScheduleDayWithSubsTwo = Prisma.ScheduleDayGetPayload<{
  include: {
    scheduleItems: true;
  };
}>;

export async function findScheduleDay(
  id: number,
): Promise<ScheduleDayWithSubsTwo | null> {
  return await prisma.scheduleDay.findFirst({
    where: {
      id,
    },
    include: {
      scheduleItems: true,
    },
  });
}

export async function deleteScheduleDay(id: number): Promise<null> {
  await prisma.scheduleDay.delete({
    where: {
      id,
    },
  });
  return null;
}

// Schedule Item

export async function findScheduleItem(
  id: number,
): Promise<ScheduleItem | null> {
  return await prisma.scheduleItem.findFirst({
    where: {
      id,
    },
  });
}

export async function deleteScheduleItem(id: number): Promise<null> {
  await prisma.scheduleItem.delete({
    where: {
      id,
    },
  });
  return null;
}

export async function upsertScheduleItem(
  data: Partial<ScheduleItem>,
): Promise<void> {
  const {
    id,
    name,
    description,
    endTime,
    startTime,
    scheduleDayId,
    scheduleAgenda,
    scheduleNotification,
    notificationMessage,
    timezone,
  } = data;
  try {
    await prisma.scheduleItem.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        scheduleDayId,
        slug: `schedula-item-${Date.now()}`,
        startTime,
        endTime,
        description,
        scheduleAgenda,
        scheduleNotification,
        notificationMessage,
        timezone,
      },
      update: {
        ...(name ? { name } : {}),
        ...(startTime ? { startTime } : {}),
        ...(endTime ? { endTime } : {}),
        ...(description ? { description } : {}),
        ...(scheduleAgenda ? { scheduleAgenda } : {}),
        ...(scheduleNotification ? { scheduleNotification } : {}),
        ...(notificationMessage ? { notificationMessage } : {}),
        ...(timezone ? { timezone } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

// Schedule Tracks
export async function findScheduleTrackWhereModuleId(
  moduleId: number,
): Promise<ScheduleTrack[]> {
  return await prisma.scheduleTrack.findMany({
    where: {
      moduleId,
    },
  });
}

export async function upsertScheduleTrack(
  data: Partial<ScheduleTrack>,
): Promise<void> {
  const { id, name, description, color, moduleId } = data;
  try {
    await prisma.scheduleTrack.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        moduleId,
        slug: `schedula-track-${Date.now()}`,
        description,
        color,
      },
      update: {
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(color ? { color } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteScheduleTrack(id: number): Promise<null> {
  await prisma.scheduleTrack.delete({
    where: {
      id,
    },
  });
  return null;
}

export async function findScheduleTrack(
  id: number,
): Promise<ScheduleTrack | null> {
  return await prisma.scheduleTrack.findFirst({
    where: {
      id,
    },
  });
}

// Schedule Sessions

export type ScheduleSessionWithSubs = Prisma.ScheduleSessionGetPayload<{
  include: {
    scheduleTrack: true;
    scheduleDay: true;
  };
}>;

export async function findScheduleSessionWhereModuleId(
  moduleId: number,
): Promise<ScheduleSessionWithSubs[]> {
  return await prisma.scheduleSession.findMany({
    where: {
      moduleId,
    },
    include: {
      scheduleTrack: true,
      scheduleDay: true,
    },
  });
}

export async function deleteScheduleSession(id: number): Promise<null> {
  await prisma.scheduleSession.delete({
    where: {
      id,
    },
  });
  return null;
}

export async function findScheduleSession(
  id: number,
): Promise<ScheduleSession | null> {
  return await prisma.scheduleSession.findFirst({
    where: {
      id,
    },
  });
}

type ScheduleUpsertAddons = {
  scheduleTrackId?: string;
  scheduleDayId?: string;
  capacity?: string;
};

export async function upsertScheduleSession(
  data: Partial<
    Omit<ScheduleSession, "scheduleTrackId" | "scheduleDayId" | "capacity">
  > &
    ScheduleUpsertAddons,
): Promise<void> {
  const {
    id,
    name,
    description,
    moduleId,
    capacity,
    speaker,
    endTime,
    location,
    scheduleAgenda,
    scheduleDayId,
    scheduleTrackId,
    skillLevel,
    startTime,
    tag,
    timezone,
  } = data;
  try {
    await prisma.scheduleSession.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        moduleId,
        slug: `schedula-session-${Date.now()}`,
        description,
        scheduleAgenda,
        scheduleTrackId: Number(scheduleTrackId),
        scheduleDayId: Number(scheduleDayId),
        location,
        timezone,

        startTime,
        endTime,
        capacity: Number(capacity),
        skillLevel,

        speaker,
        tag,
      },
      update: {
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
        ...(scheduleAgenda ? { scheduleAgenda } : {}),
        ...(scheduleTrackId
          ? { scheduleTrackId: Number(scheduleTrackId) }
          : {}),
        ...(scheduleDayId ? { scheduleDayId: Number(scheduleDayId) } : {}),
        ...(location ? { location } : {}),
        ...(timezone ? { timezone } : {}),

        ...(startTime ? { startTime } : {}),
        ...(endTime ? { endTime } : {}),
        ...(capacity ? { capacity: Number(capacity) } : {}),
        ...(skillLevel ? { skillLevel } : {}),

        ...(speaker ? { speaker } : {}),
        ...(tag ? { tag } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

// Enums
export async function findScheduleAgendas(): Promise<ScheduleAgenda[]> {
  return Object.values(ScheduleAgenda);
}
export async function findScheduleNotifications(): Promise<
  ScheduleNotification[]
> {
  return Object.values(ScheduleNotification);
}
export async function findSkillLevels(): Promise<SkillLevel[]> {
  return Object.values(SkillLevel);
}
