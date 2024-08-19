"use client";
import { useGetCountiesQuery } from "@/redux/queries/addreses/counties/countiesApi";
import { useGetPickupStationsQuery } from "@/redux/queries/addreses/pickupStations/pickupStationsApi";
import { useGetSubCountiesQuery } from "@/redux/queries/addreses/subcounties/subCountiesApi";
import { useGetWardsQuery } from "@/redux/queries/addreses/wards/wardsApi";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";

import {
  useCreateAddressMutation,
  useEditAddressMutation,
} from "@/redux/queries/customer-addresses/addressesApi";
import { addressSchema } from "@/src/definitions/address/AddressSchema";
import { County } from "@/src/definitions/address/Counties";
import { SubCounty } from "@/src/definitions/address/SubCounties";
import { Ward } from "@/src/definitions/address/Wards";
import { PickupStation } from "@/src/definitions/address/station";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

interface EditAddressProps {
  address: any;
  refetchAddresses: () => void;
}
export const EditAddress = ({
  address,
  refetchAddresses,
}: EditAddressProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [textValue, setTextValue] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);

  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);

  const [selectedSubCounty, setSelectedSubCounty] = useState<SubCounty | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [selectedStation, setSelectedStation] = useState<PickupStation | null>(
    null
  );
  const [deliveryOption, setDeliveryOption] = useState<string>("Door Delivery");

  const {
    isLoading: isLoadingCounties,
    data: countiesData,
    refetch: refetchCounties,
  } = useGetCountiesQuery({}, { refetchOnMountOrArgChange: true });

  const {
    isLoading: isLoadingSubcounties,
    data: subCountiesData,
    refetch: refetchSubcounties,
  } = useGetSubCountiesQuery(
    selectedCounty ? { county__name: selectedCounty.name } : {},
    { skip: !selectedCounty }
  );
  const {
    isLoading: isLoadingWards,
    data: wardsData,
    refetch: refetchWards,
  } = useGetWardsQuery(
    selectedSubCounty ? { sub_county__name: selectedSubCounty?.name } : {},
    { skip: !selectedSubCounty }
  );

  const {
    isLoading: isLoadingPickupStations,
    data: pickupStationsData,
    refetch: refetchStations,
  } = useGetPickupStationsQuery(
    deliveryOption === "Self Pickup"
      ? { station_type: "Shop", ward__name: selectedWard?.name }
      : selectedWard
      ? { ward__name: selectedWard?.name }
      : {},
    { skip: !selectedWard }
  );

  const [
    editAddress,
    {
      isLoading: isLoadEditing,
      isSuccess: isSuccessEditing,
      error: isEditError,
    },
  ] = useEditAddressMutation();

  useEffect(() => {
    if (isSuccessEditing) {
      toast.success("Address  Edited successfully.");
      refetchAddresses();
    }
    if (isEditError) {
      console.log(isEditError);
      if ("data" in isEditError) {
        const errorData = isEditError as any;
        console.log("error", errorData);
        toast.error(errorData.data.message);
      }
    }
  }, [isEditError, isSuccessEditing, isEditError]);

  useEffect(() => {
    if (address) {
      setSelectedCounty(address.county);
      setSelectedSubCounty(address.sub_county);
      setSelectedWard(address.ward);
      setDeliveryOption(address.address_type || "Door Delivery");
    }
  }, [address]);

  useEffect(() => {
    if (selectedCounty) {
      refetchSubcounties();
    }
  }, [selectedCounty]);

  useEffect(() => {
    if (selectedSubCounty) {
      refetchWards();
    }
  }, [selectedSubCounty]);

  useEffect(() => {
    if (selectedWard) {
      refetchStations();
    }
  }, [selectedWard, deliveryOption]);

  const handlePickupStationClick = () => {
    setDeliveryOption("Pickup Station");
  };

  const handlePickBySelfClick = () => {
    setDeliveryOption("Self Pickup");
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: address.name,
      phone_number: address.phone_number,
      id_number: address.id_number,
      county: address.county,
      sub_county: address.sub_county,
      ward: address.ward,
      town: address.town,
      description: address.description,
      address_type: address.address_type || "Door Delivery",
      pickup_station: address.pickup_station,
    },
  });

  const countyValue = watch("county");
  const subCountyValue = watch("sub_county");
  const wardValue = watch("ward");
  const stationValue = watch("pickup_station");

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCounty = countiesData?.find(
      (county: County) => county.id === Number(e.target.value)
    );
    setSelectedCounty(selectedCounty || null);
    setSelectedSubCounty(null);
    setValue("county", Number(e.target.value));
  };

  const handleSubCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCounty = subCountiesData?.find(
      (subCounty: SubCounty) => subCounty.id === Number(e.target.value)
    );
    setSelectedSubCounty(selectedSubCounty || null);

    setValue("sub_county", Number(e.target.value));
  };
  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWard = wardsData?.find(
      (ward: Ward) => ward.id === Number(e.target.value)
    );
    setSelectedWard(selectedWard || null);
    setValue("ward", Number(e.target.value));
    if (selectedWard) {
      const stationsInWard = pickupStationsData?.filter(
        (station: PickupStation) => station.ward === selectedWard.id
      );

      if (
        deliveryOption === "Self Pickup" &&
        (!stationsInWard || stationsInWard.length === 0)
      ) {
        setDeliveryOption("Door Delivery");
        setSelectedStation(null);
      } else {
        setSelectedStation(null);
      }
    }
  };

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStation = pickupStationsData?.find(
      (station: PickupStation) => station.id === Number(e.target.value)
    );
    setSelectedStation(selectedStation || null);

    setValue("pickup_station", Number(e.target.value));
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    const currentCharCount = value.length;

    if (currentCharCount <= 200) {
      setTextValue(value);
      setCharCount(currentCharCount);
    }
  };

  const onSubmit = async (formData: any) => {
    let data: any = {
      ...formData,
      address_type: deliveryOption,
    };
    console.log("data", data);
    const payload: any = {
      id: address.id,
      name: data.name,
      phone_number: data.phone_number,
      id_number: data.id_number,
      county: data.county,
      sub_county: data.sub_county,
      ward: data.ward,
      town: data.town,
    };
    if (
      data.address_type === "Pickup Station" ||
      data.address_type === "Self Pickup"
    ) {
      payload.pickup_station = data.pickup_station;
      payload.description = data.description;
    }
    if (data.address_type === "Door Delivery") {
      payload.description = data.description;
      delete data.pickup_station;
    }

    try {
      if (!isLoadEditing) {
        await editAddress(payload);
      }
    } catch (error) {
      toast.error("Error while updating Address", error as any);
    }
  };

  return (
    <>
      <h2
        onClick={() => setIsOpen(true)}
        className="p-2 text-xs text-center cursor-pointer text-gray-700 border rounded-md"
      >
        Edit
      </h2>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 top-[40px] "
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 flex items-center justify-center  overflow-y-auto">
          <DialogPanel
            transition
            className="relative max-h-[100vh] w-full max-w-[900px] overflow-y-auto  bg-white text-left shadow-xl transition-all sm:my-8"
          >
            {/* Main div */}

            <div className="grid grid-cols-1">
              {/* counties, subcounties, wards */}

              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center space-x-4">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FaMapMarkerAlt
                        aria-hidden="true"
                        className="h-6 w-6 text-green-900"
                      />
                    </div>
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold  borer-b leading-6 text-gray-900"
                    >
                      Add address
                    </DialogTitle>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-5">
                        <input
                          placeholder="Enter name"
                          {...register("name")}
                          className="h-[50px] bg-white w-full px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-[10px]"
                        />

                        {errors.name && (
                          <p className="text-red-500">
                            {String(errors.name.message)}
                          </p>
                        )}
                        <input
                          placeholder="Enter phone e.g 07xxxxxxx"
                          {...register("phone_number")}
                          className="h-[50px] bg-white w-full  px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                        />
                        {errors.phone_number && (
                          <p className="text-red-500">
                            {String(errors.phone_number.message)}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <input
                          placeholder="Enter ID number"
                          {...register("id_number")}
                          className="h-[50px] bg-white w-full  px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                        />
                        {errors.id_number && (
                          <p className="text-red-500">
                            {String(errors.id_number.message)}
                          </p>
                        )}
                        <input
                          placeholder="Enter town "
                          {...register("town")}
                          className="h-[50px] bg-white w-full  px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                        />
                        {errors.town && (
                          <p className="text-red-500">
                            {String(errors.town.message)}
                          </p>
                        )}
                      </div>

                      <div className="block w-full">
                        <select
                          value={countyValue || ""}
                          onChange={handleCountyChange}
                          className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                        >
                          <option value="">
                            {address?.county_name || "Select County"}
                          </option>
                          {countiesData?.map((county: County) => (
                            <option key={county.id} value={county.id}>
                              {county.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="block w-full">
                        <select
                          value={subCountyValue || ""}
                          onChange={handleSubCountyChange}
                          className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                        >
                          <option value="">
                            {address?.sub_county_name || "Select SubCounty"}
                          </option>
                          {isLoadingSubcounties ? (
                            <div className="flex justify-center">
                              <Loader color="green-900" size="h-8 w-8" />
                            </div>
                          ) : (
                            subCountiesData?.map((subCounty: SubCounty) => (
                              <option key={subCounty.id} value={subCounty.id}>
                                {subCounty.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>

                      <div className="block w-full">
                        <select
                          value={wardValue || ""}
                          onChange={handleWardChange}
                          className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                        >
                          <option value="">
                            {address?.ward_name || "Select Ward"}
                          </option>
                          {isLoadingWards ? (
                            <div className="flex justify-center">
                              <Loader color="green-900" size="h-8 w-8" />
                            </div>
                          ) : (
                            wardsData?.map((ward: Ward) => (
                              <option key={ward.id} value={ward.id}>
                                {ward.name}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                      <div className="grid  grid-cols-3 gap-5">
                        <div
                          onClick={() => setDeliveryOption("Door Delivery")}
                          className={`p-2 cursor-pointer rounded-md border text-center justify-center ${
                            deliveryOption === "Door Delivery"
                              ? "bg-green-100 text-green-900"
                              : "bg-white font-custom border-gray-400"
                          }`}
                        >
                          <h2>Door delivery</h2>
                        </div>
                        <div
                          onClick={handlePickBySelfClick}
                          className={`p-2 cursor-pointer rounded-md border text-center justify-center ${
                            deliveryOption === "Self Pickup"
                              ? "bg-blue-100 text-green-900"
                              : "bg-white font-custom border-gray-400"
                          }`}
                        >
                          <h2>Pick By self</h2>
                        </div>
                        <div
                          onClick={() => {
                            handlePickupStationClick();
                          }}
                          className={`p-2 cursor-pointer rounded-md border text-center justify-center ${
                            deliveryOption === "Pickup Station"
                              ? "bg-blue-100 text-green-900"
                              : "bg-white font-custom border-gray-400"
                          }`}
                        >
                          <h2>Pickup Station</h2>
                        </div>
                      </div>

                      {deliveryOption !== "Door Delivery" &&
                        deliveryOption === "Self Pickup" && (
                          <div className="block w-full">
                            {isLoadingPickupStations ? (
                              <p>Loading stations...</p>
                            ) : pickupStationsData?.length > 0 ? (
                              <select
                                value={stationValue || ""}
                                onChange={handleStationChange}
                                className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                              >
                                <option value="">
                                  {selectedStation?.name || "Select Station"}
                                </option>
                                {pickupStationsData.map(
                                  (station: PickupStation) => (
                                    <option key={station.id} value={station.id}>
                                      {station.name}
                                    </option>
                                  )
                                )}
                              </select>
                            ) : (
                              <p>
                                No stations for self pickup in the selected ward
                              </p>
                            )}
                          </div>
                        )}

                      {deliveryOption !== "Door Delivery" &&
                        deliveryOption === "Pickup Station" && (
                          <div className="block w-full">
                            {isLoadingPickupStations ? (
                              <p>Loading stations...</p>
                            ) : pickupStationsData?.length > 0 ? (
                              <select
                                value={stationValue || ""}
                                onChange={handleStationChange}
                                className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                              >
                                <option value="">
                                  {selectedStation?.name || "Select Station"}
                                </option>
                                {pickupStationsData.map(
                                  (station: PickupStation) => (
                                    <option key={station.id} value={station.id}>
                                      {station.name}
                                    </option>
                                  )
                                )}
                              </select>
                            ) : (
                              <p>
                                No stations for pickup station in the selected
                                ward
                              </p>
                            )}
                          </div>
                        )}

                      {deliveryOption === "Door Delivery" && (
                        <div className="w-full">
                          <div className="relative w-full min-w-[200px]">
                            <label htmlFor="textarea">
                              Address Details (Delivery to Doorstep)
                            </label>
                            <textarea
                              {...register("description")}
                              className="peer h-full min-h-[100px] w-full resize-none border border-blue-gray-300  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all     focus:border-gray-300  focus:outline-0 placeholder-gray-300 placeholder-text-[10px]"
                              placeholder="Name of the building , floor , Road and ward(E.g Room 13B, 3rd floor , Toll View Apartments, Juja road ,Juja"
                              value={textValue}
                              onChange={handleTextChange}
                              maxLength={200}
                            />
                            {errors.description && (
                              <p className="text-red-500">
                                {String(errors.description.message)}
                              </p>
                            )}
                            <div className="text-xs text-gray-500">
                              {charCount}/200 characters
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 sm:ml-3 sm:w-auto"
                        >
                          <span className="text-sm font-light ">
                            {" "}
                            {isSubmitting ? (
                              <span>
                                <Loader size="h-5 w-5" color="white" />
                              </span>
                            ) : (
                              "Submit"
                            )}
                          </span>
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setIsOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
