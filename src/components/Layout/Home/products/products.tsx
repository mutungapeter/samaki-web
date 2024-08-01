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

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state (optional)
  // if (!products) {
  //   return <div>Failed to load products. Please try again later.</div>;
  // }
  return (
    <section className="bg-white p-2">
      <h2 className="text-md font-bold mb-4 border-b border-gray-300 p-3">Deals you may like</h2>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-1 lg:gap-4">
        {products?.map((product: Product) => (
          <div
            key={product.id}
            className="rounded-md h-[250px] bg-white flex flex-col gap-2 p-4 hover:text-red-500  hover:shadow-lg transition ease-in-out duration-300"
          >
            <div className="w-full h-[175px] overflow-hidden rounded-md ">
              <Image
                src={product.image || ""}
                height={175}
                width={200}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[16px] text-black font-sans">{product.name}</span>
            <span className="text-lg font-semibold font-sans text-red-600">
              KSh {product.selling_price}
            </span>
            <div className="flex items-center ">
             
              {/* <span className="text-sm text-gray-500 ml-2">({product.rating} ratings)</span> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
