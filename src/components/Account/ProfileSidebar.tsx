import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
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
type MenuItemProps = {
  path: string;
  Icon: React.ElementType;
  text: string;
};
const menuItems: MenuItemProps[] = [
  { path: "/account/profile", Icon: RxPerson, text: "My Account Info" },
  { path: "/account/orders", Icon: TiShoppingBag, text: "Orders" },
  { path: "/account/messages", Icon: MdOutlineMailOutline, text: "Inbox" },
  {
    path: "/account/returns",
    Icon: HiOutlineReceiptRefund,
    text: "Returns",
  },
  {
    path: "/account/change-password",
    Icon: HiOutlineReceiptRefund,
    text: "Change Password",
  },
  { path: "/account/logout", Icon: AiOutlineLogin, text: "Log out" },
];
const ProfileMenuItem = ({ path, Icon, text }: MenuItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link href={path}>
      <div
        className={`flex items-center cursor-pointer w-full lg:hover:bg-slate-100 lg:rounded-sm  p-4 ${
          isActive ? "bg-gray-300" : ""
        }`}
      >
        <Icon size={30} color={isActive ? "black" : ""} />
        <span
          className={`pl-3 text-sm font-normal ${
            isActive ? "text-black" : "lg:block hidden"
          } `}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

const SmallDeviceMenu = ({ path, Icon, text }: MenuItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === path;
  return (
    <Link href={path}>
      <div
        className={`flex flex-col items-center ${isActive ? "bg-white" : ""}`}
      >
        <Icon size={24} color={isActive ? "red: " : ""} />
        <span
          className={`text-xs font-normal ${isActive ? "text-red-500" : ""}`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};
export const SmallDeviceNavbar: React.FC = () => (
  <div className="fixed top-[70px] left-0 right-0 bg-white shadow-md z-20 hidden lg:hidden sm:block">
    <div className="flex justify-around p-2">
      {menuItems.map((item, index) => (
        <SmallDeviceMenu key={index} {...item} />
      ))}
    </div>
  </div>
);
export const ProfileSidebar: React.FC = () => (
  <div className="w-full bg-white  rounded-sm shadow-md   gap-3 hidden lg:block">
    {menuItems.map((item, index) => (
      <ProfileMenuItem key={index} {...item} />
    ))}
  </div>
);
