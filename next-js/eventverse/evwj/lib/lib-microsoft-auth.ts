import { ConfidentialClientApplication } from "@azure/msal-node";
import { envLib } from "./lib-env";

let client: ConfidentialClientApplication | null = null;

export function getMicrosoftOAuthClient() {
  if (client) return client;

  const clientId = envLib.MICROSOFT_OAUTH_CLIENT_ID;
  const clientSecret = envLib.MICROSOFT_OAUTH_CLIENT_SECRET;
  const tenantId = envLib.MICROSOFT_OAUTH_TENANT_ID;
  const cloud = envLib.MICROSOFT_OAUTH_CLOUD_INSTANCE;

  if (!clientId || !clientSecret || !tenantId || !cloud) {
    throw new Error("Microsoft OAuth env vars missing");
  }

  client = new ConfidentialClientApplication({
    auth: {
      clientId,
      clientSecret,
      authority: `${cloud}${tenantId}`,
    },
  });

  return client;
}
