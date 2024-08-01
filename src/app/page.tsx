'use client'
import Image from "next/image";
import Navbar from "../components/Layout/Home/Navbar/Navbar";
import Carousel from "../components/Layout/Home/Hero/Carousel";
import { MobileNavbar } from "@/src/components/Layout/Home/Navbar/MobileNavbar";
import {
  Search,
  MobileSearch,
} from "../components/Layout/Home/search/SearchInput";
import Products from "../components/Layout/Home/products/products";
import AllCategories from "../components/Layout/Home/categories/Categories";
export default function Home() {
  return (
    <div className="flex bg-[#F5F5F5] min-h-screen flex-col gap-3 ">
      <div className="flex flex-col w-full fixed top-0 z-20 py-2  bg-white">
        <div className="  w-full block lg:hidden  bg-white ">
          <MobileSearch />
        </div>
      </div>
      <div className="">
        <Navbar activeHeading={1} />
      </div>
      <div className="lg:py-0 py-0   px-1 rounded-md lg:px-0 sm:px-0 mt-[45px]  lg:mt-[53px]">
        <Carousel />
      </div>
      <div className="lg:mx-10">
        <AllCategories />
      </div>
      <div className="min-h-screen mb-[60px] lg:mx-10 px-1    flex flex-col">
        <Products />
      </div>
      <MobileNavbar />
    </div>
  );
}
