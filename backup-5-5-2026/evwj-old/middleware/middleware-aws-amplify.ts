import { ActionResponseHelper, ResponseBodyType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { AmplifyServerResponseHelper } from "@/lib/lib-server-responses";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const protectedRoutes = [Routes.web.auth.dashboard];

const guestRoutes = [
  Routes.web.guest.signin,
  Routes.web.guest.signup,
  Routes.web.guest.forgotPasswordCheckEmail,
  Routes.web.guest.forgotPasswordUpdatePassword,
  Routes.web.guest.signupEmailVerification,
];

export default async function MiddlewareAwsAmplify(
  request: NextRequest,
): Promise<ResponseBodyType> {
  return await ActionResponseHelper(async () => {
    const { pathname } = request.nextUrl;
    const response = NextResponse.next();
    let authenticated = false;
    const ampRes = await AmplifyServerResponseHelper(
      async (ctx) => await fetchAuthSession(ctx),
      request,
      response,
    );
    if (ampRes?.data?.tokens?.accessToken && ampRes?.data?.tokens?.idToken) {
      authenticated = true;
    } else {
      authenticated = false;
    }
    if (
      protectedRoutes.some((prefix) => pathname.startsWith(prefix)) &&
      !authenticated
    ) {
      throw new ZodError([
        {
          code: "custom",
          path: ["auth-route"],
          message: "Invalid Access",
        },
      ]);
    } else if (
      guestRoutes.some((prefix) => pathname.startsWith(prefix)) &&
      authenticated
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
