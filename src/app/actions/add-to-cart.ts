"use server";

import {db} from "@/lib/prisma";
import {findUserByEmail} from "@/app/(auth)/actions/find-user";
import {findProductById} from "@/app/actions/find-product";

interface CartItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  cartId: string;
  quantity: number;
  rateType: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';
}

export async function addToCart(_: unknown, formData: FormData) {


  const productId = formData.get("productId") as string;
  const userEmail = formData.get("userEmail") as string;
  const rental = formData.get("rental") as 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY';

  try {
    const [product, user] = await Promise.all([
      findProductById(productId),
      findUserByEmail(userEmail)
    ]);

    if (!product || !user) {
      return {
        success: false
      };
    }

    const  cart = await verifyOrCreateCart(user.id);

    const { existingItem, existingItemWithoutRental } = findExistingCartItems(cart.items, productId, rental);


    if (!existingItem && !existingItemWithoutRental) {
      await createCartItem(cart.id, productId, rental);
    } else if (existingItem) {
      await updateCartItemQuantity(existingItem.id, existingItem.quantity + 1);
    } else if (existingItemWithoutRental) {
      await updateCartItem(existingItemWithoutRental.id, rental, 1);
    }

    return {
      success: true
    };
  } catch (e) {
    console.error(e);
    return {
      success: false
    };
  }
}

async function verifyOrCreateCart(userId: string) {
  let cart = await db.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  if (!cart) {
    const newCart = await db.cart.create({
      data: { userId },
    });
    cart = { ...newCart, items: [] };
  }

  return cart;
}

async function createCartItem(cartId: string, productId: string, rental: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY') {
  await db.cartItem.create({
    data: {
      productId,
      cartId,
      rateType: rental,
      quantity: 1
    },
  });
}

async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  await db.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
}

async function updateCartItem(cartItemId: string, rental: 'DAILY' | 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY', quantity: number) {
  await db.cartItem.update({
    where: { id: cartItemId },
    data: { rateType: rental, quantity },
  });
}

function findExistingCartItems(items: CartItem[], productId: string, rental: string) {
  const existingItem = items.find(item => item.productId === productId && item.rateType === rental);
  const existingItemWithoutRental = items.find(item => item.productId === productId);

  return { existingItem, existingItemWithoutRental };
}
