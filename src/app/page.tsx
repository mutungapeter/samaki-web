"use client";
import Image from "next/image";
import Navbar from "../components/Layout/Home/Navbar/Navbar";
import Carousel from "../components/Layout/Home/Hero/Carousel";
import { MobileNavbar } from "@/src/components/Layout/Home/Navbar/MobileNavbar";
import {
  Search,
  MobileSearch,
} from "../components/Layout/Home/search/SearchInput";
// import Products from "../components/Layout/Home/products/products";
import AllCategories from "../components/Layout/Home/categories/Categories";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Footer from "../components/Layout/Home/Footer/footer";

const Products = dynamic(
  () => import("../components/Layout/Home/products/products"),
  {
    suspense: true,
    loading: () => <div>Loading Products...</div>,
  }
);
export default function Home() {
  return (
    <>
      <div className="flex bg-[#F5F5F5] min-h-screen flex-col gap-3 ">
        <div className="flex flex-col w-full fixed top-0 z-20 py-2  bg-white">
          <div className=" w-full px-1 flex flex-col  lg:hidden  bg-white ">
            <MobileSearch />
          </div>
        </div>
        <div className="">
          <Navbar activeHeading={1} />
        </div>
        <div className="">
          <Carousel />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="lg:mx-10">
            <AllCategories />
          </div>
        </Suspense>
        <div className="min-h-screen  lg:mx-10 px-1 bg-white    flex flex-col">
          <Products />
        </div>
        <div className="bg-[#F5F5F5] ">
          <Footer />
        </div>
        <MobileNavbar />
      </div>
    </>
  );
}
