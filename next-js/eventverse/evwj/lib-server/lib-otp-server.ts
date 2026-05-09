"use server";

import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { addMinutes, differenceInMinutes, isAfter } from "date-fns";
import { random } from "lodash";
import { ZodError } from "zod";

export const CreateOTPServerHelper = async (
  creds: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = creds ?? {};
    const { id } = user ?? {};

    if (!user || !id) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User and user id are required",
        },
      ]);
    }

    const now = new Date();

    const otpExist = await prisma.oTP.findFirst({
      where: {
        userId: id,
      },
    });

    if (otpExist) {
      const canResendAt = addMinutes(otpExist?.updatedAt ?? 0, 5);

      if (isAfter(canResendAt, now)) {
        const diffMin = differenceInMinutes(canResendAt, now);
        throw new ZodError([
          {
            code: "custom",
            path: ["code"],
            message: `Resend after ${diffMin} minutes`,
          },
        ]);
      }
    }

    const randomCode = random(100000, 999999);
    const expiresAt = addMinutes(now, 5);
    const otpNew = await prisma.oTP.upsert({
      where: {
        userId: user?.id,
      },
      update: {
        code: randomCode,
        expiresAt,
      },
      create: {
        userId: user?.id,
        code: randomCode,
        expiresAt,
      },
    });

    if (!otpNew) {
      throw new ZodError([
        {
          code: "custom",
          path: ["otp"],
          message: "Otp Update failed",
        },
      ]);
    }

    return {
      success: true,
      message: "Otp Created",
      data: {
        otp: otpNew,
      },
    };
  });
};

export const VerifyOTPServerHelper = async (
  creds: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { otp } = creds ?? {};
    const { userId, code } = otp ?? {};

    if (!otp || !userId || !code) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "Otp, user id and code are required",
        },
      ]);
    }

    const otpExist = await prisma.oTP.findFirst({
      where: {
        userId,
        code,
      },
    });

    if (!otpExist) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "OTP is invalid",
        },
      ]);
    }

    if (isAfter(new Date(), otpExist?.expiresAt ?? 0)) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "OTP is expired",
        },
      ]);
    }

    return {
      success: true,
      message: "Otp Verified",
      data: {
        otp: otpExist,
      },
    };
  });
};
