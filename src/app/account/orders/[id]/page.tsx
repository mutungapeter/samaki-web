'use client';
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import orders  from "@/public/data/orders";
import { useEffect, useState } from "react";
interface DetailProps {
  params: {
    id: string;
  };
}
interface Order {
  orderNumber:string;
  productName:string;
  productImage:string;
  status:string;
  deliveryDate:string;
  packedOn:string;
  total:string;
}
const OrderDetail=({ params: { id } }: DetailProps)=>{
  const [order, setOrder] = useState<Order | null >(null)
  useEffect(() => {
    const findOrderById = (id: string): Order | null => {
      const order = orders.find(order => order.orderNumber === id);
      return order || null;
    };
 
    const order = findOrderById(id);
    setOrder(order);
  }, [id]);
  // console.log('order', order)
    return (
      <div className="ml-2 rounded-sm shadow-md w-full flex flex-col bg-white p-4 sm:mt-[80px] lg:mt-0 ">
     <div className="flex gap-2 items-center border-b border-gray-300 mb-4">
    <div className="cursor-pointer">
    <Link href="/account/orders">
    <FiArrowLeft size={30} color="gray"/>
    </Link>
    </div>
     <h2 className="text-lg font-bold  ">Order Details</h2>
     </div>
      
      <div className="mb-4">
        <p><strong>Order nº {order?.orderNumber} </strong></p>
        <p> 1 Items</p>
        <p>Packed on {order?.packedOn}</p>
        <p> KSh {order?.total}</p>
      </div>

      <div className="mb-4 border-t border-gray-300">
        <h3 className="text-md font-medium mt-5 mb-3">ITEMS IN YOUR ORDER</h3>
        <div className="flex flex-col p-4 border border-gray-300 rounded-md">
          <div className="flex flex-col mb-4 items-start gap-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded">{order?.status}</span>
            <p className="text-sm mb-1">{order?.deliveryDate}</p>
          </div>
          <div className="flex sm:justify-between sm:flex-row  flex-col gap-2 lg:flex-row lg:items-start">
            <div className="flex justify-between">
            <div className="w-24 h-24 mr-4">
              <Image
                src={order?.productImage || ""}
                alt={order?.productName || "product image"}
                width={96}
                height={96}
                className=" object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
            <p className="lg:text-sm sm:text-sm font-semibold mb-2">{order?.productName}</p>
              <p className="text-xs lg:text-sm sm:text-sm mb-1"><strong>QTY:</strong> 1</p>
              <p className="text-xs lg:text-sm sm:text-sm  font-bold">KSh 990</p>
            </div>
            </div>
          {/* <div className="w-24 h-24 mr-4">
              <Image
                src={order?.productImage || ""}
                alt={order?.productName || "product image"}
                width={96}
                height={96}
                className=" object-cover rounded-md"
              />
            </div> */}
            {/* <div className="flex-1">
              <p className="text-sm font-semibold mb-2">{order?.productName}</p>
              <p className="text-sm mb-1"><strong>QTY:</strong> 1</p>
              <p className="text-sm font-bold">KSh 990</p>
            </div> */}
            <div className="ml-4">
              <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md text-xs lg:text-sm sm:text-sm shadow-md">TRACK MY ITEM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}
export default OrderDetail