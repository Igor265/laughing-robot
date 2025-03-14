"use server";

import {db} from "@/lib/prisma";

export async function findProductById(id: string) {
  return await db.product.findFirst({
    where: {id},
  });
}