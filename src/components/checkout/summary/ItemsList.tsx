"use client";
import { IoChevronForward } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, initializeCart, removeFromCart } from "@/redux/slices/Cart";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
interface CartItem {
  id: number;
  qty: number;
  price: number;
  name: string;
  image: string;
  stock: number;
}

interface CartSingleProps {
  data: CartItem;
}
const CheckoutItemsList = () => {
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("cartItems")) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") as string);
      dispatch(initializeCart(cartItems));
    }
  }, [dispatch]);
  // console.log("cart", cart)
  return (
    <div className="lg:bg-white sm:bg-white bg-[#F8F8F8] py-3 flex flex-col sm:gap-5 gap-2 lg:gap-5 ">
      <div className="flex   items-center lg:border-b lg:p-3 sm:border-b p-2 sm:p-3">
        <h2 className="lg:text-md sm:text-md text-xs font-medium uppercase">
          Items to be shipped
        </h2>
      </div>
      <div className="flex flex-col lg:mx-0 sm:mx-0 mx-1 gap-2">
        {cart.map((i, index) => (
          <SingleItem key={index} data={i} />
        ))}
      </div>
      <div className=" items-center justify-center lg:flex sm:flex hidden">
        <Link href="/cart">
          <h2 className="p-2 rounded-md hover:bg-green-100 hover:text-green-900 text-green-900 uppercase cursor-pointer">
            Modify cart
          </h2>
        </Link>
      </div>
    </div>
  );
};
const SingleItem = ({ data }: CartSingleProps) => {
  const [value, setValue] = useState(data.qty);

  useEffect(() => {
    setValue(data.qty);
  }, [data.qty]);
  const subtotal = data.price * value;

  return (
    <div className=" flex  flex-col gap-2 mx-2 p-2 rounded-md bg-white">
      <div className="flex  items-center space-x-2">
        <div className="h-[50px] w-[50px] rounded-md bg-white">
          <Image
            src={data?.image}
            alt=""
            height={50}
            width={50}
            quality={100}
            className="w-[50px] h-[50px] object-cover rounded-md  "
          />
        </div>
        <div className="flex w-full flex-col gap-2 p-2">
          <div className="flex  w-full justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="font-custom lg:text-sm sm:text-sm text-xs">{data.name}</h1>
              <div className="flex items-center space-x-3">
                <h1 className="font-custom lg:text-sm sm:text-sm text-xs">QTY</h1>
                <h1 className="font-custom lg:text-sm sm:text-sm text-xs">{data.qty}</h1>
              </div>
            </div>
            <h2 className="items-end lg:text-sm sm:text-sm text-[10px] font-bold text-green-900">
              ksh {subtotal}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutItemsList;
