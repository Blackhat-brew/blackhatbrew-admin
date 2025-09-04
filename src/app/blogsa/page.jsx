"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEdit, FaTrash, FaPlus ,FaTag } from "react-icons/fa";
import { Api } from "@/components/Api";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Animation variants for elements
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" },
};

const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
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

// TagButton component for consistent tag styling
const TagButton = ({ text }) => (
    <span className="inline-flex items-center bg-[#802626] justify-center rounded-full bg-neon-blue/80 px-4 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-neon-blue transition-all duration-300 glow">
        {text}
    </span>
);

export default function BlogManagement() {
    const [isAddingBlog, setIsAddingBlog] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [editingBlog, setEditingBlog] = useState(null);
    const [viewingBlog, setViewingBlog] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [shortblog, setShortblog] = useState("");
    const [tags, setTags] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const editor = useRef(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/signin");
        }
    }, [isLoggedIn, router]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${Api}/api/blog/v1`);
            if (response.ok) {
                const data = await response.json();
                setBlogs(data.blogs);
            } else {
                toast.error("Failed to fetch blogs");
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("An error occurred while fetching blogs");
        }
    };

    const uploadImageToCloudinary = async (file) => {
        if (!file) return { secure_url: image, public_id: null };
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mypreset");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dp6lsevpk/image/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.secure_url && data.public_id) {
                return { secure_url: data.secure_url, public_id: data.public_id };
            }
            throw new Error("Image upload failed");
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { secure_url, public_id } = await uploadImageToCloudinary(file);
            const tagsArray = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag);

            if (!title || !description || !tagsArray.length || !shortblog) {
                toast.error("Please fill in all required fields!");
                setLoading(false);
                return;
            }

            const endpoint = editingBlog ? `${Api}/api/blog/v1/${editingBlog._id}` : `${Api}/api/blog/v1`;
            const method = editingBlog ? "PUT" : "POST";

            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    blog: description,
                    tags: tagsArray,
                    shortblog,
                    image: secure_url,
                    public_id,
                }),
            });

            if (response.ok) {
                toast.success(editingBlog ? "Blog updated successfully!" : "Blog added successfully!");
                resetForm();
                fetchBlogs();
            } else {
                const result = await response.json();
                toast.error(result.message || "Something went wrong!");
            }
        } catch (error) {
            toast.error("An error occurred while submitting the blog");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${Api}/api/blog/v1/${id}`, { method: "DELETE" });
            if (response.ok) {
                toast.success("Blog deleted successfully!");
                fetchBlogs();
            } else {
                toast.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("An error occurred while deleting the blog");
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setTitle(blog.title);
        setDescription(blog.blog);
        setShortblog(blog.shortblog);
        setTags(blog.tags.join(", "));
        setImage(blog.image);
        setIsAddingBlog(true);
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setShortblog("");
        setTags("");
        setImage("");
        setFile(null);
        setEditingBlog(null);
        setIsAddingBlog(false);
        setViewingBlog(null);
    };

    const handleView = (blog) => {
        setViewingBlog(blog);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline", "strike"],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "color",
        "background",
        "bold",
        "italic",
        "underline",
        "strike",
        "script",
        "list",
        "bullet",
        "indent",
        "direction",
        "align",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
    ];

    return (
        <div className="relative min-h-screen bg-[#1A1A1A] py-10 px-6">
            <Toaster
                position="bottom-center"
                toastOptions={{
                    style: {
                        background: "#1a1a1a",
                        color: "#fff",
                        border: "1px solid #00f0ff",
                        borderRadius: "8px",
                    },
                }}
            />
            <div className="mx-auto max-w-[600px] relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-between items-center mb-8"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-sans">
                        {isAddingBlog ? (editingBlog ? "Edit Blog" : "Add New Blog") : viewingBlog ? "View Blog" : "Blog Management"}
                    </h3>
                    {!viewingBlog && (
                        <motion.button
                            
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => (isAddingBlog ? resetForm() : setIsAddingBlog(true))}
                            className="rounded-lg bg-[#262626] px-5 py-2 text-white hover:bg-neon-blue transition-all duration-300 glow"
                        >
                            {isAddingBlog ? "Back to Blogs" : <><FaPlus className="inline mr-2" /> Add New Blog</>}
                        </motion.button>
                    )}
                </motion.div>

                {isAddingBlog ? (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleBlogSubmit}
                        className="bg-[#262626] backdrop-blur-md border border-[#332B2B] rounded-lg p-6"
                    >
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-white">Blog Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-white">Short Description</label>
                            <input
                                type="text"
                                value={shortblog}
                                onChange={(e) => setShortblog(e.target.value)}
                  className="w-full h-10 pr-3 pl-2 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-white">Blog Content</label>
                            <ReactQuill
                                ref={editor}
                                value={description}
                                onChange={setDescription}
                                className=" bg-[#1A1A1A] rounded-lg text-white  text-sm  "
                                modules={modules}
                                formats={formats}
                                // placeholder="Write your blog content here..."
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-white">Tags (comma-separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                  className="w-full h-10 pl-2  pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-white">Blog Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                  className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <motion.button
                                
                                whileHover="hover"
                                whileTap="tap"
                                type="submit"
                                disabled={loading}
                                              className={`w-full px-9   py-2     text-base font-medium text-white rounded-lg  bg-[#802626] transition-all duration-300 glow`}

                             >
                                {loading ? "Submitting..." : editingBlog ? "Update Blog" : "Add Blog"}
                            </motion.button>
                        </div>

                    </motion.form>
                ) : viewingBlog ? (
                    <motion.div
                       
                        initial="hidden"
                        animate="visible"
                        className="bg-[#262626] backdrop-blur-md border border-[#332B2B] rounded-lg p-8"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 ">{viewingBlog.title}</h2>
                        <div className="prose prose-lg prose-invert text-gray-200">
                            <div dangerouslySetInnerHTML={{ __html: viewingBlog.blog }} />
                        </div>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent my-8"></div>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                                <FaTag className="mr-2 text-white" /> Popular Tags
                            </h4>
                            <div className="flex flex-wrap ">
                                {viewingBlog.tags.map((tag, index) => (
                                    <TagButton key={index} text={tag} />
                                ))}
                            </div>
                        </div>
                        <motion.button
                            
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setViewingBlog(null)}
                            className="mt-6 px-4 py-2 bg-neon-blue/80 border border-red-400 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
                        >
                            Back to Blogs
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 gap-6"
                    >
                        {blogs.length === 0 ? (
                            <p className="text-center text-gray-400">No blogs available</p>
                        ) : (
                            blogs.map((blog) => (
                                <motion.div
                                    key={blog._id}
                                   
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    className="p-6 bg-[#262626] backdrop-blur-md border border-[#332B2B] rounded-lg"
                                >
                                    <h4 className="text-xl font-bold text-white">{blog.title}</h4>
                                    <p className="text-sm text-gray-300 mt-2">{blog.shortblog}</p>
                                    <div className="flex gap-4 mt-4">
                                        <motion.button
                                            
                                            whileHover="hover"
                                            whileTap="tap"
                                            onClick={() => handleView(blog)}
                                            className="px-4 py-2 text-sm bg-neon-blue/80 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
                                        >
                                            <FaEye className="inline mr-2" /> View
                                        </motion.button>
                                        <motion.button
                                            
                                            whileHover="hover"
                                            whileTap="tap"
                                            onClick={() => handleEdit(blog)}
                                            className="px-4 py-2 text-sm bg-neon-blue/80 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
                                        >
                                            <FaEdit className="inline mr-2" /> Edit
                                        </motion.button>
                                        <motion.button
                                            
                                            whileHover="hover"
                                            whileTap="tap"
                                            onClick={() => handleDelete(blog._id)}
                                            className="px-4 py-2 text-sm bg-neon-red/80 text-white rounded-lg hover:bg-neon-red transition-all duration-300 glow"
                                        >
                                            <FaTrash className="inline mr-2" /> Delete
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                )}
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
}