import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  return NextResponse.next();

  // return await ApiResponseHelper(async () => {
  //   for (const middleware of [
  //     MiddlewareMethodFirewall,
  //     MiddlewareOriginProtection,
  //     MiddlewareBotDetection,
  //     MiddlewarePathFirewall,
  //     MiddlewareRateLimit,
  //   ]) {
  //     await middleware(request).then((res) => {
  //       if (!res?.success) throw new ZodError(res?.error ?? []);
  //     });
  //   }
  //   const maa = await MiddlewareAwsAmplify(request);
  //   if (!maa?.success && maa?.error) {
  //     if (maa?.error[0]?.path[0] === "auth-route") {
  //       return NextResponse.redirect(
  //         new URL(Routes.web.guest.signin, request.url),
  //       );
  //     } else {
  //       return NextResponse.redirect(
  //         new URL(Routes.web.auth.dashboard, request.url),
  //       );
  //     }
  //   }

  // });
}
