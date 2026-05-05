// "use server";

// import { cookies } from "next/headers";
// import { ZodError } from "zod";
// import { envLib } from "./lib-env";
// import { JoseDecryptHelper } from "./lib-jose";
// import {
//   ActionResponseHelper,
//   ResponseBodyType,
//   ResponseDataType,
// } from "./lib-responses";

// const cookieName = envLib.USER_COOKIE_NAME ?? "user-cookie-name";

// export const CreateCookieHelper = async (
//   creds: ResponseDataType,
// ): Promise<ResponseBodyType> => {
//   return await ActionResponseHelper(async () => {
//     const { token } = creds ?? {};
//     if (!token || !token?.encrypted) {
//       throw new ZodError([
//         {
//           code: "custom",
//           message: "Token and token encrypted is required",
//           path: ["email"],
//         },
//       ]);
//     }
//     const tokenDecrypt = await JoseDecryptHelper(token.encrypted);
//     (await cookies()).set(cookieName, token?.encrypted ?? "NOT_ENCRYPTED", {
//       httpOnly: true,
//       secure: true,
//       expires: new Date(tokenDecrypt?.expiresAt ?? 0),
//       sameSite: "lax",
//       path: "/",
//     });
//     return {
//       success: true,
//       message: "Cookie Created",
//     };
//   });
// };

// export const GetCookieHelper = async (): Promise<ResponseBodyType> => {
//   return await ActionResponseHelper(async () => {
//     const cookieRes = (await cookies()).get(cookieName)?.value;
//     return {
//       success: true,
//       data: {
//         cookieRes,
//       },
//     };
//   });
// };

// export const DeleteCookieHelper = async (): Promise<ResponseBodyType> => {
//   return await ActionResponseHelper(async () => {
//     (await cookies()).delete(cookieName);
//     return {
//       success: true,
//       message: "Cookie Deleted",
//     };
//   });
// };
