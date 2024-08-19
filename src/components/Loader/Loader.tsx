import React from "react";
interface LoaderProps {
  color?: string;
  size?: string;
}
const Loader = ({ color, size }: LoaderProps) => {
  const loaderColor = color || "green-900";
  const loaderSize = size || "h-8 w-8";
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-solid border-${loaderColor} text-${loaderColor} ${loaderSize}  border-e-transparent align-[-0.125em] text-${loaderColor} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Loader;
