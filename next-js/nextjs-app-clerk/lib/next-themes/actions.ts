"use server";

import { cookies } from "next/headers";

export const HeaderGetNextThemeCookieAction = async () => {
  const headersNext = await cookies();
  const themeCookie = headersNext?.get("nextTheme");
  return themeCookie;
};

export const HeaderSetNextThemeCookieAction = async (theme: string) => {
  const headersNext = await cookies();
  headersNext?.set("nextTheme", theme);
  return null;
};
