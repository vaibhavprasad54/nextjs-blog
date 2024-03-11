"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import uploadImg from "../../public/assets/upload-img.png"
import waveImg from "../../public/assets/wave.png"
import { useSession } from 'next-auth/react';
import axios from 'axios'
import { useSessionContext } from '../SessionContext'

const Page = () => {

  const {data: session} = useSession();
  const [userImage, setUserImage] = useState("");

  const { updateSession } = useSessionContext();

  console.log("xxcc:", session);

  const handleImageUpload = async() => {
     try {
        const res = await axios.post('/api/user-image', {
            userImage: userImage,
            sessionData: session ? session.user : null,
        })

        if(res.status == 200){
            await axios.get('/api/auth/session');
            const updated = {...session, user: {...session.user, userImage:  res.data.data.userImage}};
            console.log("Uppp:", updated);
            updateSession(updated);
        } else {
            console.error('Failed to upload profile image');
        }
     } catch (error) {
        console.error('Error uploading profile image', error);
     }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        console.log("UsserImagee:", reader.result);
        setUserImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className='w-full h-[90vh] flex items-center justify-center'>
        <div className="edit-account w-2/5 bg-[#7770e0] flex flex-col items-center justify-center p-5 gap-3 shadow-md rounded-md">
            <div className='text-center'>
                <div className="header flex items-center justify-center gap-2">
                    <h2 className='text-2xl font-semibold'>{`Hi ${session?.user?.userName}`}</h2>
                    <Image src={waveImg} width={30} height={30} className='drop-shadow-lg my-1' />
                </div>
                <p className='text-xl font-semibold text-[#1b1b1f]'>Upload Profile Image</p>
            </div>
            <div className="div flex flex-col items-center justify-center">
                <Image src={uploadImg} width={60} height={60} className='drop-shadow-lg my-1' />
                <input onChange={handleImageChange} type="file" className='rounded-[4px] text-center'/>
            </div>
            <button onClick={handleImageUpload} className='px-7 py-2 bg-slate-200 hover:bg-slate-100 my-2 text-base rounded-[4px] w-48'>
                Save
            </button>
        </div>
    </div>
  )
}

export default Page