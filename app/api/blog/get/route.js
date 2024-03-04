import { NextResponse } from "next/server";
import Blogs from "@/app/models/Blogs";
import { connectDB } from "@/app/utils/connectDB";
import express from 'express';


export async function POST(req, res){

    connectDB();

    try {
        const {userId, searchQuery, category} = await req.json();
        console.log("Reqqqqq:", userId);
        console.log("Req2:", searchQuery);
        console.log("Req3:", category);
        const searchText = searchQuery;

        if(!userId){
          return NextResponse.json({ status: 400, body: { error: "User id is mandatory." } })
        }

        let query = { userId };

         // Searching the specific entries from DB based on user's search and Category.
         if (searchQuery || category) {
            if (searchQuery && category) {
              query = {
                ...query,
                $and: [
                  {
                    $or: [
                      { blogTitle: { $regex: searchQuery, $options: "i" } },
                      { blogDesc: { $regex: searchQuery, $options: "i" } },
                    ],
                  },
                  { blogCategory: { $regex: category, $options: "i" } },
                ],
              };
            } else if (searchQuery) {
              query = {
                ...query,
                $or: [
                  { blogTitle: { $regex: searchQuery, $options: "i" } },
                  { blogDesc: { $regex: searchQuery, $options: "i" } },
                ],
              };
            } else if (category) {
              query = {
                ...query,
                blogCategory: { $regex: category, $options: "i" },
              };
            }
          }


        const blogs = await Blogs.find(query);
        return NextResponse.json({ status: 200, data: { blogs } });

    } catch (error) {
        console.log("Errorrrr:", error);
        return NextResponse.json({ status:500, body: { error: "Internal server error" } });
    }
}
