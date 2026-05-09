"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const cities = [
  { name: "Tbilisi, Georgia", link: "/events?city=tbilisi" },
  { name: "New York, USA", link: "/events?city=new-york" },
  { name: "Paris, France", link: "/events?city=paris" },
  { name: "London, UK", link: "/events?city=london" },
  { name: "Vienna, Austria", link: "/events?city=vienna" },
];

export default function CitiesSection() {
  return (
    <section className="relative ml-6 lg:ml-0 py-16 lg:py-20 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/keyfeatured3.png')` }}
      ></div>
      {/* Background Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: '#000000B2' }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 xl:px-8 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          Find Events in Cities You Love
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Explore a diverse array of events that cater to your passion. From workshops to concerts, finding your perfect match has never been easier with our streamlined platform. Discover amazing experiences happening around you and connect with like-minded individuals who share your interests and create unforgettable memories together.
        </p>

        {/* City Tags */}
        <div className="flex flex-col items-center gap-4">
          {/* First Row - 3 cities */}
          <div className="flex flex-wrap justify-center gap-4">
            {cities.slice(0, 3).map((city) => (
              <Link
                key={city.name}
                href={city.link}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-500 hover:bg-gray-700 transition-colors text-white text-sm font-medium shadow-lg"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <MapPin className="h-3 w-3" style={{ color: '#6F5ACD' }} />
                </div>
                <span>{city.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Second Row - 2 cities */}
          <div className="flex flex-wrap justify-center gap-4">
            {cities.slice(3, 5).map((city) => (
              <Link
                key={city.name}
                href={city.link}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-500 hover:bg-gray-700 transition-colors text-white text-sm font-medium shadow-lg"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <MapPin className="h-3 w-3" style={{ color: '#6F5ACD' }} />
                </div>
                <span>{city.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
