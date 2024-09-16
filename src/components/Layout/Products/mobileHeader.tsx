'use client';

import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";


const MobileHeader=()=>{
    
    return (
        <div className="fixed top-0 left-0 right-0 h-[70px] bg-white shadow-md z-20   flex items-center justify-between px-4 lg:hidden sm:hidden">
       
          <Link href="/">
            <span className="text-[25px] font-bold text-green-900 uppercase">
              Eshop
            </span>
          </Link>
          <MdOutlineShoppingCart size={30} color="text-green-900" />
     
        </div>
      
    )
}
export default MobileHeader;