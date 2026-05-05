"use server";

import { createAxiosClient } from "@/lib/lib-axios";
import {
  ActionResponseHelper,
  AxiosResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { ZodError } from "zod";

export const ActionEventModelAll = async (): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const axiosClient = await createAxiosClient();

    const axiosRes = await AxiosResponseHelper(
      async () =>
        await axiosClient.post(Routes?.api?.web.guest?.eventModelAll, {
          include: JSON.stringify({
            eventAssets: true,
            eventCategoryAssignments: true,
            eventDays: true,
            eventFaqs: true,
            eventFeatures: true,
            eventGuests: true,
            eventModuleActivations: true,
            eventVenues: true,
            user: true,
          } satisfies ResponseDataType["eventModelInlcude"]),
        }),
    );

    if (!axiosRes?.success) {
      throw new ZodError(axiosRes?.error ?? []);
    }

    return {
      success: true,
      message: "Action Success",
      data: {
        events: axiosRes?.data?.events,
      },
    };
  });
};
