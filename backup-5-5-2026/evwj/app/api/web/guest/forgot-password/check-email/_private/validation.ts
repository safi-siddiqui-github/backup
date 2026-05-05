import z from "zod";

export type WebForgotPasswordCheckEmailSchemaInfer = z.infer<
  typeof WebForgotPasswordCheckEmailSchema
>;

export const WebForgotPasswordCheckEmailSchema = z.object({
  email: z.email(),
});
