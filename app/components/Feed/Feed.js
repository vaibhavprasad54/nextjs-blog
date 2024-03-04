"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import CreateBtn from "../CreateBtn/CreateBtn";
import Link from "next/link";

const Feed = () => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
  };

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
    enabled: session?.user?.id != null && session?.user?.id != "",
  });

  if (isError) return <p>Error Occured..!!</p>;


//=====================JSX Starts====================
  return (
    <div className="relative w-full">

    <div className="header-section flex items-center pt-8">
      <Header onSearch={handleSearch} onCategorySelect={handleCategorySelect} />
    </div>

      <div className="feed my-5 flex flex-col gap-4 relative overflow-y-auto h-[34rem]">
        {isLoading ?  (
        <div className="loader" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Loader />
        </div>
        )  : (
          <>
          {data?.length > 0 ? (
            data?.map((item, index) => (
              <div
                key={index}
                className="card flex flex-col sm:flex-row items-start justify-start gap-4 md:gap-10 w-full bg-[#f0ebff] p-6 md:p-7 rounded-[14px] shadow-md shadow-[#d3c4e2]"
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
                    <h1 className="font-bold text-lg md:text-2xl text-[#8c6bec] line-clamp-2">
                      {item?.blogTitle ? item?.blogTitle : "N/A"}
                    </h1>
                    <p className="pt-1 md:pt-3 text-gray-600  text-sm md:text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: item.blogDesc }}>
                      
                      {/* {item?.blogDesc ? item?.blogDesc : "N/A"} */}
                    </p>
                  </div>
                  <div className="content-footer w-full flex items-center justify-between pt-4 mb-2">
                    <Link href={`/blog/${item?._id}`} className="text-[#8c6bec] cursor-pointer">Read more...</Link>
                    <div className="post-info flex gap-5">
                      <div className="flex items-center justify-center gap-1">
                        <AiFillLike className="text-lg text-[#8c6bec]" />
                        <p>32</p>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <FaCommentDots className="text-lg text-[#8c6bec]" />
                        <p>64</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="no-data flex items-center justify-center">
                <p className="text-center font-semibold mt-5 border-2 w-max border-slate-400 px-5 py-2 rounded-sm">
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
