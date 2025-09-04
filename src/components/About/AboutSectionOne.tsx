'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaNetworkWired } from "react-icons/fa";

// Define animation variants for glassmorphism cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }
};

// Animated circuit background component
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

const AboutSectionOne = () => {
  const services = [
    { icon: <FaShieldAlt />, text: "Advanced Threat Protection" },
    { icon: <FaLock />, text: "Zero Trust Architecture" },
    { icon: <FaNetworkWired />, text: "Network Security Monitoring" },
    { icon: <FaShieldAlt />, text: "Penetration Testing & Audits" },
    { icon: <FaLock />, text: "Cloud Security Solutions" },
    { icon: <FaNetworkWired />, text: "Incident Response & Recovery" },
  ];

  return (
    <section id="about" className="relative pt-16 md:pt-20 lg:pt-28 bg-[#0a0a0a]">
      <CircuitBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="pb-16 md:pb-20 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-sans mb-4">
              Your Shield in the Digital World
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Black Hat Brew delivers cutting-edge cybersecurity solutions to protect your business from evolving digital threats. Trust us to safeguard your future with innovation and vigilance.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    //
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="p-6 bg-gray-900/50 backdrop-blur-md border border-neon-blue/30 rounded-lg flex items-center space-x-4"
                  >
                    <span className="text-2xl text-white">{service.icon}</span>
                    <p className="text-lg font-medium text-white">{service.text}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-8"
              >
                {/* <Link
                  href="/audit"
                  className="inline-block px-8 py-3 text-lg font-semibold text-white bg-neon-blue/80 rounded-full hover:bg-neon-blue transition-all duration-300 glow bg-slate-400"
                >
                  Get a Free Security Audit
                </Link> */}
              </motion.div>
            </div>

            <div className="w-full lg:w-1/2 px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mx-auto max-w-[500px]"
              >
                <Image
                  src="/images/cyber-security-shield_1125044-60032-removebg-preview.png"
                  alt="Cybersecurity Shield"
                  width={500}
                  height={500}
                  className="mx-auto drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-red/20 rounded-full blur-3xl" />
              </motion.div>
            </div>
          </div>
        </div>
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
    </section>
  );
};

export default AboutSectionOne;