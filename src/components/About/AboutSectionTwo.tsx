'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import { FaEye, FaTools, FaShieldVirus } from "react-icons/fa";

// Animation variants for content cards
const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)" }
};

// Animated circuit overlay for visual effect
const CircuitOverlay = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-15" viewBox="0 0 1000 1000">
      <path
        d="M100,300 C300,300 400,500 600,500 C800,500 900,300 1100,300"
        stroke="#00f0ff"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M100,700 C300,700 400,900 600,900 C800,900 900,700 1100,700"
        stroke="#ff0033"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
    </svg>
  </div>
);

const AboutSectionTwo = () => {
  const features = [
    {
      icon: <FaEye />,
      title: "Proactive Threat Hunting",
      description:
        "We assume compromise and proactively hunt for threats, identifying vulnerabilities before they become breaches, keeping your business secure.",
    },
    {
      icon: <FaShieldVirus />,
      title: "24/7 Threat Monitoring",
      description:
        "Our vigilant monitoring systems operate around the clock, detecting and neutralizing threats in real-time to ensure uninterrupted protection.",
    },
    {
      icon: <FaTools />,
      title: "Rapid Incident Recovery",
      description:
        "In the event of a breach, our expert team restores your systems and data swiftly, minimizing downtime and protecting your reputation.",
    },
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-[#0a0a0a]">
      <CircuitOverlay />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-[500px]"
            >
              <Image
                src="/images/closed-padlock-digital-background-cyber-security_42077-8047.avif"
                alt="Cybersecurity Vault"
                width={500}
                height={500}
                className="mx-auto drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-red/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[470px]"
            >
              {/* <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-6">
                Why Choose Black Hat Brew
              </h2> */}
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                 
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="mb-8 p-6 bg-gray-900/50 backdrop-blur-md border border-neon-blue/30 rounded-lg"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl text-white text-white">{feature.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-base text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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

export default AboutSectionTwo;