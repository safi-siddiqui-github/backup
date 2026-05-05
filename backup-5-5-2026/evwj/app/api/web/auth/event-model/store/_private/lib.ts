import { LibDateToISOFormatHelper } from "@/lib/lib-date";
import {
  ActionResponseHelper,
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/lib-responses";
import {
  EventDayModelType,
  EventFeatureTypeModelType,
  EventVenueModelAddressType,
  EventVenueModelType,
} from "@/type/type-model";
import { ZodError } from "zod";
import {
  WebEventCreateCategorySchemaInfer,
  WebEventCreateDaySchemaInfer,
  WebEventCreateFaqSchemaInfer,
  WebEventCreateFiveSchema,
  WebEventCreateFiveSchemaInfer,
  WebEventCreateFourSchemaInfer,
  WebEventCreateGuestSchemaInfer,
  WebEventCreateImageSchemaInfer,
  WebEventCreateThreeSchemaInfer,
  WebEventCreateVenueSchemaInfer,
} from "./validation";

export function ModifyEventDaysFromFormToStore(
  eventDays: WebEventCreateDaySchemaInfer[],
): ResponseDataType["events"] {
  const modified = eventDays?.map<EventDayModelType>((item) => ({
    ...item,
    eventDate: new Date(item?.eventDate),
    recurringEndDate: item?.recurringEndDate
      ? new Date(item?.recurringEndDate)
      : undefined,
    eventRecurringPattern: item?.eventRecurringPattern,
    eventRecurringEnd: item?.eventRecurringEnd,
    recurringEndOccurrences: item?.recurringEndOccurrences
      ? Number(item?.recurringEndOccurrences)
      : undefined,
  })) satisfies ResponseDataType["events"];

  return modified;
}

export function ModifyEventDaysFromStoreToForm(
  eventDays: ResponseDataType["eventDays"],
): WebEventCreateDaySchemaInfer[] {
  const modified =
    eventDays?.map<WebEventCreateDaySchemaInfer>((item) => {
      return {
        eventDate: LibDateToISOFormatHelper(item?.eventDate),
        timezone: item?.timezone ?? "",
        startTime: item?.startTime ?? "",
        endTime: item?.endTime ?? "",
        eventDateType: item?.eventDateType ?? "SINGLE",
        eventRecurringPattern: item?.eventRecurringPattern ?? "DAILY",
        eventRecurringEnd: item?.eventRecurringEnd ?? "NEVER",
        recurringEndDate: LibDateToISOFormatHelper(item?.recurringEndDate),
        recurringEndOccurrences: item?.recurringEndOccurrences
          ? String(item?.recurringEndOccurrences)
          : undefined,
      };
    }) ?? [];

  return modified;
}

export function ModifyEventVenueFromStoreToForm(
  eventVenues: ResponseDataType["eventVenues"],
): WebEventCreateVenueSchemaInfer[] {
  const modified =
    eventVenues?.map<WebEventCreateVenueSchemaInfer>((item) => {
      return {
        name: item?.name ?? "",
        venueType: item?.venueType ?? "PHYSICAL",
        address: item?.address ?? undefined,
        virtualLink: item?.virtualLink ?? undefined,
        virtualLinkPass: item?.virtualLinkPass ?? undefined,
      };
    }) ?? [];

  return modified;
}

export function ModifyEventVenueFromAddressToAddressType(
  address?: string,
): EventVenueModelAddressType {
  const addressModified: EventVenueModelAddressType = address
    ? JSON.parse(address)
    : {
        id: "",
        displayName: "",
        location: { lat: 0, lng: 0 },
        formattedAddress: "",
      };

  return addressModified;
}

export function ModifyEventVenueFromFormToStore(
  eventVenues: WebEventCreateVenueSchemaInfer[],
): ResponseDataType["eventVenues"] {
  const modified = eventVenues?.map<EventVenueModelType>((item) => {
    const { address } = item;

    const addressModified = ModifyEventVenueFromAddressToAddressType(address);

    return {
      ...item,
      addressType: addressModified,
    };
  });

  return modified;
}

export function ModifyEventCategoryAssignmentFromStoreToForm(
  eventCategoryAssignments: ResponseDataType["eventCategoryAssignments"],
): WebEventCreateCategorySchemaInfer["eventCategoryAssignments"] {
  const modified =
    eventCategoryAssignments
      ?.map((item) => item?.eventCategoryId)
      ?.filter((item) => item !== null)
      ?.filter((item) => item !== undefined)
      ?.map((item) => String(item)) ?? [];

  return modified;
}

export function ModifyEventCategoryAssignmentFromFormToStore(
  eventCategoryAssignments: WebEventCreateCategorySchemaInfer["eventCategoryAssignments"],
): ResponseDataType["eventCategoryAssignments"] {
  const modified = eventCategoryAssignments?.map((item) => ({
    eventCategoryId: Number(item),
  }));

  return modified;
}

export function ModifyEventModulesFromStoreToForm(
  eventModuleActivations: ResponseDataType["eventModuleActivations"],
): WebEventCreateThreeSchemaInfer["eventModules"] {
  const modified =
    eventModuleActivations
      ?.filter((item) => item?.eventModuleId !== undefined)
      ?.filter((item) => item?.eventModuleId !== null)
      ?.map((emAcId) => {
        return String(emAcId?.eventModuleId);
      }) ?? [];

  return modified;
}

export function ModifyEventModulesFromFormToStore(
  eventModules: WebEventCreateThreeSchemaInfer["eventModules"],
): ResponseDataType["eventModuleActivations"] {
  const modified =
    eventModules
      ?.filter((item) => item !== undefined)
      ?.filter((item) => item !== null)
      ?.map((emId) => {
        return {
          eventModuleId: Number(emId),
        };
      }) ?? [];

  return modified;
}

export function ModifyEventFeaturesFromStoreToForm(
  eventFeatures: ResponseDataType["eventFeatures"],
): WebEventCreateFourSchemaInfer["eventFeatureType"] {
  const modified = eventFeatures?.at(0)?.featureType;
  return modified ?? "";
}

export function ModifyEventFeaturesFromFormToStore(
  eventFeatureType: WebEventCreateFourSchemaInfer["eventFeatureType"],
): ResponseDataType["eventFeatures"] {
  const modified = [
    {
      featureType: eventFeatureType as EventFeatureTypeModelType,
    },
  ];

  return modified;
}

export function ModifyEventGuestsFromStoreToForm(
  eventGuests: ResponseDataType["eventGuests"],
): WebEventCreateGuestSchemaInfer[] {
  const modified =
    eventGuests?.map((guest) => {
      return {
        name: guest?.name ?? "",
        role: guest?.role ?? "",
        description: guest?.description ?? "",
        linkedInUrl: guest?.linkedInUrl ?? "",
        twitterUrl: guest?.twitterUrl ?? "",
        websiteUrl: guest?.websiteUrl ?? "",
        avatar: guest?.avatar ?? "",
        // avatarFile: guest?.avatarFile ?? "",
        avatarFile: undefined,
      };
    }) ?? [];

  return modified;
}

export function ModifyEventGuestsFromFormToStore(
  eventGuests: WebEventCreateGuestSchemaInfer[],
): ResponseDataType["eventGuests"] {
  const modified =
    eventGuests?.map((guest) => {
      return {
        name: guest?.name ?? "",
        role: guest?.role ?? "",
        description: guest?.description ?? "",
        linkedInUrl: guest?.linkedInUrl ?? "",
        twitterUrl: guest?.twitterUrl ?? "",
        websiteUrl: guest?.websiteUrl ?? "",
        // avatar: guest?.avatar instanceof File ? "" : guest?.avatar,
        avatar: guest?.avatar ?? "",
        // avatarFile: guest?.avatarFile instanceof File ? "" : guest?.avatarFile,
        avatarFile: undefined,
      };
    }) ?? [];

  return modified;
}

export function ModifyEventFaqsFromStoreToForm(
  eventFaqs: ResponseDataType["eventFaqs"],
): WebEventCreateFaqSchemaInfer[] {
  const modified =
    eventFaqs?.map((faq) => {
      return {
        question: faq?.question ?? "",
        answer: faq?.answer ?? "",
      };
    }) ?? [];

  return modified;
}

export function ModifyEventAssetFromStoreToForm(
  eventAssets: ResponseDataType["eventAssets"],
): WebEventCreateImageSchemaInfer[] {
  const eventAssertModified: WebEventCreateImageSchemaInfer[] = [];

  for (const eventAsset of eventAssets ?? []) {
    const file = eventAsset?.assetFile;
    if (!file) continue;
    eventAssertModified?.push({
      file: file,
    });
  }

  return eventAssertModified;
}

export const LibEventModelStoreValidationHelper = async (
  creds?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const {
      event,
      eventDays,
      eventVenues,
      eventAssets,
      eventGuests,
      eventFaqs,
    } = creds ?? {};

    if (!event) {
      throw new ZodError([
        {
          code: "custom",
          message: "Event data is required",
          path: ["event"],
        },
      ]);
    }

    const eventDaysModified = ModifyEventDaysFromStoreToForm(eventDays ?? []);

    const eventVenuesModified = ModifyEventVenueFromStoreToForm(
      eventVenues ?? [],
    );

    const eventCategoriesModified =
      ModifyEventCategoryAssignmentFromStoreToForm(
        event?.eventCategoryAssignments ?? [],
      );

    const eventModulesModified = ModifyEventModulesFromStoreToForm(
      event?.eventModuleActivations ?? [],
    );

    const eventFeatureTypeModified = ModifyEventFeaturesFromStoreToForm(
      event?.eventFeatures ?? [],
    );

    const eventGuestsModified = ModifyEventGuestsFromStoreToForm(
      eventGuests ?? [],
    );

    const eventFaqsModified = ModifyEventFaqsFromStoreToForm(eventFaqs ?? []);

    const eventAssetsModified = ModifyEventAssetFromStoreToForm(eventAssets);

    const modified: WebEventCreateFiveSchemaInfer = {
      name: event?.name ?? "",
      visibility: event?.visibility ?? "",
      description: event?.description ?? "",
      eventDays: eventDaysModified,
      eventVenues: eventVenuesModified,
      searchCategory: "",
      eventCategoryAssignments: eventCategoriesModified,
      photos: eventAssetsModified,
      eventModules: eventModulesModified,
      eventFeatureType: eventFeatureTypeModified,
      ageRestriction: event?.ageRestriction ?? "",
      eventGuests: eventGuestsModified,
      eventFaqs: eventFaqsModified,
    };

    const validation = WebEventCreateFiveSchema?.safeParse(modified);

    if (!validation?.success) {
      throw new ZodError(validation?.error?.issues);
    }

    return {
      success: true,
      message: "Validation Success",
      data: {
        // event: axiosRes?.data?.event,
      },
    };
  });
};
