"use client";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-[#0a0a0a] py-20 pt-[120px] md:pt-[150px] xl:pt-[180px]"
      style={{
        backgroundImage: "url('/assets/circuit-bg.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Animated circuit pattern background */}
      <div className="absolute inset-0 z-0 opacity-20 animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-red/20"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[900px] text-center">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Your Shield in the Digital World
              </h1>
              <p className="mb-12 text-lg leading-relaxed text-gray-300 sm:text-xl md:text-2xl">
                At Black Hat Brew, we fortify your digital defenses with cutting-edge cybersecurity solutions. Stay ahead of threats with our innovative, proactive, and trusted expertise.
              </p>
              {/* <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                <Link
                  href="/services"
                  className="inline-block rounded-lg bg-neon-blue px-8 py-4 text-base font-semibold text-white shadow-glow-blue transition-all duration-300 hover:bg-neon-blue/80"
                >
                  Explore Our Services
                </Link>
                <Link
                  href="/audit"
                  className="inline-block rounded-lg bg-neon-red px-8 py-4 text-base font-semibold text-white shadow-glow-red transition-all duration-300 hover:bg-neon-red/80"
                >
                  Get a Free Security Audit
                </Link>
              </div> */}
            </div>
          </div>
        </div>

        {/* Glassmorphism card with 3D effect */}
        <div className="mt-12 mx-auto max-w-[600px] p-6 bg-gray-800/30 backdrop-blur-md rounded-xl shadow-3d border border-neon-blue/30">
          <p className="text-center text-gray-200 text-lg">
            Trusted by leading corporations to secure their digital assets in an ever-evolving threat landscape.
          </p>
        </div>
      </div>

      {/* Cyberpunk-inspired SVG circuit animation */}
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30">
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
            r="15"
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
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 5s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .shadow-glow-blue {
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
        }
        .shadow-glow-red {
          box-shadow: 0 0 15px rgba(255, 0, 77, 0.5);
        }
        .shadow-3d {
          box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5),
                      -10px -10px 20px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
};

export default Hero;