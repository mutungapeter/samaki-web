import { IoChevronForward } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import {useRouter} from "next/navigation";
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
  county:number;
  sub_county: number;
  ward:number;
}

type ShippingInfoProps = {
  selectedAddress:  Address | null;
};
const ShippingInfo = ({ selectedAddress}: ShippingInfoProps) => {
  const router = useRouter()
  return (
    <div className="bg-white p-2 sm:p-3 lg:p-3 flex flex-col sm:gap-4 gap-2 lg:gap-4 ">
      <div className="flex justify-between items-center">
        <h2 className="lg:text-md sm:text-md text-xs font-medium uppercase">Shipping Information</h2>
        <div 
           onClick={() => router.push('/account/address?fromCheckout=true')}
        className="flex items-center  p-1 sm:p-2 lg:p-2  cursor-pointer bg-green-900  text-white rounded-md">
          <p className="lg:text-sm sm:text-sm text-[10px] font-custom text-white ">Change</p>
        </div>
      </div>
      {selectedAddress ? (
        <div
          key={selectedAddress?.id}
          className={`flex items-center w-full gap-3 p-2 `}
        >
          <FaMapMarkerAlt size={30} className="text-green-900" />
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-1 sm:py-1 py-0 lg:py-1">
              <div className="flex items-center space-x-3 sm:border-b lg:border-b">
                <h2 className="font-custom lg:text-sm sm:text-sm text-[13px]">
                  {selectedAddress?.name}
                </h2>
                <h2 className="font-custom lg:text-sm sm:text-sm text-[13px]">
                  {selectedAddress?.phone_number}
                </h2>
              </div>
              <div className="lg:flex-row sm:flex-row flex flex-col">
                <span className="font-custom lg:text-sm sm:text-sm text-[13px]">
                  {selectedAddress?.county_name} |{" "}
                  {selectedAddress?.sub_county_name} |{" "}
                  {selectedAddress?.ward_name}, {selectedAddress?.pick_at}
                  , Cellphone: {selectedAddress?.phone_number}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full gap-3 p-2">
          <FaMapMarkerAlt  size={30} className="text-green-900" />
          <div className="w-full flex flex-col">
            <p className="font-custom lg:text-sm sm:text-sm text-[13px]">
              No Address Selected
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShippingInfo;
