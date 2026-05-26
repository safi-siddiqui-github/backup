import { PrismaClient } from "@/lib/generated/prisma/client";
import { EnvServer } from "@/lib/t3-env";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const isProduction = EnvServer.NODE_ENV === "production";
// const localUrl = EnvServer.POSTGRESQL_DATABASE_URL ?? "";
const neonDatabaseUrl = EnvServer.NEON_DATABASE_URL ?? "";
const adapter = new PrismaNeon({ connectionString: neonDatabaseUrl });
// let adapter;
// if (isProduction) {
//   adapter = new PrismaNeon({ connectionString: neonDatabaseUrl });
// } else {
//   adapter = new PrismaPg({
//     connectionString: localUrl,
//   });
// }
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (isProduction) globalForPrisma.prisma = prisma;

export default prisma;

/*
1. Why Prisma uses globalThis

Your Prisma code is solving a Node.js + Next.js dev hot-reload problem.

In dev mode:

Next.js reloads modules many times
If PrismaClient is recreated → too many DB connections

So we do:

globalForPrisma.prisma = prisma;

Meaning: “reuse same DB client across reloads in server runtime”

This only matters in server runtime (Node.js).
 */
