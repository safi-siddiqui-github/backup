"use server";

import { BcryptCompareHelper, BcryptHashHelper } from "@/lib/lib-bcryptjs";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";
import { ZodError } from "zod";

export const VerifyUserEmailUniqueServerHelper = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};
    const { email } = user ?? {};

    if (!user || !email) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User and user email are required",
        },
      ]);
    }

    const userUnique = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userUnique) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Email is already in use",
        },
      ]);
    }

    return {
      success: true,
      message: "User Unique",
      data: {
        user: userUnique,
      },
    };
  });
};

export const VerifyUserEmailExistServerHelper = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};
    const { email } = user ?? {};

    if (!user || !email) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User and user email are required",
        },
      ]);
    }

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Email is invalid",
        },
      ]);
    }

    return {
      success: true,
      message: "User Exist",
      data: {
        user: userExist,
      },
    };
  });
};

export const VerifyUserPhoneUniqueServerHelper = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};
    const { phone, countryCode } = user ?? {};

    if (!user || !phone || !countryCode) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User, phone and country code are required",
        },
      ]);
    }

    const userUnique = await prisma.user.findFirst({
      where: {
        phone,
        countryCode,
      },
    });

    if (userUnique) {
      throw new ZodError([
        {
          code: "custom",
          path: ["phone"],
          message: "Phone is already in use",
        },
      ]);
    }

    return {
      success: true,
      message: "User Unique",
      data: {
        user: userUnique,
      },
    };
  });
};

export const VerifyUserEmailExistPasswordValidServerHelper = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};
    const { email, password } = user ?? {};

    if (!user || !email || !password) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User, email and password are required",
        },
      ]);
    }

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Email is invalid",
        },
      ]);
    }

    const compare = await BcryptCompareHelper(
      password,
      userExist?.password ?? "",
    );
    if (!compare) {
      throw new ZodError([
        {
          code: "custom",
          path: ["password"],
          message: "Incorrect password",
        },
      ]);
    }

    return {
      success: true,
      message: "User Exist",
      data: {
        user: userExist,
      },
    };
  });
};

export const CreateUserEmailServerHelper = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};
    const {
      email,
      password,
      firstname,
      lastname,
      countryCode,
      phone,
      agreedTerms,
      emailVerified,
      googleId,
      microsoftId,
    } = user ?? {};

    if (!user || !user?.email) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User and email are required",
        },
      ]);
    }

    const hashed = await BcryptHashHelper(password ?? "");

    const userNew = await prisma.user.create({
      data: {
        email,
        username: email?.split("@")[0],
        firstname,
        lastname,
        countryCode,
        phone,
        password: hashed,
        agreedTerms,
        emailVerified,
        googleId,
        microsoftId,
      },
    });

    if (!userNew) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "User Create failed",
        },
      ]);
    }

    return {
      success: true,
      message: "User Created",
      data: {
        user: userNew,
      },
    };
  });
};

export const UpdateUserEmailServerHelper = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};
    const {
      email,
      password,
      firstname,
      lastname,
      countryCode,
      phone,
      agreedTerms,
      emailVerified,
      googleId,
      microsoftId,
    } = user ?? {};

    if (!user || !email) {
      throw new ZodError([
        {
          code: "custom",
          path: ["code"],
          message: "User and email are required",
        },
      ]);
    }

    const hashed = await BcryptHashHelper(password ?? "");

    const userUpdate = await prisma.user.update({
      where: {
        email,
      },
      data: {
        ...(firstname ? { firstname } : {}),
        ...(lastname ? { lastname } : {}),
        ...(countryCode ? { countryCode } : {}),
        ...(phone ? { phone } : {}),
        ...(agreedTerms ? { agreedTerms } : {}),
        ...(emailVerified ? { emailVerified } : {}),
        ...(password ? { password: hashed } : {}),
        ...(googleId ? { googleId } : {}),
        ...(microsoftId ? { microsoftId } : {}),
      },
    });

    if (!userUpdate) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "User Update failed",
        },
      ]);
    }

    return {
      success: true,
      message: "User Update",
      data: {
        user: userUpdate,
      },
    };
  });
};
