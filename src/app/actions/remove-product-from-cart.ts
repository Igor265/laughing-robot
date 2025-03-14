"use server";

import { db } from "@/lib/prisma";

export async function removeFromCart(cartId: string, productId: string) {

  try {
    const cartItem = await db.cartItem.findFirst({
      where: {
        cartId,
        productId,
      },
    });

    if (!cartItem) {
      return {
        success: false,
        message: "Item não encontrado no carrinho",
      };
    }

    await db.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    });

    return {
      success: true,
      message: "Produto removido do carrinho com sucesso",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao remover o produto do carrinho",
    };
  }
}
