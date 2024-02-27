import Blogs from "@/app/models/Blogs";
import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/connectDB";
import express from 'express';
import multer from "multer";

const router = express.Router();
connectDB();
router.use(express.json());

export async function POST(req, res){
    const data = await req.json();
    console.log("BlogData:", data);

    try {
        if(!data.blogTitle || !data.blogDesc){
            NextResponse.json({ status: 400, body: { error: 'Title and Description are mandatory.' } })
        }

        const newBlog = new Blogs({ blogTitle: data.blogTitle, blogDesc: data.blogDesc, blogCategory: data.blogCategory, blogImage: data.blogImage, userId: data.userId })
        await newBlog.save();
        return NextResponse.json({ status: 201, body: { message: "Blog created successfully" } })

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ status: 500, body: { error: 'Internal server error' } })
    }
}