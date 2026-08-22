"use client";
import { createOrder } from "@/actions/server/Order";
import { useSession } from "next-auth/react";
import React from "react";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const session = useSession();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const payload = {
      name: form.name.value,
      email: form.email.value,
      contact: form.contact.value,
      address: form.address.value,
      instruction: form.instruction.value,
    };

    console.log(payload);

    const result = await createOrder(payload);
    if (result.success) {
      Swal.fire("success", "Order created", "success");
    } else {
      Swal.fire("error", "Order Not created", "error");
    }
  };

  if(session.status == 'loading'){
    return <h1 className="text-4xl">Loading ...........</h1>
  }
  return (
    <div>
      <div className=" bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-slate-800">
          Shipping & Delivery Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Full Name
            </label>
            <input
              value={session?.data?.user?.name}
              readOnly
              type="text"
              id="name"
              name="name"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email Address
            </label>
            <input
             value={session?.data?.user?.email}
              readOnly
              type="email"
              id="email"
              name="email"
              required
              placeholder="example@gmail.com"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              required
              placeholder="+1 234 567 890"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Shipping Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              required
              placeholder="Street address, city, state, zip code"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            ></textarea>
          </div>

          {/* Special Instructions */}
          <div>
            <label
              htmlFor="instruction"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Delivery Instructions (Optional)
            </label>
            <textarea
              id="instruction"
              name="instruction"
              rows={2}
              placeholder="e.g., Leave package at the front door, call upon arrival..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition duration-200 mt-2"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
