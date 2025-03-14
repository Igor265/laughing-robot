import {ShoppingCart} from "lucide-react";

export default function EmptyCartMessage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 dark:text-white p-6">
      <ShoppingCart className="w-12 h-12 text-gray-500 mb-4" />
      <h2 className="text-lg font-semibold text-gray-700">
        Seu carrinho está vazio
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Adicione produtos ao carrinho para começar a compra.
      </p>
    </div>
  );
}
