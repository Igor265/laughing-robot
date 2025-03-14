import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import LoginForm from "@/app/(auth)/login/login-form";
import {redirect} from "next/navigation";
import {auth} from "@/auth";

export default async function Login() {

  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Card className="w-full max-w-md shadow-md dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center dark:text-white">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-6 text-sm text-center text-gray-500">
            <Link href="/cadastro" className="text-blue-600">Registrar</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
