"use server";

import { cookies } from "next/headers";
import { ZodError } from "zod";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "./lib-responses";

const sessionName = process.env.USER_SESSION_NAME ?? "false";

// export type EncryptionObjectType = {
//   sessionId?: OrNull<number>;
//   expiresAt?: OrNull<Date>;
//   isVerified?: OrNull<boolean>;
// };

export const CreateSessionHelper = async (
  creds: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { session } = creds ?? {};
    const { expiresAt, accessToken } = session ?? {};
    const expires = new Date((expiresAt ?? 0) * 1000);
    if (!expiresAt || !accessToken) {
      throw new ZodError([
        {
          code: "custom",
          message: "expiresAt, accessToken cannot be null",
          path: ["required"],
        },
      ]);
    }
    (await cookies()).set(sessionName, accessToken ?? "false", {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });
    return {
      success: true,
      message: "Session Created",
    };
  });
};

export const GetSessionHelper = async (): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const cookieRes = (await cookies()).get(sessionName)?.value;
    return {
      success: true,
      data: {
        cookieRes,
      },
    };
  });
};

export const DeleteSessionHelper = async (): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    (await cookies()).delete(sessionName);
    return {
      success: true,
      message: "Session Deleted",
    };
  });
};

// export const verifySessionHelper = async (): Promise<AxiosResponseDataType> => {
//   const session = (await cookies()).get(sessionName)?.value ?? "false";
//   const payload: EncryptionObjectType = await decryptHelper(session ?? "false");
//   if (
//     payload &&
//     isAfter(payload?.expiresAt ?? "", new Date()) &&
//     payload.sessionId
//   ) {
//     const apiRes = await ApiResponseHelper(
//       async () =>
//         await AxiosClient.post("session/verify", {
//           id: payload?.sessionId,
//         }),
//     );
//     if (
//       apiRes?.success &&
//       apiRes?.data?.session &&
//       apiRes?.data?.session?.user
//     ) {
//       return {
//         success: true,
//         data: {
//           session: apiRes?.data?.session,
//         },
//       };
//     }
//   }
//   return {
//     success: false,
//   };
// };
