import {
  EmailWebEmailVerificationComponentFN,
  EmailWebEmailVerificationType,
} from "@/emails/web/email-verification/EmailWebEmailVerificationComponent";
import {
  EmailWebWelcomeUserComponentFN,
  EmailWebWelcomeUserComponentType,
} from "@/emails/web/email-verification/EmailWebWelcomeUserComponent";
import { CreateOTPServerHelper } from "@/lib-server/lib-otp-server";
import { CreateTokenServerHelper } from "@/lib-server/lib-token-server";
import {
  CreateUserEmailServerHelper,
  UpdateUserEmailServerHelper,
  VerifyUserEmailExistServerHelper,
} from "@/lib-server/lib-user-server";
import { envLib } from "@/lib/lib-env";
import { getGoogleOAuthClient } from "@/lib/lib-google-auth";
import { ApiResponseHelper, ResponseDataType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { isEqual } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  return await ApiResponseHelper(async () => {
    const baseUrl = envLib.NEXT_PUBLIC_FRONTEND_URL;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (error) {
      throw new ZodError([
        {
          code: "custom",
          path: ["error"],
          message: error ?? "Error Occurred",
        },
      ]);
    }
    if (!code) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "Code is required",
        },
      ]);
    }
    const client = getGoogleOAuthClient();

    // Exchange code → tokens
    const token = await client.getToken(code);
    // Verify & get user profile
    const ticket = await client.verifyIdToken({
      idToken: token?.tokens?.id_token ?? "",
      // audience: envLib.GOOGLE_CLIENT_ID,
      audience: envLib.GOOGLE_OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // User data from Google
    const googleUser = {
      email: payload?.email,
      firstname: payload?.given_name,
      lastname: payload?.family_name,
      avatar: payload?.picture,
      googleId: payload?.sub,
      emailVerified: payload?.email_verified,
      name: payload?.name,
    };

    const {
      email,
      firstname,
      lastname,
      avatar,
      emailVerified,
      googleId,
      name,
    } = googleUser;

    const userExistRes = await VerifyUserEmailExistServerHelper({
      user: googleUser,
    });

    let userObj: ResponseDataType["user"] = null;

    if (userExistRes?.success) {
      const userUpdateRes = await UpdateUserEmailServerHelper({
        user: {
          email,
          googleId,
          emailVerified,
        },
      });
      if (!userUpdateRes?.success) {
        throw new ZodError(userUpdateRes?.error ?? []);
      }
      userObj = userUpdateRes?.data?.user;
    } else {
      const userCreateRes = await CreateUserEmailServerHelper({
        user: {
          email,
          firstname,
          lastname,
          googleId,
          emailVerified,
        },
      });
      if (!userCreateRes?.success) {
        throw new ZodError(userCreateRes?.error ?? []);
      }
      userObj = userCreateRes?.data?.user;
    }

    if (!userObj) {
      throw new ZodError([
        {
          code: "custom",
          path: ["userObj"],
          message: "User Object Update Failed",
        },
      ]);
    }

    const tokenRes = await CreateTokenServerHelper({
      user: userObj,
    });
    if (!tokenRes.success) {
      throw new ZodError(tokenRes?.error ?? []);
    }

    if (isEqual(userObj?.createdAt ?? 0, userObj?.updatedAt ?? 0)) {
      if (userObj?.emailVerified) {
        await EmailWebWelcomeUserComponentFN({
          toAddress: userObj?.email,
          props: {
            user: userObj,
          } satisfies EmailWebWelcomeUserComponentType,
        });
      } else {
        const otpRes = await CreateOTPServerHelper({
          user: userObj,
        });
        if (!otpRes?.success) {
          throw new ZodError(otpRes?.error ?? []);
        }

        await EmailWebEmailVerificationComponentFN({
          toAddress: userObj?.email,
          props: {
            otp: otpRes?.data?.otp,
          } satisfies EmailWebEmailVerificationType,
        });
      }
    }

    return NextResponse.redirect(
      `${baseUrl}${Routes.web.guest.socialSigninResponse}?responseStatus=${tokenRes?.data?.token?.encrypted}`,
    );
  });
}
