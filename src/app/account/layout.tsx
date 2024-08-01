"use client";
import React, { useState } from "react";
import "@mantine/core/styles/Checkbox.css";
import Navbar from "@/src/components/Layout/Home/Navbar/Navbar";
import { MobileNavbar } from "@/src/components/Layout/Home/Navbar/MobileNavbar";
import {
  ProfileSidebar,
  SmallDeviceNavbar,
} from "@/src/components/Account/ProfileSidebar";
import { usePathname } from "next/navigation";
const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showMobileNavbar = pathname === "/account" || pathname === "/";
  return (
    <>
      <Navbar activeHeading={1} />
      <SmallDeviceNavbar />
      <div className="bg-[#F8F8F8] min-h-screen">
        <div className=" w-full  lg:w-11/12 mx-auto  bg-[#F8F8F8] gap-6 lg:py-10 lg:mt-10 sm:mt-10 sm:py-10 lg:flex    py-10 ">
          <div className="w-[50px] lg:w-[400px] sticky lg:top-[10px] top-[10px] bg-[#F8F8F8]  hidden lg:block">
            <ProfileSidebar />
          </div>
          <div className="w-full">{children}</div>
        </div>
        {showMobileNavbar && (
          <div className="block lg:hidden">
            <MobileNavbar />
          </div>
        )}
     
      </div>
    </>
  );
};

export default ProfileLayout;
