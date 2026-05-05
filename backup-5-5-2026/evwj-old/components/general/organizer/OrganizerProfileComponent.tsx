"use client";

import EventCardComponent from "@/components/general/card/EventCardComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Routes } from "@/lib/lib-routes";
import {
  getOrganizerById,
  getOrganizerStats,
} from "@/lib/mock-events/organizer";
import { MockEventData } from "@/type";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Heart,
  Mail,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import ReportOrganizerDialog from "./ReportOrganizerDialog";

type OrganizerProfileComponentProps = {
  organizerId: string;
};

export default function OrganizerProfileComponent({
  organizerId,
}: OrganizerProfileComponentProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  // Get organizer info
  const organizer = useMemo(() => {
    return getOrganizerById(organizerId);
  }, [organizerId]);

  // Get organizer stats and events
  const organizerStatsData = useMemo(() => {
    if (!organizer) {
      return {
        totalEvents: 0,
        totalAttendees: 0,
        averageRating: 0,
        primaryCategory: "Events",
        upcomingCount: 0,
        pastCount: 0,
        upcomingEvents: [] as MockEventData[],
        pastEvents: [] as MockEventData[],
      };
    }
    return getOrganizerStats(organizerId);
  }, [organizerId, organizer]);

  const stats = {
    totalEvents: organizerStatsData.totalEvents,
    totalAttendees: organizerStatsData.totalAttendees,
    averageRating: organizerStatsData.averageRating,
    primaryCategory: organizerStatsData.primaryCategory,
    upcomingCount: organizerStatsData.upcomingCount,
    pastCount: organizerStatsData.pastCount,
  };
  const upcomingEvents = organizerStatsData.upcomingEvents;
  const pastEvents = organizerStatsData.pastEvents;

  // Create dynamic organizer data
  const organizerData = useMemo(() => {
    if (!organizer) return null;

    const oldestEvent = [...upcomingEvents, ...pastEvents].sort(
      (a, b) =>
        new Date(a.startDate || "").getTime() -
        new Date(b.startDate || "").getTime(),
    )[0];

    return {
      id: organizer.id,
      name: organizer.username,
      bio: `Passionate event organizer specializing in ${stats.primaryCategory.toLowerCase()} experiences. Creating memorable moments and bringing communities together through thoughtfully curated events.`,
      rating: stats.averageRating,
      totalEvents: stats.totalEvents,
      totalAttendees: stats.totalAttendees,
      joinedDate: oldestEvent?.startDate
        ? new Date(oldestEvent.startDate)
        : new Date(),
      verified: stats.totalEvents >= 5,
      avatar: organizer.userProfilePicture || "/placeholder.svg",
      coverImage: "/placeholder.svg",
      specialties: [
        stats.primaryCategory,
        "Community Building",
        "Experience Design",
      ],
      responseRate: "95%",
      responseTime: "Within 2 hours",
    };
  }, [organizer, stats, upcomingEvents, pastEvents]);

  const handleSaveEvent = (eventId: string) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter((id) => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  if (!organizer || !organizerData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            Organizer not found
          </h1>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            This organizer doesn't have any public events yet.
          </p>
          <Link href={Routes.web.general.events}>
            <Button variant="default">Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-32">
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={Routes.web.general.events}>
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>
        {/* Profile Section */}
        <div className="mb-12">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            {/* Avatar */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-4">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-900 md:h-32 md:w-32">
                  <img
                    src={organizerData.avatar}
                    alt={organizerData.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop";
                    }}
                  />
                </div>
                {organizerData.verified && (
                  <div className="absolute -right-2 -top-2 rounded-full bg-blue-500 p-1.5 shadow-md">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                      {organizerData.name}
                    </h1>
                    {organizerData.verified && (
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                      >
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Organizer since {format(organizerData.joinedDate, "MMMM yyyy")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="gap-2"
                  >
                    <Heart
                      className={`h-4 w-4 ${isFollowing ? "fill-current" : ""}`}
                    />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" className="gap-2" disabled>
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <p className="mb-6 max-w-2xl text-gray-700 dark:text-gray-300">
                {organizerData.bio}
              </p>

              {/* Specialties */}
              <div className="mb-6 flex flex-wrap gap-2">
                {organizerData.specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="outline"
                    className="text-sm font-normal"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 border-t border-gray-200 pt-6 dark:border-gray-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalEvents}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Events
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalAttendees >= 1000
                      ? `${(stats.totalAttendees / 1000).toFixed(1)}K`
                      : stats.totalAttendees}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Attendees
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.upcomingCount}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Upcoming
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-900 dark:text-white">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    {stats.averageRating}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upcoming">
              Upcoming ({stats.upcomingCount})
            </TabsTrigger>
            <TabsTrigger value="past">Past ({stats.pastCount})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-8">
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCardComponent
                    key={event.slug}
                    item={event}
                    disableLink={false}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  No upcoming events
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {organizerData.name} doesn't have any upcoming events scheduled
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-8">
            {pastEvents.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCardComponent
                    key={event.slug}
                    item={event}
                    disableLink={false}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  No past events
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {organizerData.name} hasn't hosted any events yet
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
              <Star className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Reviews coming soon
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Attendee reviews and ratings for {organizerData.name}'s events
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Dialog */}
      {organizerData && (
        <ReportOrganizerDialog
          open={isReportDialogOpen}
          onOpenChange={setIsReportDialogOpen}
          organizerName={organizerData.name}
        />
      )}
    </div>
  );
}
