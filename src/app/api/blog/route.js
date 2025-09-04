import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionStr } from "@/app/lib/db";
import { blogs } from "@/app/lib/model/blog";
import { v2 as cloudinary } from 'cloudinary';

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

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key, // Click 'View API Keys' above to copy your API key
  api_secret: process.env.api_secret  // Click 'View API Keys' above to copy your API secret
});

export async function POST(request) {
  let success = true;
  let data = {};
  console.log('Processing request...');

  await connectDB();

  try {
    const { title, blog, tags, shortblog, image } = await request.json(); // Parse the request body

    console.log(image)
    // Validate the input data
    if (!title || !blog || !tags || !shortblog) {
      throw new Error('Title, blog content, and tags are required.');
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
      // width: 300,
      // crop: "scale"
    })
    console.log('cloudnary done...');
    console.log('cloudnary done...', result);

    const newBlog = new blogs({
      title, blog, tags, shortblog,
      image: { public_id: result.public_id, url: result.secure_url },
    });
    await newBlog.save();

    data = { message: "Blog post created successfully!" };
  } catch (error) {
    console.error("Error occurred:", error);
    data = { message: error.message || "An error occurred while processing the request." };
    success = false;
  }

  const response = NextResponse.json({ result: data, success }, { status: success ? 200 : 500 });
  return setCORSHeaders(response);
}

// pages/api/blogs.js


export async function GET() {
  await connectDB(); // Connect to the database

  try {
    // Fetch all blogs from the database
    const blogsData = await blogs.find();  // Use Mongoose query to get all blogs
    return new Response(JSON.stringify(blogsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred while fetching blogs:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching blogs" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

