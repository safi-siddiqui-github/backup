"use client";

import { Button } from "@/components/ui/button";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { MockEventData } from "@/type";
import { CalendarHeart, MapPin, Star } from "lucide-react";
import Link from "next/link";

type EventCardCarouselVariantProps = {
  key?: number;
  item: MockEventData;
};

export default function EventCardCarouselVariant(
  props: EventCardCarouselVariantProps,
) {
  const item = props.item;
  const eventLink = `${Routes.web.general.eventDetail}/${item.slug || "event"}`;

  return (
    <Link href={eventLink}>
      <div className="group relative h-full cursor-pointer transition-all duration-500">
        {/* Main Card Content */}
        <div className="relative flex h-[380px] w-full flex-col overflow-hidden rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900 to-gray-950 shadow-xl transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl">
          {/* Event Image */}
          <div
            className="relative h-48 w-full overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${item.imageUrl || Images.mock})` }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/70 to-transparent transition-all duration-500 group-hover:from-purple-950/50"></div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/0 to-purple-500/0 transition-all duration-500 group-hover:from-pink-500/10 group-hover:to-purple-500/10"></div>

            {/* Featured Tag */}
            {item.featured && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                <Star className="h-3 w-3 fill-white" />
                <span>Featured</span>
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="flex flex-1 flex-col justify-between gap-3 p-5">
            {/* Date */}
            <div className="flex items-center gap-2 text-gray-400 transition-colors duration-300 group-hover:text-pink-400">
              <CalendarHeart className="h-4 w-4" />
              <p className="text-sm font-medium">{item.startDate}</p>
            </div>

            {/* Event Name */}
            <h3 className="line-clamp-2 text-lg leading-tight font-bold text-white transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent">
              {item.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-400 transition-colors duration-300 group-hover:text-cyan-400">
              <MapPin className="h-4 w-4" />
              <p className="line-clamp-1 text-sm">{item.locationMap}</p>
            </div>

            {/* Category and Price */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-3 transition-colors duration-300 group-hover:border-purple-500/30">
              {item.category && (
                <Button
                  size="sm"
                  className="border-0 bg-linear-to-r from-pink-500 to-purple-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-purple-600 hover:shadow-pink-500/50"
                >
                  {item.category}
                </Button>
              )}
              <p className="bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
                ${item.price}
              </p>
            </div>
          </div>

          {/* Subtle glow effect on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-linear-to-br from-pink-500/5 via-purple-500/5 to-cyan-500/5 blur-xl"></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
