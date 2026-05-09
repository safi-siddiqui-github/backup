"use server";

import prisma from "@/prisma/database";
import { FormFieldType } from "@/prisma/generated";

export async function findFormFieldTypes(
  userId?: string,
): Promise<FormFieldType[]> {
  const user = userId
    ? await prisma.user.findUnique({
        where: { clerkId: userId },
      })
    : null;

  return prisma.formFieldType.findMany({
    where: user ? { userId: user.id } : { userId: null },
  });
}

type addons = {
  userId?: string;
};

export async function upsertFormFieldType(
  data: Partial<Omit<FormFieldType, "userId">> & addons,
): Promise<FormFieldType> {
  const { id, name, placeholder, isRequired, type, userId } = data;

  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId ?? "",
    },
  });

  try {
    return await prisma.formFieldType.upsert({
      where: {
        id: id ?? 0,
      },
      create: {
        name,
        slug: `form-field-type-${Date.now()}`,
        placeholder,
        isRequired,
        type,
        userId: user?.id,
      },
      update: {
        ...(name ? { name } : {}),
        ...(placeholder ? { placeholder } : {}),
        isRequired: isRequired,
        ...(type ? { type } : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function findFormFieldType(
  id: number,
): Promise<FormFieldType | null> {
  return await prisma.formFieldType.findFirst({
    where: {
      id: id ?? 0,
    },
  });
}

export async function deleteFormFieldType(id: number): Promise<null> {
  await prisma.formFieldType.delete({
    where: {
      id,
    },
  });
  return null;
}
