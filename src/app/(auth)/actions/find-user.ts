"use server";

import {db} from "@/lib/prisma";
import {compareSync} from "bcrypt-ts";

export async function findUserByCredentials(email: string, password: string) {
  const user = await db.user.findFirst({
    where: {email},
  });

  if (!user) {
    return null;
  }

  const isPasswordMatching = compareSync(password, user.password);

  if (isPasswordMatching) {
    return { email };
  }

  return null;
}

export async function findUserByEmail(email: string) {
  return await db.user.findFirst({
    where: {email},
  });
}