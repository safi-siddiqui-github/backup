import { GoogleOAuthClient } from "@/lib/lib-google-auth";
import { AmplifyResponseHelper, ApiResponseHelper } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { signUp } from "aws-amplify/auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  return await ApiResponseHelper(async () => {
    const baseUrl = process?.env?.NEXT_PUBLIC_FRONTEND_URL;
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
    // Exchange code → tokens
    const token = await GoogleOAuthClient.getToken(code);
    // Verify & get user profile
    const ticket = await GoogleOAuthClient.verifyIdToken({
      idToken: token?.tokens?.id_token ?? "",
      audience: process.env.GOOGLE_CLIENT_ID,
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

    //     {
    //   "success": true,
    //   "data": {
    //     "googleUser": {
    //       "email": "safisiddiqui.work@gmail.com",
    //       "firstname": "Safi",
    //       "lastname": "Siddiqui",
    //       "avatar": "https://lh3.googleusercontent.com/a/ACg8ocL4ZD5wzqS1aJTnehBC2MBMJAUI5IstfEHeJEpPXrKXpqQFoeF5=s96-c",
    //       "googleId": "112059289321279497236",
    //       "emailVerified": true,
    //       "name": "Safi Siddiqui"
    //     }
    //   }
    // }

    const {
      email,
      firstname,
      lastname,
      avatar,
      // googleId,
      // linkedinId,
      // facebookId,
      // appleId,
      // emailVerified,
    } = googleUser;

    const oauthUser = null;
    // const randomUuid = `Password@${crypto.randomUUID()}`;
    const randomUuid = `Password@1`;

    if (!email) {
      throw new ZodError([
        {
          code: "custom",
          path: ["oauth"],
          message: "Some Creds not available",
        },
      ]);
    }

    // const cryptoToken = CryptoEncryptObject({
    //   randomFieldOne: email,
    //   randomFieldTwo: googleId,
    //   randomFieldThree: addMinutes(new Date(), 5), // valid for 5 mins
    // });

    const ampRes = await AmplifyResponseHelper(
      async () =>
        await signUp({
          username: email,
          password: randomUuid,
          options: {
            userAttributes: {
              email: email,
              name: firstname,
              family_name: lastname,
              picture: avatar,
            },
          },
        }),
    );
    if (
      ampRes?.success &&
      ampRes?.data?.nextStep?.signUpStep === "CONFIRM_SIGN_UP"
    ) {
      return NextResponse.redirect(
        `${baseUrl}${Routes.web.guest.signupEmailVerification}?email=${email}`,
      );
    }

    if (!ampRes?.success) {
      // sigin in  then
    }

    return NextResponse.json({
      success: true,
      data: {
        link: `${baseUrl}${Routes.web.guest.socialLoginResponse}?email=${email}`,
        googleUser,
        ...ampRes?.data,
      },
      error: ampRes?.error,
    });

    if (ampRes?.error) {
      // throw new ZodError(ampRes?.error);
    }

    if (!oauthUser) {
      throw new ZodError([
        {
          code: "custom",
          path: ["oauth"],
          message: "Oauth User Error",
        },
      ]);
    }
    // const sessionRes = await CreateSessionHelper({
    //   user: oauthUser,
    // });
    // if (!sessionRes.success) {
    //   throw new ZodError(sessionRes?.error?.details ?? []);
    // }
    // return NextResponse.redirect(
    //   `${baseUrl}${Routes.web.guest.socialLoginResponse}?email=${oauthUser?.email}`,
    // );
  });
}
