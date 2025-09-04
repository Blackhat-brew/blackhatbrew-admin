"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaEnvelope, FaBlog } from "react-icons/fa";
import { GoProject } from "react-icons/go";

// Animation variants for option cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } },
  hover: { scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" }
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

export default function OptionsSelector() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [isLoggedIn, router]);

  const options = [
  
    {
      label: "Support Queries",
      value: "/querya",
      icon: <FaEnvelope className="text-3xl text-white" />,
      description: "View and respond to client support tickets",
    },
     {
      label: "Projects Management",
      value: "/projectmanagement",
      icon: <GoProject className="text-3xl text-white" />,
      description: "Create and manage cybersecurity Projects",
    },
    {
      label: "Blog Management",
      value: "/blogsa",
      icon: <FaBlog className="text-3xl text-white" />,
      description: "Create and manage cybersecurity content",
    },
  ];

  useEffect(() => {
  router.prefetch("/querya");
  router.prefetch("/blogsa");
}, [router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#1A1A1A] p-6">
      {/* <CircuitBackground /> */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10 "
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white font-sans">
          Admin Control Hub
        </h1>
        <p className="text-lg text-gray-300 mt-2 max-w-2xl">
          Manage Black Hat Brew’s cybersecurity tools, client queries, and content with our secure admin interface.
        </p>
      </motion.div>

      <motion.div
       
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 relative z-10"
      >
        {options.map((option, index) => (
          <motion.div
            key={option.label}
           
            whileHover="hover"
            className="flex flex-col items-center justify-center p-6 w-full max-w-[300px] bg-[#262626]  backdrop-blur-md border border-[#332B2B] rounded-lg transition-all duration-300"
          >
            <Link href={option.value} passHref>
              <div className="flex flex-col items-center text-center cursor-pointer">
                {option.icon}
                <span className="text-xl font-semibold text-white mt-4">{option.label}</span>
                <p className="text-sm text-gray-300 mt-2">{option.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

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