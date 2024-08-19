"use client";
import { useGetProductDetailsQuery } from "@/redux/queries/products/productsApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProductDetail from "@/src/components/products/ProductDetails";
interface DetailProps {
  params: {
    id: number;
  };
}

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
const ProductPage = ({ params: { id } }: DetailProps) => {
  const [data, setData] = useState<Product | null>(null);
  const { data:productData, isLoading, isSuccess, error, refetch } =
    useGetProductDetailsQuery(id);
  // console.log(data);


  


  useEffect(() => {
    if (isSuccess) {
      setData(productData);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log(errorData.message);
      }
    }
  }, [isSuccess, error, refetch]);

  return (
    <div className="bg-white flex flex-col">
      <div className=" ">{data && <ProductDetail data={data} />}</div>
    </div>
  );
};
export default ProductPage;
