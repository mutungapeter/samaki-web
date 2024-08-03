import React, { useMemo } from "react";
import { useGetAllCategoriesQuery } from "@/redux/queries/categories/categoriesApi";
import { useRouter, useSearchParams } from "next/navigation";
import { CiFilter } from "react-icons/ci";
interface Category {
  id: number;
  name: string;
  created: string;
  modified: string;
}

const FilterComponent = () => {
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

  const isCategoryChecked = (categoryName: string) => {
    return categoryNames.includes(categoryName);
  };

  const handleCategoryChange = (categoryName: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (currentParams.getAll("categories").includes(categoryName)) {
      currentParams.delete("categories", categoryName);
    } else {
      currentParams.append("categories", categoryName);
    }
    router.push(`/products/?${currentParams.toString()}`);
  };

  return (
    <div className="p-4 bg-white rounded-md min-h-[100px]">
        <div className="flex items-center space-x-2 p-2 mb-3">
        <CiFilter size={30} />
            <h2 className="text-md text-bold">Search Filter</h2>
        </div>
      <h3 className="text-sm font-semibold mb-4">Category</h3>
      {categories.map((category: Category) => (
        <div key={category.id} className="mb-2">
          <input
            type="checkbox"
            id={`category-${category.name}`}
            name="category"
            value={category.name}
            onChange={() => handleCategoryChange(category.name)}
            checked={isCategoryChecked(category.name)}
            className="mr-2"
          />
          <label htmlFor={`category-${category.name}`} className="text-sm font-normal">
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
