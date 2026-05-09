import { Timezone } from "@/prisma/generated";

// Enums
export async function findTimezones(): Promise<Timezone[]> {
  return Object.values(Timezone);
}
