"use client";
import React, { useMemo, useState } from "react";
import CartItem from "./CartItem";

const Carts = ({ cartItem }) => {
  const [items, setItem] = useState(cartItem);

  const totalItems = useMemo(
    () => items.reduce((prev, item) => prev + item.quantity, 0),
    [items],
  );

  const removeItem = (id) => {
    // const formatedItems = items.filter((item) => item._id !== id);
    setItem(prevItem=> prevItem._id !== id);
  };

  return (
    <div>
      <h2>Total cart: {items.length}</h2>
      <div className="flex gap-5">
        <div className="felx-3 space-y-2">
          {items.map((cart) => (
            <CartItem key={cart.productId} item={cart}
            removeItem={removeItem}
             />
          ))}
        </div>
        <div className="felx-1">Total cart quantity: {totalItems}</div>
      </div>
    </div>
  );
};

export default Carts;
