"use client";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, initializeCart, removeFromCart } from "@/redux/slices/Cart";
import Image from "next/image";
import { useState } from "react";
const PaymentPage = () => {
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const [isMpesaSelected, setIsMpesaSelected] = useState(false);

  const handleRadioChange = () => {
    setIsMpesaSelected(!isMpesaSelected);
  };
  return (
    <div className="w-full sm:w-full lg:w-2/4 mx-auto mt-[75px] bg-[#F8F8F8] p-2 lg:py-4 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase text-gray-500">
          Order summary
        </h2>
        <div className="flex space-x-2 items-center text-blue-500">
          <span className="font-custom text-md uppercase">see details</span>
          <IoChevronForwardSharp size={20} color="blue" />
        </div>
      </div>
      <div className="bg-white p-4 flex items-center justify-between">
        <p>Total to Pay</p>
        <p>KES {totalPrice}</p>
      </div>
      <div className="bg-white flex flex-col">
        <div className="flex items-center border-b py-3">
          <h2 className="uppercase font-custom text-sm p-3">Payment method</h2>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-2 px-5">
            <div className="flex items-center space-x-2">
              <div className="h-[70px] w-[70px] rounded-md white">
                <Image
                  src="/payments.webp"
                  alt=""
                  height={70}
                  width={70}
                  quality={100}
                  className="w-[70px] h-[70px] object-contain rounded-md  "
                />
              </div>
              <h2>Mpesa</h2>
            </div>
            <input
              type="radio"
              name="payment-method"
              className="form-radio h-5 w-5 text-blue-600 focus:text-blue-500 focus:ring-blue-500"
              checked={isMpesaSelected}
              onChange={handleRadioChange}
            />
          </div>
          {isMpesaSelected && (
            <div className="flex flex-col px-5 pb-4">
              <input
                type="text"
                id="phone-number"
                className="mt-1 block w-full sm:h-14 h-10 lg:h-14 rounded-md bg-gray-100 text-black placeholder-gray-400 p-4 border-none outline-none focus:ring-0"
                placeholder="Enter your Mpesa number"
              />
            </div>
          )}
        </div>
      </div>
      <div className="px-5 mt-4">
        <div className="h-[45px] flex items-center justify-center w-full cursor-pointer bg-[#e44343] rounded-md">
          <h1 className="text-[#fff] text-[16px] font-[500] uppercase">
            Pay Now
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
