"use client"
import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full group relative rounded-2xl cursor-pointer bg-gray-800/30 p-6 backdrop-blur-md border border-neon-blue/20 shadow-3d transition-all duration-300 hover:shadow-glow-blue hover:scale-105">
      <div className="wow fadeInUp" data-wow-delay=".2s">
        {/* Centered futuristic icon with neon glow */}
        <div className="mb-8 flex items-center justify-center h-[80px] w-[80px] mx-auto rounded-full bg-neon-blue/10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-neon-red/20 animate-pulse"></div>
          <div className="relative z-10 text-3xl text-white">{icon}</div>
          {/* <div className="relative z-10 text-3xl">{icon}</div> */}
        </div>

        {/* Title with modern sans-serif typography */}
        <h3 className="mb-4 text-xl font-bold text-center text-white sm:text-2xl lg:text-xl xl:text-2xl tracking-wide">
          {title}
        </h3>

        {/* Paragraph with clean, readable styling */}
        <p className="text-base text-center font-medium leading-relaxed text-gray-300">
          {paragraph}
        </p>

        {/* Subtle hover effect: animated underline */}
        <div className="mt-4 h-0.5 w-0 bg-neon-red group-hover:w-full transition-all duration-500"></div>
      </div>

      <style jsx>{`
        @keyframes pulse {
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
        .shadow-3d {
          box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.6),
                      -8px -8px 20px rgba(255, 255, 255, 0.05);
        }
        .shadow-glow-blue {
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.4),
                      0 0 30px rgba(0, 240, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default SingleFeature;