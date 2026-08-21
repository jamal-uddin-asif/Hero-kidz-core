"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { getCart } from "./cart";

const orderCollection = dbConnect(collections.ORDERS);

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

    const cart =await getCart()
    console.log(cart)
    return []
};
