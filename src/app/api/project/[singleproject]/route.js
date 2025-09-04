import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionStr } from "@/app/lib/db";
import { project } from "@/app/lib/model/project";

export async function DELETE(req, Content) {
  await mongoose.connect(ConnectionStr);
  console.log('object')
  try {
    const id = Content.params.singleproject

    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID is required to delete a project." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete the project by its ID
    const deletedproject = await project.findByIdAndDelete(id);

    if (!deletedproject) {
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
    const id = Content.params.singleproject

    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "project ID is required to fetch a project." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the project by ID
    const projectData = await project.findById(id);

    if (!projectData) {
      return new NextResponse(
        JSON.stringify({ message: "project not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the project data
    return new NextResponse(
      JSON.stringify(projectData),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error occurred while fetching the project:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching project." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request, Content) {

  await mongoose.connect(ConnectionStr);
  
  try {
    const id = Content.params.singleproject
 const {
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
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "project ID is required to update a project." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    

     const updateData = { title, category, description, pro, details, reviews, githubLink, instructions };

 
    
    // Upload background image if new one provided
    if (backgroundImage) {
      const uploadedBg = await cloudinary.uploader.upload(backgroundImage, {
        folder: "projects/backgrounds",
      });
      updateData.backgroundImage = {
        public_id: uploadedBg.public_id,
        url: uploadedBg.secure_url,
      };
    }

    // Upload logo if new one provided
    if (logo) {
      const uploadedLogo = await cloudinary.uploader.upload(logo, {
        folder: "projects/logos",
      });
      updateData.logo = {
        public_id: uploadedLogo.public_id,
        url: uploadedLogo.secure_url,
      };
    }

    // Upload new images if provided
    if (Array.isArray(images) && images.length > 0) {
      const uploadedImages = await Promise.all(
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
      updateData.images = uploadedImages;
    }

    // Update project by MongoDB _id
    const updatedProject = await project.findByIdAndUpdate(id, updateData, {
      new: true,
    });
       if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found or failed to update.", success: false },
        { status: 404 }
      );
    }
    

    // Return the updated project data
    return new NextResponse(
      JSON.stringify(updatedProject),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error occurred while updating the project:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error updating project." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
