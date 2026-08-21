"use client";

import {
  decreseItemDb,
  deleteCart,
  increseItemDb,
} from "@/actions/server/cart";
import React, { useState } from "react";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function CartItem({ item, removeItem, updateQuantity }) {
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteCart(item._id);
        if (result.success) {
          removeItem(item._id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleIncrease = async () => {
    setLoading(true);
    const result = await increseItemDb(item._id, quantity);
    if (result.success) {
      Swal.fire("Success", "Increase Quantity", "success");
      updateQuantity(item._id, quantity + 1);
      setLoading(false);
    }
  };

  const handleDecrease = async () => {
    setLoading(true);
    const result = await decreseItemDb(item._id, quantity);
    if (result.success) {
      Swal.fire("Success", "Decrease Quantity", "success");
      updateQuantity(item._id, quantity - 1);
      setLoading(false);
    }
  };
  return (
    <div className="card card-side bg-base-100 shadow-xl border border-base-200 p-4 flex-col sm:flex-row items-center gap-4">
      {/* Product Image */}
      <figure className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-base-200">
        <img
          src={item?.image}
          alt={item?.title || "Product Image"}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Product Details */}
      <div className="flex-1 text-center sm:text-left space-y-1">
        <h2 className="card-title text-base sm:text-lg font-bold text-base-content line-clamp-1">
          {item?.title}
        </h2>
        <p className="text-sm font-semibold text-primary">
          ${item?.price}{" "}
          <span className="text-xs text-base-content/60 font-normal">
            / unit
          </span>
        </p>
        <p className="text-xs text-base-content/70">
          Total:{" "}
          <span className="font-bold text-base-content">
            ${(item?.price || 0) * quantity}
          </span>
        </p>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center gap-4">
        {/* + / - Controls */}
        <div className="join border border-base-300">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || loading}
            className="btn btn-sm join-item bg-base-200 hover:bg-base-300 border-none"
            aria-label="Decrease quantity"
          >
            <FaMinus className="w-3 h-3" />
          </button>

          <span className="btn btn-sm join-item no-animation bg-base-100 border-none cursor-default font-semibold px-4">
            {quantity}
          </span>

          <button
            disabled={quantity >= 10 || loading}
            onClick={handleIncrease}
            className="btn btn-sm join-item bg-base-200 hover:bg-base-300 border-none"
            aria-label="Increase quantity"
          >
            <FaPlus className="w-3 h-3" />
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10"
          title="Remove item"
          aria-label="Delete item"
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
