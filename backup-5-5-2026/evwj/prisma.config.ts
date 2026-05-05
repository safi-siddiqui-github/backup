import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { envLib } from "./lib/lib-env";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // url: env("DATABASE_URL"),
    url: env(
      envLib.NODE_ENV === "production"
        ? "DATABASE_URL"
        : "POSTGRESQL_DATABASE_URL",
    ),
  },
});
