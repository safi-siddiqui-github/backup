import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    // phone: true,
    // userAttributes: {
    //   email: {
    //     required: true,
    //   },
    // },
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_OATH_CLIENT_ID"),
        clientSecret: secret("GOOGLE_OATH_CLIENT_SECRET"),
        scopes: ["openid", "email", "profile"],
      },
      callbackUrls: [
        "http://localhost:3000/social-login",
        "https://http://eventverse-app.com/social-login",
      ],
      logoutUrls: [
        "http://localhost:3000/",
        "https://http://eventverse-app.com",
      ],
    },
  },
});
