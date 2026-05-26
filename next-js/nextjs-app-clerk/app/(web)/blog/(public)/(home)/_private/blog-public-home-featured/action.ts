"use server";

import { PrismaBlogPostsFindManyAction } from "@/lib/actions/prisma/prisma-blog-posts-actions";
import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import { ZodError } from "zod";

export default async function BlogPublicHomeFeaturedAction(
  body?: ResponseDataType,
): Promise<ResponseBodyType> {
  return ActionResponseHelper(async () => {
    const blogRes = await PrismaBlogPostsFindManyAction();
    if (!blogRes?.success) {
      throw new ZodError(blogRes?.error ?? []);
    }

    return {
      success: true,
      message: "Blog Posts Found Successfully",
      data: {
        blogPostsPrisma: blogRes?.data?.blogPostsPrisma,
      },
    };
  });
}
