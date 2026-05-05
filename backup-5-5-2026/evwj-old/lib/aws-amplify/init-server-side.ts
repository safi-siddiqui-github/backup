import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

let configured = false;

export function InitAmplifyServer() {
  if (!configured) {
    Amplify.configure(outputs, { ssr: true });
    configured = true;
  }
}

// import { Amplify } from "aws-amplify";
// import outputs from "../../amplify_outputs.json";

// let configured = false;

// export function InitAmplifyServer() {
//   if (!configured) {
//     Amplify.configure(
//       {
//         ...outputs,
//         Auth: {
//           ...outputs.auth,
//           cookieStorage: {
//             domain: "localhost",   // or your domain
//             path: "/",
//             expires: 365,
//             sameSite: "lax",
//             secure: false,
//           },
//         },
//       },
//       { ssr: true }
//     );
//     configured = true;
//   }
// }
