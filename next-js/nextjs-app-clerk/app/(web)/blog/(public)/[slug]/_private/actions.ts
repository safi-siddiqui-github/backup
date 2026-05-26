"use server";

import {
  PrismaBlogPostsFindFirstAction,
  PrismaBlogPostsFindManyAction,
} from "@/lib/actions/prisma/prisma-blog-posts-actions";
import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import { ZodError } from "zod";

export const BlogPublicBlogPostSlugAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return ActionResponseHelper(async () => {
    const { slug } = body?.blogPostPrisma ?? {};

    if (!slug) {
      throw new ZodError([
        {
          code: "custom",
          path: ["slug"],
          message: "slug is required",
        },
      ]);
    }

    const blogRes = await PrismaBlogPostsFindFirstAction({
      blogPostPrisma: {
        where: {
          slug,
        },
      },
    });
    if (!blogRes?.success) {
      throw new ZodError(blogRes?.error ?? []);
    }

    return {
      success: true,
      message: "Blog Post Found Successfully",
      data: {
        blogPostPrisma: blogRes?.data?.blogPostPrisma,
      },
    };
  });
};

export const BlogPublicBlogPostSlugRecomendAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return ActionResponseHelper(async () => {
    const blogRes = await PrismaBlogPostsFindManyAction(body);
    if (!blogRes?.success) {
      throw new ZodError(blogRes?.error ?? []);
    }

    return {
      success: true,
      message: "Blog Post Found Successfully",
      data: {
        blogPostsPrisma: blogRes?.data?.blogPostsPrisma,
      },
    };
  });
};
