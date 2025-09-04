"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TagButton from "@/components/Blog/TagButton";
import { LineWave } from "react-loader-spinner";
import Head from "next/head";
import ReactMarkdown from "react-markdown"; // Import react-markdown

interface Blog {
  title: string;
  shortblog: string;
  blog: string;
  tags: string[];
  imageUrl?: string;
}

interface BlogClientComponentProps {
  blog: Blog | null;
}

export default function BlogClientComponent({ blog }: BlogClientComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (blog) {
      setIsLoading(false);
    }
  }, [blog]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LineWave height="100" width="100" color="black" ariaLabel="loading" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No blog data available. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="relative pb-[120px] pt-[110px]">
      <Head>
        <title>{blog.title} | Black Hat Brew</title>
        <meta name="description" content={blog.shortblog} />
        <meta name="keywords" content={blog.tags.join(", ")} />
        <link rel="icon" type="image/png" href="/favicon.png" />

        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.shortblog} />
        <meta property="og:image" content={blog.imageUrl || "/images/certificae/c1.webp"} />
        <meta property="og:url" content={typeof window !== "undefined" ? window.location.href : ""} />
        <meta property="og:type" content="article" />
        <meta name="author" content="Black Hat Brew Team" />
      </Head>

      <div className="container relative">
        <button
          onClick={() => router.back()}
          className="absolute sm:left-4 sm:top-1 border border-gray-300  -top-20 inline-flex items-center justify-center rounded-3xl bg-[#0a0a0a] px-2 py-2 text-sm font-medium text-white hover:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          ← Go Back 
        </button>

        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-8/12">
            <div>
              <h2 className="mb-8 text-5xl underline font-bold leading-tight text-primary dark:text-white sm:text-4xl sm:leading-tight">
                {blog.title}
              </h2>
              {/* <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                {blog.shortblog}
              </p> */}

              <div className="prose prose-lg dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: blog.blog }} />
              </div>
              <hr />
              <hr />

              <div className="items-center justify-between sm:flex">
                <div className="mb-5">
                  <h4 className="mb-3 mt-6 text-3xl font-bold text-whitw">
                    Popular Tags:
                  </h4>
                  <div className="flex items-center rounded-3xl">
                    {blog.tags.map((tag, index) => (
                      <TagButton key={index} text={tag} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
