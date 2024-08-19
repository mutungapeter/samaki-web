export const AllowedPaymentMethods = () => {
  return (
    <div className="bg-white p-3 flex flex-col sm:gap-5 gap-3 lg:gap-5 ">
      <div className="flex flex-col lg:flex-row sm:flex-row sm:items-center lg:items-center lg:space-x-8 sm:space-x-8">
        <h2 className="lg:text-md sm:text-md text-xs font-medium uppercase">Payment Methods</h2>
        <span className="lg:text-sm sm:tetx-sm text-[13px] font-custom text-gray-500">
          (Trusted, 100% Secure, 100% Money Back Guarantee)
        </span>
      </div>
      <div className="flex xs:w-full flex-row lg:flex-col sm:items-baseline lg:items-baseline">
      <div className="flex xs:w-full items-center space-x-6 p-3 bg-white rounded-md">
        <h2 className="text-green-500">Mpesa</h2>
        <h2 className="text-blue-500">Bank cards</h2>
      </div>
      </div>
    </div>
  );
};
