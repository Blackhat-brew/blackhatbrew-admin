import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionStr } from "@/app/lib/db";
import { user1 } from "@/app/lib/model/user1";

export async function DELETE(req, Content) {
  await mongoose.connect(ConnectionStr);
  console.log('object')
  try {
    const id = Content.params.singleemail

    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID is required to delete a blog." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete the blog by its ID
    const deletedBlog = await user1.findByIdAndDelete(id);

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


