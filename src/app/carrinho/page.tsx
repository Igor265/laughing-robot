import {auth} from "@/auth";
import {redirect} from "next/navigation";
import {findCartByUserEmail} from "@/app/actions/find-cart";
import EmptyCartMessage from "@/components/empty-cart-message";
import CartData from "@/app/carrinho/cart-data";

export default async function ShoppingCart() {

  const session = await auth();

  if (!session) {
    return redirect("/login");
  }


  const cart = await findCartByUserEmail(session.user?.email || undefined);

  // console.log(carrinho);


  return (
    <>
      { !cart ? (<EmptyCartMessage />) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white p-4">
          <CartData cart={cart} />
        </div>
      )}
    </>
  );
}
