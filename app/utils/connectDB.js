import dotenv from "dotenv";
const mongoose = require('mongoose');
const express = require('express');

dotenv.config();

//=========Connecting to Database==========
export const connectDB = async () => {

  const connString = process.env.MONGODB_URI
  console.log("URI:", process.env.MONGODB_URI);

  try {
    const { connection } = await mongoose.connect(connString, {
      dbName: "BlogDB",
    });

    console.log("Connected to DB!", connection);
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};
