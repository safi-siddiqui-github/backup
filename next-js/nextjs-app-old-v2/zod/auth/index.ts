import { z } from 'zod';

export const loginFormSchemaZod = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});

export const registerFormSchemaZod = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email(),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});
