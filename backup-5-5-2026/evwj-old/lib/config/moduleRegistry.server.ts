import { EventModuleSlugType } from "@/type";
import { ResponseBodyType } from "../lib-responses";

// Type for module values passed to upsert actions
type ModuleUpsertValues = {
  id?: number;
  eventModelId?: number;
  moduleCategoryId?: number;
  slug?: string;
};

/**
 * Get upsert action for a module by its slug
 * This is server-only and should not be imported in client components
 */
export function getModuleUpsertActionBySlug(slug: EventModuleSlugType) {
  if (!slug) {
    return async () =>
      ({ success: false, message: "Invalid module" }) as ResponseBodyType;
  }

  const actionMap: Record<
    string,
    (values: ModuleUpsertValues) => Promise<ResponseBodyType>
  > = {
    // "rsvp-management": UpsertRsvpModuleAction,
    // "seating-arrangement": UpsertSeatingModuleAction,
    // "schedule-timeline": UpsertScheduleModuleAction,
    // "survey-feedback": UpsertSurveyModuleAction,
    // announcements: UpsertAnnouncementModuleAction,
    // "media-management": UpsertMediaModuleAction,
    // "ticketing-system": UpsertTicketModuleAction,
    // "travel-accommodation": UpsertTravelModuleAction,
    // "games-activities": UpsertGameModuleAction,
    // "budget-planning": UpsertBudgetModuleAction,
    "analytics-reporting": async () =>
      ({ success: false, message: "Not implemented" }) as ResponseBodyType,
    "event-websites": async () =>
      ({ success: false, message: "Not implemented" }) as ResponseBodyType,
    "marketing-campaigns": async () =>
      ({ success: false, message: "Not implemented" }) as ResponseBodyType,
  };

  return (
    actionMap[slug] ||
    (async () =>
      ({ success: false, message: "Invalid module" }) as ResponseBodyType)
  );
}

/**
 * Get Prisma include object for all modules
 * This is server-only and should not be imported in client components
 */
// export function getAllModulesPrismaInclude(): Prisma.EventModelInclude {
//   const include: Prisma.EventModelInclude = {
//     rsvpModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     seatingModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     scheduleModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     surveyModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     announcementModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     mediaModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     ticketModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     travelModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     gameModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//     budgetModule: {
//       include: {
//         moduleCategory: {
//           include: {
//             parent: true,
//           },
//         },
//       },
//     },
//   };

//   return include;
// }
