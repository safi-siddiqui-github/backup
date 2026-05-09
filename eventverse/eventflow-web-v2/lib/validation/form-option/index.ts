import z from "zod";

export const formOptionSchema = z.object({
  name: z.string().min(3, { error: "Name must have 3 charaters" }),
  formFieldTypeId: z.string(),
  formFieldId: z.string(),
});
