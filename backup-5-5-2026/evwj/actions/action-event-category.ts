"use server";

import { createAxiosClient } from "@/lib/lib-axios";
import {
  ActionResponseHelper,
  AxiosResponseHelper,
  ResponseBodyType,
} from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { ZodError } from "zod";

export const ActionEventCategoryAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(Routes?.api?.web.guest?.eventCategoryAll),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventCategories: axiosRes?.data?.eventCategories,
        },
      };
    });
  };
