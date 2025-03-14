import "server-only";

import {db} from "@/lib/prisma";
import {Prisma} from "@prisma/client";


export async function getProducts(page: number|undefined, productName: string|undefined, totalPages = 1, perPage = 6) {


  if (page === undefined || page <= 0) {
    page = 1;
  }

  if (page > totalPages) {
    page = totalPages > 0 ? totalPages : 1;
  }

  const offset = (page - 1) * perPage;

  const whereClause = productName
    ? {
      name: {
        contains: productName,
        mode: Prisma.QueryMode.insensitive, // Corrige o tipo para QueryMode
      },
    }
    : {};

  return await db.product.findMany({
    skip: offset,
    take: perPage,
    where: whereClause
  });
}

export async function getTotalProducts(productName: string|undefined) {

  if (!productName) {
    return await db.product.count();
  }

  const products = await db.product.findMany({
    where: {
      name: {
        contains: productName,
        mode: Prisma.QueryMode.insensitive,
      }
    }
  });

  return products.length;

}

export async function getProductById(productId: string) {

  if (!productId) {
    return null;
  }

  return await db.product.findUnique({
    where: {
      id: productId
    }
  });
}