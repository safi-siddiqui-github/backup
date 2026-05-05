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

export const WebForgotPasswordCheckEmailAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};

    const axiosClient = await createAxiosClient();

    const axiosRes = await AxiosResponseHelper(
      async () =>
        await axiosClient.post(
          Routes?.api?.web.guest?.forgotPasswordCheckEmail,
          user,
        ),
    );

    if (!axiosRes?.success) {
      throw new ZodError(axiosRes?.error ?? []);
    }

    return {
      success: true,
      message: "Action Success",
    };
  });
};
