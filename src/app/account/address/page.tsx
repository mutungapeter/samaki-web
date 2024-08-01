import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
const AddressPage = () => {
  return (
    <div className="w-full min-h-screen px-1 flex flex-col bg-[#F8F8F8]">
      <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3 items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
        <Link href="/account" className="justify-self-start flex items-center">
          <FaChevronLeft color="gray" />
        </Link>
        <div className="col-span-2 flex justify-start">
          <h2 className="font-semibold">My Addresses</h2>
        </div>
      </div>
      <div className="px-1 min-h-[100px] flex flex-col w-full p-3 gap-3 mt-[20px] rounded-sm bg-white">
        <div className="flex items-center gap-4">
          <h2 className="text-xs">Simon Mwamburi</h2>
          <h2 className="text-xs">+254712345678</h2>
        </div>
        <p className="text-xs">
          Nairobi , Spur electronics shop, next to chaplain chemistry ,Tom Mboya
          street ,0100{" "}
        </p>
        <p className="text-xs text-[#102C57] border-b border-gray-300 p-1">
          Pickup station
        </p>
        <div className="flex justify-between items-center  mt-1 ">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="circularCheckbox"
              className="appearance-none h-4 w-4 border border-gray-300 rounded-full bg-white checked:bg-blue-600 checked:border-transparent focus:outline-none transition duration-200 cursor-pointer"
            />
            <label
              htmlFor="circularCheckbox"
              className="ml-2 text-gray-700 text-xs"
            >
              set as default address
            </label>
          </div>
          <div className="flex space-x-2">
            <div className="p-1 rounded-sm border border-red-500">
              <RiDeleteBin5Line color="red" />
            </div>
            <div className="p-1 rounded-sm border border-green-500">
              <CiEdit color="green" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-5 left-0 flex justify-center z-30 px-10">
        <Link href="#">
          <div className="bg-red-500 w-64 p-2 rounded-sm flex items-center justify-center space-x-3">
            <GoPlusCircle color="white" />
            <h2 className="text-white">Add New Address</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default AddressPage;
