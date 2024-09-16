"use client";
import { useGetProductDetailsQuery } from "@/redux/queries/products/productsApi";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import ProductDetail from "@/src/components/products/ProductDetails";
import ProductDetailLayout from "@/src/components/Layout/Products/ProductDetailLayout";
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
    <ProductDetailLayout>
    <Suspense fallback={<div>Loading...</div>}>
    <div className="bg-white flex flex-col py-6">
      <div className=" ">{data && <ProductDetail data={data} />}</div>
    </div>
    </Suspense>
    </ProductDetailLayout>
  );
};
export default ProductPage;
