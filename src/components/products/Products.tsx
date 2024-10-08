"use client";
import { useGetAllProductsQuery } from "@/redux/queries/products/productsApi";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/queries/categories/categoriesApi";
import clsx from "clsx";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCashStack } from "react-icons/bs";
import Link from "next/link";
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

interface Category {
  id: number;
  name: string;
  created: string;
  modified: string;
}
const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageParam = searchParams.get("page");
  const categoryNames = searchParams.getAll("categories");
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(pageParam || "1")
  );
  const {
    isLoading: productsLoading,
    data: productsData,
    refetch,
  } = useGetAllProductsQuery(
    { page: currentPage || 1, categoryNames },
    { refetchOnMountOrArgChange: true }
  );
  const { isLoading: categoriesLoading, data: categoriesData } =
    useGetAllCategoriesQuery({}, { refetchOnMountOrArgChange: true });
  const categories = useMemo(
    () => categoriesData?.results || [],
    [categoriesData]
  );

  // Update currentPage when pageParam changes
  useEffect(() => {
    const page = parseInt(pageParam || "1");
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [pageParam, currentPage]);

  // Refetch products when currentPage changes
  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const filteredProducts = useMemo(() => {
    if (!productsData?.results) return [];
    return productsData.results.filter((product: Product) => {
      const category = categories.find(
        (cat: Category) => cat.id === product.category
      );
      return (
        categoryNames.length === 0 ||
        categoryNames.includes(category?.name || "")
      );
    });
  }, [productsData, categories, categoryNames]);

// console.log(productsData)
  const pageSize = 10;
  const totalPages = Math.ceil((productsData?.count || 0) / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", page.toString());
    router.push(`/products/list/?${currentParams.toString()}`);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (!filteredProducts.length) {
    return <div>No products found for this category.</div>;
  }
  const isProductRoute = pathname === "/products" && searchParams.toString() === "";

    const handleViewDetails = (id: number) => {
      router.push(`/products/${id}`);
    };
  return (
    <>

    <section className="bg-[#F5F5F5] p-2">
      <div
        className={clsx("grid grid-cols-2 gap-1 lg:gap-3", {
          "lg:grid-cols-4": isProductRoute,
          "lg:grid-cols-5": !isProductRoute,
        })}
      >
        {filteredProducts.map((product: Product) => (
       

          
          <div
            key={product.id}
            className="rounded-md  bg-white flex flex-col gap-2 p-3   hover:text-green-500 cursor-pointer hover:shadow-lg transition ease-in-out duration-300"
            onClick={() => handleViewDetails(product.id)}
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
    </>

  );
};

export default Products;
