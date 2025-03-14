import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import RegisterForm from "@/app/(auth)/cadastro/register-form";
import {auth} from "../../../auth";
import {redirect} from "next/navigation";

export default async function Register() {

  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      <Card className="w-full max-w-md shadow-md dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center dark:text-white">Criar uma conta</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <p className="mt-6 text-sm text-center text-gray-500">
            <Link href="/login" className="text-blue-600">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
