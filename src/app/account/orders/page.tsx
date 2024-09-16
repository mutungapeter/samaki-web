"use client";
import Image from "next/image";
import orders from "@/public/data/orders";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
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

const OrdersPage = () => {
  const router = useRouter();

  const handleViewDetails = (id: string) => {
    router.push(`/account/orders/${id}`);
  };
  const handleCancelOrder = (orderNumber: string) => {
    console.log(`Order ${orderNumber} canceled`);
  };
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3 items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
        <Link href="/account" className="justify-self-start flex items-center">
          <FaArrowLeftLong color="gray" />
        </Link>
        <div className="col-span-2 flex justify-start">
          <h2 className="font-semibold">My orders</h2>
        </div>
      </div>
      <div className="sm:mt-[80px] lg:mt-0  rounded-sm shadow-none sm:shadow-sm lg:shadow-md w-full flex flex-col bg-[#F8F8F8] sm:bg-white lg:bg-white p-3">
        <div className=" items-center justify-between hidden lg:flex sm:flex border-b border-gray-300 p-3">
          <h2 className="text-lg font-bold  ">Orders</h2>
          <div className="flex items-center space-x-5">
            <h2>Filter by</h2>
            <h2>Filter by</h2>
          </div>
        </div>
        <div className="flex flex-col gap-3  mt-3">
          {orders.map((order: Order) => (
            <div
              key={order.orderNumber}
              className="flex flex-col  border rounded-md p-2 bg-white "
            >
              {/* large devices */}
              <div className=" flex-col  hidden sm:flex lg:flex">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:grid-cols-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-black font-bold">
                        #{order.orderNumber}
                      </span>
                      <span className="text-sm text-gray-500">
                        Number of Items: {order.items.length}
                      </span>
                      <div className="flex  flex-col items-baseline">
                        <span
                          className={`text-xs p-1 rounded-md text-center ${getStatusStyles(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <span className="justify-center text-sm text-gray-500 ">
                      {order.total}
                    </span>
                  </div>
                  <div className="flex items-center justify-start sm:justify-center lg:justify-center">
                    <span className="text-sm text-gray-500 text-center">
                      {order.dateOfOrder}
                    </span>
                  </div>
                  <div className="flex items-center justify-start sm:justify-center lg:justify-center space-x-3">
                    <div className="flex flex-col items-baseline">
                      <button
                        className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded-md text-xs uppercase"
                        onClick={() => handleViewDetails(order.orderNumber)}
                      >
                        See Details
                      </button>
                    </div>
                    <button
                      className={` font-bold text-[10px] uppercase p-2 rounded-md text-center ${
                        order.status.toLowerCase() === "delivered"
                          ? "bg-gray-300 border-gray-300 text-white cursor-not-allowed"
                          : "border text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                      }`}
                      onClick={() => {
                        if (order.status.toLowerCase() !== "delivered") {
                          handleCancelOrder(order.orderNumber);
                        }
                      }}
                      disabled={order.status.toLowerCase() === "delivered"}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              {/* mobile devices */}
              <div className="flex lg:hidden sm:hidden flex-col gap-1">
                <div className="flex justify-between">
                  <div>
                    <span className="text-sm text-black font-bold">
                      #{order.orderNumber}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 block">
                    {order.dateOfOrder}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Number of Items: {order.items.length}
                  </span>
                  <span className="text-sm text-gray-500">{order.total}</span>
                </div>
                <div className="flex flex-col items-baseline">
                  <span
                    className={`text-xs p-1 rounded-md text-center ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-end items-center mt-2 space-x-3">
                  <button
                    className="text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded-md text-[10px]  uppercase"
                    onClick={() => handleViewDetails(order.orderNumber)}
                  >
                    See Details
                  </button>

                  <button
                    className={` font-bold text-[10px] uppercase px-2 py-1 rounded-md text-center ${
                      order.status.toLowerCase() === "delivered"
                        ? "bg-gray-300 border-gray-300 text-white cursor-not-allowed"
                        : "border text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                    }`}
                    onClick={() => {
                      if (order.status.toLowerCase() !== "delivered") {
                        handleCancelOrder(order.orderNumber);
                      }
                    }}
                    disabled={order.status.toLowerCase() === "delivered"}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
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
export default OrdersPage;
