import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const EnvClient = createEnv({
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
});

export const EnvServer = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    REACT_EDITOR: z.optional(z.string()),

    NEON_DATABASE_URL: z.string(),
    POSTGRESQL_DATABASE_URL: z.optional(z.string()),

    RESEND_API_KEY: z.string(),
    RESEND_EMAIL_FROM: z.string(),

    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    REACT_EDITOR: process.env.REACT_EDITOR,

    NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
    POSTGRESQL_DATABASE_URL: process.env.POSTGRESQL_DATABASE_URL,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_EMAIL_FROM: process.env.RESEND_EMAIL_FROM,

    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SIGNING_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
  },
});
