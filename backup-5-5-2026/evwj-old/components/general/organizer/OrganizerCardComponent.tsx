"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Routes } from "@/lib/lib-routes";
import { OrganizerWithStats } from "@/lib/mock-events/organizer";
import { cn } from "@/lib/utils";
import { Calendar, Users } from "lucide-react";
import Link from "next/link";

type OrganizerCardComponentProps = {
  organizer: OrganizerWithStats;
  className?: string;
};

export default function OrganizerCardComponent({
  organizer,
  className,
}: OrganizerCardComponentProps) {
  const organizerLink = `${Routes.web.general.organizers}/${organizer.id}`;

  // Limit event types to first 3 for card display
  const displayEventTypes = organizer.eventTypes.slice(0, 3);
  const hasMoreTypes = organizer.eventTypes.length > 3;

  return (
    <Link
      href={organizerLink}
      className={cn("block h-full", className)}
    >
      <div
        className={cn(
          "group relative flex h-full cursor-pointer flex-col transition-all duration-500 hover:scale-105",
        )}
      >
        {/* Gradient Border Effect - aligned with home/brand palette */}
        <div
          className="absolute -inset-1 rounded-xl bg-linear-to-br from-purple-600 to-cyan-600 opacity-50 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md"
          style={{ zIndex: -1 }}
        />

        {/* Main Card Content */}
        <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-xl bg-linear-to-br from-slate-900 to-slate-800 shadow-2xl dark:from-slate-950 dark:to-slate-900">
          {/* Avatar Section */}
          <div className="relative flex flex-col items-center p-6 pb-4">
            <div className="relative mb-4">
              <div className="absolute -inset-1 rounded-full bg-linear-to-r from-purple-600 to-cyan-600 opacity-70 blur" />
              <Avatar className="relative h-24 w-24 border-4 border-slate-800 dark:border-slate-900">
                <AvatarImage
                  src={
                    organizer.userProfilePicture ||
                    "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop"
                  }
                  alt={organizer.username}
                  className="object-cover"
                />
                <AvatarFallback className="bg-linear-to-br from-purple-600 to-cyan-600 text-2xl font-bold text-white">
                  {organizer.username
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "ORG"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Organizer Name */}
            <h3 className="mb-2 line-clamp-1 text-center text-lg font-bold text-white">
              {organizer.username}
            </h3>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col gap-3 px-6 pb-4">
            {/* Event Type Tags */}
            {displayEventTypes.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {displayEventTypes.map((eventType, index) => (
                  <Badge
                    key={index}
                    className="border-0 bg-linear-to-r from-purple-600/80 to-cyan-600/80 px-2 py-1 text-xs text-white"
                  >
                    {eventType}
                  </Badge>
                ))}
                {hasMoreTypes && (
                  <Badge className="border-0 bg-slate-700 px-2 py-1 text-xs text-slate-300">
                    +{organizer.eventTypes.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Stats Row */}
            <div className="flex items-center justify-around border-t border-slate-700/50 pt-4">
              {/* Followers */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-slate-400">
                  <Users className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-white">
                  {organizer.followers >= 1000
                    ? `${(organizer.followers / 1000).toFixed(1)}K`
                    : organizer.followers}
                </p>
                <p className="text-xs text-slate-400">Followers</p>
              </div>

              {/* Upcoming Events */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-white">
                  {organizer.upcomingCount}
                </p>
                <p className="text-xs text-slate-400">Upcoming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
