"use server";

import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";

export const GetEventModulesServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const eventModules = await prisma.eventModule.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        children: true,
      },
    });

    return {
      success: true,
      message: "Event Modules Fetched",
      data: {
        eventModules,
      },
    };
  });
};
