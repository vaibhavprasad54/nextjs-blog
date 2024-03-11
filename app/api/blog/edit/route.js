import { connectDB } from "@/app/utils/connectDB";
import express from 'express';
import Blogs from "@/app/models/Blogs";
import { NextResponse } from "next/server";

const router = express.Router();
connectDB();
router.use(express.json());

export async function PUT(req, res){
    const data = await req.json();
    console.log("Blog Edit Data:", data);

    try {
        if(!data.blogId){
            return NextResponse.json({ status: 400, body: { error: 'Blog ID is mandatory for update.' } });
        }

        const updateFields = {};

        // Check if each field exists in the request data and add it to the update object
        if (data.blogTitle) updateFields.blogTitle = data.blogTitle;
        if (data.blogDesc) updateFields.blogDesc = data.blogDesc;
        if (data.blogCategory) updateFields.blogCategory = data.blogCategory;
        if (data.blogImage) updateFields.blogImage = data.blogImage;
    
        // Use the $set operator to update only the specified fields
        const updatedBlog = await Blogs.findByIdAndUpdate(data.blogId, { $set: updateFields }, { new: true });

        if(!updatedBlog){
            return NextResponse.json({ status: 404, body: { error: 'Blog not found.' } });
        }

        return NextResponse.json({ status: 200, body: { message: "Blog updated successfully" } });

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ status: 500, body: { error: 'Internal server error' } });
    }

}