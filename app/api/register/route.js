
import { connectDB } from "@/app/utils/connectDB";
import { NextResponse } from "next/server";
import User from "@/app/models/User"
import express from 'express';
import bcrypt from "bcryptjs";

// const router = express.Router();
// connectDB();
// router.use(express.json());

//==================Creating Log-in API=============
export async function POST(req, res) {

    try {
        connectDB();
        const {userName, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10)

        console.log("Myy Dataa2:", userName, email, password);

        // Check if user already exists
        const existingUser = await User.findOne({email: email}).select("_id");
        if (existingUser) {
            console.log("Exx:", existingUser);
            return NextResponse.json({ status: 400, body: { error: "User already exists" } });
        }

        // Create a new user
        const newUser = await User.create({ userName: userName, email: email, password: hashedPassword });
        // await newUser.save();
        return NextResponse.json({ status: 201, body: { message: "User registered successfully" } });

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({ status: 500, body: { error: 'Internal server error' } });
    }
}


// export async function GET(){
//     return NextResponse.json({ text: 'Hello' })
// }