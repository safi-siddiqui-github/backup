import {
  LibDateFNSValidationAfterDateHelper,
  LibDateFNSValidationTodayOrAfterHelper,
} from "@/lib/lib-date-fns";
import z from "zod";

const WebEventCreateBasicInfoSchema = z.object({
  name: z.string().min(3, "Enter name of event"),
  visibility: z.string().min(3, "Select visibility of event"),
  eventDays: z.optional(z.array(z.object({}))),
  eventVenues: z.optional(z.array(z.object({}))),
});

const WebEventCreateDescriptionSchema = z.object({
  description: z.string(),
});

export type WebEventCreateDaySchemaInfer = z.infer<
  typeof WebEventCreateDaySchema
>;

export const WebEventCreateDaySchema = z
  .object({
    eventDate: z.iso.datetime({
      error: "Select a date",
    }),
    timezone: z.string().min(1, "Timezone is required"),
    startTime: z.iso.time({
      error: "Select a time",
    }),
    endTime: z.iso.time({
      error: "Select a time",
    }),
    eventDateType: z.enum(["SINGLE", "RECURRING"]),
    eventRecurringPattern: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
    eventRecurringEnd: z.enum(["NEVER", "DATE", "OCCURRENCES"]),
    recurringEndDate: z.iso
      .datetime({
        error: "Select a date",
      })
      .optional(),
    recurringEndOccurrences: z.string().optional(),
  })
  .superRefine((arg, ctx) => {
    const {
      eventDate,
      eventDateType,
      eventRecurringPattern,
      eventRecurringEnd,
      recurringEndDate,
      recurringEndOccurrences,
    } = arg;

    if (!eventDate) {
      ctx.addIssue({
        code: "custom",
        message: "Event Date is required",
        path: ["eventDate"],
      });
    } else {
      if (!LibDateFNSValidationTodayOrAfterHelper({ eventDate })) {
        ctx.addIssue({
          code: "custom",
          message: "Date must be in the future",
          path: ["eventDate"],
        });
      }
    }

    if (eventDateType === "SINGLE") return;

    if (!eventRecurringPattern) {
      ctx.addIssue({
        code: "custom",
        message: "Recurring Pattern is required",
        path: ["eventRecurringPattern"],
      });
    }

    if (!eventRecurringEnd) {
      ctx.addIssue({
        code: "custom",
        message: "Recurring End is required",
        path: ["eventRecurringEnd"],
      });
      return;
    }

    if (eventRecurringEnd === "NEVER") return;

    if (eventRecurringEnd === "DATE") {
      if (!recurringEndDate) {
        ctx.addIssue({
          code: "custom",
          message: "Select a date",
          path: ["recurringEndDate"],
        });
      } else {
        if (
          !LibDateFNSValidationAfterDateHelper({
            startDate: eventDate,
            endDate: recurringEndDate,
          })
        ) {
          ctx.addIssue({
            code: "custom",
            message: "Date must after event Date",
            path: ["recurringEndDate"],
          });
        }
      }
    }

    if (eventRecurringEnd === "OCCURRENCES") {
      if (!recurringEndOccurrences) {
        ctx.addIssue({
          code: "custom",
          message: "Enter number of occurrences",
          path: ["recurringEndOccurrences"],
        });
      } else {
        if (isNaN(Number(recurringEndOccurrences))) {
          ctx.addIssue({
            code: "custom",
            message: "Must be a number",
            path: ["recurringEndOccurrences"],
          });
        }
      }
    }
  });

export const WebEventCreateDateArraySchema = z.object({
  eventDays: z
    .array(WebEventCreateDaySchema)
    .min(1, "Select at least one date"),
});

export type WebEventCreateVenueSchemaInfer = z.infer<
  typeof WebEventCreateVenueSchema
>;

export const WebEventCreateVenueSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    venueType: z.enum(["PHYSICAL", "VIRTUAL", "HYBRID"]),
    address: z.string().optional(),
    virtualLink: z.string().optional(),
    virtualLinkPass: z.string().optional(),
  })
  .superRefine((arg, ctx) => {
    const { venueType, address, virtualLink, virtualLinkPass } = arg;

    const physicalFN = () => {
      if (!address) {
        ctx.addIssue({
          code: "custom",
          message: "Address is required",
          path: ["address"],
        });
      }
    };

    const virtualFN = () => {
      if (!virtualLink) {
        ctx.addIssue({
          code: "custom",
          message: "Meeting link is required",
          path: ["virtualLink"],
        });
      } else {
        const check = z.url().safeParse(virtualLink);
        if (!check.success) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid meeting link",
            path: ["virtualLink"],
          });
        }
      }

      if (!virtualLinkPass) {
        ctx.addIssue({
          code: "custom",
          message: "Enter meeting link pass",
          path: ["virtualLinkPass"],
        });
      }
    };

    if (venueType === "PHYSICAL") {
      physicalFN();
    }

    if (venueType === "VIRTUAL") {
      virtualFN();
    }

    if (venueType === "HYBRID") {
      physicalFN();
      virtualFN();
    }
  });

export const WebEventCreateVenueArraySchema = z.object({
  eventVenues: z
    .array(WebEventCreateVenueSchema)
    .min(1, "Select at least one location"),
});

const WebEventCreateAgeSchema = z.object({
  ageRestriction: z.string().min(3, "Select age restirction"),
});

export type WebEventCreateCategorySchemaInfer = z.infer<
  typeof WebEventCreateCategorySchema
>;

const WebEventCreateCategorySchema = z.object({
  searchCategory: z.string(),
  eventCategoryAssignments: z.array(z.string()).min(1, "Select a category"),
});

export type WebEventCreateOneSchemaInfer = z.infer<
  typeof WebEventCreateOneSchema
>;

export const WebEventCreateOneSchema = WebEventCreateBasicInfoSchema.extend(
  WebEventCreateDescriptionSchema.shape,
).extend(WebEventCreateCategorySchema.shape);

const WebEventCreateImageSchema = z.object({
  file: z.instanceof(File),
});

export type WebEventCreateImageSchemaInfer = z.infer<
  typeof WebEventCreateImageSchema
>;

const WebEventCreateImageArraySchema = z.object({
  photos: z.array(WebEventCreateImageSchema).max(10, "Maximum limit is 10"),
});

export type WebEventCreateTwoSchemaInfer = z.infer<
  typeof WebEventCreateTwoSchema
>;

export const WebEventCreateTwoSchema = WebEventCreateImageArraySchema;

const WebEventCreateModuleSchema = z.object({
  eventModules: z.array(z.string()).min(1, "Select at least one module"),
});

export type WebEventCreateThreeSchemaInfer = z.infer<
  typeof WebEventCreateThreeSchema
>;

export const WebEventCreateThreeSchema = WebEventCreateModuleSchema;

const WebEventCreateFeatureSchema = z.object({
  eventFeatureType: z.string().min(1),
});

export type WebEventCreateGuestSchemaInfer = z.infer<
  typeof WebEventCreateGuestSchema
>;

export const WebEventCreateGuestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string(),
  description: z.string(),
  linkedInUrl: z.url().or(z.string().max(0)),
  twitterUrl: z.url().or(z.string().max(0)),
  websiteUrl: z.url().or(z.string().max(0)),
  avatar: z.string(),
  avatarFile: z.instanceof(File).optional(),
  avatarFileUrl: z.string().optional(),
});

export const WebEventCreateGuestArraySchema = z.object({
  eventGuests: z.array(WebEventCreateGuestSchema),
});

export const WebEventCreateFaqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export type WebEventCreateFaqSchemaInfer = z.infer<
  typeof WebEventCreateFaqSchema
>;

export const WebEventCreateFaqArraySchema = z.object({
  eventFaqs: z.array(WebEventCreateFaqSchema),
});

export type WebEventCreateFourSchemaInfer = z.infer<
  typeof WebEventCreateFourSchema
>;

export const WebEventCreateFourSchema = z
  .object({
    eventGuests: z.optional(z.array(z.object({}))),
    eventFaqs: z.optional(z.array(z.object({}))),
  })
  .extend(WebEventCreateFeatureSchema.shape)
  .extend(WebEventCreateAgeSchema.shape);

export type WebEventCreateFiveSchemaInfer = z.infer<
  typeof WebEventCreateFiveSchema
>;

export type WebEventCreateFiveSchemaKeys = keyof WebEventCreateFiveSchemaInfer;

export const WebEventCreateFiveSchema = WebEventCreateOneSchema.extend(
  WebEventCreateTwoSchema.shape,
)
  .extend(WebEventCreateThreeSchema.shape)
  .extend(WebEventCreateFourSchema.shape)
  .extend(WebEventCreateDateArraySchema.shape)
  .extend(WebEventCreateVenueArraySchema.shape)
  .extend(WebEventCreateGuestArraySchema.shape)
  .extend(WebEventCreateFaqArraySchema.shape);
