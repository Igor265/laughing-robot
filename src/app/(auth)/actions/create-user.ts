"use server";

import {db} from "@/lib/prisma";
import {hashSync} from "bcrypt-ts";
import {redirect} from "next/navigation";

export async function createUser(_: unknown, formData: FormData) {

  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries);

  const email = typeof data.email === "string" ? data.email : '';
  const password = typeof data.password === "string" ? data.password : '';

  if (!data.email || !data.password) {
    return {
      success: false,
      message: "Todos os campos devem ser preenchidos!",
    }
  }

  const user = await db.user.findUnique({
    where: { email }
  });

  if (user) {
    return {
      success: false,
      message: "Usuário já cadastrado.",
    }
  }

  await db.user.create({
    data: {
      email,
      password: hashSync(password),
    }
  });

  return redirect('/login');
}