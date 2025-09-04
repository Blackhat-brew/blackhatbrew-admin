"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaEnvelope, FaUser, FaComment } from "react-icons/fa";

// Animation variants for form container
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Animated circuit background for cyberpunk effect
const CircuitBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
      <path
        d="M0,200 C200,200 300,400 500,400 C700,400 800,200 1000,200"
        stroke="#00f0ff"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M0,600 C200,600 300,800 500,800 C700,800 800,600 1000,600"
        stroke="#ff0033"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
    </svg>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error("Name is required!");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required!");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Enter a valid email!");
      return false;
    }
    if (!formData.message) {
      toast.error("Message is required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/email2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error.message || "Unable to send your message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 lg:py-28 bg-[#0a0a0a]">
      <CircuitBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-4">
            Connect with Our Cybersecurity Experts
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Reach out to Black Hat Brew’s support team for tailored cybersecurity solutions. We’ll respond promptly via email to address your concerns.
          </p>
        </motion.div>

        <motion.div
         
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto p-8 bg-gray-900/50 backdrop-blur-md border border-neon-blue/30 rounded-2xl"
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-neon-blue/30 rounded-lg text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 outline-none transition-all duration-300"
                  />
                </div>
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Your Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-neon-blue/30 rounded-lg text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 outline-none transition-all duration-300"
                  />
                </div>
              </div>
              <div className="md:col-span-2 relative">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Your Message
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-white">
                    <FaComment />
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Enter your message"
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-neon-blue/30 rounded-lg text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/50 outline-none transition-all duration-300 resize-none"
                  ></textarea>
                </div>
              </div>
              <div className="md:col-span-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center mt-12"
                  
                  >
                  <button
                  type="submit"
                  disabled={loading}
                    className="inline-block px-8 py-3 text-lg font-semibold text-white bg-neon-blue/80 rounded-full hover:bg-neon-blue transition-all duration-300 glow"
                  >
                    {loading ? "Sending..." : "Submit Ticket"}

                  </button>
                </motion.div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

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
    </section>
  );
};

export default Contact;