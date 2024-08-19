'use client';
import Image from "next/image";
import { useGetAllProductsQuery } from "@/redux/queries/products/productsApi";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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
  category: number;
}

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(pageParam || "1")
  );
  const { isLoading, data, refetch } = useGetAllProductsQuery(
    {page: currentPage || 1,},
    { refetchOnMountOrArgChange: true }
  );
  const products = useMemo(() => data?.results, [data]);
  
  // console.log("products", data);

 useEffect(() => {
  const page = parseInt(pageParam || "1");
  if (page !== currentPage) {
    setCurrentPage(page);
  }
}, [pageParam, currentPage]);


useEffect(() => {
  refetch();
}, [currentPage, refetch]);
  
const pageSize = 10;
const totalPages = Math.ceil((data?.count || 0) / pageSize);

const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages) return;
  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.set("page", page.toString());
  router.push(`/?${currentParams.toString()}`);
};

const pages = [];
for (let i = 1; i <= totalPages; i++) {
  pages.push(i);
}

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!products) {
    return <div>Failed to load products. Please try again later.</div>;
  }
  return (
    <section className="bg-white p-2">
      <h2 className="text-md font-bold mb-4 border-b border-gray-300 p-3">Popular Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-1 lg:gap-4">
        {products?.map((product: Product) => (
          <div
            key={product.id}
            className="  bg-white flex flex-col gap-2 p-4 hover:text-green-500  hover:shadow-lg transition ease-in-out duration-300"
          >
            <div className="w-full h-[175px] overflow-hidden  ">
              <Image
                src={product.image || ""}
                height={175}
                width={200}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex w-full">
              <span className="lg:text-lg sm:text-xl text-sm font-semibold   font-custom  hover:text-green-500 ">
                {product.name}
              </span>
              </div>
              <div className="flex flex-col items-baseline">
                <span className="p-1 rounded-md text-center text-[10px] lg:text-[10px] sm:text-[10px] bg-slate-100 text-blue-900">
                  {product.brand}
                </span>
              </div>
            

            <span className="text-xs">rating</span>

            <span className="lg:text-lg sm:text-lg text-sm font-semibold font-custom  hover:text-green-500">
              KSh {product.selling_price}
            </span>
           
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded ${
                page === currentPage
                  ? "bg-green-900 text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
};

export default Products;
