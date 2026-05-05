import z from "zod";

export type EmailVerificationWebSchemaInfer = z.infer<
  typeof EmailVerificationWebSchema
>;

export const EmailVerificationWebSchema = z.object({
  code: z.string().length(6),
});
