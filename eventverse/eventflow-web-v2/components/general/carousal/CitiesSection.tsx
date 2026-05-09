"use client";

import Link from "next/link";
import { MdLocationOn } from "react-icons/md";

const cities = [
  { name: "Tbilisi, Georgia", link: "/events?city=tbilisi" },
  { name: "New York, USA", link: "/events?city=new-york" },
  { name: "Paris, France", link: "/events?city=paris" },
  { name: "London, UK", link: "/events?city=london" },
  { name: "Vienna, Austria", link: "/events?city=vienna" },
];

export default function CitiesSection() {
  return (
    <section className="relative py-16 lg:py-20 text-white ml-4 lg:ml-0 px-4 sm:px-6 lg:px-8">
      {/* Background Image - Centered with equal margins */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-full max-w-7xl">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat opacity-70"
            style={{ backgroundImage: `url('/keyfeatured3.png')` }}
          ></div>
        </div>
      </div>
      {/* Background Overlay */}
      <div className="absolute inset-0" ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Find Events in Cities You Love
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
          Explore a diverse array of events that cater to your passion. From workshops to concerts, finding your perfect match has never been easier with our streamlined platform. Discover amazing experiences happening around you and connect with like-minded individuals who share your interests and create unforgettable memories together.
        </p>

        {/* City Tags - Mobile: Single row, Desktop: Two rows */}
        <div className="flex flex-col sm:flex-col items-center gap-2 sm:gap-4">
          {/* Mobile: All cities in one row, Desktop: First Row - 3 cities */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {cities.slice(0, 3).map((city) => (
              <Link
                key={city.name}
                href={city.link}
                className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl transition-colors text-white text-xs sm:text-sm font-medium shadow-lg"
                style={{ backgroundColor: '#000000B2' }}
              >
                <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center">
                  <MdLocationOn className="h-2 w-2 sm:h-3 sm:w-3" style={{ color: '#6F5ACD' }} />
                </div>
                <span className="text-xs sm:text-sm">{city.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Desktop: Second Row - 2 cities (hidden on mobile) */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4">
            {cities.slice(3, 5).map((city) => (
              <Link
                key={city.name}
                href={city.link}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl transition-colors text-white text-sm font-medium shadow-lg"
                style={{ backgroundColor: '#000000B2' }}
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <MdLocationOn className="h-3 w-3" style={{ color: '#6F5ACD' }} />
                </div>
                <span>{city.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile: Remaining cities in second row */}
          <div className="flex sm:hidden flex-wrap justify-center gap-2">
            {cities.slice(3, 5).map((city) => (
              <Link
                key={city.name}
                href={city.link}
                className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-white text-xs font-medium shadow-lg"
                style={{ backgroundColor: '#000000B2' }}
              >
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                  <MdLocationOn className="h-2 w-2" style={{ color: '#6F5ACD' }} />
                </div>
                <span className="text-xs">{city.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
