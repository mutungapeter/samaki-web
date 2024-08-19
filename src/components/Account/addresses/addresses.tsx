"use client";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GoPlusCircle, GoPlus } from "react-icons/go";
import {
  useDeleteAddressMutation,
  useGetAddressesQuery,
} from "@/redux/queries/customer-addresses/addressesApi";
import { useEffect, useState } from "react";
import { NewAddress } from "@/src/components/Account/addresses/AddAddress";
import { FaUser } from "react-icons/fa6";
import { MdOutlineCall } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useRouter,useSearchParams } from "next/navigation";
import { BsExclamationTriangle } from "react-icons/bs";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import toast from "react-hot-toast";
import Loader from "@/src/components/Loader/Loader";
import { EditAddress } from "@/src/components/Account/addresses/EditAddress";
import { useAppDispatch } from "@/redux/hooks";
import { setShippingAddress } from "@/redux/slices/address";

export interface Address {
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
const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
 const searchParams = useSearchParams();
  const fromCheckout = searchParams.get("fromCheckout") === "true";
  
  const {isLoading: isLoadingAddresses,data, refetch, } = useGetAddressesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteAddress, { isLoading, isSuccess, error }] = useDeleteAddressMutation({});
  
  useEffect(() => {
    if (data) {
      setAddresses(data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      toast.success("Address deleted successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);




  const handleAddressSelect = () => {
    if (selectedAddressId) {
      const selectedAddress = addresses.find(
        (address:Address) => address.id === selectedAddressId
      );
      if (selectedAddress) {
        dispatch(setShippingAddress(selectedAddress));
        toast.success("Address selected successfully.");
        router.push("/checkout/summary");
      }
    }
  };

  const toggleAddressSelection = (addressId: number) => {
    if (fromCheckout) {
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      } else {
        setSelectedAddressId(addressId);
      }
    } 
  };
  const refetchAddresses = () => {
    refetch();
  };
  const RedirectToNewAddressList = () => {
    router.push("/account/address/new-address");
  };

  const handleDelete = async () => {
    try {
      await deleteAddress(addressId);
    } catch (err) {
      toast.error("Failed to delete the address:", err as any);
    }
  };
  const handleOpenModal = (id: number) => {
    setAddressId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {/* small devices */}
      <div className="w-full min-h-screen px-1 flex flex-col bg-[#F8F8F8] lg:hidden sm:hidden">
        <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3 items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
          <Link
            href="/account"
            className="justify-self-start flex items-center"
          >
            <FaChevronLeft color="gray" />
          </Link>
          <div className="col-span-2 flex justify-start">
            <h2 className="font-semibold">My Addresses</h2>
          </div>
        </div>

        {addresses.length > 0 ? (
          <div className="px-1 min-h-[100px] flex flex-col gap-2 mt-[20px]">
            {addresses.map((address: Address) => (
              <div
                className=" w-full p-3 flex flex-col gap-3 rounded-sm bg-white"
                key={address?.id}
              >
                <div className="flex justify-between ">
                  <h2 className="text-xs">{address?.name}</h2>
                  <h2 className="text-xs">{address?.phone_number}</h2>
                  <h2 className="text-green-500 text-center p-1 rounded-md bg-green-100 font-semibold text-[10px]">
                    {address.address_type}
                  </h2>
                </div>

                <div className="flex items-start space-x-2">
                  <IoLocationOutline />
                  <h2 className="text-xs font-custom  flex flex-col">
                    <span className="mr-2">
                      {address.county_name}
                      {address.sub_county_name &&
                        ` | ${address.sub_county_name}`}
                      {address.ward_name && ` | ${address.ward_name}`}
                    </span>
                    {address.county_name ||
                    address.sub_county_name ||
                    address.ward_name ? (
                      <span className="">{`, ${address.pick_at}`}</span>
                    ) : (
                      <span>{address.description}</span>
                    )}
                  </h2>
                </div>
                <div className=" flex justify-end mt-2">
                  <div className="flex space-x-2">
                    <div
                      className="p-1 rounded-sm border border-red-500"
                      onClick={() => handleOpenModal(address.id)}
                    >
                      <RiDeleteBin5Line size={18} className="text-red-500" />
                    </div>
                    {/* <div className="p-1 rounded-sm border border-green-500">
                      <CiEdit color="green" />
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2>No addresses yet</h2>
        )}

        <div className="w-full fixed bottom-0 left-0 flex z-30 px-5 ">
          <button
            className="cursor-pointer inline-flex w-full items-center justify-center rounded-sm bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 sm:ml-3 sm:w-auto"
            onClick={RedirectToNewAddressList}
          >
            <span className="text-sm flex items-center space-x-3 text-center font-light ">
              <GoPlus color="white" />
              <h2 className="text-white">Add New Address</h2>
            </span>
          </button>
        </div>
      </div>

      {/* lg devices */}
      <div className=" ml-2 sm:mt-[80px] lg:mt-0 hidden lg:flex sm:block  rounded-sm shadow-md w-full min-h-[400px] flex-col bg-white p-3">
        <div className="flex items-center justify-between border-b py-2 border-gray-300">
          <h2 className="text-lg font-bold ">My Addresses </h2>
          <NewAddress refetchAddresses={refetchAddresses} />
        </div>
        {addresses.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 min-h-[100px] px-1 mt-4">
            {addresses.map((address: Address) => (
              <div
                key={address.id}
                onClick={() => toggleAddressSelection(address.id)}
                className={`flex flex-col gap-3 p-3 cursor-pointer rounded-md shadow-sm border ${
                  selectedAddressId === address.id
                    ? "border-green-900"
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaUser />
                    <h2 className="text-sm font-custom">{address.name}</h2>
                  </div>
                  <h2 className="text-green-500 text-center p-1 rounded-md bg-green-100 font-semibold text-sm">
                    {address.address_type}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <MdOutlineCall />
                  <h2 className="text-sm font-custom">
                    {address.phone_number}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <IoLocationOutline />
                  <h2 className="text-sm font-custom">
                    <span className="mr-2">
                      {address.county_name}
                      {address.sub_county_name &&
                        ` | ${address.sub_county_name}`}
                      {address.ward_name && ` | ${address.ward_name}`}
                    </span>
                    {address.county_name ||
                    address.sub_county_name ||
                    address.ward_name ? (
                      <span className="">{`, ${address.pick_at}`}</span>
                    ) : (
                      <span>{address.description}</span>
                    )}
                  </h2>
                </div>
                <div className="flex items-center justify-end">
                  <div className="flex items-center space-x-3">
                    {selectedAddressId && fromCheckout && (
                      <h2
                        className="p-2 text-xs text-center cursor-pointer text-white bg-green-900 rounded-md"
                        onClick={handleAddressSelect}
                      >
                        Select Address
                      </h2>
                    )}
                    <h2
                      className="p-2 text-xs text-center cursor-pointer text-white bg-red-500 rounded-md"
                      onClick={() => handleOpenModal(address.id)}
                    >
                      Delete
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2>No addresses yet</h2>
        )}
      </div>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        className="relative z-50 top-[40px] "
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 flex items-center justify-center  overflow-y-auto">
          <DialogPanel
            transition
            className="relative max-h-[50vh] w-full max-w-[90%] lg: max-w[400px] sm:max-w-[400px] overflow-y-auto  bg-white text-left shadow-xl transition-all sm:my-8 rounded-md"
          >
            <div className="bg-white px-4 flex flex-col lg:gap-5 sm:gap-5 gap-3 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex space-x-3 items-start">
                <div className="p-2 rounded-full bg-red-100">
                  <BsExclamationTriangle color="red" />
                </div>
                <div className="flex justify-center items-center">
                  <h2>Are you sure you want to delete this address</h2>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h2
                  onClick={handleCloseModal}
                  className="cursor-pointer bg-white font-custom text-sm p-2 rounded-md border border-gray-300"
                >
                  Cancel
                </h2>
                <h2
                  onClick={handleDelete}
                  className="p-2 bg-red-500 text-white cursor-pointer text-sm font-custom rounded-md"
                >
                  {isLoading ? (
                    <Loader color="white" size="h-6 w-6" />
                  ) : (
                    "Confirm"
                  )}
                </h2>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
export default AddressList;
