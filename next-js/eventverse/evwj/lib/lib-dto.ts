// Data Transfer Object

import { IsNotNullish } from "@/type/type-model";
import { ResponseDataType } from "./lib-responses";

export const UserDTO = (
  user?: ResponseDataType["user"],
): ResponseDataType["user"] => {
  return {
    ...user,
    password: null,
    id: undefined,
    googleId: null,
    appleId: null,
    facebookId: null,
    linkedinId: null,
  };
};

export const TokenDTO = (
  token?: ResponseDataType["token"],
): ResponseDataType["token"] => {
  return {
    ...token,
    id: undefined,
    createdAt: null,
    emailVerified: null,
    expiresAt: null,
    isAdmin: null,
    phoneVerified: null,
    updatedAt: null,
    userId: null,
    user: UserDTO(token?.user),
  };
};

export const EventCategoryDTO = (
  eventCategory: ResponseDataType["eventCategory"],
): ResponseDataType["eventCategory"] => {
  // const { children, ...eventCategoryData } = eventCategory || {};

  return eventCategory;

  // return {
  //   ...eventCategoryData,
  //   children:
  //     children && Array.isArray(children)
  //       ? children.map((child) => EventCategoryDTO(child))?.filter(IsNotNullish)
  //       : null,
  // };
};

export const EventCategoriesDTO = (
  eventCategories?: ResponseDataType["eventCategories"],
): ResponseDataType["eventCategories"] => {
  const result = [...(eventCategories || [])]
    ?.map((eventCategory) => EventCategoryDTO(eventCategory))
    ?.filter(IsNotNullish);

  return result.length > 0 ? result : null;
};

export const EventModuleDTO = (
  eventModule: ResponseDataType["eventModule"],
): ResponseDataType["eventModule"] => {
  return eventModule;
};

export const EventModulesDTO = (
  eventModules?: ResponseDataType["eventModules"],
): ResponseDataType["eventModules"] => {
  const result = [...(eventModules || [])]
    ?.map((eventModule) => EventModuleDTO(eventModule))
    ?.filter(IsNotNullish);

  return result.length > 0 ? result : null;
};
