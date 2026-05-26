"use server";

import { PrismaBlogPostsCreateAction } from "@/lib/actions/prisma/prisma-blog-posts-actions";
import { PrismaBlogPostDto } from "@/lib/data-transfer-object";
import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import { ZodError } from "zod";
import { BlogCmsBlogPostNewSchema } from "./schema";

export default async function BlogCmsBlogPostNewAction(
  body: ResponseDataType,
): Promise<ResponseBodyType> {
  return ActionResponseHelper(async () => {
    BlogCmsBlogPostNewSchema?.parse(body?.blogPostPrisma);

    const blogRes = await PrismaBlogPostsCreateAction(body);
    if (!blogRes?.success) {
      throw new ZodError(blogRes?.error ?? []);
    }

    return {
      success: true,
      data: {
        blogPostPrisma: PrismaBlogPostDto(blogRes?.data?.blogPostPrisma),
      },
      message: "Blog Post Created Successfully",
    };
  });
}
