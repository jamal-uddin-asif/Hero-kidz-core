"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { authOptions } from "@/lib/authOptions";
import { sendEmail } from "@/lib/emailSendingUtil/sendEmai";
import { orderInvoiceTemplate } from "@/lib/emailSendingUtil/orderInvoice";

const orderCollection = dbConnect(collections.ORDERS);

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  const cart = await getCart();

  if (!cart.length) {
    return { success: false };
  }

  const totalPrice = cart.reduce((sum, item)=> sum + item.price * item.quantity,)

  const newOrder = {
    ...payload,
    items: cart,
    createdAt: new Date().toISOString(),
    totalPrice,
  };

  const result = await orderCollection.insertOne(newOrder);

  if (Boolean(result.insertedId)) {
    await clearCart();

    const info = await sendEmail({
      to: user.email,
      subject: "Your Order Invoice - Hero Kidz",
      html: orderInvoiceTemplate({
        orderId: result.insertedId.toString(),
        items: cart,
        totalPrice,
      }),
    });

    console.log('After send email: ',info)
  }

  return { success: Boolean(result.insertedId) };
};
