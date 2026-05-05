import { createAuthRouteHandlers } from "@/lib/aws-amplify/server-side";

export const GET = createAuthRouteHandlers({
  redirectOnSignInComplete: "/home",
  redirectOnSignOutComplete: "/sign-in",
});
