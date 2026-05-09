"use server";

import { prisma } from "@/services/prisma/prismaClient";

export default async function () {
  const product = await prisma.product.findMany({
    // cacheStrategy: { ttl: 60, swr: 60 },
  });
  return product;
}