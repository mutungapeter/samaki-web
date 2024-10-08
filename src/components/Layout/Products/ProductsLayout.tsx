"use client";
import React, { Suspense, useState } from "react";
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
const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showMobileNavbar = pathname === "/account" || pathname === "/";

  const router = useRouter();

  const handleBreadcrumbClick = (path: string) => {
    router.push(path);
  };

  const categoryName = pathname.split("/").pop();

  return (
    <>
      <div className="min-h-screen flex bg-[#F8F8F8] flex-col sm:gap-3 gap-2 lg:gap-3">
        <Navbar />
        <ProductsMobile />
        <div className="bg-[#F8F8F8]  items-center hidden lg:flex sm:flex mt-[70px]  w-full min-h-[40px] lg:mt-[75px]  sm:mt-[75px] lg:w-11/12 mx-auto lg:mx-auto sm:px-2 sm:mx-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleBreadcrumbClick("/")}
              className="text-black font-bold hover:underline hover:text-red-500"
            >
             Home
            </button>
            {categoryName && (
              <>
                <GoChevronRight size={30} color="gray" />
               
              Products
              </>
            )}
          </div>
        </div>
        <div className=" w-full  sm:w-full lg:w-11/12 mx-auto lg:mx-auto sm:mx-0 sm:px-2  bg-[#F8F8F8] gap-6 sm:gap-3  sm:p-2 lg:py-2 lg:flex sm:flex">
          <div className="w-[50px] lg:w-[400px] sm:w-[400px] sticky lg:top-[10px] top-[10px]   hidden sm:block lg:block">
            <FilterComponent />
          </div>
          <div className="w-full sm:w-full  lg:mt-0 mt-[0px] sm:mt-0 ">
            {children}
          </div>
        </div>
      </div>
      <div className="hidden lg:block sm:block">
        <Footer />
      </div>
    </>
  );
};

export default ProductsLayout;
