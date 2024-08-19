"use client";
import React, { Suspense, useState } from "react";
import "@mantine/core/styles/Checkbox.css";
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
import CheckoutBar from "@/src/components/checkout/TopBar";
import OrderSummary from "@/src/components/checkout/summary/OrderSummary";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex bg-[#F8F8F8] flex-col sm:gap-3 gap-2 lg:gap-3">
        <CheckoutBar />
        
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
