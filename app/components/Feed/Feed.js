"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../categories";
import { Oval } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

const Feed = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchedBlogs, setSearchedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const { data, error, isPending } = useQuery({
    queryKey: ["blogs", session?.user?.id],
    queryFn: async () => {
      const res = await axios.post(
        "/api/blog/get",
        {
          userId: session?.user?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    },
    staleTime: 3000,
  });

  if (isPending) {
    return (
      <Oval
        visible={true}
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{ position: "absolute", top: "4rem", left: "32rem" }}
        wrapperClass=""
      />
    );
  }

  if (error) {
    return <p>Error Occured ${error.message}</p>;
  }

  if (data?.status == 200) {
    data?.data?.blogs?.reverse();
    console.log("TS:", data);
  }

  // const fetchBlogs = async () => {
  //   console.log("DDDD:", session?.user?.id);
  //   setIsLoading(true);
  //   if (session && session?.user && session?.user?.id) {
  //     console.log("Fetching blogs for userId:", session.user.id);
  //     try {
  //       const res = await axios.post(
  //         "/api/blog/get",
  //         {
  //           userId: session?.user?.id,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (res.status == 200) {
  //         const blogData = await res.data;
  //         setBlogs(blogData?.data?.blogs.reverse());
  //         console.log("My Blogs", blogData?.data?.blogs);
  //         setIsLoading(false);
  //       } else {
  //         console.log("Error in fetching blogs!");
  //       }
  //     } catch (error) {
  //       console.log("BlogError:", error);
  //     }
  //   } else {
  //     console.log("Session not available, skipping fetchBlogs");
  //   }
  // };

  // useEffect(() => {
  //   fetchBlogs();
  // }, [session]);

  const searchBlogs = (query) => {
    setSearchQuery(query);
    const filtered = data?.data?.blogs.filter((item) =>
      item.blogTitle.toLowerCase().includes(query.toLowerCase())
    );
    if (query !== "") {
      setSearchedBlogs(filtered);
    } else {
      setSearchedBlogs([]);
    }
    // console.log("Filtered Blogs:", filtered);
  };

  const filterCategories = (query) => {
    // console.log("Qqqq:", query);
    setIsLoading(true);
    if (query) {
      setFilterQuery(query);
      const filteredBlogs =
        query !== "All"
          ? data?.data?.blogs.filter(
              (item) =>
                item?.blogCategory?.toLowerCase() === query.toLowerCase()
            )
          : data?.data?.blogs;
      if (filteredBlogs.length > 0) {
        setFilteredBlogs(filteredBlogs);
        setIsLoading(false);
      } else {
        setFilteredBlogs([]);
        setIsLoading(false);
      }
    } else {
      setFilteredBlogs([]);
      setIsLoading(false);
    }
  };

  if (data) {
    var dataToMap = searchQuery
      ? searchedBlogs
      : filterQuery
      ? filteredBlogs
      : data?.data?.blogs;
  }
  console.log("jhfgjh:", data?.data?.blogs, dataToMap);

  return (
    <div className="py-1 relative -mt-[62px]">
      <div className="w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search Article"
          onChange={(e) => searchBlogs(e.target.value)}
          className="pl-11 pr-4 py-2 rounded-[10px] border-2 border-gray-200 w-full mb-7"
        />
        <FaSearch className="absolute top-[0.85rem] left-4 text-gray-500" />
      </div>
      <div className="header flex items-center justify-between gap-2 sm:gap-5 w-full">
        <div className="left-options flex items-center justify-start gap-2 sm:gap-5">
          <p className="text-xl flex font-bold text-[#8c6bec] cursor-pointer hover:text-gray-600">
            Latest <span className="hidden sm:flex pl-2">Article</span>
          </p>
          <p className="text-lg font-bold text-gray-400 cursor-pointer hover:text-gray-600">
            Most Likes
          </p>
        </div>
        <div className="category-selector">
          <Select onValueChange={(value) => filterCategories(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="feed my-5 flex flex-col gap-4 relative w-[64rem]">
        {dataToMap?.length > 0 ? (
          dataToMap.map((item, index) => (
            <div
              key={index}
              className="card flex flex-col sm:flex-row items-start justify-start gap-10 sm:w-[100rem] w-full max-w-5xl bg-[#f0ebff] p-7 rounded-[14px] shadow-md shadow-[#d3c4e2]"
            >
              <div className="image w-64">
                <Image
                  src={item?.blogImage}
                  width={250}
                  height={250}
                  alt="blog-image"
                  className="h-40 rounded-[12px] shadow-xl object-cover"
                />
              </div>
              <div className="content max-w-2xl w-full flex flex-col items-start justify-between h-40">
                <div className="text-content">
                  <h1 className="font-bold text-xl text-[#8c6bec]">
                    {item?.blogTitle ? item?.blogTitle : "N/A"}
                  </h1>
                  <p className="pt-3 text-gray-700 line-clamp-3">
                    {item?.blogDesc ? item?.blogDesc : "N/A"}
                  </p>
                </div>
                <div className="content-footer w-full flex items-center justify-between pt-4">
                  <p className="text-[#8c6bec] cursor-pointer">Read more...</p>
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
      </div>
    </div>
  );
};

export default Feed;
