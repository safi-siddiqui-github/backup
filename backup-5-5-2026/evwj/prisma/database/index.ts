import { envLib } from "@/lib/lib-env";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const isProduction = envLib.NODE_ENV === "production";
const localUrl = envLib.POSTGRESQL_DATABASE_URL ?? "";
const databaseUrl = envLib.DATABASE_URL ?? "";
let adapter;
if (isProduction) {
  adapter = new PrismaNeon({ connectionString: databaseUrl });
} else {
  adapter = new PrismaPg({
    connectionString: localUrl,
  });
}
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });
if (isProduction) globalForPrisma.prisma = prisma;

export default prisma;
