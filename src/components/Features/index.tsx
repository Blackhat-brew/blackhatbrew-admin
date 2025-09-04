"use client"

import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section className="relative py-20 bg-[#0a0a0a] md:py-24 overflow-hidden">
      {/* Animated circuit background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-neon-blue/10 to-neon-red/10 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle
          title="Why Choose Black Hat Brew?"
          paragraph="In a world of relentless digital threats, Black Hat Brew delivers unmatched cybersecurity expertise. Our innovative solutions and vigilant approach ensure your business stays secure, so you can focus on what matters most."
          center
          // titleClassName="text-white text-4xl md:text-5xl font-bold tracking-wide"
          // paragraphClassName="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:px-12 mt-8">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>

      {/* Cyberpunk-inspired SVG circuit lines */}
      <div className="absolute top-0 left-0 z-[-1] opacity-20">
        <svg
          width="500"
          height="400"
          viewBox="0 0 500 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 60C60 50 140 70 200 110C260 150 300 170 360 190"
            stroke="url(#neon-gradient)"
            strokeWidth="2"
            className="animate-draw"
          />
          <path
            d="M20 90C50 80 120 100 180 140C240 180 280 200 340 220"
            stroke="url(#neon-gradient)"
            strokeWidth="2"
            className="animate-draw delay-200"
          />
          <circle
            cx="60"
            cy="120"
            r="12"
            fill="url(#neon-radial)"
            className="animate-pulse"
          />
          <circle
            cx="380"
            cy="180"
            r="15"
            fill="url(#neon-radial)"
            className="animate-pulse delay-300"
          />
          <defs>
            <linearGradient
              id="neon-gradient"
              x1="0"
              y1="0"
              x2="500"
              y2="400"
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
              gradientTransform="translate(60 120) scale(12)"
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
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 6s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2.5s ease-in-out infinite;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};

export default Features;