import { NextResponse } from "next/server";
import Blogs from "@/app/models/Blogs";
import { connectDB } from "@/app/utils/connectDB";
import express from 'express';

const router = express.Router();
connectDB();
router.use(express.json());

export async function DELETE(req, res){
    const data = await req.json();
    console.log("ID Delete:", data);

    try {
        if(!data.id){
            return NextResponse.json({ status: 400, body: { error: "Blog ID is mandatory for deletion." }});
        }

        const deletedBlog = await Blogs.findByIdAndDelete(data.id);

        if(!deletedBlog){
            return NextResponse.json({ status: 404, body: { error: "Blog not found!" } })
        }

        return NextResponse.json({ status: 200, body: { message: "Blog deleted successfully!" } })


    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ status: 500, body: { error: 'Internal server error' } });
    }

}