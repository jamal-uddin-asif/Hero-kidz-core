import { getOrders } from "@/actions/server/Order";
import OrderCard from "@/components/carrds/OrderCard";
import React from "react";

const MyOrder = async () => {
  const orders = await getOrders();
  
  const formated = orders.map(order=> ({...order, _id: order._id.toString()}))
  
  return (
    <div>
      <h1 className="text-4xl font-bold border-l-6 px-3 py-3">My Orders</h1>
      <p className="font-bold ">Total orders found: {orders.length}</p>

      <div className="my-10">
        {
            formated.map(order=><OrderCard key={order._id} order={order}/>)
        }
      </div>
    </div>
  );
};

export default MyOrder;
