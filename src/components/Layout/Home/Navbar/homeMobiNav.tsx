"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi";
import Image from "next/image";

import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useGetAllProductsQuery } from "@/redux/queries/products/productsApi";
import { useOutsideClick } from "@/src/hooks/ClickOutsideHook";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAppSelector } from "@/redux/hooks";
interface Product {
  id: number;
  created: string;
  modified: string;
  name: string;
  buying_price: string;
  selling_price: string;
  quantity: number;
  unit_of_measure: string;
  brand: string;
  image: string;
  category: number | null;
}
export const HomeMobileNavbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { cart } = useAppSelector((state) => state.cart);
 
    const [cartCount, setCartCount] = useState<number>(0);
    
    const {
      isLoading: productsLoading,
      data: productsData,
      refetch,
    } = useGetAllProductsQuery({}, { refetchOnMountOrArgChange: true });
  
    const [searchData, setSearchData] = useState<Product[] | null>(null);
    const [products, setProducts] = useState<any>([]);
  
    useEffect(() => {
      if (productsData) {
        const products = productsData?.results;
        setProducts(products);
      }
    }, [productsData]);
  
    useEffect(() => {
      if (searchTerm.trim() === "") {
        setSearchData([]);
      } else {
        const filteredProducts = products.filter((product: Product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchData(filteredProducts);
      }
    }, [searchTerm, products]);
  
    useEffect(() => {
      const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
      setCartCount(totalItems);
    }, [cart]);
    // const showBadge = path === "/cart" && pathname !== "/account/cart";
    // const showBadge = text.toLowerCase() === "cart";
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const searchRef = useRef<HTMLDivElement>(null);
    useOutsideClick(searchRef, () => setSearchData([]));
    return (
      <>
        <div className="fixed top-0 left-0 right-0 h-[100px] bg-white shadow-lg z-20  p-3  flex flex-col gap-2 lg:hidden sm:hidden">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="text-[25px] font-bold text-green-900 uppercase">
                Eshop
              </span>
            </Link>
            <div className="relative">

            <MdOutlineShoppingCart size={30} color="text-green-900" />
            <span 
       className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs text-white bg-green-500 rounded-full"
    >
    {cartCount}
  </span>
              </div>
          </div>
          <div className="flex justify-center items-center ">
            <div
              className="w-full  px-2  relative  flex items-center"
              ref={searchRef}
            >
              <AiOutlineSearch
                size={20}
                className="absolute left-4  cursor-pointer text-green-900"
              />
              <input
                type="text"
                placeholder="Search  "
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[35px] bg-white w-full pl-10   border-green-500 focus:outline-none focus:bg-white  border-[1px] rounded-md placeholder-gray-300 placeholder-text-[12px]"
              />
  
              {searchTerm.trim() !== "" && (
                <div className="absolute min-h-[30vh] max-h-[30vh] overflow-y-scroll bg-slate-50 shadow-sm-2 z-50 p-4 top-[40px] w-full">
                  {searchData && searchData.length === 0 ? (
                    <p className="text-center text-gray-500">
                      No results found for {searchTerm}
                    </p>
                  ) : (
                    searchData?.map((product: Product) => (
                      <Link href={`/products/${product.id}`} key={product.id}>
                        <div className="w-full flex space-x-6 items-center p-2 rounded-md hover:bg-slate-200 cursor-pointer">
                          <div className="w-[30px] h-[30px] rounded-md overflow-hidden">
                            <Image
                              src={product.image}
                              height={30}
                              width={30}
                              alt={product.name}
                              className="w-[30px] h-[30px] object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h1>{product.name}</h1>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  