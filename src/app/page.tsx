import Image from "next/image";
import Navbar from "../components/Layout/Home/Navbar/Navbar";
import Carousel from "../components/Layout/Home/Hero/Carousel";
import Categories from "../components/Layout/Home/categories/Categories";

export default function Home() {
  return (
    <div className="flex bg-[#FFFFFF] min-h-screen flex-col  ">
      <div className=""> 

    <Navbar activeHeading={1} />
      </div>
      <div className="py-6 bg-white mt-[80px]">
        <Carousel />
      </div>
      <div className="py-6 mx-10  bg-white flex flex-col">
        <Categories />
      </div>
        </div>
  )
  }
