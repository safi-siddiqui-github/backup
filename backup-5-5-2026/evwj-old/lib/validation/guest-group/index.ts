import z from "zod";

export const GuestGroupSchema = z
  .object({
    name: z.string().min(3, "Name must have 3 characters."),
    // memberLimit: z.nullish(z.string()),
    memberLimit: z.string().nullish(),
    // description: z.nullish(z.string()),
    description: z.string().nullish(),
  })
  .superRefine((arg, ctx) => {
    //
    if (arg.memberLimit && isNaN(Number(arg.memberLimit))) {
      //
      ctx.addIssue({
        code: "custom",
        path: ["memberLimit"],
        message: "Member limit must be a number.",
      });
      //
    }
    //
  });
//
export type GuestGroupSchemaType = z.infer<typeof GuestGroupSchema>;
