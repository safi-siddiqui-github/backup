"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Routes } from "@/lib/lib-routes";
import { MOCK_EVENTS } from "@/lib/mock-events";
import { getOrganizerIdFromUsername } from "@/lib/mock-events/organizer";
import { ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

type EventDetailOrganizerSectionComponentProps = {
  slug?: string;
};

export default function EventDetailOrganizerSectionComponent({
  slug,
}: EventDetailOrganizerSectionComponentProps) {
  // Find event by slug to get organizer info
  const event = useMemo(() => {
    if (!slug) return null;
    return MOCK_EVENTS.find((e) => e.slug === slug);
  }, [slug]);

  const organizerName = event?.username || "John Doe";
  const organizerAvatar =
    event?.userProfilePicture ||
    "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop";
  const organizerId = event?.username
    ? getOrganizerIdFromUsername(event.username)
    : null;
  const organizerLink = organizerId
    ? `${Routes.web.general.organizers}/${organizerId}`
    : null;

  return (
    <div className="flex flex-col gap-6">
      <CardTitle className="text-2xl lg:text-3xl">Organizer</CardTitle>

      <div className="flex items-center gap-4">
        <Avatar className="h-26 w-26">
          <AvatarImage
            src={organizerAvatar}
            alt={organizerName}
            className="object-cover"
          />
          <AvatarFallback>
            {organizerName
              .split(" ")
              .map((n) => n[0])
              .join("") || "JD"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          {organizerLink ? (
            <Link
              href={organizerLink}
              className="group flex items-center gap-2 hover:underline"
            >
              <p className="text-2xl font-semibold">{organizerName}</p>
              <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ) : (
            <p className="text-2xl font-semibold">{organizerName}</p>
          )}
          <p>Event Organizer</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="max-w-lg">
          {organizerName} specializes in creating memorable events. With years
          of experience in the industry, they bring quality and professionalism
          to every event they organize.
        </p>

        <div className="flex flex-col items-start gap-2">
          <p className="text-lg font-medium">Contact the Organizer</p>
          <p>
            Have questions about this event? Contact the organizer directly.
          </p>

          {organizerLink && (
            <Link href={organizerLink}>
              <Button
                variant="outline"
                className="rounded-full"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Organizer Profile
              </Button>
            </Link>
          )}

          <Button
            className="rounded-full"
            disabled
            title="Coming soon"
          >
            <Mail className="mr-2 h-4 w-4" />
            Message Organizer
          </Button>
        </div>
      </div>
    </div>
  );
}
