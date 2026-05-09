import { ApiResponseHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { NextResponse, type NextRequest } from "next/server";
import MiddlewareWebAuthRoutes from "./middleware-web-auth-routes";
import MiddlewareWebGuestRoutes from "./middleware-web-guest-routes";
import MiddlewareWebVerifiedBlockRoutes from "./middleware-web-verified-block-routes";
import MiddlewareWebVerifiedRoutes from "./middleware-web-verified-routes";

export async function MiddlewareWeb(request: NextRequest) {
  return ApiResponseHelper(async () => {
    const mwgr = await MiddlewareWebGuestRoutes(request);
    if (!mwgr?.success) {
      return NextResponse.redirect(
        new URL(Routes.web.general.home, request.url),
      );
    }

    const mwar = await MiddlewareWebAuthRoutes(request);
    if (!mwar?.success) {
      return NextResponse.redirect(
        new URL(Routes.web.guest.signin, request.url),
      );
    }

    const mwvr = await MiddlewareWebVerifiedRoutes(request);
    if (!mwvr?.success) {
      return NextResponse.redirect(
        new URL(Routes.web.auth.emailVerification, request.url),
      );
    }

    const mwvbr = await MiddlewareWebVerifiedBlockRoutes(request);
    if (!mwvbr?.success) {
      return NextResponse.redirect(
        new URL(Routes.web.auth.dashboard, request.url),
      );
    }

    return NextResponse.next();
  });
}
