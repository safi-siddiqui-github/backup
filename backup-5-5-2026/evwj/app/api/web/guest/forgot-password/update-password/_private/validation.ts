import z from "zod";

export type WebForgotPasswordUpdatePasswordSchemaInfer = z.infer<
  typeof WebForgotPasswordUpdatePasswordSchema
>;

export const WebForgotPasswordUpdatePasswordSchema = z
  .object({
    email: z.email(),
    code: z.string().min(6),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
