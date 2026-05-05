import { OAuth2Client } from "google-auth-library";
import { envLib } from "./lib-env";

let client: OAuth2Client | null = null;

export function getGoogleOAuthClient() {
  if (client) return client;

  const clientId = envLib.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = envLib.GOOGLE_OAUTH_CLIENT_SECRET;
  const redirectUri = envLib.GOOGLE_OAUTH_CLIENT_REDIRECT;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Google OAuth env vars missing");
  }

  client = new OAuth2Client({
    clientId,
    clientSecret,
    redirectUri,
  });

  return client;
}
