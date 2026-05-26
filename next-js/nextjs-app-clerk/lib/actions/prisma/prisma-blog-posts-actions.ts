import { crptyoRandomUUID } from "@/lib/crypto-helpers";
import { ActionResponseHelper } from "@/lib/responses-hanlder/response-helpers";
import {
  ResponseBodyType,
  ResponseDataType,
} from "@/lib/responses-hanlder/response-types";
import prisma from "@/prisma/client";
import { ZodError } from "zod";
import { PrismaUsersFindUniqueAction } from "./prisma-users-actions";

// actions where userId is required, we direclty use it
// actions where calls can be from public can use dynamic where

export const PrismaBlogPostsCreateAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { title, excerpt } = body?.blogPostPrisma ?? {};

    if (!title) {
      throw new ZodError([
        {
          code: "custom",
          path: ["title"],
          message: "title is required",
        },
      ]);
    }

    const userRes = await PrismaUsersFindUniqueAction();
    if (!userRes?.success || !userRes?.data?.userPrisma?.id) {
      throw new ZodError(userRes?.error ?? []);
    }

    const uuid = crptyoRandomUUID();
    // const slug = title?.slice(0, 5)?.toLocaleLowerCase() + uuid;
    const slug = `blog-post-${uuid}`;

    const blogPost = await prisma?.blogPost?.create({
      data: {
        userId: userRes?.data?.userPrisma?.id,
        slug,
        title,
        excerpt,
      },
    });
    if (!blogPost) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Blog post not created",
        },
      ]);
    }

    return {
      success: true,
      message: "Blog Post Created Successfully",
      data: {
        blogPostPrisma: blogPost,
      },
    };
  });
};

export const PrismaBlogPostsFindManyAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { where, orderBy } = body?.blogPostPrisma ?? {};

    // const userRes = await PrismaUsersFindUniqueAction();
    // if (!userRes?.success || !userRes?.data?.userPrisma?.id) {
    //   throw new ZodError(userRes?.error ?? []);
    // }

    const blogPosts = await prisma?.blogPost?.findMany({
      where,
      orderBy: orderBy ?? {
        updatedAt: "desc",
      },
    });
    if (!blogPosts) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Blog post not found",
        },
      ]);
    }

    return {
      success: true,
      message: "Blog Post Found Successfully",
      data: {
        blogPostsPrisma: blogPosts,
      },
    };
  });
};

export const PrismaBlogPostsFindFirstAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { where } = body?.blogPostPrisma ?? {};

    const blogPost = await prisma?.blogPost?.findFirst({
      where: where ?? {
        slug: null,
      },
    });
    if (!blogPost) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Blog post not found",
        },
      ]);
    }

    return {
      success: true,
      message: "Blog Post Found Successfully",
      data: {
        blogPostPrisma: blogPost,
      },
    };
  });
};

export const PrismaBlogPostsUpdateAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { slug, title, excerpt } = body?.blogPostPrisma ?? {};

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

    const blogPost = await prisma?.blogPost?.update({
      where: {
        slug,
        userId: userRes?.data?.userPrisma?.id,
      },
      data: {
        title,
        excerpt,
      },
    });
    if (!blogPost) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Blog post not found",
        },
      ]);
    }

    return {
      success: true,
      message: "Blog Post Updated Successfully",
      data: {
        blogPostPrisma: blogPost,
      },
    };
  });
};

export const PrismaBlogPostsDeleteAction = async (
  body?: ResponseDataType,
): Promise<ResponseBodyType> => {
  return await ActionResponseHelper(async () => {
    const { id } = body?.blogPostPrisma ?? {};

    if (!id) {
      throw new ZodError([
        {
          code: "custom",
          path: ["id"],
          message: "id is required",
        },
      ]);
    }

    const userRes = await PrismaUsersFindUniqueAction();
    if (!userRes?.success || !userRes?.data?.userPrisma?.id) {
      throw new ZodError(userRes?.error ?? []);
    }

    const blogPost = await prisma?.blogPost?.delete({
      where: {
        id,
        userId: userRes?.data?.userPrisma?.id,
      },
    });

    if (!blogPost) {
      throw new ZodError([
        {
          code: "custom",
          path: ["email"],
          message: "Blog post not found",
        },
      ]);
    }

    return {
      success: true,
      message: "Blog Post Deleted Successfully",
    };
  });
};
