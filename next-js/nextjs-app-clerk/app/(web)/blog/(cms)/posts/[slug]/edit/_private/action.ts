"use server";

import {
  PrismaBlogPostsFindFirstAction,
  PrismaBlogPostsUpdateAction,
} from "@/lib/actions/prisma/prisma-blog-posts-actions";
import { PrismaUsersFindUniqueAction } from "@/lib/actions/prisma/prisma-users-actions";
import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import { ZodError } from "zod";
import { BlogCmsBlogPostEditSlugSchema } from "./schema";

export const BlogCmsBlogPostSlugEditFindAction = async (
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

    const userRes = await PrismaUsersFindUniqueAction();
    if (!userRes?.success || !userRes?.data?.userPrisma?.id) {
      throw new ZodError(userRes?.error ?? []);
    }

    const blogRes = await PrismaBlogPostsFindFirstAction({
      blogPostPrisma: {
        where: {
          slug,
          userId: userRes?.data?.userPrisma?.id,
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

export const BlogCmsBlogPostSlugEditUpdateAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return ActionResponseHelper(async () => {
    BlogCmsBlogPostEditSlugSchema?.parse(body?.blogPostPrisma);

    const blogRes = await PrismaBlogPostsUpdateAction(body);
    if (!blogRes?.success) {
      throw new ZodError(blogRes?.error ?? []);
    }

    return {
      success: true,
      message: "Blog Post Updated Successfully",
      data: {
        blogPostPrisma: blogRes?.data?.blogPostPrisma,
      },
    };
  });
};
