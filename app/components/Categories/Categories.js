import React from 'react'

const Categories = () => {
  return (
    <div className='flex-col items-start justify-center hidden md:flex'>
        <div className="heading-category">
            <h2 className='text-[#23528e] font-bold text-2xl'>By Categories</h2>
        </div>
        <div className="categories flex flex-col text-white gap-3 mt-5 p-6 border-2 bg-white rounded-[15px]">
            <div className="grid-1 flex gap-3">
            <div className="Photography bg-sky-500 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Photography</p>
            </div>
            <div className="Software bg-gray-600 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Software</p>
            </div>
            <div className="Travel bg-emerald-500 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Travel</p>
            </div>
            </div>
            <div className="grid-2 flex gap-3">
            <div className="Blockchain bg-pink-400 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Blockchain</p>
            </div>
            <div className="Health bg-purple-400 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Health</p>
            </div>
            <div className="Hardware bg-red-400 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Hardware</p>
            </div>
            </div>
            <div className="grid-3 flex gap-3">
            <div className="Business bg-teal-500 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Business</p>
            </div>
            <div className="Arts bg-green-600 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Arts</p>
            </div>
            <div className="Explore bg-amber-500 py-2 px-4 rounded-[6px] cursor-pointer">
                <p>Explore</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Categories