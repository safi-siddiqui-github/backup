"use server";

import { PrismaBlogPostsDeleteAction } from "@/lib/actions/prisma/prisma-blog-posts-actions";
import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import { ZodError } from "zod";

export const BlogCmsBlogPostCardDeleteAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return ActionResponseHelper(async () => {
    const blogRes = await PrismaBlogPostsDeleteAction(body);
    if (!blogRes?.success) {
      throw new ZodError(blogRes?.error ?? []);
    }

    return {
      success: true,
      message: "Blog Post Deleted Successfully",
    };
  });
};
