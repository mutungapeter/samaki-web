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
    <section className="bg-[#F6F7F9]  p-2">
     
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-1 lg:gap-4">
  {products?.map((product: Product) => (
    <div
      key={product.id}
      className="bg-white space-y-5 cursor-pointer p-4 hover:text-green-500 hover:shadow-lg transition ease-in-out duration-300"
    >
      
      <div className="w-full h-[200px] rounded-md overflow-hidden">
        <Image
          src={product.image || ""}
          height={200}
          width={200}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      
      <div className="flex w-full">
        <span className="w-full md:text-[14px] text-[13px] font-semibold text-gray-500 font-custom hover:text-green-500">
          {product.name}
        </span>
      </div>

    
      <span className="md:text-lg text-[12px] font-semibold font-custom hover:text-green-500">
        KSh {product.selling_price}
      </span>
    </div>
  ))}
</div>

      <div className="flex justify-center mt-4 px-3 md:px-0">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`md:px-4 md:py-2 p-2 border rounded text-xs md:text-sm ${
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
              className={`md:px-4 md:py-2 p-2 text-xs md:text-sm border rounded ${
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
            className={`md:px-4 md:py-2 p-2 border rounded text-xs md:text-sm ${
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
