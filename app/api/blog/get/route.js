import { NextResponse } from "next/server";
import Blogs from "@/app/models/Blogs";
import { connectDB } from "@/app/utils/connectDB";
import express from 'express';

// const router = express.Router();
connectDB();
// router.use(express.json());

export async function POST(req, res){


    try {
        const userId = await req.json();
        console.log("Reqqqqq:", userId?.userId);
        if(!userId?.userId){
          return NextResponse.json({ status: 400, body: { error: "User id is mandatory." } })
        }

        const blogs = await Blogs.find({ userId: userId?.userId });
        return NextResponse.json({ status: 200, data: { blogs } });

    } catch (error) {
        console.log("Errorrrr:", error);
        return NextResponse.json({ status:500, body: { error: "Internal server error" } });
    }
}
