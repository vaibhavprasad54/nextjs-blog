import axios from "axios";
import Image from "next/image";
import React from "react";
import creatorImg from "../../../public/assets/man.png";
import { FaHeart } from "react-icons/fa6";
import { RiEditBoxFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";


//========API Call to fetch blog based on id==========
const getBlogsById = async (id) => {
  const res = await axios.post(`http://localhost:3000/api/blog/get/${id}`, {
    blogId: id,
  });
  console.log("dddd:", res.data?.data?.blog);
  return res.data?.data?.blog;
};


//==========================Component Starts========================
const ViewBlog = async ({ params }) => {
    
  const blog = await getBlogsById(params.id);

  return (
    <div className="w-full pt-16 p-8 md:p-16">
      <div className="blog-details-section w-full">
        <div className="blog-image relative flex flex-col items-center justify-center">
          <div className="image-container md:w-[85%] relative">
            <Image
              src={blog.blogImage}
              width={400}
              height={300}
              className="w-full md:h-[32rem] object-cover -mt-5 z-0 shadow-lg rounded-md"
            />
            <div
              className="absolute inset-0 rounded-md"
              style={{
                mixBlendMode: "multiply",
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0) 100%)",
              }}
            ></div>
          </div>

          <div className="blog-heading mt-[-5.5rem] z-50 flex items-end justify-between md:w-[85%] px-4 md:px-14">
            <div className="left-content">
              <p className="text-slate-200"> {blog?.blogCategory ? blog?.blogCategory : "N/A"} </p>
              <h1 className="text-lg md:text-3xl font-bold text-white w-full line-clamp-2 md:line-clamp-1">
                {" "}
                {blog?.blogTitle}{" "}
              </h1>
            </div>
            <div className="right-content hidden md:flex items-start justify-center gap-2">
              <Image src={creatorImg} className="w-10 h-10 rounded-full" />
              <div className="creator">
                <p className="text-slate-300 text-xs">Written by:</p>
                <p className="text-white text-base">Vaibhav</p>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-desc-section mt-5 md:mt-10 w-full flex flex-col items-center justify-center">
          <div className="blog-desc w-full md:w-[85%]">
            <p className="px-1 text-gray-300" dangerouslySetInnerHTML={{ __html: blog.blogDesc }}>
              {/* {blog?.blogDesc} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
