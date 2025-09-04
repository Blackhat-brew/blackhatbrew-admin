"use client"

import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const starIcon = (
  <svg
    width="18"
    height="16"
    viewBox="0 0 18 16"
    className="fill-current text-neon-yellow"
  >
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;

  let ratingIcons = [];
  for (let index = 0; index < star; index++) {
    ratingIcons.push(
      <span
        key={index}
        className="text-neon-yellow animate-pulse-slow"
      >
        {starIcon}
      </span>
    );
  }

  return (
    <div className="w-full">
      <div className="relative rounded-xl bg-gray-900/30 p-8 backdrop-blur-md border border-neon-blue/20 shadow-3d transition-all duration-300 hover:shadow-glow-blue hover:scale-105">
        {/* Animated circuit accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-red opacity-50 animate-slide"></div>

        <div className="mb-6 flex items-center space-x-1">{ratingIcons}</div>
        <p className="mb-8 border-b border-neon-blue/30 pb-8 text-base leading-relaxed text-gray-300">
          {content}
        </p>
        <div className="flex items-center">
          <div className="relative mr-4 h-[50px] w-[50px] rounded-full overflow-hidden border-2 border-neon-blue/50">
            <Image src={image} alt={name} fill className="object-cover" />
            <div className="absolute inset-0 bg-neon-blue/10 animate-pulse-slow"></div>
          </div>
          <div className="w-full">
            <h3 className="mb-1 text-lg font-semibold text-white tracking-wide">
              {name}
            </h3>
            <p className="text-sm text-gray-400">{designation}</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse-slow {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              opacity: 1;
            }
          }
          @keyframes slide {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          .animate-slide {
            animation: slide 4s linear infinite;
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
      </div>
    </div>
  );
};

export default SingleTestimonial;