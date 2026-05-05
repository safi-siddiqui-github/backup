import z from "zod";

export type ForgotPasswordUpdatePasswordSchemaInfer = z.infer<
  typeof ForgotPasswordUpdatePasswordSchema
>;

export const ForgotPasswordUpdatePasswordSchema = z
  .object({
    email: z.string().email(),
    token: z.string().min(6),
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
