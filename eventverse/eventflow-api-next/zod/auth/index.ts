import z from "zod";

export const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(3),
});

export const SigninSchema = z.object({
  emailOrUsername: z.string().min(3),
  password: z.string().min(3),
});
