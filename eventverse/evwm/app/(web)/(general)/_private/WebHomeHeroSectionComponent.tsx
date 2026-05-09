"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { Images } from "@/lib/lib-images";
import { getFeaturedEvents } from "./web-home-healper";
import { MockEventData } from "./EventsMockData";
import { CalendarHeart,   MapPin, Plus, Star } from "lucide-react";
import { Button } from "@/shadcn/ui/button";


function useTypingText(texts: string[]) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (charIndex < current.length) {
        setCharIndex((p) => p + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setTextIndex((p) => (p + 1) % texts.length);
        }, 1200);
      }
    }, 90);

    return () => clearTimeout(timeout);
  }, [charIndex, textIndex, texts]);

  return texts[textIndex].substring(0, charIndex);
}
export default function WebHomeHeroSectionComponent() {
  const FEATURED_EVENTS = useMemo(() => getFeaturedEvents(), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredSide, setHoveredSide] = useState<"prev" | "next" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const nextSlide = () =>
    setCurrentIndex((p) => (p === FEATURED_EVENTS.length - 1 ? 0 : p + 1));
  const prevSlide = () =>
    setCurrentIndex((p) => (p === 0 ? FEATURED_EVENTS.length - 1 : p - 1));
  const rotatingTexts = [
    "Event Management",
    "Event Hosting",
    "Event Marketplace",
    "Event Vendor",
  ];
  const [rotatingTextIndex] = useState(0);
   
 

  const typedText = useTypingText(rotatingTexts);
  return (
    <>
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden select-none"
    >
      <div className="absolute inset-0">
        <Image
          src={Images.asset.gif.bgGif}
          alt="background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-14 pb-2 text-center">
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight">
          Your Full{" "}
          <span className=" inline-block min-w-70">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>{" "}
          Platform
        </h1>

        <p className="mt-0 text-white/80 text-lg">
          Manage your events with simple clicks
        </p>

        <div className="mt-1 flex justify-center gap-4">
          <Button className="bg-[#8200db] text-white hover:bg-[#6a00b8] py-5 px-6">
            Get Started
          </Button>
          <Button className="bg-linear-to-r from-purple-600 py-5 px-6 to-cyan-600 text-white">
            <Plus /> Create Event
          </Button>
        </div>
      </div>

      {/* ===== Floating Cursor ===== */}
      <AnimatePresence>
        {hoveredSide && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ x: smoothX, y: smoothY, left: -50, top: -20 }}
            className="fixed z-100 pointer-events-none"
          >
            <div className="px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
              {hoveredSide === "prev" ? "← Previous" : "Next →"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Slider ===== */}
      <div className="relative z-10 flex h-[60vh] items-center justify-center perspective-[3000px]">
        <div className="relative w-full max-w-8xl transform-3d">
          <AnimatePresence initial={false}>
            {FEATURED_EVENTS.map((item, index) => {
              const isCenter = index === currentIndex;
              const isPrev =
                index ===
                (currentIndex - 1 + FEATURED_EVENTS.length) %
                  FEATURED_EVENTS.length;
              const isNext =
                index === (currentIndex + 1) % FEATURED_EVENTS.length;

              if (!isCenter && !isPrev && !isNext) return null;

              return (
                <div
                  key={index}
                  className="flex items-center justify-center w-full h-full absolute top-0 left-0"
                >
                  <FeaturedEventCard
                    item={item}
                    isCenter={isCenter}
                    isPrev={isPrev}
                    isNext={isNext}
                    rotationY={isCenter ? 0 : isNext ? -22 : 22}
                    rotationZ={isCenter ? 0 : isNext ? 6 : -6}
                    yOffset={isCenter ? 0 : 50}
                    origin={
                      isCenter
                        ? "center center"
                        : isNext
                          ? "left center"
                          : "right center"
                    }
                    onMouseEnter={() => {
                      if (isPrev) setHoveredSide("prev");
                      if (isNext) setHoveredSide("next");
                    }}
                    onMouseLeave={() => setHoveredSide(null)}
                    onClick={() => {
                      if (isPrev) prevSlide();
                      if (isNext) nextSlide();
                    }}
                  />
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-12 z-10 w-full flex justify-center gap-4">
        {[
          currentIndex === 0 ? FEATURED_EVENTS.length - 1 : currentIndex - 1,
          currentIndex,
          (currentIndex + 1) % FEATURED_EVENTS.length,
        ].map((idx, i) => (
          <div
            key={idx}
            className={`h-px transition-all duration-700 ${
              i === 1 ? "w-20 bg-white" : "w-6 bg-white/20"
            }`}
          />
        ))}
      </div>

      
    </section>
   
      <HomeStatSection stats={{ organizers: 5, sales: 10, countries: 150 }} />
    </>
  );
};

function HomeStatSection({ stats }: {
  stats: {
    organizers: number;
    sales: number;
    countries: number;
  };
}) {
    return (
      <div className="relative pt-10   w-full bg-black font-bold text-white">
        <div className="relative w-full pt-10 pb-8 md:pt-10 md:pb-12">
          <p className="mb-12 text-center text-xs text-white/90 md:mb-16 md:text-base">
            Join millions of event organizers who manage their events on our platform.
          </p>
          <div className="mx-auto flex max-w-7xl flex-row flex-wrap items-center justify-center gap-4 pb-12 md:grid md:grid-cols-3 md:gap-8 md:pb-16">
            <div className="flex flex-col items-center text-center min-w-25">
              <h3 className="mb-2 text-3xl font-bold text-white md:text-6xl lg:text-7xl">
                {stats.organizers}M+
              </h3>
              <p className="text-xs text-white/70 md:text-base">Event Organizers Served</p>
            </div>
            <div className="flex flex-col items-center text-center min-w-25">
              <h3 className="mb-2 text-3xl font-bold text-white md:text-6xl lg:text-7xl">
                ${stats.sales}B+
              </h3>
              <p className="text-xs text-white/70 md:text-base">Generated in Ticket Sales</p>
            </div>
            <div className="flex flex-col items-center text-center min-w-25">
              <h3 className="mb-2 text-3xl font-bold text-white md:text-6xl lg:text-7xl">
                {stats.countries}+
              </h3>
              <p className="text-xs text-white/70 md:text-base">Countries & Territories</p>
            </div>
          </div>
        </div>
      </div>
    );
}

type FeaturedCardProps = {
  item: MockEventData;
  isCenter: boolean;
  isPrev: boolean;
  isNext: boolean;
  rotationY: number;
  rotationZ: number;
  yOffset: number;
  origin: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
};

function FeaturedEventCard({
  item,
  isCenter,
  isNext,
  rotationY,
  rotationZ,
  yOffset,
  origin,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: FeaturedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 120 }}
      animate={{
        opacity: 1,
        scale: isCenter ? 1 : 0.82,
        x: isCenter ? 0 : isNext ? "72%" : "-72%",
        y: yOffset,
        rotateY: rotationY,
        rotateZ: rotationZ,
        zIndex: isCenter ? 40 : 10,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      style={{
        transformOrigin: origin,
        transformStyle: "preserve-3d",
        translateZ: isCenter ? 120 : 0,
      }}
      className="absolute w-[40%] h-[50vh] cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="h-full w-full rounded-md overflow-hidden bg-gray-950 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] flex flex-col">
        {/* Image */}
        <div
          className="h-[55%] w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        >
          {item.featured && (
            <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-green-500 px-4 py-1.5 text-xs font-bold text-white">
              <Star className="h-4 w-4 fill-white" />
              Featured
            </div>
          )}
        </div>
        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-400">
              <CalendarHeart className="h-4 w-4 text-pink-400" />
              <span className="text-xl font-normal">{item.startDate}</span>
            </div>
            <h3 className="text-xl xl:text-3xl font-bold text-white line-clamp-2 mt-1 mb-1">
              {item.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 text-lg">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="text-lg">{item.locationMap}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-800 pt-3">
            <div className="flex items-center">
              <Image
                src={Images.asset.user.charlie}
                alt="user"
                width={24}
                height={24}
                className="rounded-full w-12 h-12 object-cover"
              />

              <span className="ml-2  text-purple-600 text-lg font-semibold">
                By {item.username}
              </span>
            </div>
            <span className="text-xl xl:text-3xl font-bold bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              ${item.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
