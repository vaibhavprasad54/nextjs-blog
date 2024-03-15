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
  const [credError, setCredError] = useState("");
  const [passwordState, setPasswordState] = useState("password");

  const toggleViewPassword = () => {
    setPasswordState(prevState => prevState === 'password' ? 'text' : 'password');
  }

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
      <div className="left-bg w-full sm:w-1/2 bg-[#7770e0] sm:h-screen h-[48rem] z-0"></div>
      <div className="right-bg w-full hidden sm:flex sm:w-1/2 bg-[#0a0a0c] sm:h-screen h-[48rem] z-0"></div>

      <div className="login-container sm:w-4/5 absolute bg-white bg-opacity-5 z-50 rounded-[20px] shadow-xl flex flex-col sm:flex-row items-center justify-center mx-4 max-w-5xl pt-2 pb-0">
        <div className="animation-section sm:w-1/2 flex flex-col items-start justify-center gap-10 rounded-l-[15px] p-10 relative">
          <div className="circle absolute bg-[#736cda] opacity-75 w-16 h-16 sm:w-20 sm:h-20 rounded-full -top-14 sm:-top-16"></div>
          <div className="triangle absolute hidden sm:flex bg-[#7770e0] opacity-75 w-8 h-8 rounded-full top-32 right-32"></div>
          <div className="triangle absolute hidden sm:flex bg-[#746ddb] opacity-75 w-8 h-8 rounded-full top-72 left-48"></div>
          <div className="text-area">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Hey, we've missed your <br /> writings!
            </h2>
            <div className="flex flex-row sm:flex-col gap-5">
            <p className="text-gray-700 pt-2 text-base sm:text-lg">
              Hop on now and continue...
            </p>
            <div className="animated-icon">
            <Image src={rocket} className="w-12 sm:w-20" alt="sample" />
          </div>
            </div>
          </div>
        </div>

        <div className="login-area sm:w-1/2 w-full bg-[#17171a] rounded-b-[15px] sm:rounded-r-[15px] opacity-90 p-3 sm:p-10 mb-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center p-10"
          >
            <div className="form-header text-center pb-5">
              <h2 className="text-2xl sm:text-[2rem] font-bold text-slate-100">
                Welcome back!
              </h2>
              <p className="m-0 p-0 text-sm sm:text-base text-slate-300">
                Don't have an account ?{" "}
                <Link href="./sign-up" className="text-[#7e77e8]">
                  Sign up
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
                  type={passwordState}
                  placeholder="Enter password"
                  {...register("password", { required: "This is required" })}
                  className="bg-slate-200 text-md sm:text-lg rounded-[7px] py-3 px-5 w-full"
                />
                <IoEye onClick={toggleViewPassword} className="text-2xl text-gray-600 absolute top-[0.85rem] right-3 cursor-pointer hover:text-gray-800" />
                <p className="text-red-600">{errors.password?.message}</p>
                {credError && (
                  <p className="absolute top-[3.6rem] m-0 text-sm text-white bg-[#d60303] rounded-[5px] px-2 py-1 ">{credError}</p>
              )}
              </div>
              <button
                type="submit"
                className="bg-[#7770e0] hover:bg-[#635cc4] px-5 py-3 w-full rounded-[7px] text-white mt-5 text-md sm:text-lg"
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
