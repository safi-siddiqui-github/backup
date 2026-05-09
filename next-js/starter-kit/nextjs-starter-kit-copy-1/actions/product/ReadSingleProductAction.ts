"use server";

import { prisma } from "@/services/prisma/prismaClient";

export default async function (slug: number | string) {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(slug),
    },
    // cacheStrategy: { ttl: 60 },
  })
  return product;
}