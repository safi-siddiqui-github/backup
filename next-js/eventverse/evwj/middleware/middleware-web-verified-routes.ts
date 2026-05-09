import { GetCookieHelper } from "@/lib/lib-cookie";
import { JoseDecryptHelper } from "@/lib/lib-jose";
import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

const verifieddRoutes = [
  Routes.web.auth.dashboard,
  // Routes.web.auth.dashboardEvents,
];
export default async function MiddlewareWebVerifiedRoutes(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    const { pathname } = request.nextUrl;
    const userCookie = await GetCookieHelper();
    const tokenDecrypt = await JoseDecryptHelper(userCookie?.data?.cookieRes);
    if (
      verifieddRoutes.some((prefix) => pathname.startsWith(prefix)) &&
      !tokenDecrypt?.emailVerified
    ) {
      throw new ZodError([
        {
          code: "custom",
          path: ["verified-route"],
          message: "Invalid Access",
        },
      ]);
    }
    return {
      success: true,
    };
  });
}
