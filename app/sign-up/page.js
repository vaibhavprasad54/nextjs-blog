'use client'

import Image from "next/image";
import React, { useState } from "react";
import rocket from "../../public/assets/rocket.png";
import { useForm } from "react-hook-form";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


const SignUp = async() => {

  const router = useRouter();
  // const session = await getServerSession(authOptions);

  const [userExists, setUserExists] = useState("");

  const { register, handleSubmit, watch, formState: { errors }, } = useForm({
    userName: "",
    email: "",
    password: "",
  });

  const onSubmit = async(data) => {

    console.log("Data:", data);
    console.log("Errors:", errors);

    try {
      const res = await axios.post('/api/register', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(res.data.status == 201){
        router.push('/sign-in')
        console.log("User registered successfully.", res);
      }
      else if(res.data.status == 400){
        setUserExists("User already exists")
      }
      else {
        console.log("User registration failed.", res);
      }
    } catch (error) {
      console.log('Error during registration:', error);
    }
  }

  // if(session) {
  //   redirect("/")
  // }

  return (
    <div className="login-section w-full flex items-center justify-center">
      <div className="left-bg w-full sm:w-1/2 bg-blue-800 sm:h-screen h-[60rem] z-0"></div>
      <div className="right-bg w-full hidden sm:flex sm:w-1/2 bg-slate-200 sm:h-screen h-[60rem] z-0"></div>

      <div className="login-container sm:w-4/5 absolute bg-white bg-opacity-10 z-50 rounded-[20px] shadow-lg flex flex-col sm:flex-row items-center justify-center mx-4 max-w-5xl">
        <div className="animation-section sm:w-1/2 flex flex-col items-start justify-center gap-10 rounded-l-[15px] p-10 relative">
          <div className="circle absolute bg-blue-800 opacity-75 w-20 h-20 rounded-full -top-16"></div>
          <div className="triangle absolute bg-blue-800 opacity-75 w-8 h-8 rounded-full top-32 right-32"></div>
          <div className="triangle absolute bg-blue-800 opacity-75 w-8 h-8 rounded-full top-72 left-48"></div>
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

        <div className="login-area sm:w-1/2 bg-white sm:rounded-r-[15px] opacity-90 p-3 sm:p-10 mb-4 sm:mb-0">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center p-10">
            <div className="form-header text-center pb-5">
              <h2 className="text-2xl sm:text-[2rem] font-bold">Get Started</h2>
              <p className="m-0 p-0 text-sm sm:text-base text-gray-700">
                Already have an account ?{" "}
                <Link href="./sign-in" className="text-red-500">Sign in</Link>
              </p>
            </div>
            <div className="form-content flex flex-col items-center justify-center pt-4 gap-5 w-full">
              <div className="name w-full">
              <input
                type="text"
                name="userName"
                placeholder="Enter name"
                {...register("userName", {required: 'This is required'})}
                className="bg-slate-200 text-md sm:text-lg rounded-[7px] py-3 px-5 w-full"
              />
              <p className="text-red-600">{errors.userName?.message}</p>
              </div>
              <div className="email w-full">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                {...register("email", {required: 'This is required'})}
                className="bg-slate-200 text-md sm:text-lg rounded-[7px] py-3 px-5 w-full"
              />
              <p className="text-red-600">{errors.email?.message}</p>
              </div>
              <div className="password relative w-full">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                {...register("password", {required: 'This is required'})}
                className="bg-slate-200 text-md sm:text-lg rounded-[7px] py-3 px-5 w-full"
              />
              <IoEye className="text-2xl text-gray-600 absolute top-[0.85rem] right-3 cursor-pointer hover:text-gray-800" />
              <p className="text-red-600 ">{errors.password?.message}</p>
              {userExists && (
                  <p className="absolute top-[4rem] m-0 text-red-600">{userExists}</p>
              )}
              </div>
              
              <button type="submit" className="bg-red-500 hover:bg-red-600 px-5 py-3 w-full rounded-[7px] text-white mt-5 text-md sm:text-lg">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
