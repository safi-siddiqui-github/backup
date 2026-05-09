"use client";

import { Routes } from "@/lib/lib-routes";
import Link from "next/link";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "./CategoryCard";
import CreateSomethingSection from "./CreateSomethingSection";
import FeaturedGameCard from "./FeaturedGameCard";
import FireworksCanvas from "./FireworksCanvas";
import { CATEGORIES, GAME_TYPES } from "./game-data";

interface Props {
  slug?: string;
  gameSlug?: string;
}

export default function GamesActivitiesLandingComponent({
  slug,
  gameSlug,
}: Props) {
  const createHref =
    slug && gameSlug
      ? // ? `/dashboard/event/${slug}/games/${gameSlug}/create`
        `${Routes.web.auth.dashboardEventDetail}/${slug}${Routes.web.auth.dashboardEventGames}/${gameSlug}${Routes.web.auth.dashboardEventGamesCreate}`
      : "create";

  return (
    <main
      // className="flex min-h-screen flex-col bg-linear-to-tr from-gray-50 to-white pb-16 dark:from-slate-900 dark:to-slate-800"
      className="flex flex-col"
    >
      {/* Banner/Header with fireworks background */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-fuchsia-500 to-yellow-300 px-4 pt-20 pb-28 shadow-lg sm:min-h-[60vh] md:min-h-[70vh] md:px-8 md:pt-24 md:pb-36">
        <div className="absolute inset-0 z-0 h-full w-full">
          <FireworksCanvas scope="section" />
        </div>
        <div className="relative z-10 w-full space-y-6 px-4 text-center md:px-8">
          <h1 className="text-4xl font-extrabold text-white drop-shadow md:text-6xl">
            Create Amazing{" "}
            <span className="text-yellow-200">Interactive Games</span>
          </h1>
          <p className="text-base font-medium text-white/90 sm:text-lg md:text-2xl">
            Choose you game type • Customized for your event • Real-time fun
            <br />
            Perfect for events, parties, and team building
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
            <Link
              href={createHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-8 py-4 text-lg font-bold text-indigo-700 shadow-lg transition-all hover:bg-white md:text-xl"
            >
              Create your game now
            </Link>
            {slug && gameSlug && (
              <Link
                href={`${Routes.web.auth.dashboardEventDetail}/${slug}/games/${gameSlug}/${Routes.web.auth.dashboardEventGamesCreate}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-500/90 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-purple-600 md:text-xl"
              >
                My Games
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Sticky bouncing Create Game button bottom-right */}
      <Link
        href={createHref}
        className="fixed right-4 bottom-4 z-50 hidden animate-bounce items-center rounded-full bg-purple-500 px-4 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:bg-purple-600 sm:right-8 sm:bottom-8 sm:flex sm:px-6 sm:py-4 sm:text-lg"
        style={{ boxShadow: "0 4px 32px 0 rgba(255,140,0,0.14)" }}
      >
        + Create Game
      </Link>

      {/* Mobile-friendly Create Game button */}
      <Link
        href={createHref}
        className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-center rounded-full bg-purple-500 px-6 py-3 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-purple-600 sm:hidden"
        style={{ boxShadow: "0 4px 32px 0 rgba(255,140,0,0.14)" }}
      >
        + Create Game
      </Link>

      {/* Featured Games - Swiper carousel */}
      <section className="mb-10 w-full px-2 md:px-4">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-xl font-bold md:text-2xl">Featured Games</h2>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
        >
          {GAME_TYPES.map((game) => (
            <SwiperSlide
              key={game.id}
              style={{ width: 380, padding: "20px 10px", overflow: "visible" }}
            >
              <FeaturedGameCard
                game={{
                  id: game.id,
                  title: game.title,
                  image: game.image,
                  difficulty: game.difficulty,
                  description: game.description,
                }}
                slug={slug}
                gameSlug={gameSlug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* KPIs */}
      <section className="mb-8 grid w-full grid-cols-2 gap-4 px-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {[
          { label: "Games in library", value: 0 },
          { label: "Playing now", value: 0 },
          { label: "Max capacity", value: 0 },
          { label: "Success rate", value: "0%" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center justify-center rounded-xl bg-white! p-4 shadow backdrop-blur-sm dark:bg-slate-800/95!"
          >
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {s.value}
            </span>
            <span className="mt-2 text-xs font-semibold text-gray-400 sm:text-sm dark:text-slate-300">
              {s.label}
            </span>
          </div>
        ))}
      </section>
      {/* Categories */}
      <section className="w-full px-2 md:px-4">
        <h2 className="mb-4 px-1 text-lg font-bold text-gray-900 md:text-xl dark:text-white">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              slug={slug}
              gameSlug={gameSlug}
            />
          ))}
        </div>
      </section>

      {/* Callouts/CTA section under categories */}
      <CreateSomethingSection
        createHref={createHref}
        templatesHref={createHref}
      />
    </main>
  );
}
