import z from "zod";

export type SignupEmailVerificationSchemaInfer = z.infer<
  typeof SignupEmailVerificationSchema
>;

export const SignupEmailVerificationSchema = z.object({
  email: z.string().email(),
  token: z.string().length(6),
});

export type SignupEmailVerificationResendSchemaInfer = z.infer<
  typeof SignupEmailVerificationResendSchema
>;

export const SignupEmailVerificationResendSchema = z.object({
  email: z.string().email(),
});
