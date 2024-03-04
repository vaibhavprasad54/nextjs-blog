"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import logo from "../../../public/assets/logo.png";
import userImage from "../../../public/assets/man.png";
import { IoMdHome } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { GoBellFill } from "react-icons/go";
import { IoMoon, IoSettingsSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { BsFillMoonStarsFill } from "react-icons/bs";
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
import { FaSun } from "react-icons/fa6";
import { ThemeContext } from "@/app/context/ThemeContext";

const Nav = () => {

  const {data: session} = useSession();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [theme, setTheme] = useState("light");

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

  const changeTheme = () => {
    toggleDarkMode();
    if(theme == "light"){
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <nav className={`${darkMode ? 'bg-slate-700' : 'bg-white'} shadow-sm sticky top-0 z-50`}>
      <div className="nav-container flex items-center justify-between px-6 sm:px-12 py-1">
        <div className="flex items-center">
          <Link href="/" className="logo flex items-center justify-start gap-2">
            <Image
              src={logo}
              alt="image"
              className="w-10 h-11 sm:w-11 sm:h-11 p-[0.4rem]"
            />
            <p className="text-xl font-semibold text-[#8c6bec]">Blogs</p>
          </Link>
        </div>
  
        <div className="right-sec flex items-center justify-center gap-4">
        <div className="items-center hidden lg:flex">
        <DropdownMenu className="cursor-pointer -mt-5 ">
            <DropdownMenuTrigger className="user-info flex items-center justify-start gap-3 cursor-pointer outline-none">
              <Image src={userImage} alt="image" className="w-9 h-9" />
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

        <div className="hidden md:flex dark-mode-btn cursor-pointer" onClick={changeTheme}>
          <div className={`btn-background relative flex items-center justify-between px-1 w-12 h-6 rounded-[20px] shadow-md ${theme == "dark" ? 'bg-slate-800' : 'bg-orange-400'}`}>
            <div className={`btn-ball w-4 h-4 rounded-full bg-white ${theme == "dark" ? 'ml-6' : 'ml-0'}`}></div>
            {theme == "light" && <FaSun className="text-white text-xs mr-1" />}
            {theme == "dark" && <BsFillMoonStarsFill className="text-white text-xs ml-1 absolute top-[6px]" />}
          </div>
        </div>
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
          
          <div className="flex dark-mode-btn cursor-pointer" onClick={changeTheme}>
          <div className={`btn-background relative flex items-center justify-between px-1 w-12 h-6 rounded-[20px] shadow-md ${theme == "dark" ? 'bg-slate-800' : 'bg-orange-400'}`}>
            <div className={`btn-ball w-4 h-4 rounded-full bg-white ${theme == "dark" ? 'ml-6' : 'ml-0'}`}></div>
            {theme == "light" && <FaSun className="text-white text-xs mr-1" />}
            {theme == "dark" && <BsFillMoonStarsFill className="text-white text-xs ml-1 absolute top-[6px]" />}
          </div>
        </div>

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
