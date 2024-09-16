"use client";
import Link from "next/link";
import { CiFilter } from "react-icons/ci";
import { HiChevronLeft } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MobileSearch } from "../Layout/Home/search/SearchInput";
import { useEffect, useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useAppSelector } from "@/redux/hooks";
import { useGetAllCategoriesQuery } from "@/redux/queries/categories/categoriesApi";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
interface Category {
  id: number;
  name: string;
  created: string;
  modified: string;
}
const ProductsMobile = () => {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const { data: categoriesData } = useGetAllCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const router = useRouter();
  const categories = useMemo(
    () => categoriesData?.results || [],
    [categoriesData]
  );
  const searchParams = useSearchParams();
  const categoryNames = useMemo(() => {
    return searchParams.getAll("categories");
  }, [searchParams]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { cart } = useAppSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(totalItems);
  }, [cart]);

  const isCategoryChecked = (categoryName: string) => {
    return selectedCategories.includes(categoryName);
  };

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleApply = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("categories");
    selectedCategories.forEach((categoryName) => {
      currentParams.append("categories", categoryName);
    });
    router.push(`/products/list/?${currentParams.toString()}`);
    closeDrawer();
  };
  const handleReset = () => {
    setSelectedCategories([]);
    router.push(`/products/list`);
  };
  const showDrawer = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };
  // Get the current pathname
  const pathname = usePathname();

  // Determine if the pathname starts with /cart
  const isCartPage = pathname.startsWith("/cart");
  return (
    <>
      <div className="w-full lg:hidden sm:hidden">
        <div className="fixed top-0 left-0 z-30 flex p-4 justify-between gap-3 items-center  bg-white h-[70px] w-full">
          <Link href="/" className="flex items-center">
            <FaArrowLeftLong color="gray" size={20} />
          </Link>
        
            <MobileSearch />
          
          <div className="relative cursor-pointer  hover:text-[#DD3131]">
            <MdOutlineShoppingCart size={30} color="gray" />
            <span className="absolute right-0 top-0 rounded-full bg-[#DD3131] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
              {cartCount}
            </span>
          </div>
        </div>

        {!isCartPage && (
          <div className="flex flex-col mt-[75px]  gap-3">
            
             <div className="flex  items-center justify-end px-2">
            <div className="flex items-center  space-x-1 bg-white p-3 rounded-md">
              <h2 className="text-sm font-semibold">Filter</h2>
              <CiFilter size={19} onClick={showDrawer} />
            </div>
            </div>
            </div>
          
        )}
      </div>

      {/* Background Overlay */}
      {open && (
        <div
          className="fixed top-0 left-0 z-30 w-full h-screen bg-black opacity-50"
          onClick={closeDrawer}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 transition-transform transform ${
          open ? "translate-x-0 " : "translate-x-full"
        } bg-white w-64 `}
      >
        <div className="flex items-center justify-end">
          <IoCloseOutline onClick={closeDrawer} />
        </div>
        <div className="h-screen overflow-y-auto py-5">
          <h1 className="text-sm font-custom text-black mb-2">Categories</h1>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category: Category) => (
              <div key={category.id} className="space-y-1">
                <input
                  type="checkbox"
                  id={`category-${category.name}`}
                  name="category"
                  value={category.name}
                  onChange={() => handleCategoryChange(category.name)}
                  checked={isCategoryChecked(category.name)}
                  className="mr-2"
                />
                <label
                  htmlFor={`category-${category.name}`}
                  className="text-xs font-light"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed transition w-full z-50 bottom-10 flex justify-between items-center px-4">
          <h2 className="bg-white border border-red-500 px-4 py-2 rounded-md text-center">
            <span className="text-red-500 text-xs" onClick={handleReset}>
              Reset
            </span>
          </h2>
          <h2 className="bg-red-500 px-4 py-2 rounded-md text-center">
            <span className="text-white text-xs" onClick={handleApply}>
              Apply
            </span>
          </h2>
        </div>
      </div>
    </>
  );
};

export default ProductsMobile;
