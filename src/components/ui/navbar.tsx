import {LogOut, ShoppingCart, User} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {logoutAction} from "@/app/(auth)/(logout)/logout-action";
import Form from "next/form";
import DarkModeToggle from "@/components/dark-mode-toggle";
import {auth} from "@/auth";
import Link from "next/link";

export default async function Navbar() {

  const session = await auth();

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800">
      { session ? (
        <Link href="/" className="text-xl font-bold cursor-pointer">Shop</Link>
        ) : (
        <h1 className="text-xl font-bold">Shop</h1>
      )}
      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        { session && (
          <Link
            href="/carrinho"
            className="cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>
        )}
        { session && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <User className="w-8 h-8 text-gray-700 cursor-pointer dark:text-gray-300" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-gray-800">
              <DropdownMenuItem asChild>
                <Form action={logoutAction}>
                  <button className="flex cursor-pointer">
                    <LogOut className="w-5 h-5 mr-2" /> <p>Logout</p>
                  </button>
                </Form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
