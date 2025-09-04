"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";
import axios from "axios";
import { Api } from "../../components/Api";
import { LineWave } from "react-loader-spinner";

// Animation variants for table rows
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  hover: { backgroundColor: "#1a1a1a" }
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

export default function Dashboard() {
  const [querys, setQuerys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [isLoggedIn, router]);

  const fetchQuerys = async () => {
    try {
      setIsPageLoading(true);
      const response = await axios.get(`${Api}/api/query/v1`);
      setQuerys(response.data.querys);
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to load queries.");
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleDelete = async (queryId) => {
    try {
      setLoading(true);
      await axios.delete(`${Api}/api/query/v1/${queryId}`);
      setQuerys(querys.filter((query) => query._id !== queryId));
      toast.success("Query deleted successfully!");
    } catch (error) {
      console.error("Error deleting query:", error);
      toast.error("Failed to delete query.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuerys();
  }, []);

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a0a0a]">
        <LineWave height="100" width="100" color="#802626" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] p-6">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white font-sans">
            Query Management Dashboard
          </h1>
          <p className="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">
            Efficiently manage client queries with Black Hat Brew’s secure admin interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="overflow-x-auto bg-[#262626] backdrop-blur-md  border border-[#332B2B] rounded-lg shadow-lg"
        >
          <table className="min-w-full text-gray-200">
            <thead className="bg-[#262626] border border-[#332B2B]">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">#</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">Name</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">Email</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white w-[40%]">Message</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-white">Date</th>
                <th className="py-3 px-6 text-center text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {querys.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-400">
                    No queries available
                  </td>
                </tr>
              ) : (
                querys.map((query, index) => (
                  <motion.tr
                    key={query._id}
                   
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="border border-[#332B2B]"
                  >
                    <td className="py-3 px-6 text-sm">{index + 1}</td>
                    <td className="py-3 px-6 text-sm">{query.name}</td>
                    <td className="py-3 px-6 text-sm">{query.email1}</td>
                    <td className="py-3 px-6 text-sm">{query.message}</td>
                    <td className="py-3 px-6 text-sm">
                      {query.date} - {query.time}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-neon-red/80 hover:bg-neon-red text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 glow"
                        onClick={() => handleDelete(query._id)}
                        disabled={loading}
                        aria-label={`Delete query ${index + 1}`}
                      >
                        <IoMdTrash  size={25} color="red"/>
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

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