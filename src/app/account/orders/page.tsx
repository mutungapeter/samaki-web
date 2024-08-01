"use client";
import Image from "next/image";
import orders from "@/public/data/orders";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import Link from "next/link";
const OrdersPage = () => {
  const router = useRouter();
  const handleViewDetails = (id: number) => {
    router.push(`/account/orders/${id}`);
  };
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3 items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
        <Link href="/account" className="justify-self-start flex items-center">
          <FaChevronLeft color="gray" />
        </Link>
        <div className="col-span-2 flex justify-start">
          <h2 className="font-semibold">My orders</h2>
        </div>
      </div>
      <div className="sm:mt-[80px] lg:mt-0  rounded-sm shadow-none sm:shadow-sm lg:shadow-md w-full flex flex-col bg-[#F8F8F8] sm:bg-white lg:bg-white p-3">
        <h2 className="text-lg font-bold border-b border-gray-300 hidden lg:block sm:block">
          Orders
        </h2>
        <div className="grid grid-cols-1 gap-3  mt-3">
          {orders.map((order: any, index: number) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between lg:flex-row lg:justify-between   p-3 border rounded-md bg-white"
            >
              <div className="flex flex-col sm:flex-row lg:flex-row sm:justify-between  lg:justify-between lg:items-center gap-1 sm:gap-4 lg:gap-5">
                <div className="w-full h-full sm:w-24 sm:h-24 lg:w-24 lg:h-24 ">
                  <Image
                    src={order.productImage}
                    alt={order.productName}
                    width={96}
                    height={96}
                    className="w-full h-full lg:w-24 lg:h-24  object-contain "
                  />
                </div>
                <div className="flex flex-col gap-5 lg:gap-3 justify-start">
                  <div className="flex flex-col gap-1 items-baseline justify-start">
                    <h3 className="text-xs lg:text-sm font-semibold">
                      {order.productName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Order #{order.orderNumber}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start gap-2">
                    <div className="flex flex-col  items-start">
                      <span className="text-blue-500 p-1 text-center rounded-sm text-xs bg-blue-100 uppercase">
                        {order.status}
                      </span>
                    </div>
                    <p className="lg:text-md text-xs lg:font-medium">
                      {order.deliveryDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:justify-start sm:justify-start cursor-pointer  justify-start">
                <h3
                  className="text-red-500 text-xs lg:text-sm sm:text-sm   uppercase"
                  onClick={() => handleViewDetails(order.orderNumber)}
                >
                  See Details
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default OrdersPage;
