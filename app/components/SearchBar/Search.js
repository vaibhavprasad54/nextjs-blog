"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
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

const Search = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [category, setCategory] = useState(null);

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    blogTitle: "",
    blogDesc: "",
    blogCategory: "",
    blogImage: "",
  });

  const handleValueChange = (value) => {
    setCategory(value);
  };

  const onSubmit = async(data) => {
    data = { ...data, blogImage: imageFile, userId: session?.user?.id };
    console.log("Blog:", data);

    try {
      const res = await axios.post("/api/blog/create", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 201 || res.status == 200) {
        setValue("blogTitle", "");
        setValue("blogDesc", "");
        setOpen(false);
        toast({
          title: "Blog created successfully",
          description: "Wohoo, Keep writing!",
          variant: "success",
        });
        console.log("Blog created successfully");
      } else {
        console.log("Unable to create blog.", res);
      }
    } catch (error) {
      console.log("Error during blog creation:", error);
    }
  };
  

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("Image:", file);
    const base64 = await convertToBase64(file);
    setImageFile(base64);
    console.log("Yuuu:", base64);
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-between">
      {/* <div className="w-full sm:w-3/4">
        <input
          type="text"
          placeholder="Search Article"
          className="pl-11 pr-4 py-2 rounded-[10px] border-2 border-gray-200 w-full"
        />
        <FaSearch className="absolute top-[0.85rem] left-4 text-gray-500" />
      </div> */}

      <form className="w-full mt-2 sm:mt-0 sm:flex sm:items-center sm:justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex items-center justify-start sm:justify-center gap-2 bg-[#8c6bec] text-white py-2 px-4 rounded-[7px]">
            <p>Create</p>
            <FiPlus className="text-lg" />
          </DialogTrigger>
          <DialogContent className="max-w-4xl bg-[#e7dfff]">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#8c6bec]">
                Create Blog
              </DialogTitle>
              <DialogDescription>
                <div className="blogForm mt-5 rounded-[8px] flex flex-col gap-3">
                  <div className="title">
                    <label className="text-xl font-semibold">Title</label>
                    <input
                      type="text"
                      name="blogTitle"
                      placeholder="Enter Title"
                      {...register("blogTitle", {
                        required: "This is required",
                      })}
                      className="outline-none bg-[#f8f6ff] text-base sm:text-xl py-3 my-1 font-semibold px-5 w-full rounded-[7px] shadow-md"
                    />
                  </div>
                  <div className="desc">
                    <label className="text-xl font-semibold">Description</label>
                    <textarea
                      type="text"
                      name="blogDesc"
                      cols={4}
                      rows={7}
                      placeholder="Enter Description"
                      {...register("blogDesc", {
                        required: "This is required",
                      })}
                      className="outline-none bg-[#f8f6ff] text-base sm:text-xl py-3 my-1 font-semibold px-5 w-full rounded-[7px] shadow-md"
                    />
                  </div>

                  <div className="category">
                    <label className="text-xl font-semibold">Category</label>
                    <div className="select-element py-1">
                    <Select name="blogCategory"  onValueChange={(value) => setValue("blogCategory", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories.map((item, index) => (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                          ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    </div>
                  </div>
                  <div className="desc">
                    <label className="text-xl font-semibold">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="blogImage"
                      {...register("blogImage", {
                        required: "This is required",
                      })}
                      onChange={(e) => handleImageUpload(e)}
                      className="outline-none bg-[#f8f6ff] text-lg py-3 my-1 font-semibold px-5 w-full rounded-[7px] shadow-md"
                    />
                    {/* {imageFile !== undefined || imageFile !== null || imageFile !== "" && ( */}
                    {/* <Image src={imageFile} width={100} height={100} /> */}
                    {/* // )} */}
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="actionBtns flex w-full items-center justify-end gap-5">
              <DialogClose asChild>
                <button className="border-2 bg-[#e7e1ff] border-[#8c6bec] text-[#000] px-5 py-2 rounded-md mt-4">
                  Cancel
                </button>
              </DialogClose>
              <DialogFooter asChild>
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="bg-[#8c6bec] text-white px-5 py-2 rounded-md mt-4"
                >
                  Submit
                </button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  );
};

export default Search;
