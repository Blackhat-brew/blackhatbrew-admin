"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LineWave } from "react-loader-spinner";
import { motion } from "framer-motion";

// Animation variants for blog cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" },
};

// Animated circuit background for cyberpunk effect
const CircuitBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
      <path
        d="M0,300 C200,300 300,500 500,500 C700,500 800,300 1000,300"
        stroke="#00f0ff"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M0,700 C200,700 300,900 500,900 C700,900 800,700 1000,700"
        stroke="#ff0033"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
    </svg>
  </div>
);

interface Blog {
  id: string;
  _id: string;
  title: string;
  shortblog: string;
  image?: { url: string };
  tags: string[];
}

interface BlogClientProps {
  blogs: Blog[];
}

const BlogClient = ({ blogs }: BlogClientProps) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleViewBlog = (blogId: string) => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/blog/${blogId}`);
    }, 500); // Simulate a brief delay for loading effect
  };

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
        <p className="text-gray-300 text-lg">No blogs available.</p>
      </div>
    );
  }

  if (isNavigating) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
        <LineWave height="100" width="100" color="#00f0ff" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="relative bg-[#0a0a0a] min-h-screen">
      <CircuitBackground />
      <div className="container mx-auto px-4 relative z-10">
        {/* Breadcrumb and Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-6 pb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">
                Our Cybersecurity Insights
              </h2>
              <p className="text-lg text-gray-300 mt-2 max-w-2xl">
                Stay updated with cutting-edge cybersecurity insights, tips, and industry trends to safeguard your business.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="inline-flex items-center border border-gray-400 justify-center rounded-2xl bg-neon-blue/80 px-4 py-2 text-sm font-semibold text-white hover:bg-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 transition-all duration-300 glow"
            >
              ← Go Back
            </motion.button>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <section className="pb-[120px] pt-[20px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="flex flex-col justify-between bg-gray-900/50 backdrop-blur-md border border-neon-blue/30 rounded-lg overflow-hidden"
              >
                <div
                  onClick={() => handleViewBlog(blog._id)}
                className="relative w-full h-[250px] cursor-pointer"
                >
                  <span className="absolute right-4 bg-black top-4 z-20 inline-flex items-center justify-center rounded-full bg-neon-blue/80 px-4 py-2 text-sm font-semibold text-white">
                    {blog.tags[0]}
                  </span>
                  {blog.image && blog.image.url ? (
                    <Image
                      src={blog.image.url}
                      alt={blog.title}
                      width={800}
                      height={450}
  className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-110"
                      style={{ objectPosition: 'center center' }}                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <p className="text-center text-gray-400">Image not available</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                </div>
                <div className="p-6">
                  <h3>
                    <div
                      onClick={() => handleViewBlog(blog._id)}
                      className="text-xl font-bold text-white hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {blog.title}
                    </div>
                  </h3>
                  <p className="text-base text-gray-300 mt-2">
                    {blog.shortblog.split(" ").slice(0, 30).join(" ")}...
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .glow {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
        }
        .animate-pulse {
          animation: pulse 4s infinite alternate;
        }
        @keyframes pulse {
          0% { stroke-opacity: 0.3; }
          100% { stroke-opacity: 0.7; }
        }
        :root {
          --neon-blue: #00f0ff;
          --neon-red: #ff0033;
        }
      `}</style>
    </div>
  );
};

export default BlogClient;