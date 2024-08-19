"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Image from "next/image";

import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useGetAllProductsQuery } from "@/redux/queries/products/productsApi";
import { useOutsideClick } from "@/src/hooks/ClickOutsideHook";
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
export const Search = () => {
  const {
    isLoading: productsLoading,
    data: productsData,
    refetch,
  } = useGetAllProductsQuery({}, { refetchOnMountOrArgChange: true });
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchRef, () => setSearchData([]));

  return (
    <div className="w-[50%] relative" ref={searchRef}>
      <AiOutlineSearch
        size={20}
        className="absolute left-4  top-2.5 cursor-pointer text-gray-500"
      />
      <input
        type="text"
        placeholder="Search "
        value={searchTerm}
        onChange={handleSearchChange}
        className="h-[40px] w-full px-2 pl-10 border border-green-700 focus:outline-none focus:border-green-900  rounded-md"
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
  );
};

export const MobileSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchRef = useRef<HTMLDivElement>(null);
  useOutsideClick(searchRef, () => setSearchData([]));
  return (
    <div
      className="w-full bg-white  px-1  relative  flex items-center"
      ref={searchRef}
    >
      <AiOutlineSearch
        size={20}
        className="absolute left-5  cursor-pointer text-green-900"
      />
      <input
        type="text"
        placeholder="Search for any dish "
        value={searchTerm}
        onChange={handleSearchChange}
        className="h-[35px] bg-white w-full pl-10 px-2 border-green-900 focus:outline-none focus:bg-white  border-[1px] rounded-md placeholder-gray-300 placeholder-text-[12px]"
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
  );
};
