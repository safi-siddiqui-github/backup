"use server";

import prisma from "@/prisma/database";
import { FormField, FormFieldType, Prisma } from "@/prisma/generated";

export async function createFormField(
  formFieldType: FormFieldType,
  moduleId: number,
): Promise<void> {
  const formFieldTypeData = await prisma.formFieldType.findFirst({
    where: {
      id: formFieldType?.id ?? 0,
    },
    include: {
      options: true,
    },
  });

  const highest = await prisma.formField.findFirst({
    orderBy: {
      order: "desc",
    },
  });

  let order = 1;
  if (highest) {
    order = (highest?.order ?? 0) + 1;
  }

  const formField = await prisma.formField.create({
    data: {
      slug: `form-field-${Date.now()}`,
      name: formFieldTypeData?.name,
      placeholder: formFieldTypeData?.name,
      isRequired: formFieldTypeData?.isRequired,
      type: formFieldTypeData?.type,
      order,
      moduleId,
    },
  });

  for (const each of formFieldTypeData?.options ?? []) {
    await prisma.formOption.create({
      data: {
        slug: `form-option-${Date.now()}`,
        name: each?.name,
        formFieldId: formField?.id,
      },
    });
  }
}

export async function updateFormField(
  data: Partial<Omit<FormField, "moduleId">>,
): Promise<FormField | null> {
  const { id, name, placeholder, isRequired, type } = data;

  try {
    return await prisma.formField.update({
      where: {
        id: id ?? 0,
      },
      data: {
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

export type FormFieldWithSubsOne = Prisma.FormFieldGetPayload<{
  include: {
    options: true;
  };
}>;

export async function findFormFieldWhereModuleId(
  moduleId: number,
): Promise<FormFieldWithSubsOne[]> {
  return await prisma.formField.findMany({
    where: {
      moduleId,
    },
    orderBy: {
      order: "asc",
    },
    include: {
      options: true,
    },
  });
}

export async function findFormField(id: number): Promise<FormField | null> {
  return await prisma.formField.findFirst({
    where: {
      id: id ?? 0,
    },
  });
}

export async function deleteFormField(id: number): Promise<null> {
  await prisma.formField.delete({
    where: {
      id,
    },
  });
  return null;
}

export async function switchFormField(
  dragId: number,
  hoverId: number,
): Promise<FormField | void> {
  // Get all fields ordered by `order`
  const fields = await prisma.formField.findMany({
    orderBy: { order: "asc" },
  });

  // Find the dragged and hovered field
  const dragIndex = fields.findIndex((f) => f.id === dragId);
  const hoverIndex = fields.findIndex((f) => f.id === hoverId);

  if (dragIndex === -1 || hoverIndex === -1) return;

  // Remove the dragged field
  const [dragged] = fields.splice(dragIndex, 1);

  // Insert dragged field after hover field
  const insertIndex = hoverIndex < dragIndex ? hoverIndex : hoverIndex + 1;
  fields.splice(insertIndex, 0, dragged);

  // Reassign order values sequentially
  const updates = fields.map((f, idx) =>
    prisma.formField.update({
      where: { id: f.id },
      data: { order: idx + 1 },
    }),
  );

  await prisma.$transaction(updates);
}
