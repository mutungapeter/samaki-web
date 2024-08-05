"use client";
import { useGetAllProductsQuery } from "@/redux/queries/products/productsApi";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useGetAllCategoriesQuery } from "@/redux/queries/categories/categoriesApi";
import clsx from "clsx";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCashStack } from "react-icons/bs";
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

  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (!filteredProducts.length) {
    return <div>No products found for this category.</div>;
  }
  const pageSize = 10;
  const totalPages = Math.ceil((productsData?.count || 0) / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", page.toString());
    router.push(`/products/?${currentParams.toString()}`);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const isProductRoute =
    pathname === "/products" && searchParams.toString() === "";

  return (
    <section className="bg-[#F5F5F5] p-2">
      <div
        className={clsx("grid grid-cols-2 gap-1 lg:gap-3", {
          "lg:grid-cols-5": isProductRoute,
          "lg:grid-cols-4": !isProductRoute,
        })}
      >
        {filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            className="rounded-md  bg-white flex flex-col gap-2 p-3  hover:text-red-500 cursor-pointer hover:shadow-lg transition ease-in-out duration-300"
          >
            <div className="h-[175px] w-full">
              <Image
                src={product.image || "/default.png"}
                height={175}
                width={200}
                alt={product.name}
                className="mx-auto h-full w-full object-cover"
              />
            </div>
            <div className="flex justify-between">
              <span className="lg:text-[17px] sm:text-[17px] text-xs   font-custom  hover:text-red-500 ">
                {product.name}
              </span>
              <div className="flex flex-col items-baseline">
                <span className="p-1 rounded-md text-center text-[10px] lg:text-xs sm:text-xs bg-slate-100 text-blue-900">
                  {product.brand}
                </span>
              </div>
            </div>

            <span className="text-xs">rating</span>

            <span className="lg:text-lg sm:text-xl text-sm font-semibold font-sans text-black hover:text-red-500">
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
                  ? "bg-red-500 text-white"
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
