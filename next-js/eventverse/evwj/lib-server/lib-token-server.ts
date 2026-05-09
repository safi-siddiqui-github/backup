"use server";

import { JoseEncryptHelper } from "@/lib/lib-jose";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { Token } from "@/prisma/generated/client";
import { OrNullPartial } from "@/type/type-model";
import { addDays, isAfter } from "date-fns";
import { ZodError } from "zod";
import { JoseDecryptHelper } from "../lib/lib-jose";

export const CreateTokenServerHelper = async (
  creds: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = creds ?? {};
    const { id, emailVerified } = user ?? {};

    if (!user || !id) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User and user id are required",
        },
      ]);
    }

    const expiresAt = addDays(new Date(), 7);

    const tokenObj: OrNullPartial<Token> = {
      userId: id,
      expiresAt,
      emailVerified,
    };

    const encrypted = await JoseEncryptHelper(tokenObj);

    const token = await prisma.token.create({
      data: {
        userId: id,
        expiresAt,
        emailVerified,
        encrypted,
      },
      include: {
        user: true,
      },
    });

    if (!token) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "Token create failed",
        },
      ]);
    }

    return {
      success: true,
      message: "Token Created",
      data: {
        token,
      },
    };
  });
};

export const VerifyTokenServerHelper = async (
  request?: Request,
): Promise<ResponseBodyType> => {
  if (!request || !request?.headers) {
    throw new ZodError([
      {
        code: "custom",
        path: ["request"],
        message: "Request and request headers are required",
      },
    ]);
  }

  const bearerToken = request?.headers.get("authorization");
  if (!bearerToken) {
    throw new ZodError([
      {
        code: "custom",
        path: ["bearer-token"],
        message: "Bearer token is required",
      },
    ]);
  }

  const encrypted = bearerToken?.split(" ")[1];
  if (!encrypted) {
    throw new ZodError([
      {
        code: "custom",
        path: ["encrypted"],
        message: "Encrypted string is required",
      },
    ]);
  }

  const tokenDec = await JoseDecryptHelper(encrypted);
  const { userId, expiresAt } = tokenDec ?? {};

  if (!userId) {
    throw new ZodError([
      {
        code: "custom",
        path: ["token"],
        message: "Token must have user id",
      },
    ]);
  }

  if (isAfter(new Date(), expiresAt ?? 0)) {
    throw new ZodError([
      {
        code: "custom",
        path: ["token"],
        message: "Token has expired",
      },
    ]);
  }

  const tokenExist = await prisma.token.findFirst({
    where: {
      userId,
      encrypted,
      expiresAt,
    },
    include: {
      user: true,
    },
  });

  if (!tokenExist) {
    throw new ZodError([
      {
        code: "custom",
        path: ["email"],
        message: "Token is invalid",
      },
    ]);
  }

  return {
    success: true,
    data: {
      token: tokenExist,
    },
  };
};

// export const VerifyTokenEncryptHelper = async (
//   encrypted?: string | null,
// ): Promise<ResponseBodyType> => {
//   if (!encrypted) {
//     throw new ZodError([
//       {
//         code: "custom",
//         path: ["token"],
//         message: "Encrypted field is required",
//       },
//     ]);
//   }
//   const token = await JoseDecryptHelper(encrypted);
//   if (!isAfter(token?.expiresAt ?? 0, new Date())) {
//     throw new ZodError([
//       {
//         code: "custom",
//         path: ["token"],
//         message: "Token has expired",
//       },
//     ]);
//   }
//   if (!token?.userId) {
//     throw new ZodError([
//       {
//         code: "custom",
//         path: ["token"],
//         message: "Token must have user id",
//       },
//     ]);
//   }
//   const tokenBody: WebTokenVerificationSchemaInfer = {
//     encrypted,
//     expiresAt: String(token?.expiresAt),
//     userId: String(token?.userId),
//   };
//   const axiosRes = await AxiosResponseHelper(
//     async () =>
//       await AxiosClient.post(
//         Routes?.api?.web?.auth?.tokenVerification,
//         tokenBody,
//       ),
//   );
//   if (!axiosRes?.success) {
//     throw new ZodError(axiosRes?.error ?? []);
//   }
//   return {
//     success: true,
//     data: {
//       token: {
//         ...axiosRes?.data?.token,
//         userId: token?.userId,
//         expiresAt: token?.expiresAt,
//       },
//     },
//   };
// };
