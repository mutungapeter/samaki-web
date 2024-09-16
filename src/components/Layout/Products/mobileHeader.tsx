'use client';

import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useRef, useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
const MobileHeader=()=>{
  const { cart } = useAppSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState<number>(0);
 
  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(totalItems);
  }, [cart]);
    return (
        <div className="fixed top-0 left-0 right-0 h-[70px] bg-white shadow-md z-20   flex items-center justify-between px-4 lg:hidden sm:hidden">
       
          <Link href="/">
            <span className="text-[25px] font-bold text-green-900 uppercase">
              Eshop
            </span>
          </Link>
          <Link href="/cart">
              <div
                className="relative cursor-pointer  hover:text-green-500"
              >
                <MdOutlineShoppingCart
                  size={30}
                />
                <span
                 className="absolute right-0 top-0 rounded-full bg-green-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center"
                 >
                  {cartCount}
                </span>
              </div>
              </Link>
        </div>
      
    )
}
export default MobileHeader;