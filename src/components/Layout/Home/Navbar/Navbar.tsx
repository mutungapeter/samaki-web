"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  AiOutlineHeart,
  AiOutlineUser
} from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowUp
} from "react-icons/io";

import { categoriesData } from "@/public/data/data";
import {
  IconHelpCircle,
  IconShoppingCart
} from "@tabler/icons-react";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TiShoppingBag } from "react-icons/ti";
import Image from "next/image";
import { useOutsideClick } from "@/src/hooks/ClickOutsideHook";
import { HiMenuAlt2 } from "react-icons/hi";
import { Search } from "../search/SearchInput";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useAppSelector } from "@/redux/hooks";
interface Props {
  activeHeading: number;
}
const NavBar = ({ activeHeading }: Props) => {
  const { cart } = useAppSelector((state) => state.cart);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const [accountOpen, setAccountOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
 
  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(totalItems);
  }, [cart]);

  const accountRef = useRef(null);
  const helpRef = useRef(null);
  const categoriesRef = useRef(null);

  useOutsideClick(accountRef, () => setAccountOpen(false));
  useOutsideClick(helpRef, () => setHelpOpen(false));
  useOutsideClick(categoriesRef, () => setHoveredCategory(null));

  return (
    <>
   
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
          <Search />
          <div className="flex items-center gap-9">
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-green-600"
                onClick={() => setAccountOpen((prev) => !prev)}
                ref={accountRef}
              >
                <div className="p-2 rounded-full bg-green-100">
                <HiOutlineUser size={26} />
                </div>
               
              </button>
              {accountOpen && (
                <div className="absolute  z-30  p-3 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <div className="flex flex-col gap-3">
                  <Link href="/login">
                    <div className="w-full flex items-center shadow-md">
                      <button className="w-full bg-green-900 shadow-md text-white py-2 rounded-md">
                        SIGN IN
                      </button>
                    </div>
                      </Link>
                    <Link href="/account/profile">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <AiOutlineUser size={26} className="mr-2" />
                          <span className="text-md font-light hover:text-sm hover:font-medium">
                            My Account
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/orders">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <TiShoppingBag size={26} className="mr-2" />
                          <span className="text-md font-light hover:text-sm hover:font-medium">
                            Orders
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/saved">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <AiOutlineHeart size={30} className="mr-2" />
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:text-sm hover:font-medium">
                            Saved Items
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
           
            <div className='flex items-center space-x-2 hover:text-green-500'>
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
          </div>
        </div>
      </div>
      
    </>
  );
};
export default NavBar;
