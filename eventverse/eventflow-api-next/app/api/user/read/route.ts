import { ApiHandler } from "@/lib/apiHandler";
import { NextResponse } from "next/server";

export const GET = ApiHandler(async (req: Request) => {
  //
  return NextResponse.json({ success: true, user: req });
});
