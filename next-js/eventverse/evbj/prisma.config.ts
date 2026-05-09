import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // url: env("DATABASE_URL"),
    url:
      process.env.NODE_ENV !== "production"
        ? env("LOCAL_DATABASE_URL")
        : env("DATABASE_URL"),
  },
});
