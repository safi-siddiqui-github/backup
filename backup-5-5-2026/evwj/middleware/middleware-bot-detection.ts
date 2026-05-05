import { envLib } from "@/lib/lib-env";
import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

// Bot Detection
const badAgents = [
  "curl",
  "python",
  "wget",
  "scrapy",
  "axios",
  "java",
  "httpclient",
  "libwww",
  "go-http-client",
];

// curl http://localhost:3000

const internalSecretEnv = envLib.INTERNAL_API_SECRET;

export default async function MiddlewareBotDetection(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    const internalSecret = request.headers.get("X-Internal-Secret");
    if (internalSecret === internalSecretEnv) {
      return { success: true };
    }
    const ua = request.headers.get("User-Agent")?.toLowerCase() || "";
    if (!ua || ua.length < 10) {
      throw new ZodError([
        {
          code: "custom",
          path: ["bot"],
          message: "Blocked Bot",
        },
      ]);
    }
    if (badAgents.some((bad) => ua.includes(bad))) {
      // return new NextResponse("Blocked bot", { status: 403 });
      throw new ZodError([
        {
          code: "custom",
          path: ["bot"],
          message: "Blocked Bot",
        },
      ]);
    }
    return {
      success: true,
    };
  });
}
