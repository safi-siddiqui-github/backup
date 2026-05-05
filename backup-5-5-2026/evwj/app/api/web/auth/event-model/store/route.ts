import {
  EmailWebEventCreatedComponentFN,
  EmailWebEventCreatedType,
} from "@/emails/web/event-model/EmailWebEmailVerificationComponent";
import { StoreEventModelServerHelper } from "@/lib-server/lib-event-model";
import { VerifyTokenServerHelper } from "@/lib-server/lib-token-server";
import { ApiResponseHelper, ResponseDataType } from "@/lib/lib-responses";
import { FileType } from "@/type";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { LibEventModelStoreValidationHelper } from "./_private/lib";

export async function POST(request: Request) {
  return ApiResponseHelper(async () => {
    const verifyRes = await VerifyTokenServerHelper(request);

    if (!verifyRes?.success) {
      throw new ZodError(verifyRes?.error ?? []);
    }

    const formData = await request?.formData();

    const eventModel = formData?.get("event");
    const eventData = JSON.parse(
      String(eventModel ?? "{}"),
    ) as ResponseDataType["event"];

    const eventDays = formData?.get("eventDays");
    const eventDaysData = JSON.parse(
      String(eventDays ?? "{}"),
    ) as ResponseDataType["eventDays"];

    const eventVenues = formData?.get("eventVenues");
    const eventVenuesData = JSON.parse(
      String(eventVenues ?? "{}"),
    ) as ResponseDataType["eventVenues"];

    const eventAssets = formData?.get("eventAssets");
    const eventAssetsData = JSON.parse(
      String(eventAssets ?? "{}"),
    ) as ResponseDataType["eventAssets"];

    const eventGuests = formData?.get("eventGuests");
    const eventGuestsData = JSON.parse(
      String(eventGuests ?? "{}"),
    ) as ResponseDataType["eventGuests"];

    const eventFaqs = formData?.get("eventFaqs");
    const eventFaqsData = JSON.parse(
      String(eventFaqs ?? "{}"),
    ) as ResponseDataType["eventFaqs"];

    const avatarFiles = formData?.getAll("avatarFiles") as FileType[];

    const assetFiles = formData?.getAll("assetFiles") as FileType[];

    const eventGuestsModified: ResponseDataType["eventGuests"] =
      eventGuestsData?.map((guest) => {
        const avatarFile = avatarFiles?.find(
          (file) => file?.name === guest?.slug,
        );
        return {
          ...guest,
          avatarFile,
        };
      });

    const eventAssetsModified: ResponseDataType["eventAssets"] =
      eventAssetsData?.map((asset) => {
        const assetFile = assetFiles?.find(
          (file) => file?.name === asset?.slug,
        );
        return {
          ...asset,
          assetFile,
        };
      });

    const validationRes = await LibEventModelStoreValidationHelper({
      event: eventData,
      eventDays: eventDaysData,
      eventVenues: eventVenuesData,
      eventAssets: eventAssetsModified,
      eventFaqs: eventFaqsData,
      eventGuests: eventGuestsModified,
    });

    if (!validationRes?.success) {
      throw new ZodError(validationRes?.error ?? []);
    }

    const eventModelRes = await StoreEventModelServerHelper({
      event: {
        userId: verifyRes?.data?.token?.userId ?? 0,
        ...eventData,
      },
      eventDays: eventDaysData,
      eventVenues: eventVenuesData,
      eventAssets: eventAssetsModified,
      eventFaqs: eventFaqsData,
      eventGuests: eventGuestsModified,
    });

    if (!eventModelRes?.success) {
      throw new ZodError(eventModelRes?.error ?? []);
    }

    await EmailWebEventCreatedComponentFN({
      toAddress: verifyRes?.data?.token?.user?.email,
      props: {
        eventModel: eventModelRes?.data?.event,
      } satisfies EmailWebEventCreatedType,
    });

    return NextResponse.json({
      success: true,
      message: "Event Model Stored",
    });
  });
}
