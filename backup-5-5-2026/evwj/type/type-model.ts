import {
  EventAgeRestriction,
  EventAsset,
  EventCategory,
  EventCategoryAssignment,
  EventDateType,
  EventDay,
  EventFaq,
  EventFeature,
  EventFeatureType,
  EventGuest,
  EventModel,
  EventModule,
  EventModuleActivation,
  EventRecurringEnd,
  EventRecurringPattern,
  EventVenue,
  EventVenueType,
  EventVisibility,
  OTP,
  Prisma,
  Token,
  User,
} from "@/prisma/generated/client";
import { isNull } from "lodash";
import { FileType } from ".";

export type OrNull<T> = T | null;
export type OrNullPartial<T> = Partial<T> | null;
export const IsNotNullish = <T>(value: T | null | undefined): value is T => {
  return !isNull(value) && value !== undefined;
};

export type UserModelType = Partial<User> & {};

export type OTPModelType = Partial<OTP> & {};

export type TokenModelType = Partial<Token> & {
  user?: OrNull<UserModelType>;
};

export type EventModelType = Partial<EventModel> & {
  user?: OrNull<UserModelType>;
  eventDays?: OrNull<EventDayModelType[]>;
  eventVenues?: OrNull<EventVenueModelType[]>;
  eventCategoryAssignments?: OrNull<EventCategoryAssignmentModelType[]>;
  eventAssets?: OrNull<EventAssetModelType[]>;
  eventModuleActivations?: OrNull<EventModuleActivationModelType[]>;
  eventFeatures?: OrNull<EventFeatureModelType[]>;
  eventGuests?: OrNull<EventGuestModelType[]>;
  eventFaqs?: OrNull<EventFaqModelType[]>;
};

export type EventModelIncludeType = Prisma.EventModelInclude;

export type EventDayModelType = Partial<EventDay> & {};

export type EventVenueModelType = Partial<EventVenue> & {
  addressType?: {
    id?: string;
    displayName?: string;
    formattedAddress?: string;
    location?: {
      lat?: number;
      lng?: number;
    };
  };
};

export type EventVenueModelAddressType = Partial<
  EventVenueModelType["addressType"]
>;

export type EventCategoryModelType = Partial<EventCategory> & {
  // children?: OrNull<EventCategoryModelType[]>;
};

export type EventAssetModelType = Partial<EventAsset> & {
  assetFile?: FileType;
  assetFileUrl?: string | undefined;
};

export type EventModuleModelType = Partial<EventModule> & {
  children?: OrNull<EventModuleModelType[]>;
};

export type EventModuleActivationModelType =
  Partial<EventModuleActivation> & {};

export type EventGuestModelType = Partial<EventGuest> & {
  avatarFile?: FileType;
  avatarFileUrl?: string | undefined;
};
export type EventFaqModelType = Partial<EventFaq> & {};

export type EventCategoryAssignmentModelType =
  Partial<EventCategoryAssignment> & {};

export type EventVisibilityModelType = EventVisibility;
export type EventDateTypeModelType = EventDateType;
export type EventRecurringPatternModelType = EventRecurringPattern;
export type EventRecurringEndModelType = EventRecurringEnd;
export type EventVenueTypeModelType = EventVenueType;
export type EventAgeRestrictionModelType = EventAgeRestriction;
export type EventFeatureTypeModelType = EventFeatureType;
export type EventFeatureModelType = Partial<EventFeature> & {};
