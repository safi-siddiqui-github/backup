"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { cn } from "@/lib/utils";
import { Calendar, Heart, MapPin, Music, Plus, Zap } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function EventDetailAboutComponent() {
  const [follow, setfollow] = useState(true);
  const toggleFollow = useCallback(() => {
    setfollow(!follow);
  }, [follow]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Summer Music Festival 2025
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-background flex items-center gap-1.5 rounded-full px-2 py-0.5 shadow">
            <Music className="size-3 text-purple-500" />
            <p className="text-xs font-semibold text-purple-500 dark:text-white">
              Music
            </p>
          </div>
          <div className="bg-background flex items-center gap-1.5 rounded-full px-2 py-0.5 shadow">
            <Zap className="size-3 text-orange-500" />
            <p className="text-xs font-semibold text-orange-500 dark:text-white">
              Most Popular
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-8 lg:size-10">
              <AvatarImage
                src={Images.avatarTwo}
                alt="user"
                className="object-cover"
              />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <Link
              href={`${Routes.web.general.organizers}/sophia-lee`}
              className="group tracking-tight"
            >
              <span>By </span>
              <span className="font-semibold group-hover:underline">
                John Doe
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleFollow}
              className={cn(
                "bg-background flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-blue-500 shadow dark:bg-blue-500 dark:text-white",
                {
                  hidden: follow,
                },
              )}
            >
              <Plus className="size-4" />
              <p className="text-sm font-semibold">Follow</p>
            </button>
            <button
              onClick={toggleFollow}
              className={cn(
                "bg-background flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-rose-500 shadow dark:bg-rose-500 dark:text-white",
                {
                  hidden: !follow,
                },
              )}
            >
              <Heart className="size-4 fill-current" />
              <p className="text-sm font-semibold">Following</p>
            </button>
          </div>
        </div>
        <div className="hidden flex-col gap-1 lg:gap-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 lg:size-5" />
            <p className="text-sm font-medium lg:text-base">
              Central Park, New York
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 lg:size-5" />
            <p className="text-sm font-medium lg:text-base">
              From 11 Dec, 2025 - To 15 Jan, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
