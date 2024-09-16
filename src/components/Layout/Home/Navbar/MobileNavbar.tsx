'use client';

import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IconUser } from "@tabler/icons-react";
import { TiShoppingBag } from "react-icons/ti";
import { LiaUserTieSolid } from "react-icons/lia";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
type MenuItemProps = {
  path: string;
  Icon: React.ElementType;
  text: string;
};
const menuItems: MenuItemProps[] = [
  { path: "/", Icon: IoHomeOutline, text: "Home" },
  { path: "/account/orders", Icon: IoIosList, text: "orders" },
  { path: "/account/messages", Icon: AiOutlineMessage, text: "Message" },
  // {
  //   path: "/cart",
  //   Icon: MdOutlineShoppingCart,
  //   text: "cart",
  // },
  {
    path: "/account",
    Icon: FaUser ,
    text: "Account",
  },
];

const Badge: React.FC<{ count: number }> = ({ count }) => (
    <span 
       className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs text-white bg-green-500 rounded-full"
    >
    {count}
  </span>
  );
  
const MobileNavbarMenu = ({ path, Icon, text }: MenuItemProps) => {
  const { cart } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;
  // const isCart = path === "/account/cart";
  const [cartCount, setCartCount] = useState<number>(0);
  
  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(totalItems);
  }, [cart]);
  // const showBadge = path === "/cart" && pathname !== "/account/cart";
  const showBadge = text.toLowerCase() === "cart";
  return (
    <Link href={path}>
      <div
        className={`relative flex flex-col items-center ${isActive ? "bg-white" : ""}`}
      >
         <div className="relative">
          <Icon size={24} color={isActive ? "text-primary" : ""} />
          {showBadge && <Badge count={cartCount} />}
        </div>
        <span
          className={`text-xs font-normal ${isActive ? "text-primary" : ""}`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};
export const MobileNavbar: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 h-[50px] bg-white shadow-lg z-20 block  lg:hidden sm:hidden">
    <div className="flex justify-around p-2">
      {menuItems.map((item, index) => (
        <MobileNavbarMenu key={index} {...item} />
      ))}
    </div>
  </div>
);

