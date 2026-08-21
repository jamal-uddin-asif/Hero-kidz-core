import React from "react";

const CheckOutSummery = ({ cart, totalItems, subtotal }) => {
  return (
    <div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sticky top-6 shadow-sm">
        <h2 className="text-xl font-semibold border-b border-slate-200 pb-4 mb-4 text-slate-800">
          Order Summary ({totalItems} items)
        </h2>

        {/* Cart Items List */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {cart?.map((item) => (
            <div
              key={item._id.toString()}
              className="flex items-center gap-4 pb-4 border-b border-slate-200 last:border-b-0"
            >
              {/* Product Image */}
              <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg border border-slate-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-900 truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Qty: {item.quantity} × ${item.price}
                </p>
              </div>

              {/* Total Price Per Product */}
              <div className="text-sm font-semibold text-slate-800">
                ${item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Breakdown */}
        <div className="mt-6 border-t border-slate-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Shipping</span>
            <span className="text-emerald-600 font-medium">Free</span>
          </div>
          <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
            <span>Total Amount</span>
            <span>${subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutSummery;
