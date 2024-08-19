"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loader from "@/src/components/Loader/Loader";
interface CartItem {
  id: number;
  qty: number;
  price: number;
  name: string;
  image: string;
  stock: number;
}
interface OrderSummaryProps {
  cart: CartItem[];
  totalPrice: number;
  handlePaymentSubmit: () => void;
  isCreatingOrder: boolean;
}
const OrderSummary = ({
  cart,
  totalPrice,
  handlePaymentSubmit,
  isCreatingOrder,
}: OrderSummaryProps) => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(totalItems);
  }, [cart]);
  return (
    <div className="lg:w-[400px] sm:w-[400px] w-full  rounded-md min-h-[200px]  sticky lg:top-[10px] top-[10px] px-2 sm:px-0 lg:px-0   ">
      <div className=" w-full flex flex-col py-3 bg-[#FFFFFF] rounded-md sm:shadow-md lg:shadow-md">
        <div className="w-full flex px-2 py-1 font-[600]">Total</div>
        <div className="flex flex-col lg:gap-5 sm:gap-5 gap-3 ">
          <div className="flex items-center  justify-between border-b px-2 py-1 ">
            <h2 className="font-light sm:text-lg text-xs lg:text-lg  text-center">
              Product&apos;s total({cartCount})
            </h2>
            <div className="font-[600] sm:text-lg text-xs lg:text-lg">
              Ksh {totalPrice}
            </div>
          </div>
          <div className="flex items-center justify-between border-b px-2 py-1">
            <h2 className=" font-light sm:text-lg text-sm lg:text-lg ">
              Delivery fee
            </h2>
            <h2 className=" sm:text-md text-sm lg:text-md font-custom font-[600]">
              ksh 0.00
            </h2>
          </div>
        </div>
        <div className="flex items-center  justify-between border-b p-3">
          <h2 className="font-[600]  sm:text-lg text-sm lg:text-lg">
            Payment Amount
          </h2>
          <h2 className="font-[600] sm:text-md text-sm lg:text-md text-green-900">
            ksh {totalPrice}
          </h2>
        </div>
        <div className="px-5 mt-4 hidden lg:block sm:block">
          <div
            className="h-[45px] flex items-center justify-center w-full cursor-pointer bg-green-900 rounded-md"
            onClick={handlePaymentSubmit}
          >
            <h1 className="text-[#fff] text-[16px] font-[500] uppercase">
              <span className="text-[16px]">
                {isCreatingOrder ? (
                  <span>
                    <Loader size="h-5 w-5" color="white" />
                  </span>
                ) : (
                  "Place order"
                )}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
