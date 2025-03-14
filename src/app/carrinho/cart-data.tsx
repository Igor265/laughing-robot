"use client";

import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2} from "lucide-react";
import {currencyFormat} from "@/lib/utils";
import {removeFromCart} from "@/app/actions/remove-product-from-cart";
import {toast} from "sonner";
import {useState} from "react";
import EmptyCartMessage from "@/components/empty-cart-message";
import {Product} from "@prisma/client";

interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  items: CartItem[];
}

interface CartItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  cartId: string;
  quantity: number;
  rateType: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
  products: Product;
}

export default function CartData({ cart }: { cart: Cart }) {

  const [cartItems, setCartItems] = useState<CartItem[]>(cart.items);

  function rentalType(type: string) {
    switch (type) {
      case "DAILY":
        return "dailyRate";
      case "WEEKLY":
        return "weeklyRate";
      case "BIWEEKLY":
        return "biweeklyRate";
      case "MONTHLY":
        return "monthlyRate";
      default:
        return "dailyRate";
    }
  }

  function rentalDescription(type: string) {
    switch (type) {
      case "DAILY":
        return "Diário";
      case "WEEKLY":
        return "Semanal";
      case "BIWEEKLY":
        return "Quinzenal";
      case "MONTHLY":
        return "Mensal";
      default:
        return "Diário";
    }
  }

  async function handleRemoveItem(cartId: string, productId: string) {
    const response = await removeFromCart(cartId, productId);

    if (response.success) {
      toast.success(response.message);
      setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    } else {
      toast.error(response.message);
    }
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.products[rentalType(item.rateType)] * item.quantity, 0);
  };

  // carrinho.items.map((item) => (
  //   console.log(item.products)
  // ))

  return (
    <>
      { cartItems.length === 0 ? (<EmptyCartMessage />) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Carrinho de Compras</h1>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4"
            >
              {/* Foto do Produto */}
              <img
                src="https://avatars.githubusercontent.com/u/472730?v=4"
                alt={item.rateType}
                className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0"
              />

              {/* Informações do Produto */}
              <div className="flex-1 md:ml-6 text-center md:text-left">
                <h2 className="text-lg font-semibold">{item.products.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">Valor unitário: {currencyFormat(item.products[rentalType(item.rateType)])}</p>
                <p className="text-gray-600 dark:text-gray-400">Modalidade de locação: {rentalDescription(item.rateType)}</p>
              </div>

              {/* Quantidade */}
              <div className="flex flex-col gap-2 items-center md:items-end md:ml-6">
                <div className="mb-2 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold">Quantidade:</h3>
                  <div className="flex items-center space-x-2">
                    { item.quantity === 1 ? (
                      <Button
                        onClick={() => handleRemoveItem(item.cartId, item.productId)}
                        variant="destructive"
                        size="icon"
                        className="p-2 dark:bg-red-600 dark:hover:bg-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        variant="outline"
                        size="icon"
                        className="p-2 dark:bg-gray-700 dark:text-white cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                    <span className="px-4">{item.quantity}</span>
                    <Button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      variant="outline"
                      size="icon"
                      className="p-2 dark:bg-gray-700 dark:text-white cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  Total: {currencyFormat((item.products[rentalType(item.rateType)] * item.quantity))}
                </p>
              </div>
            </div>
          ))}

          {/* Total geral */}
          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">
              Total do Carrinho: {currencyFormat(getTotalPrice())}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}