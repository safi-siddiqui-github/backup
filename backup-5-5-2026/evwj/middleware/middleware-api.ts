import { ApiResponseHelper } from "@/lib/lib-responses";
import MiddlewareApiAuthRoutes from "@/middleware/middleware-api-auth-routes";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

export async function MiddlewareApi(request: NextRequest) {
  return ApiResponseHelper(async () => {
    const apiAuth = await MiddlewareApiAuthRoutes(request);
    if (!apiAuth?.success) {
      throw new ZodError(apiAuth?.error ?? []);
    }

    // const response = NextResponse.next();
    // await MiddlewareApiCors(request, response)
    // response.headers.set(
    //   "Access-Control-Allow-Methods",
    //   "GET, POST, PUT, DELETE, OPTIONS",
    // );
    // response.headers.set(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization",
    // );
    // response.headers.set("Access-Control-Allow-Credentials", "*");

    return NextResponse.next();
    // return response;
  });
}
