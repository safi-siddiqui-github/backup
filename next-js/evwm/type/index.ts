// import { ReactNode, RefObject } from "react";

// export type CustomEventType =
//   | "DialogEventDateComponent"
//   | "DialogEventVenueComponent"
//   | "DialogEventVenueSectionComponent"
//   | "DialogEventSpecialGuestComponent"
//   | "DialogEventSpecialGuestImportComponent"
//   | "DialogEventFaqComponent"
//   | "RsvpGuestGroupDialogComponent"
//   | null;

// export type CustomEventDetail = {
//   id?: number;
// };

// export type MockEventData = {
//   name: string;
//   startDate: string;
//   locationMap: string;
//   price: number;
//   featured?: boolean;
//   category?: string;
//   imageUrl?: string;
//   videoUrl?: string;
//   slug?: string;
//   username?: string;
//   userProfilePicture?: string;
//   latitude?: number;
//   longitude?: number;
// };

// type EventModel = {};
// type GuestGroup = {};
// type EventCategory = {};
// type ModuleCategory = {};
// type RsvpModule = {};
// type ScheduleModule = {};
// type SurveyModule = {};
// type AnnouncementModule = {};
// type MediaModule = {};
// type TicketModule = {};
// type TravelModule = {};
// type GameModule = {};
// type Session = {};
// type User = {};
// type Organization = {};
// type OrganizationMember = {};
// type OrganizationInvitation = {};

// // export type ActionParamType = {
// //   eventModel?: Partial<EventModel> & { include?: Prisma.EventModelInclude };
// //   guestGroup?: Partial<GuestGroup> & { include?: Prisma.GuestGroupInclude };
// // };

// export type FullEventModel = Partial<EventModel> & {
//   eventCategory?: Partial<EventCategory>;
//   rsvpModule?: FullRsvpModule;
//   seatingModule?: FullSeatingModule;
//   scheduleModule?: FullScheduleModule;
//   surveyModule?: FullSurveyModule;
//   announcementModule?: FullAnnouncementModule;
//   mediaModule?: FullMediaModule;
//   ticketModule?: FullTicketModule;
//   travelModule?: FullTravelModule;
//   gameModule?: FullGameModule;
//   budgetModule?: FullBudgetModule;
// };

// type FullModuleCategory = Partial<ModuleCategory> & {
//   parent?: Partial<ModuleCategory>;
// };

// type FullRsvpModule = Partial<RsvpModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullSeatingModule = Partial<RsvpModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullScheduleModule = Partial<ScheduleModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullSurveyModule = Partial<SurveyModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullAnnouncementModule = Partial<AnnouncementModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullMediaModule = Partial<MediaModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullTicketModule = Partial<TicketModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullTravelModule = Partial<TravelModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullGameModule = Partial<GameModule> & {
//   moduleCategory?: FullModuleCategory;
// };

// type FullBudgetModule = {
//   id?: number;
//   slug?: string;
//   isActive?: boolean;
//   moduleCategory?: FullModuleCategory;
//   eventModelId?: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// };

// type FullGuestGroup = Partial<GuestGroup> & {
//   // moduleCategory?: FullModuleCategory;
// };

// export type ActionResponseDataType = {
//   session?: Partial<Session> | null;
//   user?: Partial<User> | null;
//   eventModel?: FullEventModel | null;
//   eventModels?: FullEventModel[];
//   //
//   rsvpModule?: FullRsvpModule | null;
//   seatingModule?: FullSeatingModule | null;
//   scheduleModule?: FullScheduleModule | null;
//   surveyModule?: FullSurveyModule | null;
//   announcementModule?: FullAnnouncementModule | null;
//   mediaModule?: FullMediaModule | null;
//   ticketModule?: FullTicketModule | null;
//   travelModule?: FullTravelModule | null;
//   gameModule?: FullGameModule | null;
//   budgetModule?: FullBudgetModule | null;
//   //
//   guestGroup?: FullGuestGroup | null;
//   guestGroups?: FullGuestGroup[];
//   //
//   organization?: Partial<Organization> | null;
//   organizations?: Partial<Organization>[];
//   organizationMember?: Partial<OrganizationMember> | null;
//   organizationMembers?: Partial<OrganizationMember>[];
//   organizationInvitation?: Partial<OrganizationInvitation> | null;
//   organizationInvitations?: Partial<OrganizationInvitation>[];
//   notification?: Partial<Notification> | null;
//   notifications?: Partial<Notification>[];
//   unreadCount?: number;
//   totalCount?: number;
//   users?: Partial<User>[];
//   //
// };

// export type ClientPropType = {
//   children?: ReactNode | null;
//   //
//   slug?: string | null;
//   rsvpSlug?: string | null;
//   scheduleSlug?: string | null;
//   seatingSlug?: string | null;
//   ticketSlug?: string | null;
//   mediaSlug?: string | null;
//   travelSlug?: string | null;
//   websiteSlug?: string | null;
//   gameSlug?: string | null;
//   creategamesSlug?: string | null;
//   budgetSlug?: string | null;
//   //
//   homeEventCarouselObject?: {
//     index?: number | null;
//     activeSlides?: {
//       first?: number | null;
//       second?: number | null;
//       third?: number | null;
//     };
//   };
//   //
//   handleTrigger?: () => void;
//   //
//   triggerRef?: RefObject<HTMLButtonElement | null>;
//   actionResponseDataType?: ActionResponseDataType;
//   //
// };
// export type ServerPropType = {
//   params?: Promise<ClientPropType>;
// };

// export type EventModuleSlugType =
//   | null
//   | "rsvp-management"
//   | "schedule-timeline"
//   | "announcements"
//   | "games-activities"
//   | "survey-feedback"
//   | "media-management"
//   | "seating-arrangement"
//   | "ticketing-system"
//   | "budget-planning"
//   | "analytics-reporting"
//   | "event-websites"
//   | "travel-accommodation"
//   | "marketing-campaigns";

// export * from "../types/notification";
// export * from "../types/organization";

// //
