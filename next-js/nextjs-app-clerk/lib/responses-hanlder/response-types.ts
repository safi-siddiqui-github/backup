import { auth } from "@clerk/nextjs/server";
import { $ZodIssue } from "zod/v4/core";
import { BlogPost, Prisma, User } from "../generated/prisma/client";
import { PartialOrNull } from "../typescript";

export type ResponseBodyType = {
  success: boolean;
  message?: string;
  data?: ResponseDataType;
  error?: $ZodIssue[];
};

export type ResponseDataType = {
  userPrisma?: PartialOrNull<PrismaUserType>;

  blogPostPrisma?: PartialOrNull<PrismaBlogPostType>;
  blogPostsPrisma?: PartialOrNull<PrismaBlogPostType>[];

  clerkAuthSession?: PartialOrNull<Auth>;
};

type PrismaUserType = User & {
  includes?: Prisma.UserInclude;
};
type PrismaBlogPostType = BlogPost & {
  includes?: Prisma.BlogPostInclude;
  where?: Prisma.BlogPostWhereInput;
  orderBy?: Prisma.BlogPostOrderByWithRelationInput;
};

type Auth = Awaited<ReturnType<typeof auth>>;
