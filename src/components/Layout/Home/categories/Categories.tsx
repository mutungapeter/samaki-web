import { categoriesData } from "@/public/data/data";
import Image from "next/image";

const Categories = () => {
//   const allSubcategories = categoriesData.flatMap(
//     (category) => category.subcategories
//   );
const fishTypesCategory = categoriesData.find(category => category.name === "Fish Types");
  const fishTypesSubcategories = fishTypesCategory ? fishTypesCategory.subcategories : [];

  return (
    <section className="px-5 bg-white shadow-lg  p-5">
      <h2 className="text-2xl font-bold mb-4">Fish Types</h2>
      <div className="grid grid-cols-5 gap-4">
        {fishTypesSubcategories.map((subcategory, index) => (
         <div
        key={index}
            className=" rounded-lg p-2  flex flex-col items-center gap-6 hover:text-[#DD3131] cursor-pointer
                            transition ease-in-out
                            delay-150 
                            hover:-translate-y-1 
                            hover:scale-110
                             duration-300
                             hover:shadow-md"
           >
          
              <div className="w-full h-[170px] object-contain rounded-none overflow-hidden">
                <Image
                  src={subcategory.image}
                  height={170}
                  width={200}
                  alt={subcategory.name}
                  className=" w-full h-[170px] object-cover"
                />
              </div>
              <span className="text-sm font-light">{subcategory.name}</span>
            {/* </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};
export default Categories;
