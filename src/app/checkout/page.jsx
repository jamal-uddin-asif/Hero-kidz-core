import { getCart } from "@/actions/server/cart";
import CheckOutForm from "@/components/Checkout/CheckOutForm";
import CheckOutSummery from "@/components/Checkout/CheckOutSummery";
import React from "react";

const CheckOutPage = async () => {
  const cart = await getCart();

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Delivery Form */}
        <div className="lg:col-span-7">
          <CheckOutForm />
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <CheckOutSummery cart={cart} subtotal={subtotal} totalItems={totalItems}/>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
