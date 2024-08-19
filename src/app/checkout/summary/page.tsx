"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/queries/odres/ordersApi";
import { setShippingAddress } from "@/redux/slices/address";
import CheckoutItemsList from "@/src/components/checkout/summary/ItemsList";
import OrderSummary from "@/src/components/checkout/summary/OrderSummary";
import { AllowedPaymentMethods } from "@/src/components/checkout/summary/PaymentMethods";
import ShippingInfo from "@/src/components/checkout/summary/ShippingInformation";
import Loader from "@/src/components/Loader/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa6";
import { LuChevronLeft } from "react-icons/lu";

interface Address {
  id: number;
  created: string;
  modified: string;
  name: string;
  phone_number: string;
  pick_at: string;
  pickup_station: number;
  address_type: string;
  id_number: string;
  town: string;
  county_name: string;
  sub_county_name: string;
  ward_name: string;
  description: string;
  county: number;
  sub_county: number;
  ward: number;
}
const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const selectedAddress = useAppSelector(
    (state) => state.address.selectedAddress
  );

  const [createOrder, { isSuccess, isLoading: isCreatingOrder, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order  created successfully.");
    }
    if (error) {
      console.log(error);
      if ("data" in error) {
        const errorData = error as any;
        console.log("error", errorData);
        toast.error(errorData.data.message);
      }
    }
  }, [isCreatingOrder, isSuccess, error]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAddress = localStorage.getItem("selectedAddress");
      if (savedAddress) {
        const address = JSON.parse(savedAddress);
        dispatch(setShippingAddress(address));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);
  const handlePaymentSubmit = async () => {
    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.qty,
      cost: item.price,
    }));
    const orderData = {
      order_items: orderItems,
      delivery_details: {
        address: selectedAddress?.id,
        delivery_cost: 600,
        delivery_type: selectedAddress?.address_type,
      },
      total_cost: totalPrice,
    };
    try {
      if (!isCreatingOrder) {
        await createOrder(orderData);
      }
    } catch (error: any) {
      console.log("error while creating order", error);
    }
  };
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3 items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
        <Link href="/account" className="justify-self-start flex items-center">
          <FaChevronLeft color="gray" />
        </Link>
        <div className="col-span-2 flex justify-start">
          <h2 className="font-semibold">Place order</h2>
        </div>
      </div>
      <div className=" w-full  sm:w-full lg:w-11/12  lg:mx-20  sm:mx-0 sm:px-2 mt-[55px] sm:mt-[75px] lg:mt-[75px]  bg-[#F8F8F8] gap-6 sm:gap-3  sm:p-2 lg:py-2 lg:flex sm:flex">
        <div className="w-full sm:w-full  lg:mt-0 mt-0 sm:mt-0 bg-[#F8F8F8] flex flex-col gap-2 ">
          <ShippingInfo selectedAddress={selectedAddress} />
          <AllowedPaymentMethods />
          <CheckoutItemsList />
          <Link href="/products/list" className="hidden lg:block sm:block">
            <div className="mt-2 flex items-center space-x-2">
              <LuChevronLeft size={25} className="text-green-900" />
              <h2 className="text-sm font-custom text-green-900">
                Go back & continue shopping
              </h2>
            </div>
          </Link>
        </div>
        <OrderSummary
          cart={cart}
          totalPrice={totalPrice}
          handlePaymentSubmit={handlePaymentSubmit}
          isCreatingOrder={isCreatingOrder}
        />
        <Link
          href="/products/list"
          className="lg:hidden sm:hidden block mb-[58px]"
        >
          <div className=" flex items-center space-x-2">
            <LuChevronLeft size={25} className="text-green-900" />
            <h2 className="text-sm font-custom text-green-900">
              Go back & continue shopping
            </h2>
          </div>
        </Link>
        <div className="w-full fixed bottom-0 border-t left-0 z-30 flex shadow-sm justify-between items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-1">
              <h2 className="text-[16px] font-[400]"> Total:</h2>
              <h2 className="text-[16px] text-green-900 font-[600]">
                Ksh {totalPrice}
              </h2>
            </div>
          </div>

          <div
            className="flex items-center flex-col p-2 rounded-md text-center bg-green-900 text-white"
            onClick={handlePaymentSubmit}
          >
            <span className="text-[16px]">
              {isCreatingOrder ? (
                <span>
                  <Loader size="h-5 w-5" color="white" />
                </span>
              ) : (
                "Place order"
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
