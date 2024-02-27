"use client";

import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/logo.png";
import userImage from "../../../public/assets/man.png";
import { IoMdHome } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { GoBellFill } from "react-icons/go";
import { IoSettingsSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoPowerSharp } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; 

const Nav = () => {

  const {data: session} = useSession();

  console.log("Session Data:", session);

  const openMobileMenu = () => {
    document.querySelector(".ham-icon").style.display = "none";
    document.querySelector(".close-icon").style.display = "flex";
    document.querySelector(".menu-mobile").style.right = "1rem";
    document.querySelector(".menu-mobile").style.transition = "all 0.3s ease";
  };

  const closeMobileMenu = () => {
    document.querySelector(".close-icon").style.display = "none";
    document.querySelector(".ham-icon").style.display = "flex";
    document.querySelector(".menu-mobile").style.right = "-15rem";
    document.querySelector(".menu-mobile").style.transition = "all 0.3s ease";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="nav-container flex items-center justify-between px-6 sm:px-12 py-1">
        <div className="flex items-center">
          <div className="logo flex items-center justify-start gap-2">
            <Image
              src={logo}
              alt="image"
              className="w-12 h-13 sm:w-14 sm:h-15 p-[0.4rem]"
            />
            <p className="text-2xl font-semibold text-[#8c6bec]">Blogs</p>
          </div>
        </div>
        <div className="menu-items items-start gap-8 hidden lg:flex">
          <div className="home flex items-center gap-3 cursor-pointer">
            <IoMdHome className="text-[1.8rem] text-[#8c6bec]" />
            <p className="text-lg font-semibold text-[#8c6bec]">Home</p>
          </div>
          <div className="flex items-center gap-3 cursor-pointer">
            <CiGrid41 className="text-[1.7rem] text-gray-400" />
            <p className="text-lg font-semibold text-gray-400">Categories</p>
          </div>
          <div className="notifications flex items-center gap-3 cursor-pointer">
            <GoBellFill className="text-[1.6rem] text-gray-400" />
            <p className="text-lg font-semibold text-gray-400">Notifications</p>
          </div>
          <div className="settings flex items-center gap-3 cursor-pointer">
            <IoSettingsSharp className="text-[1.6rem] text-gray-400" />
            <p className="text-lg font-semibold text-gray-400">Settings</p>
          </div>
        </div>
        <div className="items-center hidden lg:flex">
        <DropdownMenu className="cursor-pointer -mt-5 ">
            <DropdownMenuTrigger className="user-info flex items-center justify-start gap-3 cursor-pointer outline-none">
              <Image src={userImage} alt="image" className="w-11 h-11" />
              <p className="text-xl font-semibold text-[#8c6bec]"> {session?.user?.userName} </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4 w-44">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
               <DropdownMenuItem onClick={() => signOut()} className="group cursor-pointer text-md py-1 flex items-center justify-between">
                <p className="m-0">Account Details</p>
                <IoMdSettings className="w-5 h-5 group-hover:-rotate-45" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-md py-1 flex items-center justify-between">
                <p className="m-0">Log out</p>
                <IoPowerSharp className="w-[1.1rem] h-[1.1rem]" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hamburger-menu flex lg:hidden">
          <RxHamburgerMenu
            className="ham-icon w-7 h-7 cursor-pointer"
            onClick={openMobileMenu}
          />
          <IoMdClose
            className="close-icon w-7 h-7 cursor-pointer hidden"
            onClick={closeMobileMenu}
          />
        </div>
        <div className="menu-mobile flex flex-col items-start justify-between absolute top-14 -right-60 rounded-[8px] bg-slate-200 shadow-lg z-50 h-[43rem] py-5 px-10 w-60 pb-10">
          <div className="menu-mobile-items flex flex-col items-start justify-start gap-10">
            <div className="home flex items-center gap-3 cursor-pointer">
              <IoMdHome className="text-[1.8rem] text-[#23528e]" />
              <p className="text-lg font-semibold text-[#23528e]">Home</p>
            </div>
            <div className="flex items-center gap-3 cursor-pointer">
              <CiGrid41 className="text-[1.7rem] text-gray-400" />
              <p className="text-lg font-semibold text-gray-400">Categories</p>
            </div>
            <div className="notifications flex items-center gap-3 cursor-pointer">
              <GoBellFill className="text-[1.6rem] text-gray-400" />
              <p className="text-lg font-semibold text-gray-400">
                Notifications
              </p>
            </div>
            <div className="settings flex items-center gap-3 cursor-pointer">
              <IoSettingsSharp className="text-[1.6rem] text-gray-400" />
              <p className="text-lg font-semibold text-gray-400">Settings</p>
            </div>
          </div>

          <DropdownMenu className="cursor-pointer -mt-5">
            <DropdownMenuTrigger className="user-info flex items-center justify-start gap-3 cursor-pointer outline-none">
              <Image src={userImage} alt="image" className="w-11 h-11" />
              <p className="text-xl font-semibold text-[#23528e]">Vaibhav</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-[7rem] -mt-3">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-md py-1 flex items-center justify-between">
                <p className="m-0">Log out</p>
                <IoPowerSharp className="w-5 h-5" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <div className="user-info flex items-center justify-start gap-3 cursor-pointer">
            <Image src={userImage} alt="image" className="w-11 h-11" />
            <p className="text-xl font-semibold text-[#23528e]">Vaibhav</p>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
