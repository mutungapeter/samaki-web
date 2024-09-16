"use client";
import React, { Suspense, useState } from "react";
// import "@mantine/core/styles/Checkbox.css";
import Navbar from "@/src/components/Layout/Home/Navbar/Navbar";
import { MobileNavbar } from "@/src/components/Layout/Home/Navbar/MobileNavbar";

import {
  ProfileSidebar,
  SmallDeviceNavbar,
} from "@/src/components/Account/ProfileSidebar";
import { usePathname, useRouter } from "next/navigation";
import { GoChevronRight } from "react-icons/go";
import FilterComponent from "@/src/components/products/Filter";
import ProductsMobile from "@/src/components/products/MobileTopBar";
import Footer from "@/src/components/Layout/Home/Footer/footer";

import Link from "next/link";
import MobileHeader from "./mobileHeader";
const ProductDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showMobileNavbar = pathname === "/account" || pathname === "/";

  const router = useRouter();


  const handleBreadcrumbClick = (path: string) => {
    router.push(path);
  };


  const pathSegments = pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments.pop();
  return (
    <>
      <div className="min-h-screen flex bg-[#F8F8F8] flex-col sm:gap-3 gap-2 lg:gap-3">
        <Navbar  />
       <MobileHeader />
      
        <div className="bg-[#F8F8F8] px-2 items-center  mt-[75px] flex lg:flex sm:flex  w-full sm:min-h-[40px] min-h-[20px] lg:min-h-[40px] lg:mt-[75px]  sm:mt-[75px] lg:w-11/12 mx-auto lg:mx-20 sm:px-2 sm:mx-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleBreadcrumbClick("/")}
              className="text-black font-bold hover:underline hover:text-red-500"
            >
              Home
            </button>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={index}>
                <GoChevronRight size={20} color="gray" />
                <button
                  onClick={() =>
                    handleBreadcrumbClick("/" + pathSegments.slice(0, index + 1).join("/"))
                  }
                  className="text-gray-600 hover:underline hover:text-red-500"
                >
                  {segment}
                </button>
              </React.Fragment>
            ))}
            {/* {lastSegment && (
              <>
                <GoChevronRight size={20} color="gray" />
                <span className="text-gray-600">{lastSegment}</span>
              </>
            )} */}
          </div>
        </div>
        <div className=" w-full  sm:w-full lg:w-11/12 mx-auto lg:mx-20 sm:mx-0 sm:px-2  bg-[#F8F8F8] gap-6 sm:gap-3 sm:py-2 py-6  sm:p-2 lg:py-2 lg:flex sm:flex">
         
          <div className="w-full  lg:w-11/12  lg:mt-0  sm:mt-0 ">{children}</div>
        </div>
        <MobileNavbar />
      </div>
      <Footer />
      </>
  );
};

export default ProductDetailLayout;
