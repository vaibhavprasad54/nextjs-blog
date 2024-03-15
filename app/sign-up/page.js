'use client'

import Image from "next/image";
import React, { useState } from "react";
import rocket from "../../public/assets/rocket.png";
import { useForm } from "react-hook-form";
import { IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const SignUp = () => {

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
      <div className="left-bg w-full sm:w-1/2 bg-[#7770e0] sm:h-screen h-[48rem] z-0"></div>
      <div className="right-bg w-full hidden sm:flex sm:w-1/2 bg-[#0a0a0c] sm:h-screen h-auto z-0"></div>

      <div className="login-container sm:w-4/5 absolute bg-white bg-opacity-5 z-50 rounded-[20px] shadow-lg flex flex-col sm:flex-row items-center justify-center mx-4 max-w-5xl">
        <div className="animation-section sm:w-1/2 flex flex-col items-start justify-center gap-7 rounded-l-[15px] p-7 relative">
          <div className="circle absolute bg-[#736cda] opacity-75 w-16 h-16 sm:w-20 sm:h-20 rounded-full -top-12 sm:-top-16"></div>
          <div className="triangle absolute hidden sm:flex bg-[#7770e0] opacity-75 w-8 h-8 rounded-full top-32 right-32"></div>
          <div className="triangle absolute hidden sm:flex bg-[#746ddb] opacity-75 w-8 h-8 rounded-full top-72 left-48"></div>
          <div className="text-area">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Scribble your thoughts <br /> on web!
            </h2>
            <div className="flex flex-row sm:flex-col gap-5">
            <p className="text-gray-700 pt-2 text-base sm:text-lg">
              Start writing today and get global
            </p>
            <div className="animated-icon">
            <Image src={rocket} className="w-12 sm:w-20" alt="sample" />
          </div>
            </div>
          </div>
          
        </div>

        <div className="login-area sm:w-1/2 w-full bg-[#17171a] rounded-b-[15px] sm:rounded-r-[15px] opacity-90 p-3 sm:p-10 mb-0">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center p-10">
            <div className="form-header text-center pb-5">
              <h2 className="text-2xl sm:text-[2rem] font-bold text-slate-100">Get Started</h2>
              <p className="m-0 p-0 text-sm sm:text-base text-slate-300">
                Already have an account ?{" "}
                <Link href="./sign-in" className="text-red-400">Sign in</Link>
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
