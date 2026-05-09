import z from "zod";

export type ForgotPasswordCheckEmailSchemaInfer = z.infer<
  typeof ForgotPasswordCheckEmailSchema
>;

export const ForgotPasswordCheckEmailSchema = z.object({
  email: z.string().email(),
});
