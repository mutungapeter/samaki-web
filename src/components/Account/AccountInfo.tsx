import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";
import { CiGift } from "react-icons/ci";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { HiOutlineGiftTop } from "react-icons/hi2";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Link from "next/link";
const Account = () => {
  return (
    <div className="w-full px-1 flex flex-col  bg-[#F8F8F8] gap-5 lg:hidden sm:hidden">
      <div className="px-4 min-h-[80px] flex flex-col w-full p-2 gap-3  rounded-md bg-primary">
       
        <div className="flex items-center gap-5">
            <FaUserCircle color="white" size={25} />
            <h2 className="text-white">Simon Mwamburi</h2>
        </div>
        <div className="flex justify-center items-center gap-3">
        <CiLocationOn size={24} color="white" />
        <span className="text-xs text-white">Nairobi , Spur electronics shop</span>
        </div>
      </div>
    
      <div className="px-4 min-h-[80px] flex flex-col w-full p-3 gap-3  rounded-md bg-white">
        <div className="flex justify-between">
        <h2>My Orders</h2>
        <Link href="/account/orders">
        <div className="flex items-center space-x-2">
            <span>View All</span>
            <FiChevronRight size={24} />
        </div>
        </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col  gap-2">
            <CiGift  size={25} className="text-primary" />
                <h3 className="text-xs flex flx-col">Pending dispatched</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
            <FaCarSide className="text-primary" size={25} />
                <h3 className="text-xs flex flx-col">Dispatched</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
            <CiGift className="text-primary" size={25} />
                <h3 className="text-xs flex flx-col">Arrived</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
            <HiOutlineGiftTop className="text-primary" size={25} />
                <h3 className="text-xs flex flx-col">Pending Review</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
            <HiOutlineReceiptRefund className="text-primary" size={25} />
                <h3 className="text-xs flex flx-col">Returns</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
            <IoMdCheckmarkCircleOutline className="text-primary" size={25} />
                <h3 className="text-xs flex flx-col">Completed</h3>
            </div>
        </div>
      </div>
      <div className="px-4 min-h-[80px] flex flex-col w-full p-3 gap-3  rounded-md bg-white">
      <h2>Account Management</h2>
      <div className="grid grid-cols-4 gap-3">
        <Link href="/account/address">
      <div className="flex flex-col items-center  gap-2">
      <CiLocationOn size={24} className="text-primary" />
      <h2 className="text-xs">Address</h2>
      </div>
      </Link>
      <Link href="/account/profile">
      <div className="flex flex-col items-center  gap-2">
      <IoSettingsOutline size={24} className="text-primary" />
      <h2 className="text-xs">Settings</h2>
      </div>
      </Link>
      </div>
      </div>
      
    </div>
  );
};
export default Account;
