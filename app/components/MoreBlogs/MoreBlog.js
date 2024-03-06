import React from 'react'

const MoreBlog = () => {
  return (
    <div>
        <div className="more-blogs w-full hidden md:flex flex-col items-start justify-start mt-5 gap-4">
            <h2 className='text-xl font-bold text-[#7770e0]'>More Blogs</h2>
            <div className="cards flex flex-col items-start gap-4 max-w-96">
                <div className="card bg-[#f0ebff] p-5 rounded-[12px] shadow-md shadow-[#d3c4e2]">
                    <h2 className='text-lg font-bold text-[#7770e0]'>Upgrading to Macbook Pro M3</h2>
                    <p className='text-gray-800'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi necessitatibus saepe repellendus animi sit voluptatibus nam voluptas?</p>
                </div>
                <div className="card bg-[#f0ebff] p-5 rounded-[12px] shadow-md shadow-[#d3c4e2]">
                    <h2 className='text-lg font-bold text-[#7770e0]'>Installing Linux in 2024</h2>
                    <p className='text-gray-800'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi necessitatibus saepe repellendus animi sit voluptatibus nam voluptas?</p>
                </div>
                <div className="card bg-[#f0ebff] p-5 rounded-[12px] shadow-md shadow-[#d3c4e2]">
                    <h2 className='text-lg font-bold text-[#7770e0]'>Full stack development</h2>
                    <p className='text-gray-800'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi necessitatibus saepe repellendus animi sit voluptatibus nam voluptas?</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MoreBlog