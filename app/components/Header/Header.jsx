import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import { categories } from "../categories";
import CreateBtn from "../CreateBtn/CreateBtn";
import BlogForm from "../Form/BlogForm";

const Header = ({ onSearch, onCategorySelect }) => {

  const [open, setOpen] = useState(false);

    const handleOpenModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setSearchInput(text);
        onSearch(text);
      };

      const debouncedFunc = (func, delay) => {
        let timer;
        return function(...args){
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args)
            }, delay)
        }
      }

      const debouncedSearch = debouncedFunc(handleInputChange, 1000);

      const handleCategorySelect = (category) => {
        setBlogCategory(category);
        onCategorySelect(category);
        console.log("Cattttt:", category);
      }


  return (
    <div className="header flex flex-col w-full">
      <div className="header-top flex flex-col-reverse md:flex-row items-start md:items-center justify-between w-full pb-7">
        <div className="search relative md:w-96 mt-2">
          <div className="md:w-full">
            <input
              type="text"
              placeholder="Search Article"
              // value={searchInput}
              onChange={debouncedSearch}
              className="pl-11 pr-4 py-2 rounded-[10px] text-slate-100 border-[1px] border-gray-600 bg-[#232324] focus:outline-1 focus:outline-gray-500"
            />
            <FaSearch className="absolute top-[0.85rem] left-4 text-gray-500" />
          </div>
        </div>
        <div>
          <CreateBtn handleOpenModal={handleOpenModal}/>
          <BlogForm open={open} editModal={false} closeModal={closeModal} />
        </div>
      </div>
      
      
      <div className=" flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-5 w-full">
        <div className="left-options flex items-center justify-start gap-2 sm:gap-5">
          <p className="text-lg flex font-bold text-[#7770e0] cursor-pointer hover:text-gray-600">
            Latest <span className="hidden sm:flex pl-2">Article</span>
          </p>
          <p className="text-base font-bold text-gray-400 cursor-pointer hover:text-gray-600">
            Most Likes
          </p>
        </div>
        <div className="category-selector">
          <Select onValueChange={(value) => handleCategorySelect(value)}>
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
    </div>
  );
};

export default Header;
