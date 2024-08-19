"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { GoPlusCircle } from "react-icons/go";
import { ChangeEvent, useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useGetCountiesQuery } from "@/redux/queries/addreses/counties/countiesApi";
import { useGetSubCountiesQuery } from "@/redux/queries/addreses/subcounties/subCountiesApi";
import { useGetPickupStationsQuery } from "@/redux/queries/addreses/pickupStations/pickupStationsApi";
import { FaChevronDown } from "react-icons/fa";
import { VscChevronDown } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineCall } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { useGetWardsQuery } from "@/redux/queries/addreses/wards/wardsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { z, ZodType } from "zod";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { Ward } from "@/src/definitions/address/Wards";
import { PickupStation } from "@/src/definitions/address/station";
import { useCreateAddressMutation } from "@/redux/queries/customer-addresses/addressesApi";
import toast from "react-hot-toast";
import { County } from "@/src/definitions/address/Counties";
import { SubCounty } from "@/src/definitions/address/SubCounties";
import { addressSchema } from "@/src/definitions/address/AddressSchema";
import Loader from "../../Loader/Loader";
import { useRouter } from "next/navigation";
export const CreateAddress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textValue, setTextValue] = useState<string>("");
  const [charCount, setCharCount] = useState<number>(0);

  const [selectedCounty, setSelectedCounty] = useState<County | null>(null);
  const [showCountiesDropdown, setShowCountiesDropdown] =
    useState<boolean>(false);
  const [showSubCountiesDropdown, setShowSubCountiesDropdown] =
    useState<boolean>(false);
  const [showWardsDropdown, setShowWardsDropdown] = useState<boolean>(false);
  const [selectedSubCounty, setSelectedSubCounty] = useState<SubCounty | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [showStations, setShowStations] = useState<boolean>(false);
  const [deliveryOption, setDeliveryOption] = useState<string>("Door Delivery");
const router = useRouter()
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
      ? { station_type: "Shop" }
      : selectedWard
      ? { ward__name: selectedWard?.name }
      : {},
    { skip: !selectedWard }
  );
  const [createAddress, { isLoading, isSuccess, error }] =
    useCreateAddressMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Address  created successfully.");
      router.push('/account/address');
    }
    if (error) {
      console.log(error);
      if ("data" in error) {
        const errorData = error as any;
        console.log("error", errorData);
        toast.error(errorData.data.message);
      }
    }
  }, [isLoading, isSuccess, error, router]);
  const handleCountySelect = (county: County) => {
    setSelectedCounty(county);
    setValue("county", Number(county.id));
    setShowCountiesDropdown(false);
    setSelectedSubCounty(null);
  };

  const handleSubCountySelect = (subCounty: SubCounty) => {
    setSelectedSubCounty(subCounty);
    setShowSubCountiesDropdown(false);
    setValue("sub_county", Number(subCounty.id));
  };
  const handleWardSelect = (ward: Ward) => {
    setSelectedWard(ward);
    setShowWardsDropdown(false);
    setValue("ward", Number(ward.id));
    if (pickupStationsData && pickupStationsData.length > 0) {
      setShowStations(true);
    }
  };

  const selectedSubCountyName = selectedSubCounty?.name || "";
  const selectedWardName = selectedWard?.name || "";
  const selectedCountyName = selectedCounty?.name || "";

  const handlePickupStationClick = () => {
    setDeliveryOption("Pickup Station");
    if (pickupStationsData && pickupStationsData.length > 0) {
      setShowStations((prev) => {
        const newShowStations = !prev;
        return newShowStations;
      });
    }
  };

  const filteredStations = pickupStationsData?.filter(
    (station: PickupStation) =>
      station.station_type === "Shop" && station.ward === selectedWard?.id
  );
  // console.log("filteredStations", filteredStations);
  const handlePickBySelfClick = () => {
    setDeliveryOption("Self Pickup");

    if (filteredStations?.length > 0) {
      setShowStations((prev) => {
        const newShowStations = !prev;
        return newShowStations;
      });
    } else {
      setShowStations(false);
    }
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });
  const handleStationSelect = (station: PickupStation) => {
    setSelectedStation(station.name);
    setShowStations(false);
    setValue("pickup_station", Number(station.id));
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

    const payload: any = {
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
    if (!isLoading) {
      await createAddress(payload);
    }
    reset();
    setSelectedCounty(null);
    setSelectedSubCounty(null);
    setSelectedWard(null);
    setSelectedStation(null);
    setDeliveryOption("Door Delivery");
    setIsOpen(false);
  };
  return (
    <>
      <div className="w-full min-h-screen px-1 flex flex-col bg-[#F8F8F8] lg:hidden sm:hidden">
        <div className="w-full fixed top-0 left-0 z-30 grid grid-cols-3  items-center px-3 lg:hidden sm:hidden bg-white h-[50px]">
          <Link
            href="/account/address"
            className="justify-self-start flex items-center"
          >
            <FaChevronLeft color="gray" />
          </Link>
          <div className="col-span-2 flex items-center space-x-3 justify-start">
            <FaMapMarkerAlt
              aria-hidden="true"
              className="h-4 w-4 text-green-900"
            />
            <h2 className="font-semibold">Add Address</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-white py-10 px-1 mt-[20px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 px-2">
              <input
                placeholder="Enter name"
                {...register("name")}
                className="h-[35px] bg-white w-full px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-[10px]"
              />

              {errors.name && (
                <p className="text-red-500">{String(errors.name.message)}</p>
              )}
              <input
                placeholder="Enter phone e.g 07xxxxxxx"
                {...register("phone_number")}
                className="h-[35px] bg-white w-full  px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
              />
              {errors.phone_number && (
                <p className="text-red-500">
                  {String(errors.phone_number.message)}
                </p>
              )}

              <input
                placeholder="Enter ID number"
                {...register("id_number")}
                className="h-[35px] bg-white w-full  px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
              />
              {errors.id_number && (
                <p className="text-red-500">
                  {String(errors.id_number.message)}
                </p>
              )}
              <input
                placeholder="Enter town "
                {...register("town")}
                className="h-[35px] bg-white w-full  px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
              />
              {errors.town && (
                <p className="text-red-500">{String(errors.town.message)}</p>
              )}

              <div className="w-full relative">
                <input
                  placeholder="county"
                  value={selectedCountyName}
                  {...register("county", { valueAsNumber: true })}
                  onClick={() => setShowCountiesDropdown(!showCountiesDropdown)}
                  className="h-[35px] bg-white w-full  px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                />
                {errors.county && (
                  <p className="text-red-500">
                    {String(errors.county.message)}
                  </p>
                )}
                <span className="absolute inset-y-0 text-center right-0 flex items-center pr-3 pointer-events-none">
                  <VscChevronDown className="text-gray-400 h-4 w-4" />
                </span>
                {showCountiesDropdown && (
                  <div className="absolute min-h-[30vh] max-h-[20vh] overflow-y-scroll w-full bg-white border rounded-md shadow-sm-2 z-[9] p-4">
                    {isLoadingCounties ? (
                      <div className="flex justify-center">
                        <Loader color="green-900" size="h-8 w-8" />
                      </div>
                    ) : (
                      countiesData?.map((county: County) => (
                        <div
                          className="w-full p-3 hover:bg-slate-100 cursor-pointer"
                          key={county.id}
                          onClick={() => handleCountySelect(county)}
                        >
                          <h1>{county.name}</h1>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="w-full relative">
                <input
                  placeholder="subCounty/Town"
                  className="h-[35px] bg-white w-full px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                  value={selectedSubCounty?.name || ""}
                  {...register("sub_county", { valueAsNumber: true })}
                  onClick={() =>
                    setShowSubCountiesDropdown(!showSubCountiesDropdown)
                  }
                />
                {errors.sub_county && (
                  <p className="text-red-500">
                    {String(errors.sub_county.message)}
                  </p>
                )}

                <span className="absolute inset-y-0 text-center right-0 flex items-center pr-3 pointer-events-none">
                  <VscChevronDown className="text-gray-400 h-4 w-4" />
                </span>
                {showSubCountiesDropdown && (
                  <div className="absolute min-h-[30vh] max-h-[20vh] overflow-y-scroll w-full bg-white border rounded-md shadow-sm-2 z-[9] p-4">
                    {isLoadingSubcounties ? (
                      <div className="flex justify-center">
                        <Loader color="green-900" size="h-8 w-8" />
                      </div>
                    ) : (
                      subCountiesData?.map((subCounty: SubCounty) => (
                        <div
                          className="w-full p-3 hover:bg-slate-100 cursor-pointer"
                          key={subCounty.id}
                          onClick={() => {
                            handleSubCountySelect(subCounty);
                          }}
                        >
                          <h1>{subCounty.name}</h1>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="w-full relative">
                <input
                  placeholder="ward"
                  className="h-[35px] bg-white w-full px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                  value={selectedWard?.name || ""}
                  {...register("ward", { valueAsNumber: true })}
                  onClick={() => setShowWardsDropdown(!showWardsDropdown)}
                />
                {errors.ward && (
                  <p className="text-red-500">{String(errors.ward.message)}</p>
                )}

                <span className="absolute inset-y-0 text-center right-0 flex items-center pr-3 pointer-events-none">
                  <VscChevronDown className="text-gray-400 h-4 w-4" />
                </span>
                {showWardsDropdown && (
                  <div className="absolute min-h-[30vh] max-h-[20vh] overflow-y-scroll w-full bg-white border rounded-md shadow-sm-2 z-[9] p-4">
                    {isLoadingWards ? (
                      <div className="flex justify-center">
                        <Loader color="green-900" size="h-8 w-8" />
                      </div>
                    ) : (
                      wardsData?.map((ward: Ward) => (
                        <div
                          className="w-full p-3 hover:bg-slate-100 cursor-pointer"
                          key={ward.id}
                          onClick={() => {
                            handleWardSelect(ward);
                          }}
                        >
                          <h1>{ward.name}</h1>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="grid  grid-cols-3 gap-2">
                {selectedWard && (
                  <div
                    onClick={() => setDeliveryOption("Door Delivery")}
                    className={`p-2 cursor-pointer rounded-md border text-center text-[10px] justify-center ${
                      deliveryOption === "Door Delivery"
                        ? "bg-green-100 text-green-900"
                        : "bg-white font-custom border-gray-400"
                    }`}
                  >
                    <h2>Door delivery</h2>
                  </div>
                )}
                {selectedWard &&
                  filteredStations &&
                  filteredStations.length > 0 && (
                    <div
                      onClick={handlePickBySelfClick}
                      className={`p-2 cursor-pointer rounded-md border text-center text-[10px] justify-center ${
                        deliveryOption === "Self Pickup"
                          ? "bg-blue-100 text-green-900"
                          : "bg-white font-custom border-gray-400"
                      }`}
                    >
                      <h2>Pick By self</h2>
                    </div>
                  )}
                {selectedWard &&
                  pickupStationsData &&
                  pickupStationsData.length > 0 && (
                    <div
                      onClick={() => {
                        handlePickupStationClick();
                        // deliveryOption("Pickup Station");
                      }}
                      className={`p-2 cursor-pointer rounded-md border text-center text-[10px] justify-center ${
                        deliveryOption === "Pickup Station"
                          ? "bg-blue-100 text-green-900"
                          : "bg-white font-custom border-gray-400"
                      }`}
                    >
                      <h2>Pickup Station</h2>
                    </div>
                  )}
              </div>

              {deliveryOption !== "Door Delivery" &&
                deliveryOption === "Self Pickup" && (
                  <div className="w-full relative">
                    <input
                      {...register("pickup_station")}
                      placeholder="Select PickbySelf station"
                      value={selectedStation || ""}
                      className="h-[35px] bg-white w-full px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                      // onClick={() => setShowStations(!showStations)}
                      onClick={handlePickBySelfClick}
                    />
                    <span className="absolute inset-y-0 text-center right-0 flex items-center pr-3 pointer-events-none">
                      <VscChevronDown className="text-gray-400 h-4 w-4" />
                    </span>
                    {showStations && (
                      <div className="absolute z-30 min-h-[30vh] max-h-[40vh] overflow-y-scroll w-full bg-white border rounded-md shadow-sm-2  p-4">
                        {filteredStations?.map((station: PickupStation) => (
                          <div
                            className="w-full p-3 hover:bg-slate-100 cursor-pointer"
                            key={station.id}
                            onClick={() => handleStationSelect(station)}
                          >
                            <div className="flex flex-col gap-1 rounded-md">
                              <span className="text-sm text-gray-900">
                                {station.name}
                              </span>
                              <span className="text-xs text-gray-600">
                                {station.description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              {deliveryOption !== "Door Delivery" &&
                deliveryOption === "Pickup Station" && (
                  <div className="w-full relative">
                    <input
                      placeholder="Select pickpup Station"
                      value={selectedStation || ""}
                      {...register("pickup_station")}
                      onClick={handlePickupStationClick}
                      className="h-[35px] bg-white w-full px-2 border-gray-300 focus:outline-none focus:bg-white focus:shadow-sm border-[1px] rounded-sm placeholder-gray-300 placeholder-text-xs"
                    />
                    <span className="absolute inset-y-0 text-center right-0 flex items-center pr-3 pointer-events-none">
                      <VscChevronDown className="text-gray-400 h-4 w-4" />
                    </span>
                    {showStations && (
                      <div className="absolute z-30 min-h-[30vh] max-h-[40vh] overflow-y-scroll w-full bg-white border rounded-md shadow-sm-2  p-4">
                        {pickupStationsData?.map((station: PickupStation) => (
                          <div
                            className="w-full p-3 hover:bg-slate-100 cursor-pointer"
                            key={station.id}
                            onClick={() => handleStationSelect(station)}
                          >
                            <div className="flex flex-col gap-1 rounded-md">
                              <span className="text-sm text-gray-900">
                                {station.name}
                              </span>
                              <span className="text-xs text-gray-600">
                                {station.description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
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
              <div className="w-full fixed bottom-0 left-0 flex z-30 ">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-900 sm:ml-3 sm:w-auto"
                >
                  <span className="text-sm text-center font-light ">
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
