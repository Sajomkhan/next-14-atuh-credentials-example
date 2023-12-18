import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB is connected");
    } catch (error) {
        console.log("Error while connecting DB.", error);        
    }
}