import { isAfter, isEqual, parseISO, startOfToday } from "date-fns";
import type { RefinementCtx } from "zod";

/* ---------- Event date (today or future) ---------- */
export function validateEventDateNotPastHelper(
  eventDate: string | undefined,
  // eventDate: Date | undefined,
  ctx: RefinementCtx,
  path: string[] = ["eventDate"],
) {
  if (!eventDate) return;

  const date = parseISO(eventDate);
  const today = startOfToday();

  if (!isAfter(date, today) && !isEqual(date, today)) {
    // if (!isAfter(eventDate, today) && !isEqual(eventDate, today)) {
    ctx.addIssue({
      code: "custom",
      message: "Event date cannot be in the past",
      path,
    });
  }
}

/* ---------- Start / End time ---------- */
export function validateTimeRangeHelper(
  eventDate: string | undefined,
  // eventDate: Date | undefined,
  startTime: string | undefined,
  endTime: string | undefined,
  ctx: RefinementCtx,
  endPath: string[] = ["endTime"],
) {
  if (!startTime || !endTime) return;

  const baseDate = (eventDate ?? new Date().toISOString())?.split("T")[0];

  // if (!startTime || !endTime) return;

  const start = parseISO(`${baseDate}T${startTime}`);
  const end = parseISO(`${baseDate}T${endTime}`);
  // const start = parseISO(startTime);
  // const end = parseISO(endTime);

  // console.log(
  //   start,
  //   startTime,
  //   end,
  //   endTime,
  //   baseDate,
  //   isAfter(endTime, startTime),
  // );

  if (!isAfter(end, start)) {
    ctx.addIssue({
      code: "custom",
      message: "End time must be after start time",
      path: endPath,
    });
  }
}
