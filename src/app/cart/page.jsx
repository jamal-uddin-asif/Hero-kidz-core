import { getCart } from "@/actions/server/cart";
import Carts from "@/components/carrds/Carts";
import React from "react";

const CartPage = async () => {
  const carts = await getCart();
  console.log(carts[0]);
  return (
    <div>
      <h1 className="text-4xl font-bold border-l-6 px-3 py-3">
        My carts 
      </h1>
      <Carts cartItem={carts}></Carts>
    </div>
  );
};

export default CartPage;
