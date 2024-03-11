import { connectDB } from "@/app/utils/connectDB";
import User from "@/app/models/User"
import express from 'express';
import { NextResponse } from "next/server";

const router = express.Router();
connectDB();
router.use(express.json());

export async function POST (req, res) {
    try {

        const { userImage, sessionData } = await req.json();
        console.log("xxcccc:", sessionData);

        if(!sessionData.id){
          return NextResponse.json({ status: 401, error: 'Unauthorized' })
        }

          sessionData.userImage = userImage;

          const sessionDataNew = { ...sessionData, userImage: userImage };
          console.log("zcvvv:", sessionData);
          return NextResponse.json({ status: 200, success: true, data: sessionDataNew })

    } catch (error) {
        console.error('Error uploading profile image', error);
          return NextResponse.json({ status: 500, error: 'Internal Server Error' })
    }
}