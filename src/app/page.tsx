"use client";
import Image from "next/image";
import Navbar from "../components/Layout/Home/Navbar/Navbar";
import Carousel from "../components/Layout/Home/Hero/Carousel";
import { MobileNavbar } from "@/src/components/Layout/Home/Navbar/MobileNavbar";

// import Products from "../components/Layout/Home/products/products";
import AllCategories from "../components/Layout/Home/categories/Categories";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Footer from "../components/Layout/Home/Footer/footer";
import { HomeMobileNavbar } from "../components/Layout/Home/Navbar/homeMobiNav";

const Products = dynamic(
  () => import("../components/products/Products"),
  {
    suspense: true,
    loading: () => <div>Loading Products...</div>,
  }
);
export default function Home() {
  return (
    <>
      <div className="flex bg-[#F6F7F9] min-h-screen mb-14 flex-col gap-3 ">
        <div className="flex flex-col w-full fixed top-0 z-20 py-2  bg-white">
          <div className=" w-full px-1 flex flex-col  lg:hidden  bg-white ">
            <HomeMobileNavbar />
          </div>
        </div>
        <div className="">
          <Navbar />
        </div>
        <div className="">
          <Carousel />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="lg:mx-10">
            <AllCategories />
          </div>
        </Suspense>
        <div className="min-h-screen  lg:mx-10 px-1 bg-[#F6F7F9]  flex flex-col gap-3  ">
       
        <h2 className="text-xl font-bold  text-green-900  p-3">Featured Products</h2>
        
          <Products />
        </div>
        <div className="bg-[#F5F5F5] hidden md:block ">
          <Footer />
        </div>
        <MobileNavbar />
      </div>
    </>
  );
}
