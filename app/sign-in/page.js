"use client";

import Image from "next/image";
import React, { useState } from "react";
import rocket from "../../public/assets/rocket.png";
import { useForm } from "react-hook-form";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { signIn } from "next-auth/react";

const SignIn = () => {

  const router = useRouter();
  const [credError, setCredError] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    console.log("Data:", data);
    console.log("Errors:", errors);

    try {
        const res = await signIn("credentials", {                           // Signing in using NextAuth.
        email: data.email,
        password: data.password,
        redirect: false,
      });                                   

      // const res = await axios.post("/api/login", JSON.stringify(data), {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      console.log("Response:", res);
      if (res.status == 200) {
        router.push("/");
        console.log("User logged in successfully.", res);
      } else {
        setCredError("Invalid credentials");
        console.log("User log in failed.", res);
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="login-section w-full flex items-center justify-center">
      <div className="left-bg w-full sm:w-1/2 bg-[#8c6bec] sm:h-screen h-[60rem] z-0"></div>
      <div className="right-bg w-full hidden sm:flex sm:w-1/2 bg-slate-200 sm:h-screen h-[60rem] z-0"></div>

      <div className="login-container sm:w-4/5 absolute bg-white bg-opacity-15 z-50 rounded-[20px] shadow-lg flex flex-col sm:flex-row items-center justify-center mx-4 max-w-5xl">
        <div className="animation-section sm:w-1/2 flex flex-col items-start justify-center gap-10 rounded-l-[15px] p-10 relative">
          <div className="circle absolute bg-[#8c6bec] opacity-75 w-20 h-20 rounded-full -top-16"></div>
          <div className="triangle absolute bg-[#8c6bec] opacity-75 w-8 h-8 rounded-full top-32 right-32"></div>
          <div className="triangle absolute bg-[#8c6bec] opacity-75 w-8 h-8 rounded-full top-72 left-48"></div>
          <div className="text-area">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Scribble your thoughts <br /> on web!
            </h2>
            <p className="text-slate-200 pt-2 text-base sm:text-lg">
              Start writing today and get global
            </p>
          </div>
          <div className="animated-icon">
            <Image src={rocket} className="w-14 sm:w-24" alt="sample" />
          </div>
        </div>

        <div className="login-area sm:w-1/2 bg-white rounded-r-[15px] opacity-90 p-3 sm:p-10 mb-4 sm:mb-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center p-10"
          >
            <div className="form-header text-center pb-5">
              <h2 className="text-2xl sm:text-[2rem] font-bold">
                Welcome back!
              </h2>
              <p className="m-0 p-0 text-sm sm:text-base text-gray-700">
                Don't have an account ?{" "}
                <Link href="./sign-up" className="text-red-500">
                  Sign in
                </Link>
              </p>
            </div>
            <div className="form-content flex flex-col items-center justify-center pt-4 gap-5 w-full">
              <div className="email w-full">
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", { required: "This is required" })}
                  className="bg-slate-200 text-md sm:text-lg rounded-[7px] py-3 px-5 w-full"
                />
                <p className="text-red-600">{errors.email?.message}</p>
              </div>
              <div className="password relative w-full">
                <input
                  type="password"
                  placeholder="Enter password"
                  {...register("password", { required: "This is required" })}
                  className="bg-slate-200 text-md sm:text-lg rounded-[7px] py-3 px-5 w-full"
                />
                <IoEye className="text-2xl text-gray-600 absolute top-[0.85rem] right-3 cursor-pointer hover:text-gray-800" />
                <p className="text-red-600">{errors.password?.message}</p>
                {credError && (
                  <p className="absolute top-[3.6rem] m-0 text-sm text-white bg-[#d60303] rounded-[5px] px-2 py-1 ">{credError}</p>
              )}
              </div>
              <button
                type="submit"
                className="bg-[#8c6bec] hover:bg-[#8061db] px-5 py-3 w-full rounded-[7px] text-white mt-5 text-md sm:text-lg"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
