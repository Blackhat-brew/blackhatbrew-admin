"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Api } from "@/components/Api";

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

export default function SigninPage() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${Api}/api/blog/v1/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        toast.success("Login Successful 🎉");
        setIsLoggedIn(true);
        router.push("/options");
      } else {
        toast.error(result.result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    router.prefetch("/options");
  }, [router]);

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[80px] bg-[#1A1A1A]">
      <CircuitBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div

          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[500px] p-8 bg-[#262626] backdrop-blur-md border border-[#332B2B] rounded-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-white font-sans mb-6">
            Admin Control Center Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your Email
              </label>
              <div className="relative flex items-center">
            
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your Password
              </label>
              <div className="relative">
              
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 pl-2 pr-3 py-2 text-sm rounded-md border border-[#332B2B] bg-[#1A1A1A] text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/40"
                  required
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full px-9   py-2     text-base font-medium text-white rounded-lg  bg-[#802626] transition-all duration-300 glow`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>


          </form>
        </motion.div>
      </div>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #332B2B",
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
}