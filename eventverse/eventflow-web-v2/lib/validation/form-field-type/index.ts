import z from "zod";

export const formFieldTypeSchema = z.object({
  name: z.string().min(3, { error: "Name must have 3 charaters" }),
  placeholder: z
    .string()
    .min(5, { error: "Placeholder must have 5 charaters" }),
  isRequired: z.boolean(),
  type: z.enum(["TEXT", "TEXTAREA", "RADIO", "SELECT", "CHECKBOX"]),
  userId: z.string().min(1),
});
