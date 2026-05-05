import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

defineBackend({
  auth,
  data,
});

// Secrets
// npx ampx sandbox secret 

// Open Chrome
// Open DevTools → Network
// Click Preserve log
// Click Sign in with Google
// Look for a request that starts with:
// https://accounts.google.com/o/oauth2/v2/auth
// Click on it
// Look at the query parameters
// Find this one:
// redirect_uri=???