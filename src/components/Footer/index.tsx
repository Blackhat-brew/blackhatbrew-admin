"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

// Animation variants for footer elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Animated circuit overlay for cyberpunk effect
const CircuitOverlay = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-15" viewBox="0 0 1000 1000">
      <path
        d="M0,400 C200,400 300,600 500,600 C700,600 800,400 1000,400"
        stroke="#00f0ff"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M0,800 C200,800 300,1000 500,1000 C700,1000 800,800 1000,800"
        stroke="#ff0033"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
    </svg>
  </div>
);

const Footer = () => {
  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#blog", label: "Blog" },
    { href: "/#contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://www.linkedin.com", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://www.twitter.com", icon: <FaTwitter />, label: "Twitter" },
    { href: "mailto:contact@redhatbrew.com", icon: <FaEnvelope />, label: "Email" },
  ];

  return (
    <footer id="footer" className="relative z-10 bg-[#0a0a0a] pt-16 pb-8 md:pt-20 lg:pt-24">
      <CircuitOverlay />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <motion.div
            // variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-start"
          >
            <Link href="/" className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Black Hat Brew Logo"
                width={130}
                height={40}
                className="drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              />
            </Link>
            <p className="text-gray-300 text-base text-center md:text-left">
              Black Hat Brew: Your shield in the digital world, delivering cutting-edge cybersecurity solutions with vigilance and innovation.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            // variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-bold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media and Newsletter */}
          <motion.div
            // variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-2 rounded-full bg-gray-900/50 border border-neon-blue/30 text-white hover:bg-neon-blue hover:text-white transition-all duration-300 glow"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
           
           
          </motion.div>
        </div>

        {/* Divider and Copyright */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent"></div>
        <motion.div
          // variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="py-6 text-center"
        >
          <p className="text-base text-gray-300">
            © 2025 Black Hat Brew. All Rights Reserved.
          </p>
        </motion.div>
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
    </footer>
  );
};

export default Footer;