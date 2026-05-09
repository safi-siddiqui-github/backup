import z from "zod";

export const rsvpModuleSettingSchema = z
  .object({
    rsvpDeadline: z.string(),
    rsvpCapacityLimit: z.string(),
    rsvpPlusOneLimit: z.string(),
    rsvpResponse: z.enum(["NONE", "YESNO", "YESNOMAYBE", "CUSTOM"]),
    rsvpAllowPlusOne: z.boolean(),
    rsvpEnableWaitlist: z.boolean(),
    rsvpCollectDietryInformation: z.boolean(),
    rsvpEnableCustomField: z.boolean(),
    //
    rsvpPublicRegistration: z.boolean(),
    rsvpRequireApproval: z.boolean(),
    rsvpAutomaticReminder: z.boolean(),
    //
    rsvpPlatform: z.enum([
      "NONE",
      "AMAZON",
      "TARGET",
      "WALMART",
      "BEDBATHBEYOND",
      "WILLIAMSSONOMA",
      "HONEYMOONFUND",
      "CUSTOM",
    ]),
    rsvpGiftName: z.string(),
    rsvpGiftUrl: z.string(),
    rsvpGiftDescription: z.string(),
    //
    rsvpTemplate: z.enum([
      "NONE",
      "DEFAULT",
      "FORMAL",
      "CASUAL",
      "MODERN",
      "CUSTOM",
    ]),

    rsvpReminder: z.enum(["NONE", "STANDARD", "FREQUENT", "MINIMAL", "CUSTOM"]),
    rsvpCommunicationMessage: z.string(),
    rsvpCommunicationSmsNotification: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.rsvpCapacityLimit) {
      const rsvpCapacityLimit = Number(data.rsvpCapacityLimit);
      if (isNaN(rsvpCapacityLimit)) {
        ctx.addIssue({
          path: ["rsvpCapacityLimit"],
          code: "custom",
          message: "Capacity Limit must be a valid number",
        });
      }
    }
    if (data.rsvpPlusOneLimit) {
      const rsvpPlusOneLimit = Number(data.rsvpPlusOneLimit);
      if (isNaN(rsvpPlusOneLimit)) {
        ctx.addIssue({
          path: ["rsvpPlusOneLimit"],
          code: "custom",
          message: "Plus One must be a valid number",
        });
      }
    }
    if (data.rsvpGiftUrl) {
      try {
        new URL(data.rsvpGiftUrl); // throws if invalid
      } catch {
        ctx.addIssue({
          path: ["rsvpGiftUrl"],
          code: "custom",
          message: "Url Link must be a valid URL",
        });
      }
    }
  });

export const guestGroupSchema = z
  .object({
    name: z.string().min(3, { error: "Name must have 3 charaters" }),
    description: z
      .string()
      .min(5, { error: "Description must have 5 charaters" }),
    memberLimit: z.string(),
    moduleId: z.string().min(1),
    color: z.enum([
      "NONE",
      "RED",
      "BLUE",
      "GREEN",
      "PURPLE",
      "YELLOW",
      "PINK",
      "INDIGO",
      "ORANGE",
    ]),
  })
  .superRefine((data, ctx) => {
    if (data.memberLimit) {
      const memberLimit = Number(data.memberLimit);
      if (isNaN(memberLimit)) {
        ctx.addIssue({
          path: ["memberLimit"],
          code: "custom",
          message: "Member Limit must be a valid number",
        });
      }
    }
  });

export const guestListSchema = z
  .object({
    name: z.string().min(3, { error: "Name must have 3 charaters" }),
    email: z.email(),
    phone: z.string().min(10, { error: "Phone must have 10 charaters" }),
    plusOne: z.string(),
    dietryRestriction: z.string(),
    note: z.string(),
    moduleId: z.string().min(1),
    guestGroupId: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.plusOne) {
      const plusOne = Number(data.plusOne);
      if (isNaN(plusOne)) {
        ctx.addIssue({
          path: ["plusOne"],
          code: "custom",
          message: "Plus One must be a valid number",
        });
      }
    }
  });

export const guestListBulkSchema = z
  .object({
    emailAddresses: z.string().min(1, "At least one email is required"),
    moduleId: z.string().min(1),
    guestGroupId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const emails = data.emailAddresses
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean); // remove empty strings

    if (emails.length === 0) {
      ctx.addIssue({
        path: ["emailAddresses"],
        message: "Please provide at least one valid email address",
        code: "custom",
      });
      return;
    }

    const emailSchema = z.email();
    emails.forEach((email, index) => {
      const result = emailSchema.safeParse(email);
      if (!result.success) {
        ctx.addIssue({
          path: ["emailAddresses"],
          message: `Invalid email at position ${index + 1}: "${email}"`,
          code: "custom",
        });
      }
    });
  });
