"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdArrowDropdown } from "react-icons/io";
import { useCreateAccountMutation } from "@/redux/queries/auth/authApi";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";
const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const [createAccount, { data, error, isSuccess }] =
  useCreateAccountMutation();
  const schema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    id_number: z.string().min(1, "ID number is required"),
    email: z.string().email("Invalid email address"),  
  username: z.string().min(1, "Username is required"),
  password: z.string().min(4, "Password should be at least 4 characters long"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Select gender" }),
  }),

  });
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    const formData = { ...data, role: "Customer" };
    console.log("formData", formData)
    try {
     const response =  await createAccount(formData).unwrap();
     const successMessage = response?.message || "Request successful";
      toast.success(successMessage);
      router.push("login")
    } catch (error:any) {
     
      if (error?.data?.error) {
        console.log("error", error)
        toast.error(error.data.error);
      } else {
        toast.error("Failed to create Account. Please try again.");
      }
    }
  };
  return (
    <div className="bg-[#D6DBDC] h-screen flex items-center justify-center p-4 dark:bg-slate-800">
      <div className="bg-white p-6 shadow-lg rounded-md w-full max-w-lg dark:bg-slate-100">
        <div className="text-3xl text-[#1F4772] font-bold capitalize text-center mb-6">
          <h3>Create Account</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="lg:space-y-3 space-y-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter first name"
                {...register("first_name")}
                className="w-full py-2 px-4 rounded-md border border-blue-500 focus:outline-none"
              />
              {errors.first_name && (
                      <p className="text-red-500 text-sm">
                        {String(errors.first_name.message)}
                      </p>
                    )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter last name"
                {...register("last_name")}
                className="w-full py-2 px-4 rounded-md border border-blue-500 focus:outline-none"
              />
              {errors.last_name && (
                      <p className="text-red-500 text-sm">
                        {String(errors.last_name.message)}
                      </p>
                    )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
            <div>
              <label
                htmlFor="Username"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter username "
                {...register("username")}
                className="w-full py-2 px-4 rounded-md border border-blue-500 focus:outline-none"
              />
              {errors.username && (
                      <p className="text-red-500 text-sm">
                        {String(errors.username.message)}
                      </p>
                    )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                {...register("email")}
                className="w-full py-2 px-4 rounded-md border border-blue-500 focus:outline-none"
              />
              {errors.email && (
                      <p className="text-red-500 text-sm">
                        {String(errors.email.message)}
                      </p>
                    )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
            <div>
              <label
                htmlFor="id"
                className="block text-gray-700 font-semibold text-sm mb-2"
              >
                ID Number
              </label>
              <input
                type="text"
                id="id"
                placeholder="Enter ID number"
                {...register("id_number")}
                className="w-full py-2 px-4 rounded-md border border-blue-500 focus:outline-none"
              />
              {errors.id_number && (
                      <p className="text-red-500 text-sm">
                        {String(errors.id_number.message)}
                      </p>
                    )}
            </div>
            <div className="relative">
              <label
                htmlFor="gender"
                className="block text-gray-700 text-sm  font-semibold mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                {...register("gender")}
                className="w-full appearance-none py-2 px-4 text-lg rounded-md border border-blue-500 focus:outline-none"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <IoMdArrowDropdown
                size={30}
                className="absolute top-[60%] right-4 transform -translate-y-1/2 text-[#1F4772] pointer-events-none"
              />
              {errors.gender && (
                    <p className="text-red-500 text-sm">
                      {String(errors.gender.message)}
                    </p>
                  )}
            </div>
          </div>
          <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter phone e.g 0745..."
                {...register("phone_number")}
                className="w-full py-2 px-4 rounded-md border border-blue-500 focus:outline-none"
              />
              {errors.phone_number && (
                      <p className="text-red-500 text-sm">
                        {String(errors.phone_number.message)}
                      </p>
                    )}
            </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm  font-semibold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              {...register("password")}
              className="w-full py-2 px-4 rounded-md border border-blue-500 focus:outline-none"
            />
            {errors.password && (
                      <p className="text-red-500 text-sm">
                        {String(errors.password.message)}
                      </p>
                    )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-5 h-5"
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-gray-700">Show Password</span>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[#1F4772] text-xl text-white font-medium uppercase p-2 rounded-md w-full opacity-90 hover:opacity-100"
            >
              <span className="text-sm text-center font-light ">
                {" "}
                    {isSubmitting ? (
                      <span>
                       Processing
                      </span>
                    ) : (
                      "Submit"
                    )}
                
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
