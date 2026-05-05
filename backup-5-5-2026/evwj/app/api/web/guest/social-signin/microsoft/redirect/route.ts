import { envLib } from "@/lib/lib-env";
import { getMicrosoftOAuthClient } from "@/lib/lib-microsoft-auth";
import { ApiResponseHelper } from "@/lib/lib-responses";
import { NextResponse } from "next/server";

export async function GET() {
  return await ApiResponseHelper(async () => {
    const client = getMicrosoftOAuthClient();
    const url = await client.getAuthCodeUrl({
      redirectUri: envLib.MICROSOFT_OAUTH_CLIENT_REDIRECT,
      scopes: ["openid", "profile", "email", "User.Read"],
      prompt: "select_account",
    });
    return NextResponse.redirect(url);
  });
}
