import { z } from "zod";

export const BlogCmsBlogPostNewSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(60, "Title must be at most 60 characters"),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(100, "Excerpt must be at most 100 characters"),
  content: z.optional(z.string()),
});

export type BlogCmsBlogPostNewSchemaType = z.infer<
  typeof BlogCmsBlogPostNewSchema
>;
