import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function createSession(userId: number) {
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days

  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .sign(secretKey);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return token; // also return for mobile apps
}

export async function verifySession(token?: string) {
  try {
    if (!token) return null;
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { userId: number };
  } catch {
    return null;
  }
}
