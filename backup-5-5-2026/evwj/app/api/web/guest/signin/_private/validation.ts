import z from "zod";

export type WebSigninSchemaInfer = z.infer<typeof WebSigninSchema>;

export const WebSigninSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(50),
  remember: z.boolean(),
});
