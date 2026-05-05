"use client";

import { Button } from "@/components/ui/button";
import { useDevicePerfFlags } from "@/hooks/use-device-perf-flags";
import {
  ANIMATION_PRESETS,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { Videos } from "@/lib/lib-videos";
import { getFeaturedEvents } from "@/lib/mock-events";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FeaturedEventCardComponent from "../card/FeaturedEventCardComponent";

const HomeHeroSectionV2 = () => {
  // Memoize featured events to prevent recalculation on every render
  const FEATURED_EVENTS = useMemo(() => getFeaturedEvents(), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    organizers: 100,
    sales: 50,
    countries: 50,
  });
  const [hoveredCard, setHoveredCard] = useState<
    "left" | "right" | "far-left" | "far-right" | null
  >(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(1200); // Default to desktop width for SSR
  const [isMounted, setIsMounted] = useState(false);
  // Removed touchStart/touchEnd state - using refs instead to prevent re-renders
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoMetadataLoaded, setVideoMetadataLoaded] = useState(false); // Track metadata separately for mobile
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoLoadedRef = useRef(false); // Ref to track loaded state in callbacks

  // Rotating text for hero heading
  const rotatingTexts = ["Event Management", "Event Hosting", "Event Marketplace", "Event Vendor"];
  const [rotatingTextIndex, setRotatingTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const currentText = rotatingTexts[rotatingTextIndex] || "";
  const displayedText = currentText.substring(0, charIndex);

  // Get device performance flags for mobile optimization
  const { isMobile, disableHeavyEffects } = useDevicePerfFlags();

  // Handle client-side mount
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  // Reset charIndex when text changes
  useEffect(() => {
    setCharIndex(0);
    setIsDeleting(false);
  }, [rotatingTextIndex]);

  // Typing effect for rotating text
  useEffect(() => {
    if (!currentText) return;
    
    const typingSpeed = isDeleting ? 50 : 100;
    
    // If we finished typing, wait then start deleting
    if (!isDeleting && charIndex === currentText.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
    
    // If we finished deleting, move to next text
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRotatingTextIndex((prev) => (prev + 1) % rotatingTexts.length);
      return;
    }

    // Continue typing or deleting
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCharIndex((prev) => Math.max(0, prev - 1));
      } else {
        setCharIndex((prev) => Math.min(currentText.length, prev + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentText, rotatingTexts.length]);

  // Video loading - Optimized for both desktop and mobile
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let mounted = true;
    let hasLoaded = false; // Track if we've started loading to prevent reloads

    const handleLoadedMetadata = () => {
      if (!mounted) return;
      // Metadata loaded - video is ready to show (especially important on mobile)
      videoLoadedRef.current = true;
      setVideoMetadataLoaded(true); // Set metadata loaded state
      setVideoLoaded(true);
      setVideoError(false);
    };

    const handleLoadedData = () => {
      if (!mounted) return;
      // Video data loaded
      videoLoadedRef.current = true;
      setVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = () => {
      if (!mounted) return;
      videoLoadedRef.current = false;
      setVideoError(true);
      setVideoLoaded(false);
    };

    const handleCanPlay = () => {
      if (!mounted || !video) return;
      // Ensure loaded state is set when video can play
      if (!videoLoadedRef.current) {
        videoLoadedRef.current = true;
        setVideoLoaded(true);
        setVideoError(false);
      }
      // On mobile, play video when it's ready and visible
      if (isMobile || disableHeavyEffects) {
        video.play().catch(() => {
          // Autoplay might be blocked on mobile, that's okay
        });
      }
    };

    const setupVideo = () => {
      if (!video || !mounted || hasLoaded) return;
      hasLoaded = true;

      // Configure video attributes based on device
      if (isMobile || disableHeavyEffects) {
        // Mobile optimizations: metadata preload, lower quality hints
        video.preload = "metadata";
        video.setAttribute("playsinline", "true");
        // Reduce playback quality hints for mobile
        if ("playbackRate" in video) {
          video.playbackRate = 1.0; // Normal speed
        }
      } else {
        // Desktop: auto preload for immediate playback
        video.preload = "auto";
      }

      // Set up event listeners
      video.addEventListener("loadedmetadata", handleLoadedMetadata); // Fires earlier, important for mobile
      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("error", handleError);
      video.addEventListener("canplay", handleCanPlay);

      // Check if video is already loaded (cached or ready)
      if (video.readyState >= 1) {
        // Video has metadata or more loaded, set loaded state immediately
        requestAnimationFrame(() => {
          if (mounted && video) {
            videoLoadedRef.current = true;
            setVideoMetadataLoaded(true);
            setVideoLoaded(true);
            setVideoError(false);
          }
        });
      }

      // Load video
      if (video.readyState === 0) {
        video.load();
      }

      // Attempt to play on both desktop and mobile (autoplay may be blocked, that's okay)
      video.play().catch(() => {
        // Autoplay might be blocked, especially on mobile, that's okay
        // Video will still be loaded and ready
      });
    };

    // Load video immediately on both desktop and mobile (no lazy loading)
    // Mobile uses optimized settings (metadata preload) but still loads immediately
    setupVideo();

    return () => {
      mounted = false;
      if (video) {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("error", handleError);
        video.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, [isMobile, disableHeavyEffects]);

  // Scroll animations - Always call hooks, but disable functionality on mobile
  // Must always call hooks in the same order (Rules of Hooks)
  const heroTitle = useScrollAnimation(
    disableHeavyEffects
      ? { threshold: 1, triggerOnce: false } // Never trigger on mobile
      : {
          ...ANIMATION_PRESETS.heroText,
          threshold: 0.1,
        },
  );

  const heroSubtext = useScrollAnimation(
    disableHeavyEffects
      ? { threshold: 1, triggerOnce: false }
      : {
          ...ANIMATION_PRESETS.subtle,
          delay: 400,
          threshold: 0.1,
        },
  );

  const cardsSection = useScrollAnimation(
    disableHeavyEffects
      ? { threshold: 1, triggerOnce: false }
      : {
          variant: "scale-up",
          duration: 1000,
          delay: 200,
          threshold: 0.15,
        },
  );

  const statsTagline = useScrollAnimation(
    disableHeavyEffects
      ? { threshold: 1, triggerOnce: false }
      : {
          ...ANIMATION_PRESETS.subtle,
          threshold: 0.3,
        },
  );

  // Individual stat animations with stagger effect
  const stat1 = useScrollAnimation(
    disableHeavyEffects
      ? { threshold: 1, triggerOnce: false }
      : {
          ...ANIMATION_PRESETS.stat,
          delay: 100,
          threshold: 0.3,
        },
  );

  const stat2 = useScrollAnimation(
    disableHeavyEffects
      ? { threshold: 1, triggerOnce: false }
      : {
          ...ANIMATION_PRESETS.stat,
          delay: 250,
          threshold: 0.3,
        },
  );

  const stat3 = useScrollAnimation(
    disableHeavyEffects
      ? { threshold: 1, triggerOnce: false }
      : {
          ...ANIMATION_PRESETS.stat,
          delay: 400,
          threshold: 0.3,
        },
  );

  // Debounced resize handler to improve performance - throttled for mobile
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastCall = 0;
    const throttleDelay = isMobile ? 300 : 150; // More aggressive throttling on mobile

    const handleResize = () => {
      const now = Date.now();
      clearTimeout(timeoutId);

      if (now - lastCall >= throttleDelay) {
        setWindowWidth(window.innerWidth);
        lastCall = now;
      } else {
        timeoutId = setTimeout(
          () => {
            setWindowWidth(window.innerWidth);
            lastCall = Date.now();
          },
          throttleDelay - (now - lastCall),
        );
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Auto-advance slides with progress tracking (optimized interval)
  useEffect(() => {
    // Disable auto-advance on mobile to prevent crashes
    if (isMobile || disableHeavyEffects) return;

    const autoPlayInterval = 5000; // 5 seconds
    setProgress(0);
    const startTime = Date.now();

    // Use requestAnimationFrame for smoother progress updates
    let rafId: number;
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / autoPlayInterval) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };
    rafId = requestAnimationFrame(updateProgress);

    const slideTimer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_EVENTS.length);
      setProgress(0);
    }, autoPlayInterval);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(slideTimer);
    };
  }, [FEATURED_EVENTS.length, currentIndex, isMobile, disableHeavyEffects]);

  // Handle navigation
  const handlePrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURED_EVENTS.length);
  };

  // Touch handlers for mobile swipe - Optimized to prevent forced reflows
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Use refs to avoid state updates on every touch event
    touchStartRef.current = e.targetTouches[0].clientX;
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Only update ref, no state update
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const start = touchStartRef.current;
    const end = touchEndRef.current;

    if (!start || !end) return;

    const distance = start - end;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    //space
    // Batch state updates
    requestAnimationFrame(() => {
      if (isLeftSwipe) {
        handleNext();
      } else if (isRightSwipe) {
        handlePrevious();
      }

      // Reset
      touchStartRef.current = 0;
      touchEndRef.current = 0;
    });
  };

  // Handle mouse move for cursor following button - Optimized to prevent forced reflows
  const rafRef = useRef<number | null>(null);
  const lastMousePosition = useRef({
    x: 0,
    y: 0,
    position: null as "left" | "right" | "far-left" | "far-right" | null,
  });
  const cachedRect = useRef<DOMRect | null>(null);
  const rectCacheTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rectCacheTimeoutRef.current) {
        clearTimeout(rectCacheTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    position: "left" | "right" | "far-left" | "far-right",
  ) => {
    // Cancel any pending frame to prevent queue buildup
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    // Cache rect only when needed (position change or cache expired)
    if (
      !cachedRect.current ||
      lastMousePosition.current.position !== position
    ) {
      cachedRect.current = e.currentTarget.getBoundingClientRect();

      // Clear cache after 100ms to handle element movement
      if (rectCacheTimeoutRef.current) {
        clearTimeout(rectCacheTimeoutRef.current);
      }
      rectCacheTimeoutRef.current = setTimeout(() => {
        cachedRect.current = null;
      }, 100);
    }

    const rect = cachedRect.current;
    const newPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      position,
    };

    // Only update if position changed significantly (reduce unnecessary updates)
    const lastPos = lastMousePosition.current;
    const distance = Math.sqrt(
      Math.pow(newPos.x - lastPos.x, 2) + Math.pow(newPos.y - lastPos.y, 2),
    );

    if (distance > 5 || lastPos.position !== position) {
      lastMousePosition.current = newPos;

      // Batch updates using requestAnimationFrame
      rafRef.current = requestAnimationFrame(() => {
        setCursorPosition({
          x: lastMousePosition.current.x,
          y: lastMousePosition.current.y,
        });
        setHoveredCard(lastMousePosition.current.position);
        rafRef.current = null;
      });
    }
  };

  // Animate stats when visible (triggered by stat1 visibility) - Skip on mobile
  useEffect(() => {
    if (disableHeavyEffects) {
      // Set final values immediately on mobile
      setStats({ organizers: 14, sales: 36, countries: 200 });
      return;
    }
    if (!stat1.isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      organizers: 14,
      sales: 36,
      countries: 200,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      setStats({
        organizers: Math.floor(easeOut * targets.organizers),
        sales: Math.floor(easeOut * targets.sales),
        countries: Math.floor(easeOut * targets.countries),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targets); // Ensure final values are exact
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stat1.isVisible, disableHeavyEffects]);

  // Helper function to get position for each event
  const getCardPosition = useCallback(
    (eventIdx: number) => {
      const leftIdx =
        (currentIndex - 1 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length;
      const centerIdx = currentIndex;
      const rightIdx = (currentIndex + 1) % FEATURED_EVENTS.length;

      // For XL screens (1280px+), show 5 cards
      // On mobile, only show center card to reduce GPU load
      const isMobileDevice = isMobile || disableHeavyEffects;
      const isXL = !isMobileDevice && windowWidth >= 768;
      const farLeftIdx = isXL
        ? (currentIndex - 2 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length
        : -1;
      const farRightIdx = isXL
        ? (currentIndex + 2) % FEATURED_EVENTS.length
        : -1;

      if (isXL && eventIdx === farLeftIdx) return "far-left";
      if (eventIdx === leftIdx) return "left";
      if (eventIdx === centerIdx) return "center";
      if (eventIdx === rightIdx) return "right";
      if (isXL && eventIdx === farRightIdx) return "far-right";
      return "hidden";
    },
    [
      currentIndex,
      isMobile,
      disableHeavyEffects,
      windowWidth,
      FEATURED_EVENTS.length,
    ],
  );

  // Get styles based on position
  const getCardStyles = useCallback(
    (position: string) => {
      // Use device perf flags for mobile detection
      const isMobileDevice = isMobile || disableHeavyEffects;

      switch (position) {
        case "far-left":
          // Hide far cards on mobile to reduce GPU load
          if (isMobileDevice) {
            return {
              transform: "translateX(200%) scale(0.5)",
              opacity: 0,
              transformOrigin: "center center",
              zIndex: 0,
              pointerEvents: "none" as const,
            };
          }
          return {
            transform:
              "rotateY(45deg) rotateX(25deg) translateZ(-200px) translateX(0%)",
            opacity: 0.4,
            transformOrigin: "right center",
            zIndex: 0,
            pointerEvents: "auto" as const,
          };
        case "left":
          // On mobile, use simple 2D transforms to prevent crashes
          return {
            transform: isMobileDevice
              ? "translateX(-20%) scale(0.85)" // Simple 2D transform
              : "rotateY(35deg) rotateX(20deg) translateZ(-100px) translateX(0%)",
            opacity: isMobileDevice ? 0.3 : 0.7,
            transformOrigin: "right center",
            zIndex: 1,
            pointerEvents: "auto" as const,
          };
        case "center":
          return {
            transform: isMobileDevice
              ? "scale(1)" // Simple scale on mobile
              : "rotateY(0deg) translateZ(0px) scale(1.05) translateX(0%)",
            opacity: 1,
            transformOrigin: "center center",
            zIndex: 10,
            pointerEvents: "auto" as const,
          };
        case "right":
          // On mobile, use simple 2D transforms to prevent crashes
          return {
            transform: isMobileDevice
              ? "translateX(20%) scale(0.85)" // Simple 2D transform
              : "rotateY(-35deg) rotateX(20deg) translateZ(-100px) translateX(0%)",
            opacity: isMobileDevice ? 0.3 : 0.7,
            transformOrigin: "left center",
            zIndex: 1,
            pointerEvents: "auto" as const,
          };
        case "far-right":
          // Hide far cards on mobile to reduce GPU load
          if (isMobileDevice) {
            return {
              transform: "translateX(200%) scale(0.5)",
              opacity: 0,
              transformOrigin: "center center",
              zIndex: 0,
              pointerEvents: "none" as const,
            };
          }
          return {
            transform:
              "rotateY(-45deg) rotateX(25deg) translateZ(-200px) translateX(0%)",
            opacity: 0.4,
            transformOrigin: "left center",
            zIndex: 0,
            pointerEvents: "auto" as const,
          };
        default:
          return {
            transform: "translateX(200%) scale(0.5)",
            opacity: 0,
            transformOrigin: "center center",
            zIndex: 0,
            pointerEvents: "none" as const,
          };
      }
    },
    [isMobile, disableHeavyEffects],
  );

  {
    /* Component TSX start */
  }
  return (
    <section className="relative flex w-full flex-col overflow-hidden dark:bg-transparent">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {/* Fallback image while the video loads or if it fails */}
        {(!videoLoaded || videoError) && (
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${Images.heroBgGif})`,
            }}
          />
        )}

        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            videoLoaded && !videoError ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          poster={Images.heroBgGif}
        >
          <source
            src={Videos.heroBackground}
            type="video/mp4"
          />
        </video>

        {/* Overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Hero Content */}
      <div className="z-10 container mx-auto flex flex-col items-center px-4 pt-32 pb-10 md:pt-40 lg:pt-48">
        <h1
          className={cn(
            "mb-12 text-center text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl xl:text-6xl"
          )}
        >
          Your Full <br className="md:hidden" />
          <span className="inline-block">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
          <br className="md:hidden" /> Platform
        </h1>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-2 xl:gap-4">
            <Button
              // variant={"slide"}
              asChild
              className="xl:px-6 xl:py-6 xl:text-lg"
            >
              <Link href={Routes.web.general.events}>Get Started</Link>
            </Button>

            <Link href={Routes.web.auth.dashboardEventCreate}>
              <Button className="dark:text-foreground bg-linear-to-r from-purple-600 to-cyan-600 text-white xl:px-6 xl:py-6 xl:text-lg">
                <Plus />
                Create Event
              </Button>
            </Link>
          </div>

          <p
            className={`md:text-lg} max-w-2xl text-center text-base text-white`}
          >
            Manage your events with simple clicks
          </p>
        </div>
      </div>

      {/* Angled Carousel (3 cards full width) */}
      <div
        ref={cardsSection.ref}
        // className={`relative z-10 mt-15 w-full px-2 pt-10 sm:px-4 md:overflow-visible md:px-6 lg:px-8 ${disableHeavyEffects ? "" : cardsSection.className}`}
        className={`relative z-10 mt-15 w-full px-2 pt-10 sm:px-4 md:overflow-visible md:px-6 lg:px-8`}
        // style={disableHeavyEffects ? {} : cardsSection.style}
      >
        <div
          className={`relative flex w-full origin-center touch-pan-y items-center justify-center transition-transform duration-150 ${
            !isMounted
              ? "scale-100" // SSR: render at desktop scale
              : "scale-[0.75] sm:scale-[0.8] md:scale-[0.85] lg:scale-95 xl:scale-100"
          }`}
          style={
            isMobile || disableHeavyEffects
              ? {
                  // Disable 3D perspective on mobile to prevent crashes
                  minHeight: "320px",
                  paddingBottom: "60px",
                }
              : {
                  perspective: "5000px",
                  perspectiveOrigin: "center center",
                  minHeight: "320px",
                  paddingBottom: "60px",
                }
          }
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Container spanning full width */}
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Render featured events only - Memoized calculations */}
            {useMemo(() => {
              // Pre-compute position calculations once
              const positions = FEATURED_EVENTS.map((_, eventIdx) =>
                getCardPosition(eventIdx),
              );

              // Memoize card calculations to prevent recalculation on every render
              const cardCalculations = FEATURED_EVENTS.map(
                (event, eventIdx) => {
                  const position = positions[eventIdx];
                  if (position === "hidden") return null;

                  const styles = getCardStyles(position);
                  const eventLink = `${Routes.web.general.eventDetail}/${event.slug || "event"}`;

                  // Simplified width calculations - extract to helper functions
                  const getCardWidthValue = (pos: string) => {
                    if (pos === "far-left" || pos === "far-right") {
                      if (windowWidth < 1700) return "400px";
                      if (windowWidth < 1800) return "450px";
                      if (windowWidth < 2000) return "500px";
                      return "800px";
                    }
                    if (pos === "center") {
                      if (!isMounted) return "750px";
                      if (windowWidth < 425) return "280px";
                      if (windowWidth < 1024) return "400px";
                      if (windowWidth < 1440) return "450px";
                      if (windowWidth < 1800) return "550px";
                      if (windowWidth < 2300) return "750px";
                      if (windowWidth < 2560) return "850px";
                      return "900px";
                    }
                    // left or right
                    if (!isMounted) return "500px";
                    if (windowWidth < 500) return "220px";
                    if (windowWidth < 768) return "320px";
                    if (windowWidth < 1700) return "420px";
                    if (windowWidth < 1850) return "450px";
                    return "800px";
                  };

                  const getLeftPosValue = (pos: string) => {
                    if (pos === "far-left") return "-5%";
                    if (pos === "left") {
                      if (!isMounted) return "10%";
                      if (windowWidth < 640) return "-15%";
                      if (windowWidth >= 1280) return "10%";
                      return "-3%";
                    }
                    if (pos === "center") return "50%";
                    return "auto";
                  };

                  const getRightPosValue = (pos: string) => {
                    if (pos === "far-right") return "-5%";
                    if (pos === "right") {
                      if (!isMounted) return "10%";
                      if (windowWidth < 640) return "-15%";
                      if (windowWidth >= 1280) return "10%";
                      return "-3%";
                    }
                    return "auto";
                  };

                  return {
                    event,
                    eventIdx,
                    position,
                    styles,
                    eventLink,
                    cardWidth: getCardWidthValue(position),
                    leftPos: getLeftPosValue(position),
                    rightPos: getRightPosValue(position),
                  };
                },
              ).filter(Boolean);

              return cardCalculations;
            }, [
              windowWidth,
              isMounted,
              FEATURED_EVENTS,
              getCardPosition,
              getCardStyles,
            ])
              .filter((item): item is NonNullable<typeof item> => item !== null)
              .map(
                ({
                  event,
                  eventIdx,
                  position,
                  styles,
                  eventLink,
                  cardWidth,
                  leftPos,
                  rightPos,
                }) => {
                  const isMobileDevice = isMobile || disableHeavyEffects;

                  return (
                    <div
                      key={`event-${eventIdx}`}
                      className="absolute cursor-pointer transition-all duration-200 ease-out"
                      style={{
                        ...styles,
                        // Only use 3D transforms on desktop
                        transformStyle: isMobileDevice ? "flat" : "preserve-3d",
                        width: cardWidth,
                        left: leftPos,
                        right: rightPos,
                        transform:
                          position === "center"
                            ? `translateX(-50%) ${styles.transform}`
                            : styles.transform,
                      }}
                      onMouseMove={(e) =>
                        (position === "left" ||
                          position === "right" ||
                          position === "far-left" ||
                          position === "far-right") &&
                        handleMouseMove(e, position)
                      }
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={(e) => {
                        if (position === "left" || position === "far-left") {
                          e.preventDefault();
                          e.stopPropagation();
                          handlePrevious();
                        } else if (
                          position === "right" ||
                          position === "far-right"
                        ) {
                          e.preventDefault();
                          e.stopPropagation();
                          handleNext();
                        }
                      }}
                    >
                      {position === "center" ? (
                        <Link href={eventLink}>
                          {/* <EventCardComponent item={event} disableLink={true} /> */}
                          <FeaturedEventCardComponent
                            item={event}
                            disableLink={true}
                          />
                        </Link>
                      ) : (
                        <>
                          {/* <EventCardComponent item={event} disableLink={true} /> */}
                          <FeaturedEventCardComponent
                            item={event}
                            disableLink={true}
                          />
                        </>
                      )}

                      {/* Cursor-following button */}
                      {((position === "left" && hoveredCard === "left") ||
                        (position === "right" && hoveredCard === "right") ||
                        (position === "far-left" &&
                          hoveredCard === "far-left") ||
                        (position === "far-right" &&
                          hoveredCard === "far-right")) && (
                        <div
                          className="pointer-events-none absolute z-50"
                          style={{
                            left: `${cursorPosition.x}px`,
                            top: `${cursorPosition.y}px`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <Button
                            variant="default"
                            size="lg"
                            className="rounded-full bg-white/90 px-6 py-3 font-semibold text-black shadow-xl hover:bg-white"
                          >
                            {position === "left" || position === "far-left"
                              ? "← Previous"
                              : "Next →"}
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                },
              )}
          </div>
        </div>

        {/* Mobile/Tablet Navigation Dots with Progress */}
        <div className="hidden">
          <div className="mt-6 flex items-center justify-center gap-2 border">
            {FEATURED_EVENTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative overflow-hidden rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "h-2 w-8 bg-white/40"
                    : "h-2 w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to event ${idx + 1}`}
              >
                {/* Progress bar for active dot */}
                {currentIndex === idx && (
                  <div
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-16 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Swipe hint */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>Swipe to navigate</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col pt-10 md:pt-24">
          <div className="flex flex-col items-center">
            <div className="flex max-w-72 snap-x gap-2 overflow-hidden md:max-w-xs">
              {Array.from({ length: FEATURED_EVENTS?.length ?? 0 })?.map(
                (item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={cn(
                        "bg-primary h-2 min-w-2 cursor-pointer rounded-full transition-all ease-in-out",
                        {
                          "w-10 min-w-10 snap-center": currentIndex === index,
                        },
                      )}
                    ></div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="relative w-full bg-black"
        style={{ zIndex: 2 }}
      >
        {/* Tagline section */}
        <div className="relative w-full pt-10 pb-8 md:pt-10 md:pb-12">
          <div className="container mx-auto px-4">
            <p
              ref={statsTagline.ref}
              className={`mb-12 text-center text-sm text-white/90 md:mb-16 md:text-base ${disableHeavyEffects ? "" : statsTagline.className}`}
              style={disableHeavyEffects ? {} : statsTagline.style}
            >
              Join millions of event organizers who manage their events on our
              platform.
            </p>

            {/* Stats Grid */}
            <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2 pb-12 md:gap-8 md:pb-16">
              {/* Stat 1 */}
              <div className={`flex flex-col items-center text-center`}>
                <h3 className="mb-1 text-2xl font-bold text-white md:mb-3 md:text-6xl lg:text-7xl">
                  {stats.organizers}M+
                </h3>
                <p className="text-[10px] text-white/70 md:text-base">
                  Event Organizers Served
                </p>
              </div>

              {/* Stat 2 */}
              <div className={`flex flex-col items-center text-center`}>
                <h3 className="mb-1 text-2xl font-bold text-white md:mb-3 md:text-6xl lg:text-7xl">
                  ${stats.sales}B+
                </h3>
                <p className="text-[10px] text-white/70 md:text-base">
                  Generated in Ticket Sales
                </p>
              </div>

              {/* Stat 3 */}
              <div className={`flex flex-col items-center text-center`}>
                <h3 className="mb-1 text-2xl font-bold text-white md:mb-3 md:text-6xl lg:text-7xl">
                  {stats.countries}+
                </h3>
                <p className="text-[10px] text-white/70 md:text-base">
                  Countries & Territories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSectionV2;
