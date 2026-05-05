"use client";
import Link from "next/link";
import WebHomeCategoriesComponent from "./WebHomeCategoriesComponent";
import WebHomeDomeGalleryComponent from "./WebHomeDomeGalleryComponent";
import WebHomeEventsSectionComponent from "./WebHomeEventsSectionComponent";

import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import WebHomeHeroSectionComponent from "./WebHomeHeroSectionComponent";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { CardDescription, CardTitle } from "@/shadcn/ui/card";
import { ca } from "date-fns/locale";

export default function WebHomeComponent() {
  return (
    <>
      <main className="flex w-full flex-col ">
        <WebHomeHeroSectionComponent />
        <WebHomeEventsSectionComponent />
        <WebHomeCategoriesComponent />
        <WebHomeCategoryComponent />
        <WebHomeDomeGalleryComponent />
        <HomeEventSearcSection />
      </main>
    </>
  );
}

function HomeEventSearcSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-20 md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <h2
            className={`mb-8 text-4xl leading-tight font-normal text-white transition-all md:mb-12 md:text-5xl lg:text-6xl xl:text-7xl`}
          >
            Find the perfect event
            <br />
            for your experience
          </h2>

          {/* Search Bar */}
          <div>
            <form onSubmit={handleSearch}>
              <div className="relative mx-auto mb-6 max-w-3xl">
                <div className="relative flex items-center rounded-lg border border-cyan-500/30 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 hover:border-cyan-500/50">
                  {/* Search Icon */}
                  <div className="pointer-events-none absolute left-5">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Start your search here"
                    className="w-full bg-transparent py-4 pr-16 pl-14 text-base text-white placeholder-gray-500 focus:outline-none md:py-5 md:text-lg"
                  />

                  {/* Arrow Button */}
                  <button
                    type="submit"
                    className="group absolute right-3 rounded-md bg-white p-2 transition-all duration-200 hover:bg-gray-100 md:p-2.5"
                    aria-label="Search"
                  >
                    <ArrowRight className="h-5 w-5 text-black transition-transform group-hover:translate-x-0.5 md:h-6 md:w-6" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Helper Text */}
          <p className="mb-12 text-sm text-white md:mb-16 md:text-base">
            Already know what you&apos;re looking for?{" "}
            <Link
              href="/events"
              className="underline transition-colors hover:text-cyan-400"
            >
              Browse all events
            </Link>
          </p>
          {/* Avatars */}
          <div className={`mb-6 flex justify-center`}>
            <div className="flex -space-x-3">
              {/* Avatar 1 - Purple */}
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-purple-400 to-purple-600 md:h-14 md:w-14">
                <div className="h-full w-full bg-linear-to-br from-purple-300 to-purple-500"></div>
              </div>

              {/* Avatar 2 - Orange */}
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-orange-400 to-orange-600 md:h-14 md:w-14">
                <div className="h-full w-full bg-linear-to-br from-orange-300 to-orange-500"></div>
              </div>

              {/* Avatar 3 - Green */}
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-green-400 to-green-600 md:h-14 md:w-14">
                <div className="h-full w-full bg-linear-to-br from-green-300 to-green-500"></div>
              </div>

              {/* Avatar 4 - Amber */}
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-amber-400 to-amber-600 md:h-14 md:w-14">
                <div className="h-full w-full bg-linear-to-br from-amber-300 to-amber-500"></div>
              </div>

              {/* Avatar 5 - Pink */}
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-linear-to-br from-pink-400 to-pink-600 md:h-14 md:w-14">
                <div className="h-full w-full bg-linear-to-br from-pink-300 to-pink-500"></div>
              </div>
            </div>
          </div>

          {/* Trust Statement */}
          <p
            className={`text-2xl leading-tight font-normal text-white md:text-3xl lg:text-4xl`}
          >
            Trusted by 14 million
            <br />
            event enthusiasts worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

function WebHomeCategoryComponent() {
  const categories = useMemo(
    () => [
      {
        name: "Music",
        slug: "music",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Sports",
        slug: "sports",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Art",
        slug: "art",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Food",
        slug: "food",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Travel",
        slug: "travel",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Fashion",
        slug: "fashion",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Gaming",
        slug: "gaming",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Tech",
        slug: "tech",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Health",
        slug: "health",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Business",
        slug: "business",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Politics",
        slug: "politics",
        count: 10,
        img: Images.asset.page.background,
      },
      {
        name: "Music",
        slug: "music",
        count: 10,
        img: Images.asset.page.background,
      },
    ],
    []
  );
  return (
    <div className="flex flex-col gap-4 md:gap-8 p-4">
      <div className="flex flex-col items-center text-center md:gap-2">
        <p className="text-3xl font-bold md:text-5xl">Explore Categories</p>
        <p className="">Find events based on your interests</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {categories?.map((category, index) => (
          <Link
            href={Routes.web.general.eventsDiscover}
            className="flex flex-col rounded-xl  bg-center bg-cover text-white bg-no-repeat overflow-hidden"
            style={{
              backgroundImage: `url(${category?.img})`,
            }}
            key={index}
          >
            <div className="flex flex-col items-center justify-center bg-black/30 hover:bg-black/50 flex-1 py-14 md:py-20 xl:py-20">
              <CardTitle className="text-2xl">{category?.name}</CardTitle>
              <CardDescription className="text-current">
                {category?.count} events
              </CardDescription>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
