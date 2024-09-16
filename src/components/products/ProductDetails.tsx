"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, initializeCart } from "@/redux/slices/Cart";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
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

interface Props {
  data: Product;
}

interface CartItem {
  id: number;
  qty: number;
  price: number;
  name: string;
  image: string;
  stock: number;
}

const ProductDetail = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1);
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("cartItems")) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") as string);
      dispatch(initializeCart(cartItems));
    }
  }, [dispatch]);

  const addToCartHandler = (data: Product) => {
    const isItemExists = cart.find((item: CartItem) => item?.id === data.id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.quantity < 1) {
        toast.error("Product out of stock!");
      } else {
        dispatch(
          addToCart({
            ...data,
            qty: count,
            price: parseFloat(data.selling_price),
            stock: data.quantity,
          })
        );
        toast.success("Item added to cart successfully!");
      }
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 bg-white  p-2 md:min-h-[90vh] md:p-6 ">
      <div className="flex justify-center items-center">
        <div className=" w-full h-full max-w-xs">
          <Image
            src={data?.image || "/default.png"}
            alt="image"
            layout="responsive"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col w-full justify-start  ">
        <div className="flex flex-col gap-2 p-1 border-b border-gray-300">
          <h1 className="text-2xl font-sans mb-2">{data?.name}</h1>
          <span className="text-lg mb-4">
            Brand:{" "}
            <span className="font-light text-blue-500">{data.brand}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 p-2 md:p-3 ">
          <IoAlertCircleOutline />
          <span>{data?.quantity}</span>

          <span> units left </span>
        </div>
        <div className="flex flex-col gap-2 p-2 border-b md:p-3  border-gray-300">
          <span className="text-2xl font-bold  ">
            Ksh {data?.selling_price}
          </span>
          <p className="text-md font-sans">
            + delivery from <span className="font-semibold">KSh 100 </span>(free
            delivery if order above KSh 1500) to Main cities and it&apos;s
            surroundings
          </p>
          <span>rating</span>
          <div className="flex items-center space-x-3 bg-white">
            <span className="text-lg font-normal">Quantity</span>
            <h2
              className="bg-gray-400 text-white font-bold flex  px-3 py-2 rounded-md items-center cursor-pointer   shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
              onClick={decrementCount}
            >
              <FiMinus />
            </h2>
            <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[6px]">
              {count}
            </span>
            <h2
              className="bg-gray-400 text-white font-bold flex  px-3 py-2 items-center cursor-pointer   rounded-md shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
              onClick={incrementCount}
            >
              <FiPlus />
            </h2>
          </div>
          <div
            onClick={() => addToCartHandler(data)}
            className="lg:w-48 sm:w-48 w-full bg-green-900 shadow-md text-white  p-2 flex space-x-6 items-center justify-center rounded-md cursor-pointer"
          >
            <MdOutlineShoppingCart size={30} />
            <h2>Add to Cart</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
