import {
  EmailWebWelcomeUserComponentFN,
  EmailWebWelcomeUserComponentType,
} from "@/emails/web/email-verification/EmailWebWelcomeUserComponent";
import { CreateTokenServerHelper } from "@/lib-server/lib-token-server";
import {
  CreateUserEmailServerHelper,
  UpdateUserEmailServerHelper,
  VerifyUserEmailExistServerHelper,
} from "@/lib-server/lib-user-server";
import { envLib } from "@/lib/lib-env";
import { getMicrosoftOAuthClient } from "@/lib/lib-microsoft-auth";
import { ApiResponseHelper, ResponseDataType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { OrNull } from "@/type/type-model";
import { AuthenticationResult } from "@azure/msal-node";
import { isEqual } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

type IdTokenClaimsType = Partial<{
  email: OrNull<string>;
  name: OrNull<string>;
  oid: OrNull<string>;
  preferred_username: OrNull<string>;
}>;

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

    const client = getMicrosoftOAuthClient();

    const token: AuthenticationResult = await client.acquireTokenByCode({
      code,
      redirectUri: envLib.MICROSOFT_OAUTH_CLIENT_REDIRECT,
      scopes: ["openid", "profile", "email", "User.Read"],
    });

    const claims = token.idTokenClaims as IdTokenClaimsType;
    const account = token.account;

    const userBuildObj = {
      emailOne: account?.username,
      emailTwo: claims?.email ?? claims?.preferred_username,
      nameParts: account?.name?.split(" ") ?? claims?.name?.split(" "),
      microsoftId: claims.oid ?? account?.homeAccountId,
    };

    const microsoftUser = {
      email: userBuildObj?.emailTwo ?? userBuildObj?.emailOne,
      firstname: userBuildObj?.nameParts?.at(0),
      lastname: userBuildObj?.nameParts?.at(1),
      microsoftId: userBuildObj?.microsoftId,
      emailVerified: true,
    };

    const { email, firstname, lastname, emailVerified, microsoftId } =
      microsoftUser;

    const userExistRes = await VerifyUserEmailExistServerHelper({
      user: microsoftUser,
    });

    let userObj: ResponseDataType["user"] = null;

    if (userExistRes?.success) {
      const userUpdateRes = await UpdateUserEmailServerHelper({
        user: {
          email,
          microsoftId,
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
          microsoftId,
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
      await EmailWebWelcomeUserComponentFN({
        toAddress: userObj?.email,
        props: {
          user: userObj,
        } satisfies EmailWebWelcomeUserComponentType,
      });
    }

    return NextResponse.redirect(
      `${baseUrl}${Routes.web.guest.socialSigninResponse}?responseStatus=${tokenRes?.data?.token?.encrypted}`,
    );
  });
}
