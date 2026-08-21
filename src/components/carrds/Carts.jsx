"use client";
import React, { useMemo, useState } from "react";
import CartItem from "./CartItem";
import Link from "next/link";

const Carts = ({ cartItem }) => {
  const [items, setItem] = useState(cartItem);
  console.log(items);
  const totalItems = useMemo(
    () => items.reduce((prev, item) => prev + item.quantity, 0),
    [items],
  );

  const removeItem = (id) => {
    // const formatedItems = items.filter((item) => item._id !== id);
    setItem((prevItem) => prevItem.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, q) => {
    console.log("updateQuantity func parameters: ", { id, q });
    // const formatedItems = items.filter((item) => item._id !== id);
    setItem((prevItem) =>
      prevItem.map((item) =>
        item._id === id ? { ...item, quantity: q } : item,
      ),
    );
  };

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const handleConfirmOrder = () => {};

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Total cart: {items.length}</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Cart Items List */}
        <div className="flex-1 space-y-4">
          {items.map((cart) => (
            <CartItem
              key={cart._id || cart.productId}
              item={cart}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* Right Side: Summary Card */}
        <div className="w-full lg:w-80 h-fit bg-slate-50 border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <h3 className="text-xl font-bold border-b pb-2">Order Summary</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item._id || item.productId}
                className="flex justify-between text-sm"
              >
                <div className="pr-2">
                  <p className="font-medium text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold text-slate-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Total Items</span>
              <span className="font-medium">{totalItems}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-slate-900 border-t pt-2">
              <span>Total Price</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Link
           href={'/checkout'}
            
            onClick={handleConfirmOrder}
            disabled={items.length === 0}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-2.5 px-4 rounded-md transition-colors"
          >
            Confirm Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carts;
