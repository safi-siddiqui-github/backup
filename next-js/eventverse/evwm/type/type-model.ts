// // import {
// //   EventAsset,
// //   EventCategory,
// //   EventDateType,
// //   EventDay,
// //   EventModel,
// //   EventModule,
// //   EventModuleActivation,
// //   EventRecurringEnd,
// //   EventRecurringPattern,
// //   EventVenue,
// //   EventVenueLocationType,
// //   EventVenueType,
// //   EventVisibility,
// //   OTP,
// //   Token,
// //   User,
// // } from "@/prisma/generated/client";
// import { isNull } from "lodash";

// export type OrNull<T> = T | null;
// export type OrNullPartial<T> = Partial<T> | null;
// export const IsNotNullish = <T>(value: T | null | undefined): value is T => {
//   return !isNull(value) && value !== undefined;
// };

// export type UserModelType = Partial<User> & {};

// export type OTPModelType = Partial<OTP> & {};

// export type TokenModelType = Partial<Token> & {
//   user?: OrNull<UserModelType>;
// };

// export type EventDayModelType = Partial<EventDay> & {};

// export type EventVenueModelType = Partial<EventVenue> & {};

// export type EventCategoryModelType = Partial<EventCategory> & {
//   // children?: OrNull<EventCategoryModelType[]>;
// };

// export type EventAssetModelType = Partial<EventAsset> & {};

// export type EventModuleModelType = Partial<EventModule> & {};

// export type EventModuleActivationModelType =
//   Partial<EventModuleActivation> & {};

// export type EventModelType = Partial<EventModel> & {
//   user?: OrNull<UserModelType>;
//   eventDays?: OrNull<EventDayModelType[]>;
//   eventVenues?: OrNull<EventVenueModelType[]>;
//   eventCategories?: OrNull<EventCategoryModelType[]>;
//   eventAssets?: OrNull<EventAssetModelType[]>;
//   eventModuleActivations?: OrNull<EventModuleActivationModelType[]>;
// };

// export type EventVisibilityModelType = EventVisibility;
// export type EventDateTypeModelType = EventDateType;
// export type EventRecurringPatternModelType = EventRecurringPattern;
// export type EventRecurringEndModelType = EventRecurringEnd;
// export type EventVenueTypeModelType = EventVenueType;
// export type EventVenueLocationTypeModelType = EventVenueLocationType;
