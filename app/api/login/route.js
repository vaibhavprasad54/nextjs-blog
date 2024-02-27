import { NextResponse } from "next/server";
import User from "@/app/models/User"
import { connectDB } from "@/app/utils/connectDB";

connectDB();

export async function POST(req,res){
    
    const data = await req.json();
    console.log("Login data:", data);

    try {
        if(!data.email || !data.password){
            return NextResponse.json({ status: 400, body: { error: 'Email and Password are required' } })
        }
        // Finding user in DB
        const user = await User.findOne({ email: data.email })

        // If user exists
        if(!user){
            return NextResponse.json({ status: 404, body: {error: 'User not found'} });
        }

        //Checking password match
        if(data.password !== user.password){
            return NextResponse.json({ status: 401, body: { error: 'Incorrect password' } })
        }

        return NextResponse.json({ status: 200, body : { message: 'Login successful' } })

    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ status: 500, body: { error: 'Internal server error' } });
    }

}