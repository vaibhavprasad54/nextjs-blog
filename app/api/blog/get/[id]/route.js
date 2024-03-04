import { connectDB } from "@/app/utils/connectDB";
import { NextResponse } from "next/server";
import Blogs from "@/app/models/Blogs";



export async function POST(req, res) {

    connectDB();

    try {
        
        const { blogId } = await req.json();
        if(!blogId){
            return NextResponse.json({
                status: 400,
                body: { error: "User id and Blog id are mandatory." }
            })
        }

        const query = { _id: blogId }
        const blog = await Blogs.findOne(query);

        if(!blog){
          return NextResponse.json({
            status: 404,
            body: { error: "Blog not found for the given user and id." },
          });
        }

        return NextResponse.json({
            status: 200,
            data: { blog },
        })

    } catch (error) {
        console.error("Error:", error);
         return NextResponse.json({
          status: 500,
          body: { error: "Internal server error" },
         });
    }

}