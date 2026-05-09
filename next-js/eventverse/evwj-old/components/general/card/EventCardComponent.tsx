import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { getOrganizerIdFromUsername } from "@/lib/mock-events/organizer";
import { MockEventData } from "@/type";
import { CalendarHeart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

//
type EventCardType = {
  item: Partial<MockEventData>;
  disableLink?: boolean;
  disableOrganizerLink?: boolean;
  distanceKm?: number;
};
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
    ? `${Routes.web.general.organizers}/${organizerId}`
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

  // If organizer link is disabled (e.g., when card is wrapped in a Link), use disabled button
  // Always disable if disableOrganizerLink is true OR if organizerLink is missing
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
export default function EventCardComponent(props: EventCardType) {
  //
  const item = props.item;
  const eventLink = `${Routes.web.general.eventDetail}/${item.slug || "event"}`;
  // const { distanceKm } = props;
  //

  // Determine if organizer link should be disabled
  // If disableLink is false/undefined, card will wrap itself in Link, so disable organizer link
  // If disableLink is true, card won't wrap itself, so organizer link can be enabled
  // We need to disable organizer link when the card itself will be wrapped in a Link
  const willCardBeWrappedInLink = !props.disableLink;
  const shouldDisableOrganizerLink = willCardBeWrappedInLink;

  const cardContent = (
    <div className="relative cursor-pointer flex-col transition-transform duration-300 hover:scale-105">
      {/* Main Card Content */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-950 shadow-2xl transition-all duration-300 hover:border-pink-400/50 dark:hover:border-purple-400/50">
        {/* Event Image - Optimized with next/image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl lg:h-56">
          <Image
            src={item.imageUrl || Images.mock}
            alt={item.name || "Event image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={item.featured}
            loading={item.featured ? "eager" : "lazy"}
          />

          {/* Featured Tag */}
          {item.featured && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              <Star className="h-3.5 w-3.5 fill-white" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="mt-2 flex flex-col gap-1 bg-gray-950 p-3 text-gray-900 dark:text-white">
          {/* Event Title */}
          <h3 className="line-clamp-1 text-base font-semibold text-white xl:text-lg 2xl:text-xl">
            {item.name}
          </h3>
          {/* Category */}
          {item.category && (
            <p className="text-xs text-gray-400 dark:text-gray-400 xl:text-sm">
              {item.category}
            </p>
          )}
          {/* Date */}
          <div className="flex items-center gap-1 text-xs tracking-tighter text-gray-400 dark:text-gray-400 xl:text-sm">
            <CalendarHeart className="h-3 w-3 text-pink-400 dark:text-pink-500 xl:h-4 xl:w-4" />
            <p>{item.startDate}</p>
          </div>
          {/* Location */}
          <div className="flex items-center gap-1 text-xs tracking-tighter text-gray-400 dark:text-gray-400 xl:text-sm">
            <MapPin className="h-3 w-3 text-cyan-400 dark:text-cyan-500 xl:h-4 xl:w-4" />
            <p>{item.locationMap}</p>
          </div>
          {/* Price */}
          <div className="mt-1 flex items-center gap-1">
            <span className="text-xs tracking-tighter text-gray-400 dark:text-gray-400">From</span>
            <p className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-base font-bold text-transparent xl:text-lg 2xl:text-xl">
              ${item.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // If disableLink is true, return just the card content (organizer link can be enabled)
  if (props.disableLink) {
    return cardContent;
  }

  // Otherwise, wrap it in a Link (organizer link should be disabled to prevent nesting)
  return <Link href={eventLink}>{cardContent}</Link>;
}
