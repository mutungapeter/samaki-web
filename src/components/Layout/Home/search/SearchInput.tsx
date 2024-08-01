"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

import Image from "next/image";
// import { useOutsideClick } from "@/src/hooks/ClickHook";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
// import { Doctor } from "@/src/definitions/doctorTypes";
// import {doctorsData } from "@/public/Data/doctorData";
export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
//   const [searchData, setSearchData] = useState<Doctor[] | null>(null);
//   const [allDoctors, setAllDoctors] = useState<any>([]);

//   useEffect(() => {
//     setAllDoctors(doctorsData);
//   }, []);

//   const handleSearchChange = (e: any) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     const filteredDoctors = allDoctors?.filter((doctor: any) =>
//       doctor?.name.toLowerCase().includes(term.toLowerCase())
//     );
//     setSearchData(filteredDoctors);
//   };
  // console.log("allDoctors", allDoctors);
  // console.log("searchData", searchData);
//   const searchRef = useRef<HTMLDivElement>(null);
//   useOutsideClick(searchRef, () => setSearchData([]));

  return (
    <div className="w-[50%] relative" 
    // ref={searchRef}
    >
       <AiOutlineSearch
        size={20}
        className="absolute left-4  top-2.5 cursor-pointer text-gray-500"
      />
      <input
        type="text"
        placeholder="Search "
        // value={searchTerm}
        // onChange={handleSearchChange}
        className="h-[40px] w-full px-2 pl-10 border-gray-400 focus:outline-none focus:border-gray-400 border-[2px] rounded-md"
      />
     

     {/* {searchData && searchData.length > 0 && (
        <div className="absolute min-h-[30vh]  max-h-[30vh] overflow-y-scroll bg-slate-50 shadow-sm-2 z-50 p-4 top-[40px] w-full ">
          {searchData.map((doctor, index) => (
            <Link href={`/doctors/` + doctor.id} key={index}>
              <div className="w-full flex gap-20 items-center p-2 rounded-md hover:bg-slate-200  cursor-pointer">
                <div className="w-[70px] h-[70px]  rounded-full overflow-hidden">
                  <Image
                    src={doctor.image}
                    height={70}
                    width={70}
                    alt=""
                    className=" w-[70px] h-[70px] object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h1>{doctor.name}</h1>
                  <div className="items-start flex flex-col ">
                    <h2 className="text-[15px] bg-blue-100 p-0 px-1 rounded-full mt-1 text-center text-[#1976D2]">
                      {doctor.expertise}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          ))} 
        </div>
      )} */}
    </div>
  );
};

export const MobileSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchData, setSearchData] = useState<Doctor[] | null>(null);
  // const [allDoctors, setAllDoctors] = useState<any>([]);

  // useEffect(() => {
  //   setAllDoctors(doctorsData);
  // }, []);
  // const handleSearchChange = (e: any) => {
  //   const term = e.target.value;
  //   setSearchTerm(term);

  //   const filteredDoctors = allDoctors?.filter((doctor: any) =>
  //     doctor?.name.toLowerCase().includes(term.toLowerCase())
  //   );
  //   setSearchData(filteredDoctors);
  // };
  // console.log("allDoctors", allDoctors);
  // console.log("searchData", searchData);
  // const searchRef = useRef<HTMLDivElement>(null);
  // useOutsideClick(searchRef, () => setSearchData([]));
  return (
    <div
      className="w-full bg-white lg:mt-0   px-1 relative "
      // ref={searchRef}
    >
      <AiOutlineSearch
        size={20}
        className="absolute left-4  top-2.5 cursor-pointer text-gray-500"
      />
      <input
        type="text"
        placeholder="Search for any dish "
        // value={searchTerm}
        // onChange={handleSearchChange}
        className="h-[35px] w-full pl-10 px-2 border-gray-300 focus:outline-none focus:border-gray-300 border-[2px] rounded-md placeholder-gray-300 placeholder-text-xs"
      />

      {/* {searchData && searchData.length > 0 && (
        <div className="absolute min-h-[30vh] px-3 max-h-[30vh] overflow-y-scroll bg-slate-50 shadow-sm-2 z-30 p-4 top-[40px] w-full ">
          {searchData.map((doctor, index) => (
            <Link href={`/doctors/` + doctor.id}
            key={index}>
              <div className="w-full flex gap-20 items-center p-2 rounded-md hover:bg-slate-200  cursor-pointer">
                <div className="w-[70px] h-[70px]  rounded-full overflow-hidden">
                  <Image
                    src={doctor.image}
                    height={70}
                    width={70}
                    alt=""
                    className=" w-[70px] h-[70px] object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h1>{doctor.name}</h1>
                  <div className="items-start flex flex-col ">
                    <h2 className="text-[15px] bg-blue-100 p-0 px-1 rounded-full mt-1 text-center text-[#1976D2]">
                      {doctor.expertise}
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )} */}
    </div>
  );
};