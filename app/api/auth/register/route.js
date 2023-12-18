import { connectDB } from "@/app/utils/connect";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    const {username, email, password} = await req.json();
    await connectDB()
    const exists = await User.findOne({$or:[{email},{username}]})
    if(exists){
        return NextResponse.json({message: "Email already exist"}, {status: 500})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
try {
    await User.create({username, email, password: hashedPassword})
    return NextResponse.json({message: "User registered"}, {status: 201});
} catch (error) {
    console.log("Error while registering user.", error);
    return NextResponse.json({message: "Error occured while registering the user"}, {status: 500});
}
}