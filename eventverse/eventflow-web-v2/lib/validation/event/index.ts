import { z } from "zod";

export const eventStepOneFormSchema = z
  .object({
    name: z
      .string({
        error: "Name is required",
      })
      .min(4, {
        error: "Name must be at least 4 characters",
      }),
    slug: z
      .string({
        error: "Slug is required",
      })
      .min(4, {
        error: "Slug must be at least 4 characters",
      }),
    isPublic: z.boolean(),
    description: z.string(),
    categoryId: z.string().min(1, {
      error: "Select event categpry",
    }),
    //
    // isMultiDayEvent: z.boolean(),
    // startDate: z.iso.date({ error: "Start Date is required" }),
    // endDate: z.string(),
    // startTime: z.iso.time({ error: "Start Time is required" }),
    // endTime: z.iso.time({ error: "End Time is required" }),
    // timezoneId: z.string().min(1, { error: "Select time zone" }),
    //
    // isRecurringEvent: z.boolean(),
    // recurringPatternId: z.string(),
    // recurringRepeat: z.string(),
    // recurringEnd: z.string(),
    // recurringEndId: z.string(),
    // recurringOccerrence: z.string(),
    // recurringEndDate: z.string(),
    //
    isVenueEnabled: z.boolean(),
    venueName: z.string().optional(),
    venueType: z.enum(["NONE", "PHYSICAL", "VIRTUAL", "HYBRID", "CUSTOM"]),
    venueAddress: z.string().optional(),
    venueLink: z.string().optional(),
    venueCapacity: z.string().optional(),
    venueFeature: z.string().optional(),
    //
  })
  .superRefine((data, ctx) => {
    //
    // if (data.isMultiDayEvent) {
    //   if (!data.endDate) {
    //     ctx.addIssue({
    //       path: ["endDate"],
    //       code: "custom",
    //       message: "End date is required",
    //     });
    //   }

    //   // Must be a valid ISO date
    //   const date = new Date(data.endDate);
    //   if (isNaN(date.getDate())) {
    //     ctx.addIssue({
    //       path: ["endDate"],
    //       code: "custom",
    //       message: "End date must be a valid date",
    //     });
    //   }
    // }
    //
    // if (data.isRecurringEvent) {
    //   if (!data.recurringPatternId) {
    //     ctx.addIssue({
    //       path: ["recurringPatternId"],
    //       code: "custom",
    //       message: "Recurring Pattern is required",
    //     });
    //   }
    //   //
    //   if (!data.recurringRepeat) {
    //     ctx.addIssue({
    //       path: ["recurringRepeat"],
    //       code: "custom",
    //       message: "Recurring Repeat is required",
    //     });
    //   } else {
    //     // Must be a valid Number
    //     const recurringRepeat = Number(data.recurringRepeat);
    //     if (isNaN(recurringRepeat)) {
    //       ctx.addIssue({
    //         path: ["recurringRepeat"],
    //         code: "custom",
    //         message: "Recurring Repeat must be a valid number",
    //       });
    //     }
    //   }
    //   //
    //   if (!data.recurringEnd) {
    //     ctx.addIssue({
    //       path: ["recurringEnd"],
    //       code: "custom",
    //       message: "Recurring End is required",
    //     });
    //   } else {
    //     if (data.recurringEnd === "occurrences") {
    //       if (!data.recurringOccerrence) {
    //         ctx.addIssue({
    //           path: ["recurringOccerrence"],
    //           code: "custom",
    //           message: "Recurring Occurence is required",
    //         });
    //       } else {
    //         // Must be a valid Number
    //         const recurringOccerrence = Number(data.recurringOccerrence);
    //         if (isNaN(recurringOccerrence)) {
    //           ctx.addIssue({
    //             path: ["recurringOccerrence"],
    //             code: "custom",
    //             message: "Recurring Occurance must be a valid number",
    //           });
    //         }
    //       }
    //     } else if (
    //       data.recurringEnd === "until-date" &&
    //       !data.recurringEndDate
    //     ) {
    //       if (!data.recurringEndDate) {
    //         ctx.addIssue({
    //           path: ["recurringEndDate"],
    //           code: "custom",
    //           message: "Recurring Date is required",
    //         });
    //       } else {
    //         // Must be a valid ISO date
    //         const recurringEndDate = new Date(data.recurringEndDate);
    //         if (isNaN(recurringEndDate.getDate())) {
    //           ctx.addIssue({
    //             path: ["recurringEndDate"],
    //             code: "custom",
    //             message: "Recurring Date must be a valid date",
    //           });
    //         }
    //       }
    //     }
    //   }
    // }
    //
    if (data.isVenueEnabled) {
      if (!data.venueName) {
        ctx.addIssue({
          path: ["venueName"],
          code: "custom",
          message: "Venue Name is required",
        });
      }
      //
      if (!data.venueType) {
        ctx.addIssue({
          path: ["venueType"],
          code: "custom",
          message: "Venue Type is required",
        });
      } else {
        //
        if (data.venueType === "PHYSICAL" && !data.venueAddress) {
          ctx.addIssue({
            path: ["venueAddress"],
            code: "custom",
            message: "Venue Address is required",
          });
        } else if (data.venueType === "VIRTUAL") {
          //
          if (!data.venueLink) {
            ctx.addIssue({
              path: ["venueLink"],
              code: "custom",
              message: "Venue Link is required",
            });
          } else {
            try {
              new URL(data.venueLink); // throws if invalid
            } catch {
              ctx.addIssue({
                path: ["venueLink"],
                code: "custom",
                message: "Venue Link must be a valid URL",
              });
            }
          }
        } else if (data.venueType === "HYBRID") {
          //
          if (!data.venueAddress) {
            ctx.addIssue({
              path: ["venueAddress"],
              code: "custom",
              message: "Venue Address is required",
            });
          }
          //
          if (!data.venueLink) {
            ctx.addIssue({
              path: ["venueLink"],
              code: "custom",
              message: "Venue Link is required",
            });
          } else {
            try {
              new URL(data.venueLink); // throws if invalid
            } catch {
              ctx.addIssue({
                path: ["venueLink"],
                code: "custom",
                message: "Venue Link must be a valid URL",
              });
            }
          }
        }
        //
        if (data.venueCapacity) {
          // Must be a valid Number
          const venueCapacity = Number(data.venueCapacity);
          if (isNaN(venueCapacity)) {
            ctx.addIssue({
              path: ["venueCapacity"],
              code: "custom",
              message: "Venue Capacity must be a valid number",
            });
          }
        }
      }
    }
  });

export const eventStepTwoFormSchema = z.object({
  moduleCategoryIds: z.array(z.number()).min(1, {
    error: "Select module event categpry",
  }),
});

export const eventStepThreeFormSchema = z.object({});

export const eventStepFourFormSchema = z.object({
  launchStrategy: z.enum(["NONE", "DRAFT", "SOFT", "LAUNCH", "CUSTOM"], {
    error: "Select launching strategy",
  }),
});
