import { GetCookieHelper } from "@/lib/lib-cookie";
import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

const guestRoutes = [
  Routes.web.guest.signin,
  Routes.web.guest.signup,
  Routes.web.guest.forgotPasswordCheckEmail,
  Routes.web.guest.forgotPasswordUpdatePassword,
];

export default async function MiddlewareWebGuestRoutes(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    const { pathname } = request.nextUrl;
    const userCookie = await GetCookieHelper();
    if (
      guestRoutes.some((prefix) => pathname.startsWith(prefix)) &&
      userCookie?.data?.cookieRes
    ) {
      throw new ZodError([
        {
          code: "custom",
          path: ["guest-route"],
          message: "Invalid Access",
        },
      ]);
    }
    return {
      success: true,
    };
  });
}
