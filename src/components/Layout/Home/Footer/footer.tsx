import Link from "next/link";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
const Footer = () => {
  return (
    <section className="bg-[#F5F5F5] mx-auto ">
      <div className="bg-white  flex-flex-col p-2 py-10 min-h-[100px] ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 lg:gap-6 sm:gap-8 lg:grid-cols-4 lg:mx-10">
          <div className="">
            <h6 className="mb-4 text-sm font-semibold uppercase text-gray-900 ">
              Company
            </h6>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-green-500">
              About us
              </Link>
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-green-500">
               Terms and conditions
              </Link>
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-green-500">
                Careers
              </Link>
            </div>
          </div>
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase text-gray-900 ">
              Useful Links
            </h6>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-green-500">
                Track order
              </Link>
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-green-500">
                Report a product
              </Link>
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-green-500">
               Returns and Refunds policy
              </Link>
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-green-500">
               FAQ
              </Link>
            </div>
          </div>
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase text-gray-900 ">
            Payment methods 
            </h6>
            <div className="flex flex-col space-y-3">
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-red-500">
                Mpesa
              </Link>
              <Link href="#" className="text-xs lg:text-sm font-custom cursor-pointer hover:text-red-500">
              Credi card
              </Link>
             
            </div>
          </div>
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase text-gray-900 ">
           Join us on
            </h6>
            <div className="flex  space-x-3">
             <FaFacebook />
             <FaSquareTwitter />
             <AiFillTikTok />
             <FaLinkedin />
            
             
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row sm:flex-row py-5 sm:justify-between  flex-col lg:justify-between lg:mx-10">
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
          <div className="flex">
          © 2024 Eshop, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;
