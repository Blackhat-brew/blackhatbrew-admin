"use client";

import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { FaShieldAlt } from "react-icons/fa"; // example: shield icon

const services = [
  {
    title: "Internal & External Penetration Testing",
    description: "Uncover network vulnerabilities and fortify your defenses with advanced testing.",
    icon: "/icons/penetration-testing.svg",
  },
  {
    title: "Web Application Testing",
    description: "Secure your websites and applications against sophisticated cyber threats.",
    icon: "/icons/web-testing.svg",
  },
  {
    title: "Vulnerability Assessments",
    description: "Identify and prioritize risks to strengthen your security posture.",
    icon: "/icons/vulnerability-assessment.svg",
  },
  {
    title: "Red Team Operations",
    description: "Simulate real-world attacks to rigorously test your defenses.",
    icon: "/icons/red-team.svg",
  },
  {
    title: "Compliance Audits",
    description: "Ensure compliance with secure financial reporting processes.",
    icon: "/icons/compliance-audits.svg",
  },
  {
    title: "Capture The Flag (CTF) Events",
    description: "Engage teams with challenging CTF events to sharpen skills.",
    icon: "/icons/ctf-events.svg",
  },
  {
    title: "Cybersecurity Awareness Training",
    description: "Equip your team with knowledge to combat cyber threats effectively.",
    icon: "/icons/awareness-training.svg",
  },
  {
    title: "Incident Response",
    description: "Swiftly contain and mitigate security incidents to minimize impact.",
    icon: "/icons/incident-response.svg",
  },
  {
    title: "Cloud Penetration Testing (AWS)",
    description: "Secure your cloud infrastructure with thorough penetration testing.",
    icon: "/icons/cloud-penetration.svg",
  },
  {
    title: "API Penetration Testing",
    description: "Protect your APIs from vulnerabilities with targeted testing.",
    icon: "/icons/api-testing.svg",
  },
  {
    title: "AI Models Penetration Testing",
    description: "Safeguard your AI models and algorithms against advanced threats.",
    icon: "/icons/ai-penetration.svg",
  },
  {
    title: "Phishing Campaigns",
    description: "Test employee readiness with simulated phishing attacks.",
    icon: "/icons/phishing-campaigns.svg",
  },
  {
    title: "OSINT (Open Source Intelligence)",
    description: "Leverage public data to assess and mitigate vulnerabilities.",
    icon: "/icons/osint.svg",
  },
  {
    title: "Source Code Analysis",
    description: "Detect security flaws in your codebase with in-depth analysis.",
    icon: "/icons/source-code.svg",
  },
];

const Services = () => {
  return (
    <section
      className="relative py-20 bg-[#0a0a0a] md:py-24 lg:py-32 overflow-hidden"
      id="services"
    >
      {/* Animated circuit background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-neon-blue/10 to-neon-red/10 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <SectionTitle
          title="Our Cybersecurity Solutions"
          paragraph="Explore our cutting-edge services designed to protect your business from evolving digital threats with precision and innovation."
          center
   
          mb="12"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-xl bg-gray-900/30 p-6 backdrop-blur-md border border-neon-blue/20 shadow-3d transition-all duration-300 hover:shadow-glow-blue hover:scale-105"
            >
              {/* Icon with neon glow */}
              <div className="flex justify-center mb-6">
                <div className="relative h-[60px] w-[60px] rounded-full bg-neon-blue/10 flex items-center justify-center">
                  <FaShieldAlt className="relative z-10 text-[#00f0ff]   group-hover:text-white transition-colors duration-300" size={25} />
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="mt-4 text-lg font-semibold text-white text-center tracking-wide group-hover:text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-gray-300 text-center text-sm">
                {service.description}
              </p>

              {/* Animated underline on hover */}
              <div className="mt-4 h-0.5 w-0 bg-neon-red group-hover:w-full transition-all duration-500 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cyberpunk-inspired SVG circuit lines */}
      <div className="absolute bottom-0 left-0 z-[-1] opacity-20">
        <svg
          width="400"
          height="300"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 50C50 40 120 60 180 100C240 140 280 160 340 180"
            stroke="url(#neon-gradient)"
            strokeWidth="2"
            className="animate-draw"
          />
          <path
            d="M10 80C40 70 100 90 160 130C220 170 260 190 320 210"
            stroke="url(#neon-gradient)"
            strokeWidth="2"
            className="animate-draw delay-200"
          />
          <circle
            cx="50"
            cy="100"
            r="10"
            fill="url(#neon-radial)"
            className="animate-pulse"
          />
          <circle
            cx="300"
            cy="150"
            r="12"
            fill="url(#neon-radial)"
            className="animate-pulse delay-300"
          />
          <defs>
            <linearGradient
              id="neon-gradient"
              x1="0"
              y1="0"
              x2="400"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00F0FF" />
              <stop offset="1" stopColor="#FF004D" />
            </linearGradient>
            <radialGradient
              id="neon-radial"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(50 100) scale(10)"
            >
              <stop stopColor="#00F0FF" />
              <stop offset="1" stopColor="#00F0FF" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.4;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }
        @keyframes pulse-slow {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.6;
          }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 6s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2.5s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .shadow-3d {
          box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.7),
                      -6px -6px 15px rgba(255, 255, 255, 0.05);
        }
        .shadow-glow-blue {
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.4),
                      0 0 30px rgba(0, 240, 255, 0.2);
        }
      `}</style>
    </section>
  );
};

export default Services;