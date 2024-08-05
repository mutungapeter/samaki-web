"use client";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import orders from "@/public/data/orders";
import { useEffect, useState } from "react";
interface DetailProps {
  params: {
    id: string;
  };
}
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  productImage: string;
}

interface Order {
  orderNumber: string;
  dateOfOrder: string;
  status: string;
  deliveryDate: string;
  packedOn: string;
  total: string;
  items: OrderItem[];
}

const OrderDetail = ({ params: { id } }: DetailProps) => {
  const [order, setOrder] = useState<Order | null>(null);
  useEffect(() => {
    const findOrderById = (id: string): Order | null => {
      const order = orders.find((order) => order.orderNumber === id);
      return order || null;
    };

    const order = findOrderById(id);
    setOrder(order);
  }, [id]);
  // console.log('order', order)
  return (
    <div className=" rounded-sm  w-full flex flex-col bg-white px-4 sm:mt-[80px] lg:mt-0 ">
      <div className="flex gap-2 items-center border-b border-gray-300 mb-4">
        <div className="cursor-pointer">
          <Link href="/account/orders">
            <FiArrowLeft size={30} color="gray" />
          </Link>
        </div>
        <h2 className="text-lg font-bold  ">Order Details</h2>
      </div>
      <div className=" flex flex-col gap-2 w-full sm:w-80 lg:w-80 mb-4 border p-1">
        <p>
          <strong>Order nº {order?.orderNumber} </strong>
        </p>
        <div className="flex items-center justify-between border-b mb-1 ">
          <p className="text-xs lg:tex-sm sm:text-sm font-medium mb-1">
            No of items
          </p>
          <span className="text-xs lg:text-sm sm:text-sm font-bold">
            {order?.items.length} Items{" "}
          </span>
        </div>
        <div className="flex items-center justify-between border-b  mb-1 ">
          <p className="text-xs lg:tex-sm sm:text-sm font-medium">Order date</p>
          <span className="text-xs lg:text-sm sm:text-sm font-bold">
            {order?.dateOfOrder}{" "}
          </span>
        </div>
        <div className="flex items-center justify-between  ">
          <p className="text-xs lg:tex-sm sm:text-sm font-medium">OrderTotal</p>
          <span className="text-xs lg:text-sm sm:text-sm font-bold">
            KSh {order?.total}{" "}
          </span>
        </div>
      </div>

      <div className="mb-4 border-t border-gray-300">
        <div className="flex items-center justify-between mt-5 mb-3">
          <h3 className="text-md font-medium ">ITEMS IN YOUR ORDER</h3>
          <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md text-[12px] lg:text-xs sm:text-xs shadow-md uppercase">
            Track order
          </button>
        </div>

        <div className="flex flex-col lg:p-4 sm:p-4 p-2 border border-gray-300 rounded-md">
          <div className="flex flex-col mb-4 items-start gap-2">
            <span className="inline-block text-xs font-semibold">
              <span
                className={`text-xs p-1 rounded-md text-center ${getStatusStyles(
                  order?.status || ""
                )}`}
              >
                {order?.status}
              </span>
            </span>
            <p className="text-sm mb-1">{order?.deliveryDate}</p>
          </div>
          {order?.items.map((item) => (
            <div
              key={item.id}
              className="flex  justify-between sm:justify-between sm:items-center items-center sm:flex-row  gap-2 lg:flex-row lg:items-start mb-4"
            >
              <div className="w-10 h-10 lg:w-24 lg:h-24 sm:mr-4 mr-2 lg:mr-4">
                <Image
                  src={item.productImage || "/default.png"}
                  alt={item.name || "product image"}
                  width={96}
                  height={96}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col lg:flex-row sm:flex-row gap-2">
                <p className="lg:text-sm sm:text-sm text-xs font-semibold">
                  {item.name}
                </p>
                <div className="flex justify-start flex-col gap-1">
                  <div className="flex items-center space-x-4">
                    <p className="text-xs lg:text-sm sm:text-sm ">QTY:</p>
                    <p className="text-xs lg:text-sm sm:text-sm font-bold">
                      {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs justify-end lg:text-sm sm:text-sm font-bold">
                KSh 990
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const getStatusStyles = (status: string) => {
  if (status.toLowerCase() === "pending") {
    return "bg-gray-500 text-white";
  } else if (status.toLowerCase() === "processing") {
    return "bg-lime-100 text-lime-700";
  } else if (status.toLowerCase() === "received") {
    return "bg-blue-100 text-blue-500";
  } else if (status.toLowerCase() === "out for delivery") {
    return "bg-purple-100 text-purple-500";
  } else if (status.toLowerCase() === "in transit") {
    return "bg-yellow-100 text-yellow-600";
  } else if (status.toLowerCase() === "delivered") {
    return "bg-green-100 text-green-500";
  } else if (status.toLowerCase() === "cancelled") {
    return "bg-red-100 text-red-500";
  } else if (status.toLowerCase() === "ready for pickup") {
    return "bg-green-500 text-white";
  } else {
    return "bg-gray-100 text-gray-500";
  }
};
export default OrderDetail;
