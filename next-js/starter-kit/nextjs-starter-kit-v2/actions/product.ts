"use server";

import { prisma } from "@/services/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export async function CreateProductAction(_previousState: unknown, formData: FormData) {

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

export async function DeleteProductAction(_previousState: unknown, formData: FormData) {

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

export async function ReadProductAction() {
  const product = await prisma.product.findMany({
    // cacheStrategy: { ttl: 60, swr: 60 },
  });
  return product;
}

export async function ReadSingleProductAction(slug: number | string) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(slug),
    },
    // cacheStrategy: { ttl: 60 },
  })
  return product;
}


export async function UpdateProductAction(_previousState: unknown, formData: FormData) {

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