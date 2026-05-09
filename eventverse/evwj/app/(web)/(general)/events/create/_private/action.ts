"use server";

import { LibEventModelStoreValidationHelper } from "@/app/api/web/auth/event-model/store/_private/lib";
import { createAxiosClient, createAxiosMediaClient } from "@/lib/lib-axios";
import {
  ActionResponseHelper,
  AxiosResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { ZodError } from "zod";

export const WebEventVisibilityAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(Routes?.api?.web.guest?.eventVisibilityAll),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventVisibilities: axiosRes?.data?.eventVisibilities,
        },
      };
    });
  };

export const WebEventDateTypeAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(Routes?.api?.web.guest?.eventDateTypeAll),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventDateTypes: axiosRes?.data?.eventDateTypes,
        },
      };
    });
  };

export const WebEventRecurringPatternAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(
            Routes?.api?.web.guest?.eventRecurringPatternAll,
          ),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventRecurringPatterns: axiosRes?.data?.eventRecurringPatterns,
        },
      };
    });
  };

export const WebEventRecurringEndAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(Routes?.api?.web.guest?.eventRecurringEndAll),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventRecurringEnds: axiosRes?.data?.eventRecurringEnds,
        },
      };
    });
  };

export const WebEventVenueTypeAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(Routes?.api?.web.guest?.eventVenueTypeAll),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventVenueTypes: axiosRes?.data?.eventVenueTypes,
        },
      };
    });
  };

export const WebEventCategoriesAllAction =
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

export const WebEventAgeRestrictionAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(Routes?.api?.web.guest?.eventAgeRestrictionAll),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventAgeRestrictions: axiosRes?.data?.eventAgeRestrictions,
        },
      };
    });
  };

export const WebEventModuleAllAction = async (): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const axiosClient = await createAxiosClient();

    const axiosRes = await AxiosResponseHelper(
      async () => await axiosClient.get(Routes?.api?.web.guest?.eventModuleAll),
    );

    if (!axiosRes?.success) {
      throw new ZodError(axiosRes?.error ?? []);
    }

    return {
      success: true,
      message: "Action Success",
      data: {
        eventModules: axiosRes?.data?.eventModules,
      },
    };
  });
};

export const WebEventFeatureTypeAllAction =
  async (): Promise<ResponseBodyType> => {
    return await ActionResponseHelper(async () => {
      const axiosClient = await createAxiosClient();

      const axiosRes = await AxiosResponseHelper(
        async () =>
          await axiosClient.get(Routes?.api?.web.guest?.eventFeatureTypeAll),
      );

      if (!axiosRes?.success) {
        throw new ZodError(axiosRes?.error ?? []);
      }

      return {
        success: true,
        message: "Action Success",
        data: {
          eventFeatureTypes: axiosRes?.data?.eventFeatureTypes,
        },
      };
    });
  };

export const WebEventModuleStoreAction = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const validationRes = await LibEventModelStoreValidationHelper(creds);

    if (!validationRes?.success) {
      throw new ZodError(validationRes?.error ?? []);
    }

    const axiosClient = await createAxiosMediaClient();

    const {
      event,
      eventDays,
      eventVenues,
      eventAssets,
      eventGuests,
      eventFaqs,
    } = creds ?? {};

    const form = new FormData();

    form.append("event", JSON.stringify(event));
    form.append("eventAssets", JSON.stringify(eventAssets));
    form.append("eventGuests", JSON.stringify(eventGuests));
    form.append("eventDays", JSON.stringify(eventDays));
    form.append("eventVenues", JSON.stringify(eventVenues));
    form.append("eventFaqs", JSON.stringify(eventFaqs));

    eventAssets?.forEach(({ assetFile, slug }) => {
      if (!assetFile || !slug) return;
      form.append("assetFiles", assetFile, slug);
    });

    eventGuests?.forEach(({ avatarFile, slug }) => {
      if (!avatarFile || !slug) return;
      form.append("avatarFiles", avatarFile, slug);
    });

    const axiosRes = await AxiosResponseHelper(
      async () =>
        await axiosClient.post(Routes?.api?.web?.auth?.eventStore, form),
    );

    if (!axiosRes?.success) {
      throw new ZodError(axiosRes?.error ?? []);
    }

    return {
      success: true,
      message: "Event Model Stored",
      data: {
        // event: axiosRes?.data?.event,
      },
    };
  });
};
