"use server";

import {db} from "@/lib/prisma";
import {findUserByEmail} from "@/app/(auth)/actions/find-user";

export async function findCartByUserEmail(email: string|undefined) {

  if (!email) {
    return null;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  return await db.cart.findFirst({
    where: {
      userId: user.id
    },
    include: {
      items: {
        include: {
          products: true,
        }
      },
    },
  });
}