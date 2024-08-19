"use client";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineAddIcCall } from "react-icons/md";
import { HiOutlineArrowUturnLeft } from "react-icons/hi2";
import { SiSpringsecurity } from "react-icons/si";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { usePathname } from "next/navigation";
const CheckoutBar=()=>{
  const pathname = usePathname();
  const title = pathname === "/payment" ? "Order Payment" : "Place Order";
    return (
        <div className="w-full fixed top-0 left-0 z-30 transition hidden sm:flex md:flex  sm:px-5 lg:flex items-center justify-between bg-white h-[70px]">
            <div className="lg:w-11/12 md:w-full w-full sm:w-full mx-auto flex items-center sm:px-0 lg:mx-10 relative  justify-between">
            <div className="flex gap-3 items-center">
            <Link href="/">
              <span className="text-[25px] font-bold text-black uppercase">
                Eshop
              </span>
            </Link>
            <div className="p-2 rounded-full bg-green-900">
              <MdOutlineShoppingCart color="white" size={20} />
            </div>
          </div>
          <h2 className="font-bold text-xl">{title}</h2>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-3">
               <MdOutlineAddIcCall color="gray" size={28}/>
               <div className="flex flex-col space-y-1">
                <h2>Nee help?</h2>
                <h2>contact us</h2>
               </div>
            </div>
            {pathname !== "/payment" && (
           <>
            <div className="flex items-center space-x-3">
               <MdOutlinePublishedWithChanges  color="gray" size={28} />
               <div className="flex flex-col space-y-1">
                <h2>Easy</h2>
                <h2>Refunds</h2>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <SiSpringsecurity  color="gray"  size={28}/>
               <div className="flex flex-col space-y-1">
                <h2>Secure </h2>
                <h2>Payments</h2>
               </div>
            </div>
           </>
            )}
            </div>
            </div>
            
        </div>
    )
}
export default CheckoutBar