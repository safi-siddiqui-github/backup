"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const discoverCards = [
  {
    id: 1,
    image: "/featured1.png",
    title: "Discover Your Next Great Experience",
    description: "Explore a diverse array of events that cater to your passion. From workshops to concerts, finding your perfect match has never been easier with our streamlined platform.",
    buttonText: "Join Upcoming Event",
  },
  {
    id: 2,
    image: "/transevnt1.jpg",
    title: "Find Events That Inspire You",
    description: "Discover amazing events happening around you. Connect with like-minded people and create unforgettable memories through our curated event experiences.",
    buttonText: "Explore Events",
  },
];

export default function DiscoverSection() {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % discoverCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + discoverCards.length) % discoverCards.length);
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 xl:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Left Column - Purple Card */}
          <div className="w-full lg:w-1/2">
            <div 
              className="rounded-3xl p-6 text-white relative overflow-hidden"
              style={{ backgroundColor: '#6F5ACD' }}
            >
              {/* Card Content */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Image */}
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div 
                    className="w-full h-40 md:h-48 rounded-2xl bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${discoverCards[currentCard].image})`,
                      backgroundColor: '#f0f0f0'
                    }}
                  />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">
                    {discoverCards[currentCard].title}
                  </h3>
                  
                  <p className="text-white/90 mb-4 leading-relaxed text-sm">
                    {discoverCards[currentCard].description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href="/join-event"
                    className="inline-flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-full font-medium transition-all hover:bg-gray-50 hover:scale-105 text-sm"
                  >
                    <span>{discoverCards[currentCard].buttonText}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>

                  {/* Carousel Navigation - Moved below text */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-white/80 text-xs">
                      {currentCard + 1}/{discoverCards.length}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevCard}
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                      >
                        <ChevronLeft className="h-3 w-3 text-white" />
                      </button>
                      
                      <button
                        onClick={nextCard}
                        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                      >
                        <ChevronRight className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-2xl mx-auto lg:mx-0 pt-4">
              {/* Headline */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Experience with{" "}
                <span style={{ color: '#6F5ACD' }}>Event.</span>
              </h2>

              {/* Description and Image Side by Side */}
              <div className="flex flex-col md:flex-row gap-4 items-start">
                

                {/* Conference Image */}
                <div 
                  className="w-full md:w-56 h-40 rounded-xl bg-cover bg-center bg-no-repeat flex-shrink-0"
                  style={{
                    backgroundImage: `url('/keyfeatured3.png')`,
                    backgroundColor: '#f0f0f0'
                  }}
                />
                {/* Description */}
                <div className="flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Explore a diverse array of events that cater to your passion. From workshops to concerts, 
                    finding your perfect match has never been easier with our streamlined platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
