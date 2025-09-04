import { NextResponse } from "next/server";
 import mongoose from "mongoose";
import { ConnectionStr } from "@/app/lib/db";
import { user1 } from "@/app/lib/model/user1";


const setCORSHeaders = (response) => {
  response.headers.set('Access-Control-Allow-Origin', '*'); // Change '*' to your specific domain if needed (e.g., http://localhost:5173)
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
};

export function OPTIONS() {
  const response = NextResponse.json({});
  return setCORSHeaders(response);
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(ConnectionStr);
};

// Handler for POST requests
export async function POST(request) {
  try {
    const { name, email, message } = await request.json();
    await connectDB();
    const newUser = new user1({ name, email1:email, message });
    const result = await newUser.save();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Construct the email message content
  

    // Send email (implement your email sending logic in `sendEmail`)
 
    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    // Fetch all users from the collection
    const users = await user1.find();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}


 