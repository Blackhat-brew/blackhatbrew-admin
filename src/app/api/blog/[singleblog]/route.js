import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionStr } from "@/app/lib/db";
import { blogs } from "@/app/lib/model/blog";

export async function DELETE(req, Content) {
  await mongoose.connect(ConnectionStr);
  console.log('object')
  try {
    const id = Content.params.singleblog

    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID is required to delete a blog." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete the blog by its ID
    const deletedBlog = await blogs.findByIdAndDelete(id);

    if (!deletedBlog) {
      return new Response(
        JSON.stringify({ message: "  not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "  deleted successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error occurred while deleting  :", error);
    return new Response(
      JSON.stringify({ message: "Error deleting  ." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET(req, { params }) {
  await mongoose.connect(ConnectionStr);

  try {
    const id = Content.params.singleblog

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Blog ID is required to fetch a blog." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the blog by ID
    const blogData = await blogs.findById(id);

    if (!blogData) {
      return new NextResponse(
        JSON.stringify({ message: "Blog not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the blog data
    return new NextResponse(
      JSON.stringify(blogData),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error occurred while fetching the blog:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching blog." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
export async function PUT(req, Content) {

  await mongoose.connect(ConnectionStr);
  
  try {
    const id = Content.params.singleblog
    console.log(id)
    const { title, description, tags, shortblog, image } = await req.json(); // Get the updated data from the request body
    console.log("saaaathis is sis is isk is",title,description,tags,shortblog,image)

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Blog ID is required to update a blog." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    

    // Update the blog by ID
    const updatedBlog = await blogs.findByIdAndUpdate(
      id,
      { title, description, tags, shortblog, image },
      { new: true } // This returns the updated document
    );

    if (!updatedBlog) {
      return new NextResponse(
        JSON.stringify({ message: "Blog not found or failed to update." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the updated blog data
    return new NextResponse(
      JSON.stringify(updatedBlog),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error occurred while updating the blog:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error updating blog." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
