'use client'
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// Animation variants for testimonial cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 0 20px rgba(0, 255, 255, 0.4)" }
};

// Animated circuit background for cyberpunk effect
const CircuitBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
      <path
        d="M0,250 C200,250 300,450 500,450 C700,450 800,250 1000,250"
        stroke="#00f0ff"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
      <path
        d="M0,650 C200,650 300,850 500,850 C700,850 800,650 1000,650"
        stroke="#ff0033"
        strokeWidth="2"
        fill="none"
        className="animate-pulse"
      />
    </svg>
  </div>
);

const Testimonials = () => {
   const testimonials = [
    {
      quote: "Black Hat Brew transformed our cybersecurity strategy with their cutting-edge solutions. Their proactive approach stopped threats before they could impact our operations.",
      author: "Jane Doe",
      position: "CTO, TechCorp",
      company: "TechCorp Solutions",
    },
    {
      quote: "Their 24/7 monitoring and rapid response team gave us peace of mind. Black Hat Brew is a true partner in securing our digital assets.",
      author: "Mark Wilson",
      position: "CEO, DataSecure",
      company: "DataSecure Inc.",
    },
    {
      quote: "The free security audit from Black Hat Brew revealed vulnerabilities we did not know existed. Their expertise is unmatched in the industry.",
      author: "Sarah Kim",
      position: "Head of IT, GlobalFin",
      company: "GlobalFin Enterprises",
    },
  ];

  return (
    <section id="testimonials" className="relative py-16 md:py-20 lg:py-28 bg-[#0a0a0a]">
      <CircuitBackground />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hear from our clients about how Black Hat Brew’s innovative cybersecurity solutions protect their businesses from digital threats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
             
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="p-6 bg-gray-900/50 backdrop-blur-md border border-neon-blue/30 rounded-lg relative"
            >
              <div className="absolute top-4 left-4 text-3xl text-white opacity-50">
                <FaQuoteLeft />
              </div>
              <p className="text-base text-gray-200 leading-relaxed mb-6 mt-8">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-red flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.author[0]}
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-neon-blue/80 rounded-full hover:bg-neon-blue transition-all duration-300 glow"
          >
            Join Our Trusted Clients
          </a>
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
    </section>
  );
};

export default Testimonials;