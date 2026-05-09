// import { Amplify } from "aws-amplify";
// import outputs from "../../amplify_outputs.json";

// let configured = false;

// export function initAmplifyServer() {
//   if (!configured) {
//     Amplify.configure(outputs, { ssr: true });
//     configured = true;
//   }
// }

import outputs from "@/amplify_outputs.json";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";

export const { runWithAmplifyServerContext, createAuthRouteHandlers } =
  createServerRunner({
    config: outputs,
    runtimeOptions: {
      cookies: {
        domain: ".myapp.com", // making cookies available to all subdomains
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    },
  });
