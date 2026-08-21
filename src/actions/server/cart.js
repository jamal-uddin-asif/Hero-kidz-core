"use server";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect, collections } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  //getCartItem->user.email && productId
  const query = { email: user?.email, productId: product?._id };

  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    //if Exist:Update Cart

    const updatedData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };

    const result = await cartCollection.updateOne(query, updatedData);
    return { success: Boolean(result.modifiedCount) };
  } else {
    //Not Exist:insert Cart
    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price - (product.price * product.discount) / 100,
      username: user?.name,
    };

    const result = await cartCollection.insertOne(newData);
    return { success: result.acknowledged };
  }
};

export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];

  const query = { email: user.email };

  const result = await cartCollection.find(query).toArray();
  return result.map((res) => {
    return { ...res, _id: res._id.toString() };
  });
});

export const deleteCart = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (id.length != 24) return { success: false };

  const query = { _id: new ObjectId(id) };

  const result = await cartCollection.deleteOne(query);
  // if (result.deletedCount) {
  //   revalidatePath("/cart");
  // }

  return { success: Boolean(result.deletedCount) };
};

export const increseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (quantity > 10)
    return { success: false, message: "You can not buy 10 product at a time" };

  const query = { _id: new ObjectId(id) };

  const updatedData = {
    $inc: {
      quantity: 1,
    },
  };

  const result = await cartCollection.updateOne(query, updatedData);

  return { success: Boolean(result.matchedCount) };
};

export const decreseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (quantity <= 1)
    return { success: false, message: "Quantity can not be emty" };

  const query = { _id: new ObjectId(id) };

  const updatedData = {
    $inc: {
      quantity: -1,
    },
  };

  const result = await cartCollection.updateOne(query, updatedData);

  return { success: Boolean(result.matchedCount) };
};
