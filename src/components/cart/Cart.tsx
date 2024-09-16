"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  initializeCart,
  removeFromCart,
  updateTotalPrice,
} from "@/redux/slices/Cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoBagHandleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import Image from "next/image";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaChevronLeft } from "react-icons/fa6";
interface CartItem {
  id: number;
  qty: number;
  price: number;
  name: string;
  image: string;
  stock: number;
}

interface CartSingleProps {
  data: CartItem;
  quantityChangeHandler: (data: CartItem) => void;
  removeFromCartHandler: (id: number) => void;
}
const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const [cartCount, setCartCount] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("cartItems")) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems") as string);
      dispatch(initializeCart(cartItems));
    }
  }, [dispatch]);

  useEffect(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    setCartCount(totalItems);
  }, [cart]);

  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    dispatch(updateTotalPrice(newTotalPrice));
  }, [cart, dispatch]);

  const removeFromCartHandler = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const quantityChangeHandler = (data: CartItem) => {
    dispatch(addToCart(data));
  };
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3 items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
        <Link href="/account" className="justify-self-start flex items-center">
          <FaChevronLeft color="gray" />
        </Link>
        <div className="col-span-2 flex justify-start">
          <h2 className="font-semibold">My Cart</h2>
        </div>
      </div>
      <div className=" w-full  sm:w-full lg:w-10/12 mx-auto lg:mx-auto sm:mx-0 sm:px-2 lg:mt-[90px] sm:mt-[90px] mt-[50px] bg-[#F8F8F8] gap-6 sm:gap-3  sm:p-2 lg:py-2 lg:flex sm:flex">
        {/* large devices */}
        {cart && cart.length === 0 ? (
          <div className="lg:flex sm:flex flex-col gap-5 items-center w-full justify-center bg-white rounded-md hidden  min-h-[400px]">
            <div className="p-2 rounded-full bg-gray-100">
              <HiOutlineShoppingCart size={60} color="red" />
            </div>
            <h5 className="text-lg font-bold">Your cart is empty</h5>
            <h2 className="font-light text-lg">
              Browse our categories and discuss our best deals
            </h2>
            <Link href="/products/list">
              <div className="bg-green-900 text-white rounded-md p-3 shadow-md font-bold text-center flex items-center justify-center cursor-pointer uppercase">
                Start shopping
              </div>
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full sm:w-full bg-white  lg:mt-0 mt-[90px] sm:mt-0 hidden lg:flex sm:flex sm:flex-col lg:flex-col">
              <div className="flex items-center justify-start p-4">
                <div className="flex items-center space-x-2">
                  <MdOutlineShoppingCart size={25} />
                  <h5 className=" text-[20px] font-[500]">
                    Cart ({cartCount} items)
                  </h5>
                </div>
              </div>
              <div className="w-full border-t mt-3 mb-4">
                {cart.map((i, index) => (
                  <CartSingle
                    key={index}
                    data={i}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-[400px] sm:w-[400px] w-full  rounded-md min-h-[200px]  sticky lg:top-[10px] top-[10px] px-2 sm:px-0 lg:px-0  hidden lg:block sm:block  ">
              <div className=" w-full flex flex-col py-3 bg-[#FFFFFF] rounded-md sm:shadow-md lg:shadow-md">
                <div className="p-2 border-b border-gray-300">
                  <h2 className="text-lg uppercase font-normal">
                    cart summary
                  </h2>
                </div>
                <div className="flex flex-col gap-2  p-2 border-b border-gray-300">
                  <div className="flex items-center justify-between">
                    <h2 className="font-normal">Subtotal</h2>
                    <h2 className="text-[18px] font-[600]">Ksh{totalPrice}</h2>
                  </div>
                  <p className="font-light">Delivery fees not yet included</p>
                </div>
                <div className="flex flex-col border-b px-2">
                  <div className="flex flex-col gap-2 m-2 p-1 border rounded-md">
                    <h2 className="bg-green-100 p-1 rounded-t-md text-green-900">
                      Free delivery
                    </h2>
                    <p className="text-sm font-light">
                      There is free delivery for orders above khs 5000 to areas
                      200 metres from the shop
                    </p>
                  </div>
                </div>
                <div className="px-2  mt-4">
                  <Link href="/checkout/summary">
                    <div className="h-[45px] flex items-center justify-center w-full bg-green-900 rounded-[5px]">
                      <h1 className="text-[#fff] text-[18px] font-[600]">
                        Checkout (Ksh{totalPrice})
                      </h1>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
        {/* mobile devices */}
        {cart && cart.length === 0 ? (
          <div className="px-3 ">
            <div className="lg:hidden sm:hidden flex-col gap-5 items-center  px-5 justify-center bg-white rounded-md flex  min-h-[250px] ">
              <div className="p-2 rounded-full bg-gray-100">
                <HiOutlineShoppingCart size={30} color="red" />
              </div>
              <h5 className="text-sm font-bold">Your cart is empty</h5>
              <h2 className="font-light text-sm text-center">
                Browse our categories and discuss our best deals
              </h2>
              <Link href="/products/list">
                <div className="bg-green-900  text-white rounded-md p-3 shadow-md font-bold text-center text-sm flex items-center justify-center cursor-pointer uppercase">
                  Start shopping
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mb-[60px]  gap-2 mt-[55px] lg:hidden sm:hidden">
            <h2 className="uppercase font-light text-[12px] px-2">
              Cart ({cartCount} items)
            </h2>

            <div className="flex  min-h-[100px] flex-col gap-2">
              {cart.map((i, index) => (
                <CartSingle
                  key={index}
                  data={i}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </div>

            <div className="flex-col px-2 min-h-[50px] bg-white hidden lg:flex sm:flex">
              <Link href="/checkout/summary">
                <div className="h-[45px] flex items-center justify-center w-full bg-green-900  rounded-md">
                  <h1 className="text-[#fff] text-[14px] font-semibold uppercase">
                    Checkout (Ksh{totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
            <div className="w-full fixed top-[50px] border-t left-0 z-30 flex shadow-sm justify-between items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
              <div className="flex flex-col gap-1">
                <div className="flex items-center space-x-1">
                  <h2 className="text-[13px] font-[400]">Products Total:</h2>
                  <h2 className="text-[14px] text-green-900  font-[600]">
                    Ksh {totalPrice}
                  </h2>
                </div>
              </div>
              <Link href="/checkout/summary">
                <div className="flex items-center flex-col py-1 px-2 rounded-md text-center bg-green-900  text-white">
                  <span className="text-[13px]">checkout</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const CartSingle = ({
  data,
  quantityChangeHandler,
  removeFromCartHandler,
}: CartSingleProps) => {
  const [value, setValue] = useState(data.qty);

    console.log("data", data);
  useEffect(() => {
    setValue(data.qty);
  }, [data.qty]);
  //   console.log("stock", data.stock);
  const increment = (data: CartItem) => {
    if (data.stock < value) {
      toast.error("Product out of stock!");
    } else {
      const newValue = value + 1;
      setValue(newValue);
      const updateCartData = { ...data, qty: newValue };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data: CartItem) => {
    const newValue = value === 1 ? 1 : value - 1;
    setValue(newValue);
    const updateCartData = { ...data, qty: newValue };
    quantityChangeHandler(updateCartData);
  };
  const subtotal = data.price * value;
  return (
    <>
      {/* large devices */}
      <div className=" flex-col gap-3 min-h-[100px] border-b p-2 border-gray-300 hidden lg:flex sm:flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-[72px] w-[72px] rounded-md">
              <Image
                src={data?.image}
                alt=""
                height={72}
                width={72}
                className="w-[72px] h-[72px] object-cover rounded-md  "
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-custom font-light">{data.name}</h1>
              <h4 className="font-[400] text-[15px] text-[#00000082]">
                Ksh {data.price} * {value}
              </h4>
              <div className="flex items-center space-x-1 ">
                <IoAlertCircleOutline />
                <span className="font-custom font-light">{data.stock}</span>

                <span className="font-custom font-light"> units left </span>
              </div>
            </div>
          </div>
          <h4 className="font-[600] text-[17px] pt-[3px] text-green-900 font-Roboto">
            Ksh {data.price}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div
            onClick={() => removeFromCartHandler(data.id)}
            className="  text-red-500  hover:bg-red-100  p-2 flex space-x-2 items-center justify-center rounded-md cursor-pointer"
          >
            <RiDeleteBin6Line size={25} />
            <h2>Remove</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className="bg-[#a7abb14f] rounded-md w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#7d879c" />
            </div>
            <span className="pl-[10px]">{data.qty}</span>
            <div
              className="bg-green-900  border border-green-900 items-center rounded-md w-[30px] h-[30px] flex justify-center cursor-pointer"
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
          </div>
        </div>
      </div>
      {/* mobile devices */}
      <div className="flex flex-col gap-2 mx-2 p-2 rounded-md bg-white lg:hidden sm:hidden">
        <div className="flex items-center space-x-3">
          <div className="h-[72px] w-[72px] rounded-md">
            <Image
              src={data?.image}
              alt=""
              height={72}
              width={72}
              className="w-[72px] h-[72px] object-cover rounded-md  "
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[13px] font-light">{data.name}</h2>
            <h4 className="font-semibold text-[14px]   font-Roboto">
              Ksh {data.price}
            </h4>
            <div className="flex items-center gap-1 text-[10px] ">
              <IoAlertCircleOutline />
              <span className="text-[10px]">{data.stock}</span>

              <span className="text-[10px]"> units left </span>
            </div>
            <div className="flex items-center space-x-20">
              <h4 className=" text-[10px] text-[#00000082]">
                Ksh {data.price} x {value}
              </h4>
              <h4 className=" text-[10px] font-custom font-[500] text-red-500">
                Ksh {subtotal}
              </h4>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div
            onClick={() => removeFromCartHandler(data.id)}
            className="  text-red-500 hover:bg-red-100  p-2 flex space-x-2 items-center justify-center rounded-md cursor-pointer"
          >
            <RiDeleteBin6Line size={18} />
            <h2 className="uppercase font-medium text-[10px]">Remove</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div
              className="bg-[#a7abb14f] rounded-md w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#7d879c" />
            </div>
            <span className="pl-[10px] text-sm">{data.qty}</span>
            <div
              className="bg-[#e44343] border border-[#e4434373] items-center rounded-md w-[25px] h-[25px] flex justify-center cursor-pointer"
              onClick={() => increment(data)}
            >
              <HiPlus size={16} color="#fff" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
