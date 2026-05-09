"use server";

import { prisma } from "@/services/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export default async function (_previousState: unknown, formData: FormData) {

  const id = formData.get('id') as string;

  if (!id || id == '') {
    return {
      error: 'Id is not present'
    }
  }

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  })

  revalidatePath(`/product`);
  return null;
}