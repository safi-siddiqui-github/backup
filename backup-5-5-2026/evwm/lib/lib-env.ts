import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const envLib = createEnv({
  /* =======================
     SERVER-ONLY ENV VARS
     ======================= */
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),

    DATABASE_URL: z.url(),
    POSTGRESQL_DATABASE_URL: z.url(),

    JOSE_SESSION_KEY: z.string().min(32),

    INTERNAL_API_URL: z.url(),
    INTERNAL_API_SECRET: z.string().min(16),

    GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_REDIRECT: z.url(),

    MICROSOFT_OAUTH_CLIENT_ID: z.string().min(1),
    MICROSOFT_OAUTH_CLIENT_SECRET: z.string().min(1),
    MICROSOFT_OAUTH_CLOUD_INSTANCE: z.url(),
    MICROSOFT_OAUTH_TENANT_ID: z.string().min(1),
    MICROSOFT_OAUTH_CLIENT_REDIRECT: z.url(),

    AAWS_ACCESS_KEY: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_REGION: z.string().min(1),
    AWS_MAIL_ADDRESS: z.email(),

    USER_COOKIE_NAME: z.string().min(1),

    // APP_ORIGIN: z.url(),
    APP_ORIGIN: z.string().min(1),
  },

  /* =======================
     CLIENT (PUBLIC) ENVS
     ======================= */
  client: {
    NEXT_PUBLIC_FRONTEND_URL: z.url(),
  },

  /* =======================
     RUNTIME ENV MAPPING
     ======================= */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRESQL_DATABASE_URL: process.env.POSTGRESQL_DATABASE_URL,

    JOSE_SESSION_KEY: process.env.JOSE_SESSION_KEY,

    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
    INTERNAL_API_SECRET: process.env.INTERNAL_API_SECRET,

    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_CLIENT_REDIRECT: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT,

    MICROSOFT_OAUTH_CLIENT_ID: process.env.MICROSOFT_OAUTH_CLIENT_ID,
    MICROSOFT_OAUTH_CLIENT_SECRET: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
    MICROSOFT_OAUTH_CLOUD_INSTANCE: process.env.MICROSOFT_OAUTH_CLOUD_INSTANCE,
    MICROSOFT_OAUTH_TENANT_ID: process.env.MICROSOFT_OAUTH_TENANT_ID,
    MICROSOFT_OAUTH_CLIENT_REDIRECT:
      process.env.MICROSOFT_OAUTH_CLIENT_REDIRECT,

    AAWS_ACCESS_KEY: process.env.AAWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_MAIL_ADDRESS: process.env.AWS_MAIL_ADDRESS,

    USER_COOKIE_NAME: process.env.USER_COOKIE_NAME,

    APP_ORIGIN: process.env.APP_ORIGIN,

    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
});
