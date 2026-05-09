import {
  ChairLayout,
  RsvpPlatform,
  RsvpReminder,
  RsvpResponse,
  ScheduleAgenda,
  ScheduleNotification,
  SeatingType,
} from "@/prisma/generated";
import { format, parse } from "date-fns";

// export function formatToTime(date: Date | null) {
//   const hours = date?.getHours().toString().padStart(2, "0");
//   const minutes = date?.getMinutes().toString().padStart(2, "0");
//   return `${hours}:${minutes}`;
// }

export function formatDateToInputDate(date?: Date | null) {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
}

export function formatDateToString(date?: Date | null) {
  if (!date) return "";
  return format(date, "MMM d, y");
}

export function formatStringToTime(time?: string | null) {
  if (!time) return "";

  // Parse string like "11:30" into a Date
  const parsed = parse(time, "HH:mm", new Date());

  // Format into 12-hour format with AM/PM
  return format(parsed, "hh:mm a");
}

export function formatLowercase(text?: string | ScheduleAgenda | null) {
  if (!text) return "";
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1).toLowerCase()}`;
}

export function formatScheduleNotification(
  text?: string | ScheduleNotification | null,
) {
  if (!text) return "";

  if (text.startsWith("MINUTE")) {
    const minutes = text.replace("MINUTE", "");
    return `${minutes} Minutes`;
  }

  if (text.startsWith("HOUR")) {
    const hours = text.replace("HOUR", "");
    return `${hours} ${hours === "1" ? "Hour" : "Hours"}`;
  }

  if (text.startsWith("DAY")) {
    const days = text.replace("DAY", "");
    return `${days} ${days === "1" ? "Day" : "Days"}`;
  }

  return formatLowercase(text);
}

export function formatRsvpResponse(text?: string | RsvpResponse | null) {
  if (!text) return "";

  if (text == "YESNO") {
    return "Yes/No";
  }

  if (text == "YESNOMAYBE") {
    return "Yes/No/Maybe";
  }

  if (text == "CUSTOM") {
    return "Custom";
  }

  return formatLowercase(text);
}

export function formatRsvpPlatform(text?: string | RsvpPlatform | null) {
  if (!text) return "";

  if (text == "BEDBATHBEYOND") {
    return "Bed Bath & Beyond";
  }

  if (text == "WILLIAMSSONOMA") {
    return "Williams Sonoma";
  }

  if (text == "HONEYMOONFUND") {
    return "Honeymoon Fund";
  }

  if (text == "CUSTOM") {
    return "Custom";
  }

  return formatLowercase(text);
}

export function formatRsvpReminder(text?: string | RsvpReminder | null) {
  if (!text) return "";

  if (text == "STANDARD") {
    return "Standard (2 weeks, 1 week, 3 days)";
  }

  if (text == "FREQUENT") {
    return "Frequent (2 weeks, 1 week, 3 days, 1 day)";
  }

  if (text == "MINIMAL") {
    return "Minimal (1 week, 3 days)";
  }

  if (text == "CUSTOM") {
    return "Custom";
  }

  return formatLowercase(text);
}

export function formatSchuduleViewPluginTime(text?: string | null): number {
  if (!text) return 0;

  return Number(text?.replace(":", "."));
}

export function formatDayTime(
  date?: Date | string | null,
  time?: string | null,
): Date {
  if (!date || !time) return new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

export function formatSeatingType(text?: string | SeatingType | null) {
  if (!text) return "";

  if (text == "DANCEFLOOR") {
    return "Dance Floor";
  }

  return formatLowercase(text);
}

export function formatChairLayout(text?: string | ChairLayout | null) {
  if (!text) return "";

  if (text == "SINGLE") {
    return "Single Chair";
  }

  if (text == "GRID") {
    return "Grid Layout (Multiple Chair)";
  }

  return formatLowercase(text);
}
