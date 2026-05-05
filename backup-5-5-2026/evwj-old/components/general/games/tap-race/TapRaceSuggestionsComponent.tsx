"use client";
import { TAP_RACE_ANIMATIONS } from "@/components/general/games/game-data";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/lib-routes";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ImportTemplateDialog from "../ImportTemplateDialog";

interface Props {
  slug: string;
  gameSlug: string;
}

const ANIMATION_ICONS = {
  car: "🏎️",
  ball: "⚽",
  rocket: "🚀",
  runner: "🏃",
};

function MiniAnimationPreview({
  animationType,
}: {
  animationType: "car" | "ball" | "rocket" | "runner";
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Auto-animate the preview
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const isVertical = animationType === "rocket";

  const positionSpring = useSpring({
    to: {
      x: isVertical ? 50 : progress,
      y: isVertical ? 100 - progress : 50,
      rotate:
        animationType === "ball"
          ? progress * 3.6
          : animationType === "car"
            ? progress * 0.5
            : 0,
    },
    config: { tension: 100, friction: 20 },
  });

  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl bg-black/20 sm:h-28 md:h-32">
      {/* Progress track */}
      <div className="absolute inset-0">
        {isVertical ? (
          <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-white/30" />
        ) : (
          <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-white/30" />
        )}
        {/* Progress indicator */}
        {isVertical ? (
          <div
            className="absolute bottom-0 left-1/2 h-full w-1 -translate-x-1/2 bg-white/60 transition-all duration-100"
            style={{ height: `${progress}%` }}
          />
        ) : (
          <div
            className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 bg-white/60 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        )}
      </div>

      {/* Animated element */}
      <animated.div
        style={{
          position: "absolute",
          left: positionSpring.x.to((x) => `${x}%`),
          top: positionSpring.y.to((y) => `${y}%`),
          transform: positionSpring.rotate.to(
            (r) => `translate(-50%, -50%) rotate(${r}deg)`,
          ),
          fontSize: "2.5rem",
          userSelect: "none",
        }}
        className="origin-center"
      >
        {ANIMATION_ICONS[animationType]}
      </animated.div>
    </div>
  );
}

export default function TapRaceSuggestionsComponent({ slug, gameSlug }: Props) {
  const customHref = `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}${Routes.web.auth.dashboardEventGamesTapRace}${Routes.web.auth.dashboardEventGamesTapRaceCustom}`;

  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const buildAnimationHref = (animationType: string) => {
    return `${customHref}?animationType=${animationType}`;
  };

  const handleImport = (template: any) => {
    window.location.href = `${customHref}?animationType=${template.animationType}`;
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Header */}
      <section className="px-4 pt-4 md:px-8">
        <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl dark:text-white">
          Choose Your Tap Race Animation
        </h1>
        <p className="text-gray-500 dark:text-slate-300">
          Pick an animation style that matches your event vibe, or create your
          own custom tap race.
        </p>
      </section>

      {/* Carousel of suggested animations */}
      <section className="w-full px-2 md:px-4">
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
        >
          {TAP_RACE_ANIMATIONS.map((animation, idx) => (
            <SwiperSlide
              key={animation.id}
              style={{ width: "auto" }}
            >
              <Link href={buildAnimationHref(animation.animationType)}>
                <div
                  className="group relative h-[380px] w-full max-w-[280px] cursor-pointer overflow-hidden rounded-3xl p-6 text-white shadow-lg transition-transform hover:scale-105 sm:h-[420px] sm:max-w-[300px] md:h-[440px] lg:max-w-[340px]"
                  style={{
                    background:
                      idx % 5 === 0
                        ? "linear-gradient(135deg,#ff7a18 0%,#af002d 100%)"
                        : idx % 5 === 1
                          ? "linear-gradient(135deg,#3a1c71 0%,#d76d77 50%,#ffaf7b 100%)"
                          : idx % 5 === 2
                            ? "linear-gradient(135deg,#00c6ff 0%,#0072ff 100%)"
                            : idx % 5 === 3
                              ? "linear-gradient(135deg,#8e2de2 0%,#4a00e0 100%)"
                              : "linear-gradient(135deg,#ff512f 0%,#dd2476 100%)",
                  }}
                >
                  {/* Animation type badge */}
                  <div className="absolute top-3 -right-3 rotate-12">
                    <span className="rounded-full bg-orange-400 px-3 py-1 text-xs font-bold text-white shadow">
                      {animation.animationType === "car" && "🏎️"}
                      {animation.animationType === "ball" && "⚽"}
                      {animation.animationType === "rocket" && "🚀"}
                      {animation.animationType === "runner" && "🏃"}
                    </span>
                  </div>

                  <h3 className="pr-6 text-xl leading-snug font-extrabold">
                    {animation.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 pr-2 text-sm leading-relaxed text-white/90">
                    {animation.description}
                  </p>

                  {/* Animation Preview */}
                  <div className="mt-4">
                    <MiniAnimationPreview
                      animationType={animation.animationType}
                    />
                  </div>

                  {/* Pills */}
                  <div className="absolute bottom-20 left-6 flex items-center gap-3">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm dark:bg-slate-800/90 dark:text-white">
                      ⚡ Fast-paced
                    </span>
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm dark:bg-slate-800/90 dark:text-white">
                      🎯 {animation.difficulty}
                    </span>
                  </div>

                  {/* Import Button */}
                  <div className="absolute right-6 bottom-5 left-6">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setImportDialogOpen(true);
                      }}
                      className="w-full rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-white dark:bg-slate-800/90 dark:text-white dark:hover:bg-slate-700"
                    >
                      Import Animation to My Game
                    </Button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <ImportTemplateDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
        onImport={handleImport}
        templates={TAP_RACE_ANIMATIONS}
        gameType="tap-race"
      />

      {/* Bottom sticky CTA section */}
      <section className="sticky bottom-2 z-10">
        <div className="mx-2 flex items-center justify-between rounded-2xl bg-linear-to-r from-indigo-700 via-fuchsia-600 to-orange-400 p-3 shadow-lg md:mx-4 md:p-4">
          <div className="text-sm font-semibold text-white md:text-base">
            ✨ Customise your game to match your event
          </div>
          <div className="flex gap-2">
            <Link href={customHref}>
              <Button className="rounded-full bg-orange-500 px-4 text-white hover:bg-orange-600 md:px-6">
                Create Custom Game
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
