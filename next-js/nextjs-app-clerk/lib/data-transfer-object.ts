import { ResponseDataType } from "./responses-hanlder/response-types";

export const PrismaUserDto = (
  user: ResponseDataType["userPrisma"],
): ResponseDataType["userPrisma"] => {
  return {
    ...user,
    id: undefined,
    clerkId: undefined,
  };
};

export const PrismaBlogPostDto = (
  blogPost: ResponseDataType["blogPostPrisma"],
): ResponseDataType["blogPostPrisma"] => {
  return {
    ...blogPost,
    id: undefined,
    userId: undefined,
  };
};
