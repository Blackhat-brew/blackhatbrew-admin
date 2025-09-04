import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionStr } from "@/app/lib/db";
import { project } from "@/app/lib/model/project";
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
  console.log("Processing request...");

  try {
    await connectDB();

    const {
      id,
      title,
      category,
      description,
      pro,
      details,
      backgroundImage,
      logo,
      images = [],
      reviews = [],
      githubLink,
      instructions = [],
    } = await request.json();

 
    // ✅ Validate required fields
    if (!title || !category || !description) {
      return setCORSHeaders(
        NextResponse.json(
          { message: "Title, category, and description are required", success: false },
          { status: 400 }
        )
      );
    }

    // ✅ Upload single background image
    let backgroundImageObj = null;
    if (backgroundImage) {
      const uploadedBg = await cloudinary.uploader.upload(backgroundImage, {
        folder: "projects/backgrounds",
      });
      backgroundImageObj = {
        public_id: uploadedBg.public_id,
        url: uploadedBg.secure_url,
      };
    }

    // ✅ Upload single logo
    let logoObj = null;
    if (logo) {
      const uploadedLogo = await cloudinary.uploader.upload(logo, {
        folder: "projects/logos",
      });
      logoObj = {
        public_id: uploadedLogo.public_id,
        url: uploadedLogo.secure_url,
      };
    }

    // ✅ Upload multiple images (array)
    let uploadedImages = [];
    if (Array.isArray(images) && images.length > 0) {
      uploadedImages = await Promise.all(
        images.map(async (img) => {
          const uploaded = await cloudinary.uploader.upload(img, {
            folder: "projects/images",
          });
          return {
            public_id: uploaded.public_id,
            url: uploaded.secure_url,
          };
        })
      );
    }

    // ✅ Create project
    const newProject = new project({
      id,
      title,
      category,
      description,
      pro,
      details,
      backgroundImage: backgroundImageObj,
      logo: logoObj,
      images: uploadedImages,
      reviews, // already array
      githubLink,
      instructions, // already array
    });

    await newProject.save(); 

    data = { message: "Project created successfully!" };
  } catch (error) {
    console.error("Error occurred:", error);
    data = {
      message: error.message || "An error occurred while processing the request.",
    };
    success = false;
  }

  const response = NextResponse.json(
    { result: data, success },
    { status: success ? 200 : 500 }
  );
  return setCORSHeaders(response);
}


// pages/api/project.js


export async function GET() {
  await connectDB(); // Connect to the database

  try {
    // Fetch all project from the database
    const projectData = await project.find();  // Use Mongoose query to get all project
    return new Response(JSON.stringify(projectData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error occurred while fetching project:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching project" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

