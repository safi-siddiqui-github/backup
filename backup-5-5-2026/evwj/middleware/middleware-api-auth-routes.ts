import { JoseDecryptHelper } from "@/lib/lib-jose";
import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

const protectedApiRoutes = [
  Routes.api.web.auth?.emailVerificationVerify,
  Routes.api.web.auth?.emailVerificationResend,
];

export default async function MiddlewareApiAuthRoutes(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    const { pathname } = request.nextUrl;
    const bearerToken = request.headers.get("Authorization");
    const parts = bearerToken?.split(" ") ?? ["Bearer", ""];
    const encrypted = parts[1];
    const token = await JoseDecryptHelper(encrypted);
    if (
      protectedApiRoutes.some((prefix) =>
        pathname.startsWith(`/api${prefix}`),
      ) &&
      !token
    ) {
      throw new ZodError([
        {
          code: "custom",
          path: ["api-auth-route"],
          message: "Invalid Access",
        },
      ]);
    }
    return {
      success: true,
    };
  });
}
