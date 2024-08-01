"use client";
import Link from "next/link";
import { useRef, useState } from "react";
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
interface Props {
  activeHeading: number;
}
const NavBar = ({ activeHeading }: Props) => {

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const [accountOpen, setAccountOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const accountRef = useRef(null);
  const helpRef = useRef(null);
  const categoriesRef = useRef(null);

  useOutsideClick(accountRef, () => setAccountOpen(false));
  useOutsideClick(helpRef, () => setHelpOpen(false));
  useOutsideClick(categoriesRef, () => setHoveredCategory(null));

  return (
    <>
   
      <div className="w-full fixed top-0 left-0 z-30 transition hidden sm:flex md:flex  sm:px-5 lg:flex items-center justify-between bg-white h-[70px]">
        <div className="w-11/12 md:w-full sm:w-full mx-auto flex items-center sm:px-0 lg:px-20 relative  justify-between">
          <div className="flex gap-3 items-center">
            <Link href="/">
              <span className="text-[25px] font-bold text-black uppercase">
                Samaki
              </span>
            </Link>
            <div className="p-2 rounded-full bg-[#DD3131]">
              <IconShoppingCart color="white" size={20} />
            </div>
          </div>
          <Search />
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-[#DD3131]"
                onClick={() => setAccountOpen((prev) => !prev)}
                // ref={accountRef}
              >
                <HiOutlineUser size={26} />
                <span>Account</span>
                {accountOpen ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </button>
              {accountOpen && (
                <div className="absolute  z-30  p-3 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                  <div className="flex flex-col gap-3">
                  <Link href="/login">
                    <div className="w-full flex items-center shadow-md">
                      <button className="w-full bg-[#DD3131] shadow-md text-white py-2 rounded-md">
                        SIGN IN
                      </button>
                    </div>
                      </Link>
                    <Link href="/account/profile">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <AiOutlineUser size={26} className="mr-2" />
                          <span className="text-md font-light hover:font-medium">
                            My Account
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/orders">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <TiShoppingBag size={26} className="mr-2" />
                          <span className="text-md font-light hover:font-medium">
                            Orders
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/saved">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <AiOutlineHeart size={30} className="mr-2" />
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:font-medium">
                            Saved Items
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center space-x-2 hover:text-[#DD3131]"
                onClick={() => setHelpOpen((prev) => !prev)}
                ref={helpRef}
              >
                <IconHelpCircle size={30} />
                <span>Help</span>
                {helpOpen ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </button>
              {helpOpen && (
                <div className="absolute z-30 right-0 mt-2 w-64 p-2 bg-white border rounded-md shadow-lg">
                  <div className="flex flex-col gap-2">
                    <Link href="/help">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:font-medium">
                            {" "}
                            Help Center
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/contact">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:font-medium">
                            Place an Order
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/contact">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:font-medium">
                            Track Your Order
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/contact">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:font-medium">
                            Order Cancellation
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/contact">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:font-medium">
                            Returns & Refunds
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/contact">
                      <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                        <div className="flex gap-2">
                          <span className="text-md font-light hover:font-medium">
                            Payment & Samaki Account
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className='flex items-center space-x-2 hover:text-[#DD3131]'>
              <div
                className="relative cursor-pointer  hover:text-[#DD3131]"
              >
                <MdOutlineShoppingCart
                  size={30}
                />
                <span
                 className="absolute right-0 top-0 rounded-full bg-[#DD3131] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center"
                 >
                  0
                </span>
              </div>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </div>
      {/* second nav holding categories div */}
      {/* <div className="fixed w-full top-[70px] left-0 z-30 transition hidden lg:flex items-center justify-between bg-white lg:h-[50px]">
        <div className=" w-11/12 mx-auto flex items-center relative justify-between ">
          <div className="w-64 relative h-[60px] mt-[10px]  hidden lg:block bg-white  shadow-md rounded-md ">
            <div className="text-white w-full flex items-center font-bold p-2 bg-[#DD3131]">
              <HiMenuAlt2 color="white" />
              <span className="text-white">Categories</span>
            </div>
            <ul className="space-y-2 text-black p-4 bg-[#fff] absolute z-30 w-64 rounded-b-md shadow-sm cursor-pointer">
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Fish Types
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Preparation Styles
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Specialty Dishes
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Accompaniments/Sides
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Sauces and Seasonings
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Customizable Options
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Combo Meals
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Beverages
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Desserts
              </li>
              <li className="text-sm font-light hover:text-font-medium hover:text-sm hover:text-[#DD3131] cursor-pointer p-1 border-b">
                Seasonal Specials
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      {/* <div className="fixed w-full hidden  lg:flex items-center justify-between bg-white lg:h-[50px] top-[70px] left-0 z-30 transition px-14">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(null)}
            className="relative group"
          >
            <button
              className={`py-2 px-4 text-sm font-medium text-gray-700 hover:text-[#DD3131] ${
                hoveredCategory === index ? "text-[#DD3131]" : ""
              }`}
            >
              {category.name}
            </button>
            {hoveredCategory === index && (
              <div className="absolute left-0 w-48 bg-white border rounded-md shadow-lg p-3 mt-1">
                {category.subcategories.map((subcategory, subIndex) => (
                  <Link key={subIndex} href={`/${subcategory.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                      {subcategory.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div> */}

{/* <div className="w-full top-[70px] left-0 z-20 transition hidden lg:flex items-center justify-between bg-white h-[50px]">
        <div className="w-11/12 mx-auto flex items-center relative justify-between">
          <div className="w-64 relative max-h-[60px] mt-[10px] hidden lg:block bg-white shadow-md rounded-md"
          ref={categoriesRef}
          >
            <div className="text-white w-full flex items-center font-bold p-2 bg-[#DD3131]">
              <HiMenuAlt2 color="white" />
              <span className="text-white">MENU</span>
            </div>
            <ul className="space-y-2 text-black p-4 bg-[#fff] absolute z-30 w-64 rounded-b-md shadow-sm cursor-pointer">
              {categoriesData.map((category, index) => (
                <li
                  key={index}
                  className="text-sm font-light hover:font-medium hover:text-[#DD3131] cursor-pointer p-1 border-b"
                  onMouseEnter={() => setHoveredCategory(index)}
                >
                  {category.name}
                  {hoveredCategory === index && (
                    <div className="absolute flex flex-col left-full top-0   bg-white border rounded-md shadow-lg p-3 mt-1 z-50">
                      <h2 className="text-lg text-black font-bold border-b pb-2 mb-2">
                        {category.name}
                      </h2>
                      <div className=" max-h-[500px] w-full h-[370px] p-8 flex gap-6 justify-between">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <Link
                            key={subIndex}
                            href={`/${subcategory.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            <div
                              className="flex flex-col gap-4 
                           hover:text-[#DD3131] cursor-pointer
                            transition ease-in-out
                       delay-150 
                       hover:-translate-y-1 
                       hover:scale-110
                        duration-300
                        
                           "
                            >
                              <div className="w-[70px] h-[70px]  rounded-md overflow-hidden">
                                <Image
                                  src={subcategory.image}
                                  height={70}
                                  width={70}
                                  alt={subcategory.name}
                                  className=" w-[70px] h-[70px] object-cover"
                                />
                              </div>
                              <span className="text-sm font-light text-black hover:text-[#DD3131]">
                                {subcategory.name}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default NavBar;
