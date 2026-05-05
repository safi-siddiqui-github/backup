"use server";

import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import prisma from "@/prisma/database";

export const GetEventCategoriesServerHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const eventCategories = await prisma.eventCategory.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return {
      success: true,
      message: "Event Categories Fetched",
      data: {
        eventCategories,
      },
    };
  });
};
