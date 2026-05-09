import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const AUTH_WHITELIST = ["/api/auth/signin", "/api/auth/signup"];

export function middleware(req: NextRequest) {
  if (AUTH_WHITELIST.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }
  //
  const cookieToken = req.cookies.get("session")?.value;
  const headerToken = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = cookieToken || headerToken;
  //
  if (cookieToken !== headerToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  //
  // 🔑 Don’t verify here (Edge) → just forward
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-session-token", token);
  //
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/api/:path*"],
};
