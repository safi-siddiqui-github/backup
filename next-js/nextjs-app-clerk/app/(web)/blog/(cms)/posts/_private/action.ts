"use server";

import { PrismaBlogPostsFindManyAction } from "@/lib/actions/prisma/prisma-blog-posts-actions";
import { PrismaUsersFindUniqueAction } from "@/lib/actions/prisma/prisma-users-actions";
import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import { ZodError } from "zod";

export default async function BlogCmsBlogPostsAction(
  body?: ResponseDataType,
): Promise<ResponseBodyType> {
  return ActionResponseHelper(async () => {
    const userRes = await PrismaUsersFindUniqueAction();
    if (!userRes?.success || !userRes?.data?.userPrisma?.id) {
      throw new ZodError(userRes?.error ?? []);
    }

    const blogRes = await PrismaBlogPostsFindManyAction({
      blogPostPrisma: {
        where: {
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
        blogPostsPrisma: blogRes?.data?.blogPostsPrisma,
      },
    };
  });
}
