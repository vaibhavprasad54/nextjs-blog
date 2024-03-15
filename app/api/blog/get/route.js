import { NextResponse } from "next/server";
import Blogs from "@/app/models/Blogs";
import { connectDB } from "@/app/utils/connectDB";
import express from 'express';


export async function POST(req, res){
  connectDB();

  try {
      const { userId, searchQuery, category } = await req.json();

      if (!userId) {
          return NextResponse.json({ status: 400, body: { error: "User id is mandatory." } })
      }

      let query = { userId };

      // Modify the query based on the searchQuery and category
      if (searchQuery || category) {
          if (searchQuery && category && category !== 'All') {
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
          } else if (category && category !== 'All') {
              query = {
                  ...query,
                  blogCategory: { $regex: category, $options: "i" },
              };
          }
      }

      const blogs = await (category === 'All' ? Blogs.find({ userId }) : Blogs.find(query));
      return NextResponse.json({ status: 200, data: { blogs } });

  } catch (error) {
      console.log("Error:", error);
      return NextResponse.json({ status: 500, body: { error: "Internal server error" } });
  }
}

