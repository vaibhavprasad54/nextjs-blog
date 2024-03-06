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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import TipTap from "../TextEditor/TipTap/TipTap";
import Loader from "../Loader/Loader";


const BlogForm = ({ open, setOpen, closeModal, editModal }) => {

  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [imageFile, setImageFile] = useState("");
  const [category, setCategory] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [isImageError, setIsImageError] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const { toast } = useToast();

  const queryClient = useQueryClient();

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

  const { mutate: submitBlog, isLoading } = useMutation({
    mutationFn: async(data) => 
    {
    setBtnClicked(true);
    data = { ...data, blogDesc: editorContent, blogImage: imageFile, userId: session?.user?.id };
    await axios.post("/api/blog/create", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
    onSuccess: () => {
      setValue("blogTitle", "");
        setValue("blogDesc", "");
        setOpen(false);
        toast({
          title: "Blog created successfully",
          description: "Wohoo, Keep writing!",
          variant: "default",
        });
        queryClient.invalidateQueries(["blogs"])
        console.log("Blog created successfully");
        setBtnClicked(false);
    },
    onError: () => {
      toast({
        title: "Error while creating blog!",
        description: "Try again...",
        variant: "destructive",
      });
    }
  })
  

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

    if(file.size > (2 * 1024 * 1024)){
      setIsImageError(true);
      toast({
        title: "Error: Image size exceeded!",
        description: "Upload image less than 2 MB.",
        variant: "destructive",
      });
      return;
    }
    setIsImageError(false);

    console.log("Image:", file);
    const base64 = await convertToBase64(file);
    setImageFile(base64);
    console.log("Yuuu:", base64);
  };

  const onChange = (data) => {
    console.log(data);
    setEditorContent(data);
  }
 
  return (
    <form className="w-full sm:mt-0 sm:flex sm:items-center sm:justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl h-[85%] bg-[#0a0a0c] border-[1px] border-slate-500">
            <DialogHeader>
              <DialogTitle className="text-2xl text-[#7770e0]">
                {editModal ? "Edit Blog" : "Create Blog"}
              </DialogTitle>
              <DialogDescription>
                <div className="blogForm mt-5 rounded-[8px] flex flex-col gap-3 h-[27rem] overflow-y-auto p-3">
                  <div className="title">
                    <label className="text-xl font-semibold text-slate-200">Title</label>
                    <input
                      type="text"
                      name="blogTitle"
                      placeholder="Enter Title"
                      {...register("blogTitle", {
                        required: "This is required",
                      })}
                      className="outline-none bg-[#1b1b1f] font-semibold text-base sm:text-lg py-3 my-2 px-5 w-full rounded-[7px] placeholder-slate-400 placeholder:font-normal placeholder:text-md text-slate-800 border-[1px] border-[#7770e02f]"
                    />
                  </div>
                  <div className="desc">
                    <label className="text-xl font-semibold text-slate-200">Description</label>
                    <TipTap onChange={onChange} />
                  </div>

                  <div className="category">
                    <label className="text-xl font-semibold text-slate-200">Category</label>
                    <div className="select-element my-2">
                    <Select name="blogCategory" onValueChange={(value) => setValue("blogCategory", value)}>
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
                    <label className="text-xl font-semibold text-slate-200">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="blogImage"
                      {...register("blogImage", {
                        required: "This is required",
                      })}
                      onChange={(e) => handleImageUpload(e)}
                      className="outline-none bg-[#1b1b1f] text-md py-3 my-2 font-semibold px-5 w-full rounded-[7px] border-[1px] border-[#7770e02f]"
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
                <button onClick={closeModal} className=" bg-[#bab6f2] hover:bg-[#aba7eb] text-[#000] px-5 py-2 rounded-md mt-4">
                  Cancel
                </button>
              </DialogClose>
              <DialogFooter asChild>
                <button
                  type="submit"
                  disabled={isImageError}
                  onClick={handleSubmit(submitBlog)}
                  className="bg-[#7770e0] hover:bg-[#6e67d0] text-white px-5 py-2 rounded-md mt-4"
                >
                  {btnClicked ?  <Loader height="25" width="25" /> : "Submit"}
                </button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
    </form>
  );
};

export default BlogForm;
