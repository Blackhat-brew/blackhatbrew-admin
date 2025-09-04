import { Metadata } from "next";
import BlogClientComponent  from "@/components/BlogClientComponent";
import { Api } from "@/components/Api";

interface Blog {
  title: string;
  shortblog: string;
  blog: string;
  tags: string[];
  imageUrl?: string;
}

interface Props {
  params: {
    singleblog: string;
  };
}

// Function to fetch the blog
async function fetchBlog(category: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${Api}/api/blog/v1/${category}`, {
      next: { revalidate: 10 }, // Optional: Cache revalidation
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.success) {
      return {
        ...data.blog,
        imageUrl: typeof data.blog.image === "string" ? data.blog.image : data.blog.image?.url,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}


// Function to generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await fetchBlog(params.singleblog);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: `${blog.title} | Black Hat Brew`,
    description: blog.shortblog,
    keywords: blog.tags.join(", "),
    openGraph: {
      title: blog.title,
      description: blog.shortblog,
      images: blog.imageUrl || "/images/certificae/c1.webp",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.singleblog}`,
      type: "article",
    },
    authors: [{ name: "Black Hat Brew Team" }],
  };
}

export default async function Page({ params }: Props) {
  const blog = await fetchBlog(params.singleblog);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No blog data available. Please try again later.</p>
      </div>
    );
  } 

  return <BlogClientComponent key={blog.title}  blog={blog} />;
}
