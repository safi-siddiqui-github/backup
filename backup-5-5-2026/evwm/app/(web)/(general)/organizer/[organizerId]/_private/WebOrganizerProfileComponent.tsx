"use client";

import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { Routes } from "@/lib/lib-routes";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  CalendarHeart,
  CheckCircle,
  Heart,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/ui/dialog";
import { Textarea } from "@/shadcn/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/shadcn/ui/radio-group";
import { Label } from "@/shadcn/ui/label";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { CardTitle } from "@/shadcn/ui/card";
import { Images } from "@/lib/lib-images";
import { cn } from "@/lib/lib-shadcn";
import { MockEventData } from "../../../_private/EventsMockData";
import { MOCK_EVENTS } from "../../../_private/web-home-healper";

export default function WebOrganizerProfileComponent({
  organizerId,
}: {
  organizerId: string;
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  // Get organizer info
  const organizer = useMemo(() => {
    const found = getOrganizerById(organizerId);
    if (found) return found;
    return {
      id: organizerId,
      username: organizerId
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" "),
      userProfilePicture: Images.asset.user.charlie,
    };
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

  const stats = useMemo(
    () => ({
      totalEvents: organizerStatsData.totalEvents,
      totalAttendees: organizerStatsData.totalAttendees,
      averageRating: organizerStatsData.averageRating,
      primaryCategory: organizerStatsData.primaryCategory,
      upcomingCount: organizerStatsData.upcomingCount,
      pastCount: organizerStatsData.pastCount,
    }),
    [organizerStatsData]
  );

  const upcomingEvents = organizerStatsData.upcomingEvents;
  const pastEvents = organizerStatsData.pastEvents;

  // Create dynamic organizer data
  const organizerData = useMemo(() => {
    if (!organizer) return null;

    const oldestEvent = [...upcomingEvents, ...pastEvents].sort(
      (a, b) =>
        new Date(a.startDate || "").getTime() -
        new Date(b.startDate || "").getTime()
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

  if (!organizer || !organizerData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            Organizer not found
          </h1>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            This organizer doesn&apos;t have any public events yet.
          </p>
          <Link href={Routes.web.general.eventsDiscover}>
            <Button variant="default">Browse Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen   bg-white dark:bg-transparent   pt-32">
      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href={Routes.web.general.eventsDiscover}>
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
                  <Image
                    src={Images.asset.user.charlie}
                    alt={organizerData.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                    onError={() => {}}
                    onLoadingComplete={(img) => {
                      if (img.naturalWidth === 0) {
                        img.src =
                          "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop";
                      }
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
                    Organizer since{" "}
                    {format(organizerData.joinedDate, "MMMM yyyy")}
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

          <>
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
                <FallbackCard
                  icon={
                    <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  }
                  title="No upcoming events"
                  description={`${organizerData.name} doesn't have any upcoming events scheduled`}
                />
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
                <FallbackCard
                  icon={
                    <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  }
                  title="No past events"
                  description={`${organizerData.name} hasnt hosted any events yet`}
                />
              )}
            </TabsContent>
            <TabsContent value="reviews" className="mt-8">
              <FallbackCard
                icon={<Star className="mx-auto mb-4 h-12 w-12 text-gray-400" />}
                title="Reviews coming soon"
                description={`Attendee reviews and ratings for ${organizerData.name}s events`}
              />
            </TabsContent>
          </>
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

const REPORT_REASONS = [
  {
    value: "inappropriate-content",
    label: "Inappropriate Content",
    description: "Contains offensive, harmful, or inappropriate material",
  },
  {
    value: "spam",
    label: "Spam or Scam",
    description: "Suspected spam, fake events, or fraudulent activity",
  },
  {
    value: "harassment",
    label: "Harassment or Bullying",
    description: "Engaging in harassment, bullying, or abusive behavior",
  },
  {
    value: "fake-profile",
    label: "Fake Profile",
    description: "Impersonating someone else or using false information",
  },
  {
    value: "other",
    label: "Other",
    description: "Something else that violates our community guidelines",
  },
];

function ReportOrganizerDialog({
  open,
  onOpenChange,
  organizerName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizerName: string;
}) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState<string>("");
  const [isSubmitting] = useState(false);

  const handleSubmit = async () => {};

  const handleCancel = () => {
    setSelectedReason("");
    setAdditionalDetails("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <DialogTitle>Report Organizer</DialogTitle>
              <DialogDescription>
                Help us understand what&apos;s wrong with {organizerName}&apos;s
                profile
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              What&apos;s the issue?
            </Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="space-y-3"
            >
              {REPORT_REASONS.map((reason) => (
                <div
                  key={reason.value}
                  className="flex items-start space-x-3 rounded-lg border border-slate-200 dark:border-slate-700 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <RadioGroupItem
                    value={reason.value}
                    id={reason.value}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={reason.value}
                      className="font-medium cursor-pointer"
                    >
                      {reason.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details" className="text-base font-semibold">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="details"
              placeholder="Please provide any additional information that might help us understand the issue..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="min-h-25 resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {additionalDetails.length}/500
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
//
const AvatarComponent = ({
  item,
  disableOrganizerLink = false,
}: {
  item: Partial<MockEventData>;
  disableOrganizerLink?: boolean;
}) => {
  const organizerId = item.username
    ? getOrganizerIdFromUsername(item.username)
    : null;
  const organizerLink = organizerId
    ? `${Routes.web.general.eventsDiscover}/${organizerId}`
    : null;

  if (!item.username) {
    return (
      <Button
        variant={"link"}
        className="flex h-fit w-fit items-center gap-2 px-0"
        disabled
      >
        <Avatar className="size-6 xl:size-10 2xl:size-14">
          <AvatarFallback>USER</AvatarFallback>
        </Avatar>
        <CardTitle className="2xl:text-lg">{"Organizer"}</CardTitle>
      </Button>
    );
  }
  if (disableOrganizerLink === true || !organizerLink) {
    return (
      <Button
        variant={"link"}
        className="flex h-fit w-fit items-center gap-2 px-0"
        disabled
      >
        <Avatar className="size-6 xl:size-10 2xl:size-14">
          <AvatarImage
            src={
              item.userProfilePicture ||
              "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop"
            }
            className="object-cover"
          />
          <AvatarFallback>
            {item.username
              ?.split(" ")
              ?.map((n) => n[0])
              .join("") || "USER"}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="2xl:text-lg">
          {item.username || "Organizer"}
        </CardTitle>
      </Button>
    );
  }

  return (
    <Button
      variant={"link"}
      className="flex h-fit w-fit items-center gap-2 px-0"
      asChild
    >
      <Link href={organizerLink}>
        <Avatar className="size-6 xl:size-10 2xl:size-14">
          <AvatarImage
            src={
              item.userProfilePicture ||
              "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop"
            }
            className="object-cover"
          />
          <AvatarFallback>
            {item.username
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "USER"}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="2xl:text-lg">
          {item.username || "Organizer"}
        </CardTitle>
      </Link>
    </Button>
  );
};
//
function EventCardComponent(props: {
  item: Partial<MockEventData>;
  disableLink?: boolean;
}) {
  const item = props.item;
  const willCardBeWrappedInLink = !props.disableLink;
  const shouldDisableOrganizerLink = willCardBeWrappedInLink;

  return (
    <Link href={`/events/detail/${item.slug}`} className="block">
      <div className="relative cursor-pointer flex-col transition-transform duration-300 hover:scale-103">
        <div className="relative flex h-96 w-full flex-col overflow-hidden rounded-xl bg-gray-950 shadow-2xl 2xl:h-112.5">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.name || "Event image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={item.featured}
              loading={item.featured ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent"></div>
            {item.featured && (
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                <Star className="h-3.5 w-3.5 fill-white" />
                <span>Featured</span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between gap-2 bg-gray-950 p-5 xl:gap-3">
            <div className="flex items-center gap-2 text-gray-400">
              <CalendarHeart className="h-4 w-4 text-pink-400" />
              <p className="text-xs font-medium xl:text-sm 2xl:text-base">
                {item.startDate}
              </p>
            </div>
            <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white xl:text-xl 2xl:text-2xl">
              {item.name}
            </h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <p className="line-clamp-1 text-xs xl:text-sm 2xl:text-base">
                  {item.locationMap}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-800 xl:mt-3">
              <AvatarComponent
                item={item}
                disableOrganizerLink={shouldDisableOrganizerLink}
              />
              <p className="bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text font-bold text-transparent lg:text-base xl:text-2xl 2xl:text-3xl">
                ${item.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FallbackCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-12 text-center",
        "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
      )}
    >
      {icon}
      <h3
        className={cn(
          "mb-2 text-lg font-semibold",
          "text-gray-900 dark:text-white"
        )}
      >
        {title}
      </h3>
      <p className={cn("text-gray-500 dark:text-gray-400")}>{description}</p>
    </div>
  );
}
function getOrganizerStats(organizerId: string) {
  const events = MOCK_EVENTS.filter(
    (e) => getOrganizerIdFromUsername(e.username || "") === organizerId
  );

  const now = new Date();
  const upcomingEvents = events.filter(
    (e) => new Date(e.startDate || "") > now
  );
  const pastEvents = events.filter((e) => new Date(e.startDate || "") <= now);

  return {
    totalEvents: events.length,
    totalAttendees: 1200,
    averageRating: 4.7,
    primaryCategory: "Music",
    upcomingCount: upcomingEvents.length,
    pastCount: pastEvents.length,
    upcomingEvents,
    pastEvents,
  };
}

function getOrganizerIdFromUsername(username: string): string {
  return username.trim().toLowerCase().replace(/\s+/g, "-");
}

function getOrganizerById(organizerId: string) {
  const mockOrganizers = [
    {
      id: "jane-doe",
      username: "Jane Doe",
      userProfilePicture: Images.asset.user.charlie,
    },
    {
      id: "john-smith",
      username: "John Smith",
      userProfilePicture: Images.asset.user.clark,
    },
  ];
  return mockOrganizers.find((org) => org.id === organizerId) || null;
}
