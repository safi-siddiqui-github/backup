// "use server";

// // import { Token } from "@/prisma/generated/client";
// import { OrNullPartial } from "@/type/type-model";
// import { jwtVerify, SignJWT } from "jose";
// import { envLib } from "./lib-env";

// export type Token = {
//   userId: string;
//   email: string;
//   expiresAt: number;
// };

// const algorithm = "HS256";
// const sessionKey = envLib.JOSE_SESSION_KEY;
// const expiredObject: OrNullPartial<Token> = null;

// const getEncodedKey = async () => {
//   return new TextEncoder().encode(sessionKey || "fallback-secret");
// };

// // JWTPayload
// export const JoseEncryptHelper = async (
//   payload: OrNullPartial<Token>,
// ): Promise<string> => {
//   //
//   if (!payload) {
//     throw new Error("Payload Cannot be empty");
//   }
//   //
//   const encodedKey = await getEncodedKey();
//   //
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: algorithm })
//     .setIssuedAt()
//     .setExpirationTime("7d")
//     .sign(encodedKey);
//   //
// };

// export const JoseDecryptHelper = async (
//   encrypted?: string | null,
// ): Promise<OrNullPartial<Token>> => {
//   try {
//     if (!encrypted) {
//       return expiredObject;
//     }
//     const encodedKey = await getEncodedKey();
//     const { payload } = await jwtVerify<OrNullPartial<Token>>(
//       encrypted,
//       encodedKey,
//       {
//         algorithms: [algorithm],
//       },
//     );
//     return payload;
//   } catch (error: unknown) {
//     return expiredObject;
//     throw error;
//   }
// };
