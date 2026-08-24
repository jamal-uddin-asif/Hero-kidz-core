"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { authOptions } from "@/lib/authOptions";
import { sendEmail } from "@/lib/sendEmai";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";

const orderCollection = dbConnect(collections.ORDERS);

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  const cart = await getCart();

  if (!cart.length) {
    return { success: false };
  }


  const newOrder = {
    ...payload,
    items: cart,
    createdAt: new Date().toISOString(),
  };

  const result = await orderCollection.insertOne(newOrder);

  if (Boolean(result.insertedId)) {
    await clearCart();

 
  }

  return { success: Boolean(result.insertedId) };
};
