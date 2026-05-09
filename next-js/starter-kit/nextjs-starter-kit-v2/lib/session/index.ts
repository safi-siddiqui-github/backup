import 'server-only';

import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.CUSTOM_SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)
type UserType = {
  id: string | number; // Required
  role?: string; // Nullable
  expiresAt?: Date; // Nullable
};

const cookie = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
  duration: 24 * 60 * 60 * 1000,
  sameSite: 'lax'
}

// Output: Returns a signed JWT as a string.
export async function encrypt(payload: UserType): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

// Return decrypted payload
export async function decrypt(session: string | undefined = ''): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error)
    return null;
  }
}

export async function CreateSession(user: UserType) {

  const secureUser = {
    id: user?.id,
    role: user?.role,
  };

  const expiresAt = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ ...secureUser, expiresAt });

  (await cookies())
    .set(cookie.name, session, {
      expires: expiresAt,
      sameSite: cookie.sameSite as 'lax',
      httpOnly: cookie.options.httpOnly,
      secure: cookie.options.secure,
      path: cookie.options.path,
    });

  return null;
}

export async function UpdateSession() {
  const session = (await cookies()).get(cookie.name)?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null;
  }

  const expiresAt = new Date(Date.now() + cookie.duration);
  (await cookies())
    .set(cookie.name, session, {
      expires: expiresAt,
      sameSite: cookie.sameSite as 'lax',
      httpOnly: cookie.options.httpOnly,
      secure: cookie.options.secure,
      path: cookie.options.path,
    });
}

export async function DeleteSession() {
  (await cookies()).delete(cookie.name);
  // redirect('/login')
}

export async function GetSession() {
  const session = (await cookies()).get(cookie.name)?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null;
  }
  return payload;
}

// export async function VerifySession() {
//   const cookie = (await cookies()).get(cookies.name)?.value || '';
//   const session = await decrypt(cookie);

//   if (!session?.userId) {
//     // redirect('/login')
//   }

//   return { userId: session?.userId };
// }

