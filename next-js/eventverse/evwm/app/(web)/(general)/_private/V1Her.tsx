// "use client";

// import { Images } from "@/lib/lib-images";
// import { Routes } from "@/lib/lib-routes";
// import * as React from "react";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { CalendarHeart, MapPin, Plus, Star } from "lucide-react";
// import Link from "next/link";
// import { cn } from "@/lib/lib-shadcn";
// import { Button } from "@/shadcn/ui/button";
 
// import Image from "next/image" ;
// import { ANIMATION_PRESETS, useDevicePerfFlags, useScrollAnimation } from "./web-home-hooks";
// import { getFeaturedEvents } from "./web-home-healper";
// import { MockEventData } from "./EventsMockData";
 

// export default function WebHomeHeroSectionComponent() {
//   const FEATURED_EVENTS = useMemo(() => getFeaturedEvents(), []);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [stats, setStats] = useState({
//     organizers: 100,
//     sales: 50,
//     countries: 50,
//   });
//   const [hoveredCard, setHoveredCard] = useState<
//     "left" | "right" | "far-left" | "far-right" | null
//   >(null);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [windowWidth, setWindowWidth] = useState(1200);
//   const [isMounted, setIsMounted] = useState(false);
//   const [videoLoaded, setVideoLoaded] = useState(false);
//   const [videoError, setVideoError] = useState(false);
//   const [, setVideoMetadataLoaded] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const videoLoadedRef = useRef(false);


//    const rotatingTexts = ["Event Management", "Event Hosting", "Event Marketplace", "Event Vendor"];
//   const [rotatingTextIndex] = useState(0);
//   const [charIndex] = useState(0);
  
//   const currentText = rotatingTexts[rotatingTextIndex] || "";
//   const displayedText = currentText.substring(0, charIndex);

//   const { isMobile, disableHeavyEffects } = useDevicePerfFlags();

//   useEffect(() => {
//     setIsMounted(true);
//     setWindowWidth(window.innerWidth);
//   }, []);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     let mounted = true;
//     let hasLoaded = false;

//     const handleLoadedMetadata = () => {
//       if (!mounted) return;
//       videoLoadedRef.current = true;
//       setVideoMetadataLoaded(true);
//       setVideoLoaded(true);
//       setVideoError(false);
//     };

//     const handleLoadedData = () => {
//       if (!mounted) return;
//       videoLoadedRef.current = true;
//       setVideoLoaded(true);
//       setVideoError(false);
//     };

//     const handleError = () => {
//       if (!mounted) return;
//       videoLoadedRef.current = false;
//       setVideoError(true);
//       setVideoLoaded(false);
//     };

//     const handleCanPlay = () => {
//       if (!mounted || !video) return;
//       if (!videoLoadedRef.current) {
//         videoLoadedRef.current = true;
//         setVideoLoaded(true);
//         setVideoError(false);
//       }
//       if (isMobile || disableHeavyEffects) {
//         video.play().catch(() => {});
//       }
//     };

//     const setupVideo = () => {
//       if (!video || !mounted || hasLoaded) return;
//       hasLoaded = true;

//       if (isMobile || disableHeavyEffects) {
//         video.preload = "metadata";
//         video.setAttribute("playsinline", "true");
//         if ("playbackRate" in video) {
//           video.playbackRate = 1.0; // Normal speed
//         }
//       } else {
//         video.preload = "auto";
//       }

//       video.addEventListener("loadeddata", handleLoadedData);
//       video.addEventListener("error", handleError);
//       video.addEventListener("canplay", handleCanPlay);

//       if (video.readyState >= 1) {
//         requestAnimationFrame(() => {
//           if (mounted && video) {
//             videoLoadedRef.current = true;
//             setVideoMetadataLoaded(true);
//             setVideoLoaded(true);
//             setVideoError(false);
//           }
//         });
//       }

//       if (video.readyState === 0) {
//         video.load();
//       }

//       video.play().catch(() => {});
//     };

//     setupVideo();

//     return () => {
//       mounted = false;
//       if (video) {
//         video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//         video.removeEventListener("loadeddata", handleLoadedData);
//         video.removeEventListener("error", handleError);
//         video.removeEventListener("canplay", handleCanPlay);
//       }
//     };
//   }, [isMobile, disableHeavyEffects]);

 
 
//   const cardsSection = useScrollAnimation(
//     disableHeavyEffects
//       ? { threshold: 1, triggerOnce: false }
//       : {
//           variant: "scale-up",
//           duration: 1000,
//           delay: 200,
//           threshold: 0.15,
//         },
//   );

 
//   const stat1 = useScrollAnimation(
//     disableHeavyEffects
//       ? { threshold: 1, triggerOnce: false }
//       : {
//           ...ANIMATION_PRESETS.stat,
//           delay: 100,
//           threshold: 0.3,
//         },
//   );

 
 

//   useEffect(() => {
//     let timeoutId: NodeJS.Timeout;
//     let lastCall = 0;
//     const throttleDelay = isMobile ? 300 : 150;

//     const handleResize = () => {
//       const now = Date.now();
//       clearTimeout(timeoutId);

//       if (now - lastCall >= throttleDelay) {
//         setWindowWidth(window.innerWidth);
//         lastCall = now;
//       } else {
//         timeoutId = setTimeout(
//           () => {
//             setWindowWidth(window.innerWidth);
//             lastCall = Date.now();
//           },
//           throttleDelay - (now - lastCall),
//         );
//       }
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [isMobile]);

//   useEffect(() => {
//     if (isMobile || disableHeavyEffects) return;

//     const autoPlayInterval = 5000; // 5 seconds
//     setProgress(0);
//     const startTime = Date.now();

//     let rafId: number;
//     const updateProgress = () => {
//       const elapsed = Date.now() - startTime;
//       const newProgress = Math.min((elapsed / autoPlayInterval) * 100, 100);
//       setProgress(newProgress);

//       if (newProgress < 100) {
//         rafId = requestAnimationFrame(updateProgress);
//       }
//     };
//     rafId = requestAnimationFrame(updateProgress);

//     const slideTimer = setTimeout(() => {
//       setCurrentIndex((prev) => (prev + 1) % FEATURED_EVENTS.length);
//       setProgress(0);
//     }, autoPlayInterval);

//     return () => {
//       cancelAnimationFrame(rafId);
//       clearTimeout(slideTimer);
//     };
//   }, [FEATURED_EVENTS.length, currentIndex, isMobile, disableHeavyEffects]);

//   const handlePrevious = () => {
//     setCurrentIndex(
//       (prev) => (prev - 1 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length,
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % FEATURED_EVENTS.length);
//   };

//   const touchStartRef = useRef(0);
//   const touchEndRef = useRef(0);

//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartRef.current = e.targetTouches[0].clientX;
//     touchEndRef.current = e.targetTouches[0].clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndRef.current = e.targetTouches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     const start = touchStartRef.current;
//     const end = touchEndRef.current;

//     if (!start || !end) return;

//     const distance = start - end;
//     const isLeftSwipe = distance > 50;
//     const isRightSwipe = distance < -50;

//     requestAnimationFrame(() => {
//       if (isLeftSwipe) {
//         handleNext();
//       } else if (isRightSwipe) {
//         handlePrevious();
//       }

//       touchStartRef.current = 0;
//       touchEndRef.current = 0;
//     });
//   };

//   const rafRef = useRef<number | null>(null);
//   const lastMousePosition = useRef({
//     x: 0,
//     y: 0,
//     position: null as "left" | "right" | "far-left" | "far-right" | null,
//   });
//   const cachedRect = useRef<DOMRect | null>(null);
//   const rectCacheTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     return () => {
//       if (rafRef.current !== null) {
//         cancelAnimationFrame(rafRef.current);
//       }
//       if (rectCacheTimeoutRef.current) {
//         clearTimeout(rectCacheTimeoutRef.current);
//       }
//     };
//   }, []);

//   const handleMouseMove = (
//     e: React.MouseEvent<HTMLDivElement>,
//     position: "left" | "right" | "far-left" | "far-right",
//   ) => {
//     if (rafRef.current !== null) {
//       cancelAnimationFrame(rafRef.current);
//     }

//     if (
//       !cachedRect.current ||
//       lastMousePosition.current.position !== position
//     ) {
//       cachedRect.current = e.currentTarget.getBoundingClientRect();

//       if (rectCacheTimeoutRef.current) {
//         clearTimeout(rectCacheTimeoutRef.current);
//       }
//       rectCacheTimeoutRef.current = setTimeout(() => {
//         cachedRect.current = null;
//       }, 100);
//     }

//     const rect = cachedRect.current;
//     const newPos = {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//       position,
//     };

//     const lastPos = lastMousePosition.current;
//     const distance = Math.sqrt(
//       Math.pow(newPos.x - lastPos.x, 2) + Math.pow(newPos.y - lastPos.y, 2),
//     );

//     if (distance > 5 || lastPos.position !== position) {
//       lastMousePosition.current = newPos;

//       rafRef.current = requestAnimationFrame(() => {
//         setCursorPosition({
//           x: lastMousePosition.current.x,
//           y: lastMousePosition.current.y,
//         });
//         setHoveredCard(lastMousePosition.current.position);
//         rafRef.current = null;
//       });
//     }
//   };

//   useEffect(() => {
//     if (disableHeavyEffects) {
//       setStats({ organizers: 14, sales: 36, countries: 200 });
//       return;
//     }
//     if (!stat1.isVisible) return;

//     const duration = 2000;
//     const steps = 60;
//     const interval = duration / steps;

//     const targets = {
//       organizers: 14,
//       sales: 36,
//       countries: 200,
//     };

//     let step = 0;
//     const timer = setInterval(() => {
//       step++;
//       const progress = step / steps;
//       const easeOut = 1 - Math.pow(1 - progress, 3);

//       setStats({
//         organizers: Math.floor(easeOut * targets.organizers),
//         sales: Math.floor(easeOut * targets.sales),
//         countries: Math.floor(easeOut * targets.countries),
//       });

//       if (step >= steps) {
//         clearInterval(timer);
//         setStats(targets);
//       }
//     }, interval);

//     return () => clearInterval(timer);
//   }, [stat1.isVisible, disableHeavyEffects]);

//   const getCardPosition = useCallback(
//     (eventIdx: number) => {
//       const leftIdx =
//         (currentIndex - 1 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length;
//       const centerIdx = currentIndex;
//       const rightIdx = (currentIndex + 1) % FEATURED_EVENTS.length;

//       const isMobileDevice = isMobile || disableHeavyEffects;
//       const isXL = !isMobileDevice && windowWidth >= 768;
//       const farLeftIdx = isXL
//         ? (currentIndex - 2 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length
//         : -1;
//       const farRightIdx = isXL
//         ? (currentIndex + 2) % FEATURED_EVENTS.length
//         : -1;

//       if (isXL && eventIdx === farLeftIdx) return "far-left";
//       if (eventIdx === leftIdx) return "left";
//       if (eventIdx === centerIdx) return "center";
//       if (eventIdx === rightIdx) return "right";
//       if (isXL && eventIdx === farRightIdx) return "far-right";
//       return "hidden";
//     },
//     [
//       currentIndex,
//       isMobile,
//       disableHeavyEffects,
//       windowWidth,
//       FEATURED_EVENTS.length,
//     ],
//   );

//   const getCardStyles = useCallback(
//     (position: string) => {
//       const isMobileDevice = isMobile || disableHeavyEffects;

//       switch (position) {
//         case "far-left":
//           if (isMobileDevice) {
//             return {
//               transform: "translateX(200%) scale(0.5)",
//               opacity: 0,
//               transformOrigin: "center center",
//               zIndex: 0,
//               pointerEvents: "none" as const,
//             };
//           }
//           return {
//             transform:
//               "rotateY(45deg) rotateX(25deg) translateZ(-200px) translateX(0%)",
//             opacity: 0.4,
//             transformOrigin: "right center",
//             zIndex: 0,
//             pointerEvents: "auto" as const,
//           };
//         case "left":
//           return {
//             transform: isMobileDevice
//               ? "translateX(-20%) scale(0.85)"
//               : "rotateY(35deg) rotateX(20deg) translateZ(-100px) translateX(0%)",
//             opacity: isMobileDevice ? 0.3 : 0.7,
//             transformOrigin: "right center",
//             zIndex: 1,
//             pointerEvents: "auto" as const,
//           };
//         case "center":
//           return {
//             transform: isMobileDevice
//               ? "scale(1)"
//               : "rotateY(0deg) translateZ(0px) scale(1.05) translateX(0%)",
//             opacity: 1,
//             transformOrigin: "center center",
//             zIndex: 10,
//             pointerEvents: "auto" as const,
//           };
//         case "right":
//           return {
//             transform: isMobileDevice
//               ? "translateX(20%) scale(0.85)"
//               : "rotateY(-35deg) rotateX(20deg) translateZ(-100px) translateX(0%)",
//             opacity: isMobileDevice ? 0.3 : 0.7,
//             transformOrigin: "left center",
//             zIndex: 1,
//             pointerEvents: "auto" as const,
//           };
//         case "far-right":
//           if (isMobileDevice) {
//             return {
//               transform: "translateX(200%) scale(0.5)",
//               opacity: 0,
//               transformOrigin: "center center",
//               zIndex: 0,
//               pointerEvents: "none" as const,
//             };
//           }
//           return {
//             transform:
//               "rotateY(-45deg) rotateX(25deg) translateZ(-200px) translateX(0%)",
//             opacity: 0.4,
//             transformOrigin: "left center",
//             zIndex: 0,
//             pointerEvents: "auto" as const,
//           };
//         default:
//           return {
//             transform: "translateX(200%) scale(0.5)",
//             opacity: 0,
//             transformOrigin: "center center",
//             zIndex: 0,
//             pointerEvents: "none" as const,
//           };
//       }
//     },
//     [isMobile, disableHeavyEffects],
//   );

//   return (
//     <section className="relative flex w-full flex-col overflow-hidden dark:bg-transparent">
//       <div className="absolute inset-0 h-full w-full overflow-hidden">
//         {(!videoLoaded || videoError) && (
//           <div
//             className="absolute inset-0 h-full w-full bg-cover bg-center"
//             style={{
//               backgroundImage: `url(${Images.asset.gif.bgGif})`,
//             }}
//           />
//         )}

//         <video
//           ref={videoRef}
//           className={cn(
//             "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
//             videoLoaded && !videoError ? "opacity-100" : "opacity-0",
//           )}
//           autoPlay
//           muted
//           loop
//           playsInline
//           aria-hidden="true"
//           poster={Images.asset.gif.bgGif}
//         >
//           <source
//             src={Images.asset.gif.bgGif}
//             type="video/mp4"
//           />
//         </video>

//         <div className="absolute inset-0 bg-black/55" />
//       </div>

//       <div className="z-10 container mx-auto flex flex-col items-center px-4 pt-32 pb-10 md:pt-40 lg:pt-48">
//        <h1
//           className={cn(
//             "mb-12 text-center text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl"
//           )}
//         >
//           Your Full{" "}
//           <span className="inline-block">
//             {displayedText}
//             <span className="animate-pulse">|</span>
//           </span>{" "}
//           Platform
//         </h1>

//         <div className="flex flex-col items-center gap-4">
//           <div className="flex flex-wrap gap-2 xl:gap-4">
//             <Button
//               asChild
//               className="xl:px-6 xl:py-6 xl:text-lg"
//             >
//               <Link href={Routes.web.general.eventsDiscover}>Get Started</Link>
//             </Button>

//             <Link
//               href={Routes.web.auth.dashboard}
//               prefetch={false}
//             >
//               <Button className="dark:text-foreground bg-linear-to-r from-purple-600 to-cyan-600 text-white xl:px-6 xl:py-6 xl:text-lg">
//                 <Plus />
//                 Create Event
//               </Button>
//             </Link>
//           </div>

//           <p
//             className={`md:text-lg} max-w-2xl text-center text-base text-white`}
//           >
//             Manage your events with simple clicks
//           </p>
//         </div>
//       </div>

//       <div
//         ref={cardsSection.ref}
//         className={`relative z-10 mt-15 w-full px-2 pt-10 sm:px-4 md:overflow-visible md:px-6 lg:px-8`}
//       >
//         <div
//           className={`relative flex w-full origin-center touch-pan-y items-center justify-center transition-transform duration-150 ${
//             !isMounted
//               ? "scale-100"
//               : "scale-[0.75] sm:scale-[0.8] md:scale-[0.85] lg:scale-95 xl:scale-100"
//           }`}
//           style={
//             isMobile || disableHeavyEffects
//               ? {
//                   minHeight: "320px",
//                   paddingBottom: "60px",
//                 }
//               : {
//                   perspective: "5000px",
//                   perspectiveOrigin: "center center",
//                   minHeight: "320px",
//                   paddingBottom: "60px",
//                 }
//           }
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div className="relative flex h-full w-full items-center justify-center">
//             {useMemo(() => {
//               const positions = FEATURED_EVENTS.map((_, eventIdx) =>
//                 getCardPosition(eventIdx),
//               );

//               const cardCalculations = FEATURED_EVENTS.map(
//                 (event, eventIdx) => {
//                   const position = positions[eventIdx];
//                   if (position === "hidden") return null;

//                   const styles = getCardStyles(position);
//                   const eventLink = `${Routes.web.general.eventsDiscover}/${event.slug || "event"}`;

//                   const getCardWidthValue = (pos: string) => {
//                     if (pos === "far-left" || pos === "far-right") {
//                       if (windowWidth < 1700) return "400px";
//                       if (windowWidth < 1800) return "450px";
//                       if (windowWidth < 2000) return "500px";
//                       return "800px";
//                     }
//                     if (pos === "center") {
//                       if (!isMounted) return "750px";
//                       if (windowWidth < 425) return "280px";
//                       if (windowWidth < 1024) return "400px";
//                       if (windowWidth < 1440) return "450px";
//                       if (windowWidth < 1800) return "550px";
//                       if (windowWidth < 2300) return "750px";
//                       if (windowWidth < 2560) return "850px";
//                       return "900px";
//                     }
//                     if (!isMounted) return "500px";
//                     if (windowWidth < 500) return "220px";
//                     if (windowWidth < 768) return "320px";
//                     if (windowWidth < 1700) return "420px";
//                     if (windowWidth < 1850) return "450px";
//                     return "800px";
//                   };

//                   const getLeftPosValue = (pos: string) => {
//                     if (pos === "far-left") return "-5%";
//                     if (pos === "left") {
//                       if (!isMounted) return "10%";
//                       if (windowWidth < 640) return "-15%";
//                       if (windowWidth >= 1280) return "10%";
//                       return "-3%";
//                     }
//                     if (pos === "center") return "50%";
//                     return "auto";
//                   };

//                   const getRightPosValue = (pos: string) => {
//                     if (pos === "far-right") return "-5%";
//                     if (pos === "right") {
//                       if (!isMounted) return "10%";
//                       if (windowWidth < 640) return "-15%";
//                       if (windowWidth >= 1280) return "10%";
//                       return "-3%";
//                     }
//                     return "auto";
//                   };

//                   return {
//                     event,
//                     eventIdx,
//                     position,
//                     styles,
//                     eventLink,
//                     cardWidth: getCardWidthValue(position),
//                     leftPos: getLeftPosValue(position),
//                     rightPos: getRightPosValue(position),
//                   };
//                 },
//               ).filter(Boolean);

//               return cardCalculations;
//             }, [
//               windowWidth,
//               isMounted,
//               FEATURED_EVENTS,
//               getCardPosition,
//               getCardStyles,
//             ])
//               .filter((item): item is NonNullable<typeof item> => item !== null)
//               .map(
//                 ({
//                   event,
//                   eventIdx,
//                   position,
//                   styles,
//                   eventLink,
//                   cardWidth,
//                   leftPos,
//                   rightPos,
//                 }) => {
//                   const isMobileDevice = isMobile || disableHeavyEffects;

//                   return (
//                     <div
//                       key={`event-${eventIdx}`}
//                       className="absolute cursor-pointer transition-all duration-200 ease-out"
//                       style={{
//                         ...styles,
//                         transformStyle: isMobileDevice ? "flat" : "preserve-3d",
//                         width: cardWidth,
//                         left: leftPos,
//                         right: rightPos,
//                         transform:
//                           position === "center"
//                             ? `translateX(-50%) ${styles.transform}`
//                             : styles.transform,
//                       }}
//                       onMouseMove={(e) =>
//                         (position === "left" ||
//                           position === "right" ||
//                           position === "far-left" ||
//                           position === "far-right") &&
//                         handleMouseMove(e, position)
//                       }
//                       onMouseLeave={() => setHoveredCard(null)}
//                       onClick={(e) => {
//                         if (position === "left" || position === "far-left") {
//                           e.preventDefault();
//                           e.stopPropagation();
//                           handlePrevious();
//                         } else if (
//                           position === "right" ||
//                           position === "far-right"
//                         ) {
//                           e.preventDefault();
//                           e.stopPropagation();
//                           handleNext();
//                         }
//                       }}
//                     >
//                       {position === "center" ? (
//                         <Link href={eventLink}>
//                           <FeaturedEventCardComponent
//                             item={event}
//                             disableLink={true}
//                           />
//                         </Link>
//                       ) : (
//                         <>
//                           <FeaturedEventCardComponent
//                             item={event}
//                             disableLink={true}
//                           />
//                         </>
//                       )}

//                       {((position === "left" && hoveredCard === "left") ||
//                         (position === "right" && hoveredCard === "right") ||
//                         (position === "far-left" &&
//                           hoveredCard === "far-left") ||
//                         (position === "far-right" &&
//                           hoveredCard === "far-right")) && (
//                         <div
//                           className="pointer-events-none absolute z-50"
//                           style={{
//                             left: `${cursorPosition.x}px`,
//                             top: `${cursorPosition.y}px`,
//                             transform: "translate(-50%, -50%)",
//                           }}
//                         >
//                           <Button
//                             variant="default"
//                             size="lg"
//                             className="rounded-full bg-white/90 px-6 py-3 font-semibold text-black shadow-xl hover:bg-white"
//                           >
//                             {position === "left" || position === "far-left"
//                               ? "← Previous"
//                               : "Next →"}
//                           </Button>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 },
//               )}
//           </div>
//         </div>

//         <div className="hidden">
//           <div className="mt-6 flex items-center justify-center gap-2 border">
//             {FEATURED_EVENTS.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentIndex(idx)}
//                 className={`relative cursor-pointer overflow-hidden rounded-full transition-all duration-300 ${
//                   currentIndex === idx
//                     ? "h-2 w-8 bg-white/40"
//                     : "h-2 w-2 bg-white/40 hover:bg-white/60"
//                 }`}
//                 aria-label={`Go to event ${idx + 1}`}
//               >
//                 {currentIndex === idx && (
//                   <div
//                     className="absolute top-0 left-0 h-full bg-white transition-all duration-16 ease-linear"
//                     style={{ width: `${progress}%` }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>

//           <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
//             <svg
//               className="h-4 w-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M7 16l-4-4m0 0l4-4m-4 4h18"
//               />
//             </svg>
//             <span>Swipe to navigate</span>
//             <svg
//               className="h-4 w-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 8l4 4m0 0l-4 4m4-4H3"
//               />
//             </svg>
//           </div>
//         </div>

//         <div className="flex flex-col pt-10 md:pt-24">
//           <div className="flex flex-col items-center">
//             <div className="flex max-w-72 snap-x gap-2 overflow-hidden md:max-w-xs">
//               {Array.from({ length: FEATURED_EVENTS?.length ?? 0 })?.map(
//                 (item, index) => {
//                   return (
//                     <div
//                       key={index}
//                       onClick={() => setCurrentIndex(index)}
//                       className={cn(
//                         "bg-primary h-2 min-w-2 cursor-pointer rounded-full transition-all ease-in-out",
//                         {
//                           "w-10 min-w-10 snap-center": currentIndex === index,
//                         },
//                       )}
//                     ></div>
//                   );
//                 },
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <HomeStatSection stats={stats} />
//     </section>
//   );
// }
 

// function HomeStatSection({ stats }: {
//   stats: {
//     organizers: number;
//     sales: number;
//     countries: number;
//   };
// }) {
//     return (
//       <div className="relative pt-10 mt-10 w-full bg-black font-bold text-white">
//         <div className="relative w-full pt-10 pb-8 md:pt-10 md:pb-12">
//           <p className="mb-12 text-center text-xs text-white/90 md:mb-16 md:text-base">
//             Join millions of event organizers who manage their events on our platform.
//           </p>
//           <div className="mx-auto flex max-w-7xl flex-row flex-wrap items-center justify-center gap-4 pb-12 md:grid md:grid-cols-3 md:gap-8 md:pb-16">
//             <div className="flex flex-col items-center text-center min-w-25">
//               <h3 className="mb-2 text-3xl font-bold text-white md:text-6xl lg:text-7xl">
//                 {stats.organizers}M+
//               </h3>
//               <p className="text-xs text-white/70 md:text-base">Event Organizers Served</p>
//             </div>
//             <div className="flex flex-col items-center text-center min-w-25">
//               <h3 className="mb-2 text-3xl font-bold text-white md:text-6xl lg:text-7xl">
//                 ${stats.sales}B+
//               </h3>
//               <p className="text-xs text-white/70 md:text-base">Generated in Ticket Sales</p>
//             </div>
//             <div className="flex flex-col items-center text-center min-w-25">
//               <h3 className="mb-2 text-3xl font-bold text-white md:text-6xl lg:text-7xl">
//                 {stats.countries}+
//               </h3>
//               <p className="text-xs text-white/70 md:text-base">Countries & Territories</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }


// export type EventCardType = {
//   item: MockEventData;
//   disableLink?: boolean;
//   disableOrganizerLink?: boolean;
//   distanceKm?: number;
// };

// function FeaturedEventCardComponent(props: EventCardType) {
//   //
//   const item = props.item;
//   const eventLink = `${Routes.web.general.eventsDiscover}/${item.slug || "event"}`;


//   const cardContent = (
//     <div className="relative cursor-pointer transition-transform duration-300 hover:scale-103">
//       <div className="relative flex h-112.5 w-full flex-col overflow-hidden rounded-xl bg-gray-950 shadow-2xl 2xl:h-125">
//         {/*  */}
//         <div className="relative h-64 w-full overflow-hidden">
 

//           <div
//             className="h-75 w-full flex-1 bg-cover bg-center"
//             style={{ backgroundImage: `url(${item.imageUrl})` }}
//           ></div>

//           <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent"></div>

//           {/* Featured Tag */}
//           {item.featured && (
//             <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
//               <Star className="h-3.5 w-3.5 fill-white" />
//               <span>Featured</span>
//             </div>
//           )}
//         </div>
//         {/* Card Content */}
//         <div className="flex flex-1 flex-col justify-between gap-1 bg-gray-950 p-5 xl:gap-3">
//           {/* Date */}
//           <div className="flex items-center gap-2 text-gray-400">
//             <CalendarHeart className="h-4 w-4 text-pink-400" />
//             <p className="text-xs font-medium xl:text-sm 2xl:text-base">
//               {item.startDate}
//             </p>
//           </div>

//           {/* Event Name */}
//           <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white xl:text-xl 2xl:text-2xl">
//             {item.name}
//           </h3>

//           {/* Location */}
//           <div className="flex flex-col gap-1">
//             <div className="flex items-center gap-2 text-gray-400">
//               <MapPin className="h-4 w-4 text-cyan-400" />
//               <p className="line-clamp-1 text-xs xl:text-sm 2xl:text-base">
//                 {item.locationMap}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between border-t border-gray-800 xl:pt-3">
//             <div>
//               <Image
//                 src={Images?.asset?.user.charlie}
//                 alt="Verified Badge"
//                 width={24}
//                 height={24}
//                 className="h-6 w-6 object-contain"
//               />
//             </div>

//             <p className="bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text font-bold text-transparent lg:text-base xl:text-2xl 2xl:text-3xl">
//               ${item.price}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   if (props.disableLink) {
//     return cardContent;
//   }

//   return <Link href={eventLink}>{cardContent}</Link>;
// }
