import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    seed: 'ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts'
  }
  // migrations: {
  //   path: path.join("db", "migrations"),
  // },
  // views: {
  //   path: path.join("db", "views"),
  // },
  // typedSql: {
  //   path: path.join("db", "queries"),
  // }
});

// export default {
//   earlyAccess: true,
//   schema: path.join('object-relational-mappers', 'prisma', 'schema'),
// } satisfies PrismaConfig;
