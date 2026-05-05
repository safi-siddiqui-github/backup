import { OrNull } from "@/type/type-model";
import { format, set as setFNS } from "date-fns";

export function LibDateFormatHelper(date?: OrNull<string | Date>): string {
  if (date instanceof Date) {
    return date?.toDateString();
  }

  if (typeof date === "string") {
    return new Date(date ?? "")?.toDateString();
  }

  return "";
}

export function LibTimeFormatHelper(date?: OrNull<string | Date>): string {
  if (date instanceof Date) {
    return format(date, "HH:mm");
  }

  if (typeof date === "string") {
    return format(new Date(date ?? ""), "HH:mm");
  }

  return "";
}

export function LibDateToISOFormatHelper(date?: OrNull<string | Date>): string {
  if (date instanceof Date) {
    return date?.toISOString();
  }

  if (typeof date === "string") {
    return new Date(date ?? "")?.toISOString();
  }

  return "";
}

export function LibDateCurrentTimestampHelper(): number {
  return Date.now();
}

export function LibDateFormatHelper2(date?: OrNull<string | Date>): string {
  const formater = "yyyy-MM-dd";

  if (date instanceof Date) {
    return format(date, formater);
  }

  if (typeof date === "string") {
    return new Date(date ?? "")?.toDateString();
  }

  return "";
}
export function LibTime24To12FormatHelper(time?: string | null): string {
  if (!time) return "";

  const [hour, minute] = time.split(":").map(Number);

  const date = setFNS(new Date(), {
    hours: hour,
    minutes: minute,
    seconds: 0,
    milliseconds: 0,
  });

  return format(date, "hh:mm a"); // → 11:59 PM
}
