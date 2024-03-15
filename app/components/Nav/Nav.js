"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import logo from "../../../public/assets/logo.png";
import userImage from "../../../public/assets/man.png";
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
import Link from "next/link";
import { useSessionContext } from "@/app/SessionContext";

const Nav = () => {

  const {data: session} = useSession();
  const [theme, setTheme] = useState("light");
  const{ session: newSession } = useSessionContext();

  console.log("Session Data:", newSession);

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

  const changeTheme = () => {
    toggleDarkMode();
    if(theme == "light"){
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <nav className= "bg-[#181819] shadow-sm sticky top-0 z-50 bg-opacity-70 backdrop-blur-md">
      <div className="nav-container flex items-center justify-between px-6 sm:px-12 py-2">
        <div className="flex items-center">
          <Link href="/" className="logo flex items-center justify-start gap-2">
            <Image
              src={logo}
              alt="image"
              className="w-10 h-11 sm:w-11 sm:h-11 p-[0.4rem]"
            />
            <p className="text-xl font-semibold text-slate-100">Blogs</p>
          </Link>
        </div>
  
        <div className="right-sec flex items-center justify-center gap-4">
        <div className="items-center hidden lg:flex">
        <DropdownMenu className="cursor-pointer -mt-5 ">
            <DropdownMenuTrigger className="user-info flex items-center justify-start gap-3 cursor-pointer outline-none">
              <Image src={newSession == null ? userImage : newSession?.user?.userImage} alt="image" width={50} height={50} className="w-9 h-9" />
              <p className="text-xl font-semibold text-slate-100">Hi, {session?.user?.userName} </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-4 h-9">
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-md py-1 flex items-center justify-between ">
                <p className="m-0">Log out</p>
                <IoPowerSharp className="w-[1.1rem] h-[1.1rem]" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </div>

        <div className="hamburger-menu flex lg:hidden">
          <RxHamburgerMenu
            className="ham-icon w-7 h-7 cursor-pointer text-slate-200"
            onClick={openMobileMenu}
          />
          <IoMdClose
            className="close-icon w-7 h-7 cursor-pointer hidden text-slate-200"
            onClick={closeMobileMenu}
          />
        </div>
        <div className="menu-mobile flex flex-col items-start justify-between absolute top-16 -right-60 rounded-[8px] bg-[#1b1b1f] shadow-lg z-50 h-[40rem] py-5 px-10 w-60 pb-10">

          <DropdownMenu className="cursor-pointer -mt-5">
            <DropdownMenuTrigger className="user-info flex items-center justify-start gap-3 cursor-pointer outline-none">
              <Image src={userImage} alt="image" className="w-11 h-11" />
              <p className="text-xl font-semibold text-slate-100">Hi, {session?.user?.userName} </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-[7rem] -mt-1 h-9 ">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-md py-1 -mt-1 flex items-center justify-between ">
                <p className="m-0">Log out</p>
                <IoPowerSharp className="w-[18px] h-[18px] mt-[2px]" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
        </div>
      </div>
    </nav>
  );
};

export default Nav;
