import { z } from "zod";

export const SignupValidation = z.object({
  name: z
    .string({ required_error: 'Name is requried' })
    .trim()
    .min(2)
    .max(50),
  email: z
    .string({ required_error: 'Email is requried' })
    .trim()
    .email(),
  password: z
    .string({ required_error: 'Password is requried' })
    .trim()
    .min(3)
    .max(50),
});

export const SigninValidation = z.object({
  email: z
    .string({ required_error: 'Email is requried' })
    .trim()
    .email(),
  password: z
    .string({ required_error: 'Password is requried' })
    .trim()
    .min(3)
    .max(50),
});


export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
