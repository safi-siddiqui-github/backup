import z from "zod";

export const SigninSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(8),
  remember: z.boolean(),
});

export type SigninSchemaInfer = z.infer<typeof SigninSchema>;
