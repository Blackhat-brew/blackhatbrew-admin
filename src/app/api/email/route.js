import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionStr } from "@/app/lib/db";
import { user } from "@/app/lib/model/user";
 
 

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(ConnectionStr);
};


  export async function POST(request) {
    let success = true;
    let data = {};
    console.log('Processing request...');
    await connectDB();

    try {
      const { name, email } = await request.json(); // Parse the request body

      // Check if the email is already registered
      const existingUser = await user.findOne({ email }).exec();
      if (existingUser) {
        return NextResponse.json(
          { message: "Email already subscribed." },
          { status: 200 }
        );
      }

      // If email is not registered, create a new user
      const newUser = new user({ name, email });
      await newUser.save();

   

      data = { message: "Email sent successfully! and inserted into DB" };
    } catch (error) {
      console.error("Error occurred:", error);
      data = { message: "An error occurred while processing the request." };
      success = false;
    }

    const response = NextResponse.json({ result: data, success }, { status: success ? 200 : 500 });
    return response;
  }

  export async function GET() {
    try {
      await connectDB();
  
      // Fetch all users from the collection
      const users = await user.find();
  
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error("Error fetching user details:", error);
      return NextResponse.json(
        { message: "An error occurred while fetching data." },
        { status: 500 }
      );
    }
  }


 