import { Timezone } from "@/prisma/generated";

export async function GET(request: Request) {
  const res = Object.values(Timezone);
  return Response.json({ res });
}
