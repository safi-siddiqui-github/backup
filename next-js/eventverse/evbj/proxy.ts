import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000", "https://eventverse-app.com"];

export function proxy(req: NextRequest) {
  const origin = req.headers.get("origin");
  const res = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }

  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  return res;
}

export const config = {
  matcher: "/api/:path*",
};
