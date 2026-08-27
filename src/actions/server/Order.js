"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { authOptions } from "@/lib/authOptions";
import { sendEmail } from "@/lib/emailSendingUtil/sendEmai";
import { orderInvoiceTemplate } from "@/lib/emailSendingUtil/orderInvoice";
import { ObjectId } from "mongodb";

const orderCollection = dbConnect(collections.ORDERS);
const productCollection = dbConnect(collections.PRODUCTS);

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  const cart = await getCart();

  if (!cart.length) {
    return { success: false };
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
  );

  const bulkOperations = cart.map((item) => ({
    updateOne: {
      filter: { _id: new ObjectId(item.productId) },
      update: {
        $set: { sold: item.quantity },
      },
    },
  }));

  const newOrder = {
    ...payload,
    items: cart,
    createdAt: new Date().toISOString(),
    totalPrice,
  };

  const result = await orderCollection.insertOne(newOrder);

  if (Boolean(result.insertedId)) {
    if (bulkOperations.length > 0) {
      const updateResult = await productCollection.bulkWrite(bulkOperations);
      console.log(`Modified documents: ${updateResult.modifiedCount}`);
    }
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

    console.log("After send email: ", info);
  }

  return { success: Boolean(result.insertedId) };
};

export const getOrders = async () => {
  const result = await orderCollection.find().toArray();
  return result || [];
};
