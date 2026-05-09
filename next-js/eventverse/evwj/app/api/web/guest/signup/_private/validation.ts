import { CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import z from "zod";

export type WebSignupSchemaInfer = z.infer<typeof WebSignupSchema>;

export const WebSignupSchema = z
  .object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.email(),
    countryCode: z.string().min(2).max(10),
    phone: z.string().min(3).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    agreedTerms: z.boolean(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
    if (val.agreedTerms !== true) {
      ctx.addIssue({
        code: "custom",
        message: "Accept terms & conditions",
        path: ["agreedTerms"],
      });
    }
    if (
      val.countryCode &&
      val.phone &&
      !isValidPhoneNumber(val.phone, val.countryCode as CountryCode)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid Phone Number",
        path: ["phone"],
      });
    }
  });
