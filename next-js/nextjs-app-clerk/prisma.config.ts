import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { EnvServer } from "./lib/t3-env";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // url: process.env["DATABASE_URL"],
    url: env(
      EnvServer.NODE_ENV === "production"
        ? "NEON_DATABASE_URL"
        : "POSTGRESQL_DATABASE_URL",
    ),
  },
});
