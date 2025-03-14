"use client";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Form from "next/form";
import {useActionState} from "react";
import {Loader2} from "lucide-react";
import ErrorMessage from "@/components/ui/error-message";
import {loginAction} from "@/app/(auth)/actions/login-action";

export default function LoginForm() {

  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <>
      { state?.success === false && (!isPending) && (
        <ErrorMessage message={state.message || ""} />
      )}
      <Form className="space-y-6" action={formAction}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@exemplo.com"
            className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            className="w-full mt-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          disabled={isPending}
        >
          { isPending ? (<Loader2 className="animate-spin" />) : "Login" }
        </Button>
      </Form>
    </>
  );
}
