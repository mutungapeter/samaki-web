"use client";

import { useGetAllCategoriesQuery } from "@/redux/queries/categories/categoriesApi";
import { useGetAllProductsQuery } from "@/redux/queries/products/productsApi";
import { useState, useRef, useEffect, useMemo, Suspense } from "react";

import { HiOutlineChevronRight } from "react-icons/hi2";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import {useRouter, useSearchParams} from "next/navigation";

interface Category {
  id: number;
  name: string;
  created:string;
  modified:string;
}
const CategoryBar = () => {
 ;
  const searchParams = useSearchParams();
  const { isLoading, data, refetch } = useGetAllCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const categories = useMemo(() => data?.results, [data]);
//  console.log("data", data)
 const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router= useRouter()
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };
  const handleCategoryClick = (category:Category) => {
    if (activeCategory !== category) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("categories", category.name);
      router.push(`/products?${currentParams.toString()}`);
      setActiveCategory(category);
    }
  };

  return (
    
    <div className="relative w-full bg-white min-h-[50px] py-3">
      <button
        onClick={scrollLeft}
        className="absolute lg:left-0 left-0 top-1/2 transform -translate-y-1/2 lg:ml-3 lg:p-0  lg:rounded-none px-0 py-1 rounded-md bg-red-500  "
      >
        <HiOutlineChevronLeft size={25} color="white" />
      </button>
      <div
        ref={scrollRef}
        className="flex min-h-[50px] items-center gap-2 overflow-x-scroll hide-scroll-bar px-8 sm:px-12"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {categories?.map((category:Category) => (
          <button
            key={category.id}
            className={`whitespace-nowrap px-2 py-2 text-xs bg-slate-100 rounded-md ${
              activeCategory === category ? "text-red-500" : ""
            }`}
            onClick={() =>handleCategoryClick(category)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute lg:right-0 right-0 top-1/2 transform -translate-y-1/2 lg:mr-3  lg:rounded-none px-0 py-1 rounded-md bg-red-500  "
      >
        <HiOutlineChevronRight size={25} color="white" />
      </button>
    </div>
   
  );
};

export default CategoryBar;
