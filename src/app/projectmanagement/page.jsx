"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEdit, FaTrash, FaPlus, FaStar, FaMinus } from "react-icons/fa";
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

// ReviewForm component for managing reviews
const ReviewForm = ({ reviews, setReviews }) => {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const addReview = () => {
    if (!author.trim() || !comment.trim() || rating < 1 || rating > 5) {
      toast.error("Please provide a valid author, comment, and rating (1-5)");
      return;
    }
    setReviews([...reviews, { author, comment, rating }]);
    setAuthor("");
    setComment("");
    setRating(1);
  };

  const removeReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-white">Reviews</label>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-center gap-4 bg-[#1A1A1A] p-2 rounded-md">
            <div>
              <p className="text-sm text-white">
                {review.author}: {review.comment} (Rating: {review.rating}/5)
              </p>
            </div>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => removeReview(index)}
              className="px-2 py-1 text-sm bg-neon-red/80 text-white rounded-lg hover:bg-neon-red transition-all duration-300 glow"
            >
              <FaTrash />
            </motion.button>
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
            className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={addReview}
            type="button"
            className="px-4 py-2 text-sm bg-neon-blue/80 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
          >
            <FaPlus className="inline mr-2" /> Add Review
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// InstructionForm component for managing dynamic instructions
const InstructionForm = ({ instructions, setInstructions, instructionEditors }) => {
  const addInstruction = () => {
    setInstructions([...instructions, { platform: "", content: "", github: "" }]);
  };

  const updateInstruction = (index, field, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index][field] = value;
    setInstructions(updatedInstructions);
  };

  const removeInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-white">Instructions</label>
      {instructions.map((instruction, index) => (
        <div key={index} className="mb-4 p-4 bg-[#1A1A1A] rounded-md">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-white">Instruction {index + 1}</h4>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => removeInstruction(index)}
              className="px-2 py-1 text-sm bg-neon-red/80 text-white rounded-lg hover:bg-neon-red transition-all duration-300 glow"
            >
              <FaMinus className="inline mr-2" /> Remove
            </motion.button>
          </div>
          <input
            type="text"
            value={instruction.platform}
            onChange={(e) => updateInstruction(index, "platform", e.target.value)}
            placeholder="Platform (e.g., CloudFormation, AWS, GCP, Terraform)"
            className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40 mb-2"
            required
          />
          <input
            type="text"
            value={instruction.github}
            onChange={(e) => updateInstruction(index, "github", e.target.value)}
            placeholder="GitHub URL"
            className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40 mb-2"
          />
          <ReactQuill
            ref={(el) => (instructionEditors.current[index] = el)}
            value={instruction.content}
            onChange={(content) => updateInstruction(index, "content", content)}
            className="bg-[#1A1A1A] rounded-lg text-white text-sm"
            modules={{
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
            }}
            formats={[
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
            ]}
          />
        </div>
      ))}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={addInstruction}
        className="px-4 py-2 text-sm bg-neon-blue/80 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
      >
        <FaPlus className="inline mr-2" /> Add Instruction
      </motion.button>
    </div>
  );
};

export default function ProjectManagement() {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Ongoing");
  const [description, setDescription] = useState("");
  const [pro, setPro] = useState(0);
  const [details, setDetails] = useState("");
  const [backgroundImageFile, setBackgroundImageFile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [githubLink, setGithubLink] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const detailsEditor = useRef(null);
  const instructionEditors = useRef({});

  const handleFileChange = (type, e) => {
    if (e.target.files) {
      if (type === "backgroundImage") {
        setBackgroundImageFile(e.target.files[0]);
      } else if (type === "logo") {
        setLogoFile(e.target.files[0]);
      } else if (type === "images") {
        setImageFiles(Array.from(e.target.files));
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [isLoggedIn, router]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Api}/api/project/v1`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched projects:", data.projects); // Debug log
        setProjects(data.projects);
      } else {
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("An error occurred while fetching projects");
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    if (!file) return { public_id: "", url: "" };
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
        return { public_id: data.public_id, url: data.secure_url };
      }
      throw new Error("Image upload failed");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images
      const backgroundImageData = await uploadImageToCloudinary(backgroundImageFile);
      const logoData = await uploadImageToCloudinary(logoFile);
      const imagesData = await Promise.all(imageFiles.map((file) => uploadImageToCloudinary(file)));

      if (  !title || !description || !category || !instructions.every((i) => i.platform && i.content)) {
        toast.error("Please fill in all required fields (including platform and content for instructions)!");
        setLoading(false);
        return;
      }

      const projectData = {
        title,
        category,
        description,
        pro,
        details,
        backgroundImage: backgroundImageData,
        logo: logoData,
        images: imagesData.filter((img) => img.url),
        reviews, // Ensure reviews are included
        instructions,
      };

      console.log("Submitting Project Data:", projectData); // Debug log
      console.log("Submitting Project Data:", projectData); // Debug log
      console.log("Submitting Project Data:", projectData); // Debug log
      console.log("Submitting Project Data:", projectData); // Debug log

      const endpoint = editingProject ? `${Api}/api/project/v1/${editingProject._id}` : `${Api}/api/project/v1`;
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(editingProject ? "Project updated successfully!" : "Project added successfully!");
        resetForm();
        fetchProjects();
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${Api}/api/project/v1/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Project deleted successfully!");
        fetchProjects();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("An error occurred while deleting the project");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setId(project.id);
    setTitle(project.title);
    setCategory(project.category);
    setDescription(project.description);
    setPro(project.pro);
    setDetails(project.details || "");
    setGithubLink(project.githubLink || "");
    setInstructions(project.instructions || []);
    setReviews(project.reviews || []); // Ensure reviews are set
    setBackgroundImageFile(null);
    setLogoFile(null);
    setImageFiles([]);
    setIsAddingProject(true);
  };

  const handleView = (project) => {
    setViewingProject(project);
  };

  const resetForm = () => {
    setId("");
    setTitle("");
    setCategory("Ongoing");
    setDescription("");
    setPro(0);
    setDetails("");
    setBackgroundImageFile(null);
    setLogoFile(null);
    setImageFiles([]);
    setGithubLink("");
    setInstructions([]);
    setReviews([]);
    setEditingProject(null);
    setIsAddingProject(false);
    setViewingProject(null);
  };

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] py-10 px-6">
      <CircuitBackground />
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
      <div className="mx-auto max-w-[800px] relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="loader"></div>
            <h2 className="text-2xl font-semibold text-white mt-6">Loading Projects...</h2>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-between items-center mb-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white font-sans">
                {isAddingProject
                  ? editingProject
                    ? "Edit Project"
                    : "Add New Project"
                  : viewingProject
                  ? "View Project"
                  : "Project Management"}
              </h3>
              {!viewingProject && (
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => (isAddingProject ? resetForm() : setIsAddingProject(true))}
                  className="rounded-lg bg-[#262626] px-5 py-2 text-white hover:bg-neon-blue transition-all duration-300 glow"
                >
                  {isAddingProject ? (
                    "Back to Projects"
                  ) : (
                    <>
                      <FaPlus className="inline mr-2" /> Add New Project
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>

            {isAddingProject ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleProjectSubmit}
                className="bg-[#1E1E1E] backdrop-blur-lg border border-[#2C2C2C] rounded-2xl shadow-lg p-8 space-y-8"
              >
                {/* Basic Info Section */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Project Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-[#2C2C2C] bg-[#121212] text-white text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-[#2C2C2C] bg-[#121212] text-white text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                        required
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Internal">Internal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">Pro Status</label>
                      <select
                        value={pro}
                        onChange={(e) => setPro(Number(e.target.value))}
                        className="w-full h-10 px-3 rounded-md border border-[#2C2C2C] bg-[#121212] text-white text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                      >
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description + Details */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Content</h3>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-white">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-24 px-3 py-2 rounded-md border border-[#2C2C2C] bg-[#121212] text-white text-sm focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-white">Details</label>
                    <ReactQuill
                      ref={detailsEditor}
                      value={details}
                      onChange={setDetails}
                      className="bg-[#121212] rounded-lg text-white text-sm"
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, false] }],
                          ["bold", "italic", "underline"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["blockquote", "code-block", "link"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                </div>

                {/* Uploads Section */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Media</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">Background Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange("backgroundImage", e)}
                        className="w-full h-10 px-3 rounded-md border border-[#2C2C2C] bg-[#121212] text-white text-sm file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white">Logo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange("logo", e)}
                        className="w-full h-10 px-3 rounded-md border border-[#2C2C2C] bg-[#121212] text-white text-sm file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block mb-2 text-sm font-medium text-white">Gallery Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange("images", e)}
                      className="w-full h-10 px-3 rounded-md border border-[#2C2C2C] bg-[#121212] text-white text-sm file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700"
                    />
                  </div>
                </div>
 

                {/* Reviews + Instructions */}
                <ReviewForm reviews={reviews} setReviews={setReviews} />
                <InstructionForm instructions={instructions} setInstructions={setInstructions} instructionEditors={instructionEditors} />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    type="submit"
                    disabled={loading}
                    className={`px-8 py-2 text-base font-medium text-white rounded-lg bg-gradient-to-r from-red-600 to-pink-600 shadow-md hover:shadow-lg transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Submitting..." : editingProject ? "Update Project" : "Add Project"}
                  </motion.button>
                </div>
              </motion.form>
            ) : viewingProject ? (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-[#1E1E1E] backdrop-blur-md border border-[#2C2C2C] rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Cover / Background Image */}
                <div className="relative h-48 md:h-60 w-full">
                  {viewingProject.backgroundImage?.url ? (
                    <img
                      src={viewingProject.backgroundImage.url}
                      alt="Background"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600" />
                  )}
                  {/* Profile Logo */}
                  {viewingProject.logo?.url && (
                    <div className="absolute -bottom-12 left-6">
                      <img
                        src={viewingProject.logo.url}
                        alt="Logo"
                        className="w-24 h-24 rounded-full border-4 border-[#1E1E1E] shadow-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="pt-16 px-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{viewingProject.title}</h2>
                  <p className="text-sm text-gray-400">Category: {viewingProject.category}</p>
                  <p className="text-sm text-gray-400 mb-4">Pro: {viewingProject.pro ? "Yes" : "No"}</p>

                  {/* Description */}
                  {viewingProject.description && (
                    <div className="prose prose-invert text-gray-200 mb-6">
                      <div dangerouslySetInnerHTML={{ __html: viewingProject.description }} />
                    </div>
                  )}

                  {/* Details */}
                  {viewingProject.details && (
                    <div className="prose prose-invert text-gray-200 mb-6">
                      <div dangerouslySetInnerHTML={{ __html: viewingProject.details }} />
                    </div>
                  )}

                  {/* Images */}
                  {viewingProject.images?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Gallery</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {viewingProject.images.map((img, index) => (
                          <img
                            key={index}
                            src={img.url}
                            alt={`Image ${index}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructions */}
                  {viewingProject.instructions?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Instructions</h4>
                      {viewingProject.instructions.map((instruction, index) => (
                        <div key={index} className="mb-4 bg-[#262626] p-4 rounded-lg">
                          <h5 className="text-md font-semibold text-white">{instruction.platform}</h5>
                          {instruction.github && (
                            <a
                              href={instruction.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-sm block mb-2"
                            >
                              GitHub: {instruction.github}
                            </a>
                          )}
                          <div
                            className="prose prose-invert text-gray-200"
                            dangerouslySetInnerHTML={{ __html: instruction.content }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reviews */}
                  {viewingProject.reviews?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <FaStar className="mr-2 text-yellow-400" /> Reviews
                      </h4>
                      <div className="space-y-2">
                        {viewingProject.reviews.map((review, index) => (
                          <div
                            key={index}
                            className="bg-[#262626] p-3 rounded-lg text-sm text-gray-300"
                          >
                            <p>
                              <strong className="text-white">{review.author}</strong>: {review.comment}{" "}
                              <span className="text-yellow-400">({review.rating}/5)</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GitHub Link */}
                  {viewingProject.githubLink && (
                    <div className="mb-6">
                      <a
                        href={viewingProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        GitHub: {viewingProject.githubLink}
                      </a>
                    </div>
                  )}

                  {/* Back Button */}
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setViewingProject(null)}
                    className="w-full mt-6 px-4 py-2 bg-blue-600/80 border border-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
                  >
                    Back to Projects
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 gap-6"
              >
                {projects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <p className="text-center text-gray-400">No projects available</p>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={fetchProjects}
                      className="mt-4 px-4 py-2 text-sm bg-neon-blue/80 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
                    >
                      Retry
                    </motion.button>
                  </div>
                ) : (
                  projects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="p-6 bg-[#262626] backdrop-blur-md border border-[#332B2B] rounded-lg"
                    >
                      <h4 className="text-xl font-bold text-white">{project.title}</h4>
                      <p className="text-sm text-gray-300 mt-2">{project.description}</p>
                      <p className="text-sm text-gray-300 mt-2">Category: {project.category}</p>
                      <div className="flex gap-4 mt-4">
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => handleView(project)}
                          className="px-4 py-2 text-sm bg-neon-blue/80 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
                        >
                          <FaEye className="inline mr-2" /> View
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => handleEdit(project)}
                          className="px-4 py-2 text-sm bg-neon-blue/80 text-white rounded-lg hover:bg-neon-blue transition-all duration-300 glow"
                        >
                          <FaEdit className="inline mr-2" /> Edit
                        </motion.button>
                        <motion.button
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                          onClick={() => handleDelete(project._id)}
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
          </>
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
          0% {
            stroke-opacity: 0.3;
          }
          100% {
            stroke-opacity: 0.7;
          }
        }
        :root {
          --neon-blue: #00f0ff;
          --neon-red: #ff0033;
        }
        .loader {
          border: 8px solid #2d2d2d;
          border-top: 8px solid #ff0033;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}