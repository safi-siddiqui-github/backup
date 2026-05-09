"use server";

import prisma from "@/prisma/database";
import { FormOption } from "@/prisma/generated";

export async function createFormOption(
  data: Partial<FormOption>,
): Promise<FormOption | null> {
  const { name, formFieldId, formFieldTypeId } = data;

  try {
    return await prisma.formOption.create({
      data: {
        name,
        slug: `form-option-${Date.now()}`,
        ...(Number(formFieldId) > 0
          ? { formFieldId: Number(formFieldId) }
          : {}),
        ...(Number(formFieldTypeId) > 0
          ? { formFieldTypeId: Number(formFieldTypeId) }
          : {}),
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function findFormOptionWhereFormFieldId(
  formFieldId: number,
): Promise<FormOption[]> {
  return await prisma.formOption.findMany({
    where: {
      formFieldId,
    },
  });
}

export async function findFormOptionWhereFormFieldTypeId(
  formFieldTypeId: number,
): Promise<FormOption[]> {
  return await prisma.formOption.findMany({
    where: {
      formFieldTypeId,
    },
  });
}

export async function deleteFormOption(id: number): Promise<null> {
  await prisma.formOption.delete({
    where: {
      id,
    },
  });
  return null;
}
