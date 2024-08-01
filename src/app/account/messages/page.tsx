import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

const MessagesPage = () => {
  return (
    <>
      <div className=" ml-2 sm:mt-[80px] lg:mt-0 hidden lg:flex sm:block  rounded-sm shadow-md w-full min-h-[400px] flex-col bg-white p-3">
        <h2 className="text-lg font-bold border-b border-gray-300">
          My Messages{" "}
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
            <h2 className="font-semibold">Messages</h2>
          </div>
        </div>
      </div>
    </>
  );
};
export default MessagesPage;
