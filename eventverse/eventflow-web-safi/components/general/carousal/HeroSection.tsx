"use client";

import { MdArrowForward, MdChevronLeft, MdChevronRight, MdPublic, MdStar, MdPeople } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

const heroImages = [
  {
    id: 1,
    image: "/main.png",
    title: "Create Unforgettable Experience",
    description:
      "From intimate gatherings to large-scale conferences, EventFlow provides everything you need to plan, manage, and execute memorable events with ease.",
  },
  {
    id: 2,
    image: "/featured1.png",
    title: "Professional Event Management",
    description:
      "Streamline your event planning process with our comprehensive tools and expert support.",
  },
  {
    id: 3,
    image: "/featured2.jpg",
    title: "Connect with Your Audience",
    description:
      "Build meaningful connections and create lasting memories with our innovative event solutions.",
  },
  {
    id: 4,
    image: "/transevnt1.jpg",
    title: "Scale Your Events",
    description:
      "From small workshops to large conferences, grow your events with confidence and efficiently.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[85vh] overflow-hidden ml-4 lg:ml-0">
      {/* Background Image with Overlay - Centered with equal margins */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full max-w-7xl">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat opacity-70"
            style={{
              backgroundImage: `url('${heroImages[currentSlide].image}')`,
            }}
          >
          </div>
        </div>
      </div>

      {/* Main Content Container with Navigation - Container Centered */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* Left Navigation Arrow */}
          <div className="flex flex-shrink-0 items-center justify-start">
            <button
              onClick={prevSlide}
              className="p-2 transition-all hover:scale-110"
            >
              <MdChevronLeft className="h-6 w-6 text-white md:h-8 md:w-8" />
            </button>
          </div>

          {/* Center Content */}
          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <div className="mx-auto max-w-4xl">
              {/* Title */}
              <h1 className="mb-3 text-lg leading-tight font-bold whitespace-nowrap text-white sm:text-2xl sm:whitespace-normal md:text-3xl lg:text-4xl xl:text-5xl">
                {heroImages[currentSlide].title}
              </h1>

              {/* Description */}
              <p className="mx-auto mb-4 max-w-2xl text-xs leading-relaxed text-white sm:text-sm md:text-base lg:text-lg">
                {heroImages[currentSlide].description}
              </p>

              {/* Call-to-Action Buttons */}
              <div className="mb-6 flex flex-row items-center justify-center gap-3">
                <Link
                  href="/create-event"
                  className="flex items-center space-x-2 rounded-full px-4 py-2 text-xs font-medium text-white transition-colors sm:px-6 sm:py-3 sm:text-sm"
                  style={{ backgroundColor: "#6F5ACD" }}
                >
                  <span className="hidden sm:inline">
                    Create Your Own Event
                  </span>
                  <span className="sm:hidden">Create Event</span>
                  <MdArrowForward className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>

                <Link
                  href="/join-event"
                  className="flex items-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-50 sm:px-6 sm:py-3 sm:text-sm"
                >
                  <span>Join Event</span>
                  <MdArrowForward className="h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </div>

              {/* Statistics */}
              <div className="flex flex-row items-center justify-center gap-1 overflow-x-auto text-white sm:gap-3 md:gap-4">
                <div className="flex flex-shrink-0 items-center space-x-1 sm:space-x-2">
                  <MdPeople className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    10,000+ Happy Event Planners
                  </span>
                </div>

                <div className="flex flex-shrink-0 items-center space-x-1 sm:space-x-2">
                  <MdStar className="h-3 w-3 text-yellow-400 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    4.9/5 Average Rating
                  </span>
                </div>

                <div className="flex flex-shrink-0 items-center space-x-1 sm:space-x-2">
                  <MdPublic className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm md:text-base">
                    50+ Countries Worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <div className="flex flex-shrink-0 items-center justify-end">
            <button
              onClick={nextSlide}
              className="p-2 transition-all hover:scale-110"
            >
              <MdChevronRight className="h-6 w-6 text-white md:h-8 md:w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <div className="flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all md:h-3 md:w-3 ${
                index === currentSlide
                  ? "bg-purple-600"
                  : "bg-opacity-50 hover:bg-opacity-75 bg-white"
              }`}
              style={{
                backgroundColor: index === currentSlide ? "#6F5ACD" : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
