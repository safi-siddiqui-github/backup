import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { ZodError } from "zod";

export const PrismaUsersFindUniqueAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const clerkAuthSession = await auth();
    const { userId: clerkId } = clerkAuthSession;

    if (!clerkId) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "clerkId is required",
        },
      ]);
    }
    const user = await prisma?.user?.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "user is required",
        },
      ]);
    }

    return {
      success: true,
      message: "User Exists",
      data: {
        userPrisma: user,
        clerkAuthSession,
      },
    };
  });
};
