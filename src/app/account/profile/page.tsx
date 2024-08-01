import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GoPlusCircle } from "react-icons/go";
const ProfileInfo = () => {
  return (
    <>
      <div className=" ml-2 sm:mt-[80px] lg:mt-0 hidden lg:flex sm:block  rounded-sm shadow-md w-full min-h-[400px] flex-col bg-white p-3">
        <h2 className="text-lg font-bold border-b border-gray-300">
          My account details{" "}
        </h2>
      </div>

      <div className="w-full min-h-screen px-1 flex flex-col bg-[#F8F8F8]">
        <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3 items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
          <Link
            href="/account"
            className="justify-self-start flex items-center"
          >
            <FaChevronLeft color="gray" />
          </Link>
          <div className="col-span-2 flex justify-start">
            <h2 className="font-semibold">Account Management</h2>
          </div>
        </div>
        <div className="px-1 min-h-[100px] flex flex-col w-full p-3 gap-3 mt-[20px] rounded-sm bg-white">
          <h2 className="font-bold text-xs border-b border-gray-300 p-2">
            Personal details
          </h2>
          <div className="flex flex-col  gap-2 px-3">
            <div className="flex flex-col  gap-2">
              <label className="text-xs" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value="Simon Mwamburi"
                className="border border-gray-300 focus:outline-none  focus:border-gray-300 rounded-sm p-1 text-xs w-full"
              />
            </div>
            <div className="flex flex-col  gap-2">
              <label className="text-xs" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value="simonmwamburi@gmail.com"
                className="border border-gray-300 focus:outline-none focus:border-gray-300 rounded-sm p-1 text-xs w-full"
              />
            </div>
          </div>
          <div className="flex justify-end items-center  mt-1 ">
            <div className="flex items-center space-x-2 p-1 rounded-md border bg-green-500 border-green-500">
              <CiEdit color="white" />
              <h2 className="text-xs text-white">EDIT</h2>
            </div>
          </div>
        </div>
        <div className="px-1 min-h-[100px] flex flex-col w-full p-3 gap-3 mt-[20px] rounded-sm bg-white">
          <h2 className="font-bold text-xs border-b border-gray-300 p-2">
            Security
          </h2>

          <h2 className="font-medium text-xs  p-2">Change Password</h2>
          <div className="flex flex-col  gap-2 px-3">
            <div className="flex flex-col  gap-2">
              <label className="text-xs" htmlFor="old-password">
                Old Password
              </label>
              <input
                type="password"
                id="old-password"
                value="12345"
                className="border border-gray-300  focus:outline-none focus:border-gray-300 rounded-sm p-1 text-xs w-full"
              />
            </div>
            <div className="flex flex-col  gap-2">
              <label className="text-xs" htmlFor="new-password">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value="1234"
                className="border border-gray-300 focus:outline-none focus:border-gray-300 rounded-sm p-1 text-xs w-full"
              />
            </div>
          </div>
          <div className="flex justify-end items-center  mt-1 ">
            <div className="flex items-center space-x-2 p-1 rounded-md border bg-green-500 border-green-500">
              <h2 className="text-xs uppercase text-white">change</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileInfo;
