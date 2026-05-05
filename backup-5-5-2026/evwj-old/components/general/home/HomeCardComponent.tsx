"use client";

import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { HomePageProp } from "@/types/home";
import { CalendarHeart, MapPin } from "lucide-react";
import Link from "next/link";

export default function HomeCardComponent(prop?: HomePageProp) {
  const { event } = prop ?? {};
  return (
    <div className="group relative flex flex-1 flex-col lg:p-2">
      <Link
        href={`${Routes.web.general.eventDetail}/${event?.slug}`}
        className="z-10 flex flex-1 flex-col rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:scale-105 hover:border-pink-400/50 dark:hover:border-purple-400/50"
      >
        <div
          className="h-32 overflow-hidden rounded-t-xl bg-cover bg-center lg:h-40"
          style={{
            backgroundImage: `url(${event?.imageUrl ?? Images.mock})`,
          }}
        />
        <div className="mt-2 flex flex-col gap-1 p-3 text-gray-900 dark:text-white">
          {/* Event Title */}
          <p className="3xl:text-lg line-clamp-1 text-base font-semibold">
            {event?.name}
          </p>
          {/* Category */}
          {event?.category && (
            <p className="3xl:text-xs text-xs text-gray-600 dark:text-gray-400">
              {event.category}
            </p>
          )}
          {/* Date */}
          <div className="flex items-center gap-1 text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
            <CalendarHeart className="h-3 w-3 text-pink-400 dark:text-pink-500" />
            <p>{event?.startDate}</p>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1 text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
            <MapPin className="h-3 w-3 text-cyan-400 dark:text-cyan-500" />
            <p>{event?.locationMap}</p>
          </div>
          {/* Price */}
          <div className="mt-1 flex items-center gap-1">
            <span className="text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">From</span>
            <p className="3xl:text-lg bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-base font-bold text-transparent">
              ${event?.price ?? 25.55}
            </p>
          </div>
        </div>
      </Link>

      {/* <div
        className="absolute -inset-1 rounded-xl overflow-hidden bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 opacity-75 blur-sm transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:blur-md"
        style={{ zIndex: -1 }}
      ></div> */}
    </div>
  );
}
