"use server";

import { createAxiosClient } from "@/lib/lib-axios";
import { CreateCookieHelper } from "@/lib/lib-cookie";
import {
  ActionResponseHelper,
  AxiosResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { ZodError } from "zod";

export const WebSigninAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { user } = body ?? {};

    const axiosClient = await createAxiosClient();

    const axiosRes = await AxiosResponseHelper(
      async () => await axiosClient.post(Routes?.api?.web.guest?.signin, user),
    );

    if (!axiosRes?.success) {
      throw new ZodError(axiosRes?.error ?? []);
    }

    const cookieRes = await CreateCookieHelper(axiosRes?.data ?? {});

    if (!cookieRes?.success) {
      throw new ZodError(cookieRes?.error ?? []);
    }

    return {
      success: true,
      message: "Action Success",
      data: {
        token: axiosRes?.data?.token,
      },
    };
  });
};
