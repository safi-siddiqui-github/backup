import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { ConstantRoutes } from "./constants/constants-routes";

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const nextReq = request?.nextUrl;
  const path = nextReq?.pathname;
  const method = request?.method as "GET" | "POST";

  if (
    path.startsWith("/_next") ||
    path?.startsWith("/.well-known") ||
    path.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  if (path?.startsWith(ConstantRoutes?.blog?.home)) {
    const isBlogProtectedRoute = createRouteMatcher([
      `${ConstantRoutes?.blog?.dashboard}(.*)`,
      `${ConstantRoutes?.blog?.posts?.home}(.*)`,
    ]);

    const clerkHandler = clerkMiddleware(async (auth, req) => {
      if (isBlogProtectedRoute(req)) {
        await auth.protect();
      }

      return NextResponse.next();
    }, {});

    return clerkHandler(request, event);
  }
}

// export const config = {
//   matcher: [
//     // "/((?!_next|.*\\.ico$).*)",
//     // "/((?!_next).*)",
//     // "/((?!^/_next).*)",
//     // "/((?!.*\\.ico$).*)"
//     // "/((?!.*\\.ico$).*)",
//     // {
//     //   source: "/",
//     // },
//   ],
// };

// /.*/ - match any string
// /^.*/ - match start of string
// ^/api - match specific path
// (?!_next) - the characters must not be _next
// ((?!_next).*) - Match everything… but only if it DOES NOT start with _next
// \.png$ $ means “end of the string”
// .*\..* - .* anything - \. a literal dot . - .* anything after
