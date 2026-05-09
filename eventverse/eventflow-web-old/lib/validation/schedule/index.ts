import {
  Color,
  ScheduleAgenda,
  ScheduleNotification,
  SkillLevel,
  Timezone,
} from "@/prisma/generated";
import z from "zod";

export const scheduleDaySchema = z.object({
  name: z.string().min(3, { error: "Name must have 3 charaters" }),
  day: z.iso.date({ error: "Day is required" }),
});

export const scheduleItemSchema = z.object({
  name: z.string().min(3, { error: "Name must have 3 charaters" }),
  startTime: z.string().min(1, { error: "Start Time is required" }),
  endTime: z.string().min(1, { error: "End Time is required" }),
  description: z.string(),
  timezone: z.enum(Timezone),
  scheduleAgenda: z.enum(ScheduleAgenda),
  scheduleNotification: z.enum(ScheduleNotification),
  notificationMessage: z.string(),
});

export const scheduleTrackSchema = z.object({
  name: z.string().min(3, { error: "Name must have 3 charaters" }),
  description: z.string(),
  color: z.enum(Color),
});

export const scheduleSessionSchema = z
  .object({
    name: z.string().min(3, { error: "Name must have 3 charaters" }),
    description: z.string(),

    startTime: z.iso.time({ error: "Start Time is required" }),
    endTime: z.iso.time({ error: "End Time is required" }),

    scheduleTrackId: z.string(),
    scheduleDayId: z.string().min(1, { error: "Schedule Day is required" }),

    capacity: z.string(),
    location: z.string(),
    speaker: z.string(),
    tag: z.string(),

    scheduleAgenda: z.enum(ScheduleAgenda),
    skillLevel: z.enum(SkillLevel),
    timezone: z.enum(Timezone),
  })
  .superRefine((data, ctx) => {
    if (data.capacity) {
      // Must be a valid Number
      const capacity = Number(data.capacity);
      if (isNaN(capacity)) {
        ctx.addIssue({
          path: ["capacity"],
          code: "custom",
          message: "Capacity must be a valid number",
        });
      }
    }
  });
