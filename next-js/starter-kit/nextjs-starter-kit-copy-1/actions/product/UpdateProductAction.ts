"use server";

import { prisma } from "@/services/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export default async function (_previousState: unknown, formData: FormData) {

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const price = formData.get('price') as string;

  if (!id || id == '') {
    return {
      error: 'Id is not present'
    }
  }

  if (!title || !content || title == '' || content == '' || !price || price == '') {
    return {
      error: 'Fields must not to empty'
    }
  }

  await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
      price: Number(price),
    },
  })

  revalidatePath(`/product/${id}`);
  return {
    message: 'Product Updated'
  }
}