import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

// Origin & Referrer Protection
const allowedOrigin = process?.env?.APP_ORIGIN;
// const allowedOrigin = ["localhost:3000", "eventverse-app.com"];

export default async function MiddlewareOriginProtection(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    //
    // Origin & Referrer Protection
    const origin = request.headers.get("host") || "";
    if (origin !== allowedOrigin) {
      // return new NextResponse("Invalid origin", { status: 403 });
      throw new ZodError([
        {
          code: "custom",
          path: ["origin"],
          message: "Invalid Origin",
        },
      ]);
    }
    // For Multiple Origin Support
    // if (origin && !allowedOrigin.includes(origin)) {
    //   // return new NextResponse("Invalid origin", { status: 403 });
    //   throw new ZodError([
    //     {
    //       code: "custom",
    //       path: ["origin"],
    //       message: "Invalid Origin",
    //     },
    //   ]);
    // }
    return {
      success: true,
    };
  });
}
