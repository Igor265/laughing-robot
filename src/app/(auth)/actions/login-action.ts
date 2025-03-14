"use server";

import {CredentialsSignin} from "next-auth";
import {signIn} from "@/auth";
import {isRedirectError} from "next/dist/client/components/redirect-error";

export async function loginAction(_: unknown, formData: FormData) {

  try {
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: true,
      redirectTo: '/'
    });
    return {
      success: true
    };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    if (e instanceof CredentialsSignin) {
      return {
        success: false,
        message: "Credenciais invalidas",
      };
    }
    return {
      success: false,
      message: "Credenciais invalidas",
    };
  }
}