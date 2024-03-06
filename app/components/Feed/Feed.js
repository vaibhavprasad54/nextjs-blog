"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots, FaHeart } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import CreateBtn from "../CreateBtn/CreateBtn";
import Link from "next/link";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import BlogForm from "../Form/BlogForm";

const Feed = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const openEditModal = () => {
    setIsOpen(true);
  }

  const handleCategorySelect = (text) => {
    setCategory(text);
    console.log("txxt", text);
  }


  //================Data fetching using Tanstack Query=============== 
  const { data, isError, isLoading } = useQuery({
    queryKey: ['blogs', session?.user?.id, searchText, category],
    queryFn: async () => {
        const {data} = await axios.post("/api/blog/get", { userId: session?.user?.id, searchQuery: searchText, category: category });
        return data?.data?.blogs?.reverse();
    },
    staleTime: 10000,
    // enabled: session?.user?.id != null && session?.user?.id != "",
  });

  if (isError) return <p>Error Occured..!!</p>;


//=====================JSX Starts====================
  return (
    <div className="relative w-full"> 

    <div className="header-section flex items-center pt-8">
      <Header onSearch={handleSearch} onCategorySelect={handleCategorySelect} />
    </div>

      <div className="feed my-5 flex flex-col gap-5 relative overflow-y-auto h-[34rem]">
        {isLoading ?  (
        <div className="loader" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Loader height="60" width="60" />
        </div>
        )  : (
          <>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <div
                key={index}
                className="card flex flex-col sm:flex-row items-start justify-start gap-4 md:gap-10 w-full bg-[#1b1b1f] p-6 md:p-7 rounded-[14px] border-[1px] border-[#7770e02f] shadow-md"
              >
                <div className="image md:w-64 w-full">
                  <Image
                    src={item?.blogImage}
                    width={250}
                    height={250}
                    alt="blog-image"
                    className="md:h-40 h-36 w-full rounded-[12px] shadow-xl object-cover"
                  />
                </div>
                <div className="content max-w-4xl w-full flex flex-col items-start justify-between h-40">
                  <div className="text-content">
                    <h1 className="font-bold text-lg md:text-2xl text-slate-100 line-clamp-2">
                      {item?.blogTitle ? item?.blogTitle : "N/A"}
                    </h1>
                    <p className="pt-1 md:pt-3 text-gray-300  text-sm md:text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: item.blogDesc }}>
                      
                      {/* {item?.blogDesc ? item?.blogDesc : "N/A"} */}
                    </p>
                  </div>
                  <div className="content-footer w-full flex items-center justify-between pt-4 mb-2">
                    <Link href={`/blog/${item?._id}`} className="text-gray-400 cursor-pointer hover:text-slate-200">Read more...</Link>
                    <div className="post-info flex gap-5">
                      <div className="flex items-center justify-center gap-1">
                        {/* <FaHeart className="text-2xl text-red-400 hover:text-red-600 transition-colors duration-50 ease-in-out cursor-pointer" /> */}
                        <RiEditBoxFill onClick={openEditModal} className="text-2xl text-[#7f77e9] hover:text-[#6962c8] transition-colors duration-50 ease-in-out cursor-pointer" />
                        <MdDelete className="text-[25px] text-[#7f77e9] hover:text-[#6962c8] transition-colors duration-50 ease-in-out cursor-pointer" />
                      </div>
                     
                      <BlogForm open={isOpen} editModal={true} closeModal={closeModal} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="no-data flex items-center justify-center">
                <p className="text-center font-semibold mt-5 border-2 w-max text-gray-300 border-slate-400 px-5 py-2 rounded-sm">
                  No data available!
                </p>
              </div>
            </>
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;
