// BlogServer.tsx
import BlogClient from "@/components/BlogClient"; // Import the client component
import { Metadata } from "next";
import { Api } from "@/components/Api";

async function fetchBlogs() {
  try {
    const response = await fetch(`${Api}/api/blog/v1`, { cache: "no-store" }); // Avoid caching for real-time updates
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await response.json();
    return data.blogs || []; // Return the `contacts` field or an empty array if undefined
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array on error
  }
}

// Function to generate metadata for the blogs page
export async function generateMetadata(): Promise<Metadata> {
  try {
    const blogs = await fetchBlogs(); // Fetch blogs to generate metadata

    const keywords = blogs
      .flatMap((blog: { tags: string[] }) => blog.tags || []) // Flatten tags and handle missing `tags`
      .join(", ");

    return {
      title: "Our Blogs | Black Hat Brew",
      description:
        "Stay updated with cutting-edge cybersecurity insights, tips, and industry trends to safeguard your business.",
      keywords: keywords || "cybersecurity, business security, latest trends", // Default keywords if none are fetched
      openGraph: {
        title: "Our Blogs | Black Hat Brew",
        description:
          "Stay updated with cutting-edge cybersecurity insights, tips, and industry trends to safeguard your business.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blogs`, // Fallback to localhost if env variable is missing
        type: "website",
      },
      authors: [{ name: "Black Hat Brew Team" }],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Our Blogs | Black Hat Brew",
      description: "Discover the latest in cybersecurity trends.",
      keywords: "cybersecurity, business security, latest trends",
      openGraph: {
        title: "Our Blogs | Black Hat Brew",
        description: "Discover the latest in cybersecurity trends.",
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blogs`,
        type: "website",
      },
      authors: [{ name: "Black Hat Brew Team" }],
    };
  }
}

export default async function BlogServer() {
  const blogs = await fetchBlogs(); // Fetch blogs on the server

  if (blogs.length === 0) {
    // Handle the case where no blogs are fetched
    return <p>No blogs available at the moment. Please check back later.</p>;
  }

  return <BlogClient blogs={blogs} />; // Pass the fetched blogs to the client component
}
