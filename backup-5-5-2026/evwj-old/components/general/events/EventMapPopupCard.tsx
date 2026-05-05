import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { MockEventData } from "@/type";
import { CalendarHeart, MapPin, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventMapPopupCardProps {
  event: MockEventData;
  distanceKm?: number;
  onClose?: () => void;
}

export default function EventMapPopupCard({
  event,
  onClose,
}: EventMapPopupCardProps) {
  const eventLink = `${Routes.web.general.eventDetail}/${event.slug || "event"}`;

  return (
    <Link
      href={eventLink}
      className="block"
    >
      {/* <EventCardComponent
        // key={`${event.slug || ""}-${index}`}
        item={event}
        // distanceKm={event.distanceKm}
      /> */}
      <div className="group relative cursor-pointer transition-all duration-500 hover:scale-105">
        {/* Gradient Border Effect */}
        <div
          className="absolute -inset-1 rounded-xl bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 opacity-75 blur-sm transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:blur-md"
          style={{ zIndex: -1 }}
        ></div>

        {/* Main Card Content */}
        <div className="relative flex h-56 flex-col overflow-hidden rounded-xl bg-gray-950 shadow-2xl">
          {/*  */}

          {/*  */}
          {/* Event Image - Optimized with next/image */}
          <div className="relative h-44 w-full">
            <Image
              src={event.imageUrl || Images.mock}
              alt={event.name || "Event image"}
              fill
              sizes="240px"
              className="object-cover"
              priority={event.featured}
              loading={event.featured ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent"></div>

            {/* Featured Tag */}
            {event.featured && (
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white shadow-lg">
                <Star className="h-3 w-3 fill-white" />
                <span>Featured</span>
              </div>
            )}

            <Button
              variant={"destructive"}
              size={"icon-sm"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onClose) {
                  onClose();
                }
              }}
              className="absolute top-2 right-2 rounded-full"
            >
              <X />
            </Button>
          </div>

          {/* Card Content */}
          <div className="flex flex-1 flex-col bg-gray-950 p-2">
            {/*  */}

            {/* Date */}
            <div className="flex h-6 items-center gap-2 text-gray-400">
              <CalendarHeart className="size-3 text-pink-400" />
              <p className="text-xs">{event.startDate}</p>
            </div>
            {/*  */}

            {/* Event Name */}
            <h3 className="line-clamp-1 text-sm leading-tight font-bold text-white">
              {event.name}
            </h3>

            <div className="flex h-6 items-center gap-2 text-gray-400">
              <MapPin className="size-3 text-cyan-400" />
              <p className="line-clamp-1 text-xs">{event.locationMap}</p>
            </div>

            {/* Category and Price */}
            <div className="flex h-8 items-center justify-between">
              {/*  */}

              {/*  */}
              <Button
                variant={"link"}
                className="flex w-fit items-center gap-2 px-0"
              >
                {/*  */}
                <Avatar className="size-6">
                  <AvatarImage
                    src={
                      event.userProfilePicture ||
                      "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop"
                    }
                  />
                  <AvatarFallback>
                    {event.username
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "USER"}
                  </AvatarFallback>
                </Avatar>
                {/*  */}
                <CardTitle className="">{"Organizer"}</CardTitle>
                {/*  */}
              </Button>
              {/*  */}

              {/*  */}
              <p className="bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text text-base font-bold text-transparent">
                ${event.price}
              </p>
              {/*  */}

              {/*  */}
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes glow {
            0%,
            100% {
              opacity: 0.75;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </Link>
  );
}
