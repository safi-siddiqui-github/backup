"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Routes } from "@/lib/lib-routes";
import { MockEventData } from "@/type";
import { ArrowRight, CalendarHeart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Event Card Component with hover video
export default function EventCardFeatureVariant({
  event,
  index,
  gradient,
  image,
}: {
  event: MockEventData;
  index: number;
  gradient: string;
  image: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardAnimation = useScrollAnimation({
    variant: "fade-up",
    threshold: 0.3,
    duration: 800,
    delay: index * 150,
  });

  // Use event's imageUrl and videoUrl if available, otherwise fallback to props
  const displayImage = event.imageUrl || image;
  // const displayVideo = event.videoUrl || (index % 2 === 0 ? Videos.hero1 : Videos.hero2);
  const displayVideo = event.videoUrl;
  const eventLink = `${Routes.web.general.eventDetail}/${event.slug || "event"}`;

  return (
    <Link href={eventLink}>
      <div
        ref={cardAnimation.ref}
        className={`group relative h-[500px] cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105 ${cardAnimation.className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${gradient} transition-all duration-700`}
        ></div>

        {/* Video Background (shown on hover) - Lazy loaded for performance */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          {isHovered && (
            <>
              {/* <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
                <source
                  src={displayVideo}
                  type="video/mp4"
                />
              </video> */}
            </>
          )}
          {/* Overlay to maintain text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Static Image Background (shown when not hovering) - Optimized with next/image */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "opacity-0" : "opacity-40"}`}
        >
          <Image
            src={displayImage}
            alt={event.name || "Event image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7 lg:p-8">
          {/* Top: Date and Featured Tag */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex w-fit items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-white/90 backdrop-blur-sm">
              <CalendarHeart className="h-3.5 w-3.5 text-pink-400" />
              <p className="text-xs font-medium">{event.startDate}</p>
            </div>

            {/* Featured Tag */}
            {event.featured && (
              <div className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                <Star className="h-3.5 w-3.5 fill-white" />
                <span>Featured</span>
              </div>
            )}
          </div>

          {/* Bottom: Text and CTA */}
          <div className="space-y-3">
            <h3 className="line-clamp-2 text-xl leading-tight font-bold text-white md:text-2xl lg:text-2xl">
              {event.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-200">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <p className="line-clamp-1 text-xs md:text-sm">
                {event.locationMap}
              </p>
            </div>

            {/* Price and CTA */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <p className="bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  ${event.price}
                </p>
              </div>

              {/* Arrow CTA */}
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 md:h-12 md:w-12">
                <ArrowRight className="h-4 w-4 text-white md:h-5 md:w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Border Glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-3xl border-2 border-white/20"></div>
        </div>
      </div>
    </Link>
  );
}
