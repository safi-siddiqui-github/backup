import { GetCookieHelper } from "@/lib/lib-cookie";
import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

const protectedRoutes = [
  Routes.web.auth.dashboard,
  Routes.web.auth.emailVerification,
  // Routes.web.auth.dashboardEvents,
];
export default async function MiddlewareWebAuthRoutes(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    const { pathname } = request.nextUrl;
    const userCookie = await GetCookieHelper();
    if (
      protectedRoutes.some((prefix) => pathname.startsWith(prefix)) &&
      !userCookie?.data?.cookieRes
    ) {
      throw new ZodError([
        {
          code: "custom",
          path: ["auth-route"],
          message: "Invalid Access",
        },
      ]);
    }
    return {
      success: true,
    };
  });
}
