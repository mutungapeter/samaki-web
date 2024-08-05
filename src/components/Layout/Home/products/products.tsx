import Image from "next/image";
import { useGetAllProductsQuery } from "@/redux/queries/products/productsApi";
import { useMemo } from "react";

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
  const { isLoading, data, refetch } = useGetAllProductsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const products = useMemo(() => data?.results, [data]);
  
//   console.log("products", products);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (!products) {
    return <div>Failed to load products. Please try again later.</div>;
  }
  return (
    <section className="bg-white p-2">
      <h2 className="text-md font-bold mb-4 border-b border-gray-300 p-3">Deals you may like</h2>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-1 lg:gap-4">
        {products?.map((product: Product) => (
          <div
            key={product.id}
            className="  bg-white flex flex-col gap-2 p-4 hover:text-red-500  hover:shadow-lg transition ease-in-out duration-300"
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
    </section>
  );
};

export default Products;
