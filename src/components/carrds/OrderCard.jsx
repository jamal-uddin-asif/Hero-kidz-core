"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  FiPackage, 
  FiCalendar, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiTrash2, 
  FiXCircle 
} from "react-icons/fi";

export default function OrderCard({ order, onCancelOrder, onRemoveItem }) {
  const [items, setItems] = useState(order?.items || []);
  const [isCanceling, setIsCanceling] = useState(false);

  // Convert MongoDB Buffer _id object or Hex string to a readable string format
  const getOrderId = (id) => {
    if (typeof id === "string") return id;
    if (id?.buffer) {
      const bytes = Object.values(id.buffer);
      return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    return "N/A";
  };

  const formattedDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

//   const handleItemDelete = (itemId) => {
//     const updatedItems = items.filter((item) => item._id !== itemId);
//     setItems(updatedItems);
//     if (onRemoveItem) onRemoveItem(order._id, itemId);
//   };

//   const handleCancel = async () => {
//     if (confirm("Are you sure you want to cancel this entire order?")) {
//       setIsCanceling(true);
//       if (onCancelOrder) await onCancelOrder(order._id);
//       setIsCanceling(false);
//     }
//   };

  if (!items.length) return null;

  return (
    <div className="card w-full bg-base-100 shadow-xl border border-base-200 overflow-hidden my-4">
      {/* Card Header */}
      <div className="card-body p-5 border-b border-base-200 bg-base-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <FiPackage className="text-primary text-xl" />
              <h2 className="font-bold text-lg">
                Order <span className="text-primary font-mono">#{getOrderId(order._id).slice(-8)}</span>
              </h2>
              <div className="badge badge-success badge-sm text-white">Placed</div>
            </div>
            <p className="text-xs text-base-content/70 flex items-center gap-1 mt-1">
              <FiCalendar /> {formattedDate}
            </p>
          </div>

          <button
            // onClick={handleCancel}
            disabled={isCanceling}
            className="btn btn-outline btn-error btn-sm self-start sm:self-center gap-2"
          >
            <FiXCircle className="text-base" />
            {isCanceling ? "Canceling..." : "Cancel Order"}
          </button>
        </div>
      </div>

      {/* Customer & Shipping Details */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm bg-base-100 border-b border-base-200">
        <div className="flex items-start gap-2">
          <FiUser className="text-primary mt-1 shrink-0" />
          <div>
            <p className="font-semibold text-xs text-base-content/60 uppercase">Customer</p>
            <p className="font-medium">{order.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <FiMail className="text-primary mt-1 shrink-0" />
          <div>
            <p className="font-semibold text-xs text-base-content/60 uppercase">Contact Info</p>
            <p>{order.email}</p>
            <p className="text-xs text-base-content/70">{order.contact}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 md:col-span-2 lg:col-span-1">
          <FiMapPin className="text-primary mt-1 shrink-0" />
          <div>
            <p className="font-semibold text-xs text-base-content/60 uppercase">Shipping Address</p>
            <p>{order.address}</p>
            {order.instruction && (
              <p className="text-xs text-warning mt-1 font-medium">
                Note: {order.instruction}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Order Items Table / List */}
      <div className="p-5">
        <h3 className="font-semibold text-sm mb-3">Ordered Items ({items.length})</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 p-3 rounded-lg border border-base-200 bg-base-100 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-base-200 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-sm truncate">{item.title}</h4>
                  <p className="text-xs text-base-content/70">
                    Price: <span className="font-semibold text-base-content">${item.price}</span> × {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-bold text-sm text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                //   onClick={() => handleItemDelete(item._id)}
                  title="Remove Item"
                  className="btn btn-ghost btn-circle btn-xs text-error hover:bg-error/10"
                >
                  <FiTrash2 className="text-base" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 bg-base-200/30 border-t border-base-200 flex justify-between items-center">
        <span className="font-semibold text-sm text-base-content/70">Total Amount</span>
        <span className="text-xl font-bold text-primary">${calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
}