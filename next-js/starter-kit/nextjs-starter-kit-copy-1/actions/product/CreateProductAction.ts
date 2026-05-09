"use server";

import { prisma } from "@/services/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export const CreateProductAction = async (_previousState: unknown, formData: FormData) => {

  // await CreateProductValidtion(formData);
  // Authorize
  // Validation
  // Save

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const price = formData.get('price') as string;

  if (title == '' || content == '' || price == '') {
    return {
      error: 'Fields must not to empty'
    }
  }

  await prisma.product.create({
    data: {
      title,
      price: Number(price),
      content,
    }
  })

  revalidatePath('/product');
  return {
    message: 'Product created'
  }
}