import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { NextRequest } from "next/server";

// Ignore Next JS Internals

const ignoredPaths = ["/_next/", "/favicon.ico", "/.well-known/", "/assets/"];

export default async function MiddlewareIgnorePath(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    const { pathname } = request.nextUrl;
    for (const path of ignoredPaths) {
      if (pathname.startsWith(path)) {
        return {
          success: true,
          message: "Ignored Path Detected",
        };
        // return NextResponse.next();
      }
    }
    return {
      success: false,
    };
  });
}
