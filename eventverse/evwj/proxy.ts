import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { ApiResponseHelper } from "./lib/lib-responses";
import { MiddlewareApi } from "./middleware/middleware-api";
import MiddlewareBotDetection from "./middleware/middleware-bot-detection";
import MiddlewareIgnorePath from "./middleware/middleware-ignore-path";
import MiddlewareMethodFirewall from "./middleware/middleware-method-firewall";
import MiddlewareOriginProtection from "./middleware/middleware-origin-protection";
import MiddlewarePathFirewall from "./middleware/middleware-path-firewall";
import MiddlewareRateLimit from "./middleware/middleware-rate-limit";
import { MiddlewareWeb } from "./middleware/middleware-web";

export async function proxy(request: NextRequest) {
  return await ApiResponseHelper(async () => {
    const mip = await MiddlewareIgnorePath(request);
    if (mip?.success) {
      return NextResponse.next();
    }

    for (const middleware of [
      MiddlewareMethodFirewall,
      MiddlewareOriginProtection,
      MiddlewareBotDetection,
      MiddlewarePathFirewall,
      MiddlewareRateLimit,
    ]) {
      await middleware(request).then((res) => {
        if (!res?.success) throw new ZodError(res?.error ?? []);
      });
    }

    const isApiRequest = request.nextUrl.pathname.startsWith("/api");

    if (isApiRequest) {
      return await MiddlewareApi(request);
    }

    return await MiddlewareWeb(request);
  });
}
