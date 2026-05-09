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
  item: MockEventData;
  disableLink?: boolean;
  disableOrganizerLink?: boolean;
  distanceKm?: number;
};
//
const AvatarComponent = ({
  item,
  disableOrganizerLink = false,
}: {
  item: MockEventData;
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
        className="flex h-full w-fit items-center gap-2 px-0"
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
        className="flex w-fit items-center gap-2 px-0 hover:no-underline"
      >
        <Avatar className="size-6 xl:size-10 2xl:size-14">
          <AvatarImage
            src={
              item.userProfilePicture ||
              "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop"
            }
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
      </Button>
    );
  }

  if (!disableOrganizerLink && organizerLink) {
    return (
      <Button
        className="flex w-fit items-center gap-2 px-0"
        variant={"link"}
        asChild
      >
        <Link href={organizerLink}>
          <Avatar className="size-6 xl:size-10 2xl:size-14">
            <AvatarImage
              src={
                item.userProfilePicture ||
                "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop"
              }
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
  }

  return (
    <Button
      variant={"link"}
      className="flex w-fit items-center gap-2 px-0"
      asChild
    >
      <Link href={organizerLink}>
        <Avatar className="size-6 xl:size-10 2xl:size-14">
          <AvatarImage
            src={
              item.userProfilePicture ||
              "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=400&h=400&fit=crop"
            }
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
export default function FeaturedEventCardComponent(props: EventCardType) {
  //
  const item = props.item;
  const eventLink = `${Routes.web.general.eventDetail}/${item.slug || "event"}`;
  // const { distanceKm } = props;
  //

  // Determine if organizer link should be disabled
  // If disableLink is false/undefined, card will wrap itself in Link, so disable organizer link
  // If disableLink is true, card won't wrap itself, so organizer link can be enabled
  // We need to disable organizer link when the card itself will be wrapped in a Link
  // By default, guard against nested anchors: disable the organizer link unless
  // the caller explicitly passes `disableLink={false}` to indicate there will be
  // no outer anchor and organizer links may be active.
  // This makes the component safer against parent components that wrap the card
  // with their own <Link> but forget to instruct the child.
  const shouldDisableOrganizerLink = props.disableLink !== false;

  const cardContent = (
    <div className="relative mx-auto w-[80%] max-w-[600px] cursor-pointer transition-transform duration-300 hover:scale-103">
      {/* Main Card Content */}
      <div className="relative flex h-[350px] w-full flex-col overflow-hidden rounded-xl bg-gray-950 shadow-2xl 2xl:h-[380px]">
        {/*  */}

        {/*  */}
        {/* Event Image - Optimized with next/image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.imageUrl || Images.mock}
            alt={item.name || "Event image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={item.featured}
            loading={item.featured ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/50 to-transparent"></div>

          {/* Featured Tag */}
          {item.featured && (
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              <Star className="h-3.5 w-3.5 fill-white" />
              <span>Featured</span>
            </div>
          )}
        </div>
        {/*  */}

        {/*  */}
        {/* Card Content */}
        <div className="flex flex-1 flex-col justify-between gap-1 bg-gray-950 p-4 xl:gap-2">
          {/* Date */}
          <div className="flex items-center gap-2 text-gray-400">
            <CalendarHeart className="h-4 w-4 text-pink-400" />
            <p className="text-xs font-medium xl:text-sm 2xl:text-base">
              {item.startDate}
            </p>
          </div>

          {/* Event Name */}
          <h3 className="line-clamp-2 text-sm leading-tight font-bold text-white xl:text-xl 2xl:text-2xl">
            {item.name}
          </h3>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <p className="line-clamp-1 text-xs xl:text-sm 2xl:text-base">
                {item.locationMap}
              </p>
            </div>
            {/* {distanceKm !== undefined && (
              <p className="text-xs text-gray-500 ml-6">
                {distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m away` : `${distanceKm.toFixed(1)} km away`}
              </p>
            )} */}
          </div>

          {/* Category and Price */}
          <div className="flex items-center justify-between border-t border-gray-800 xl:pt-3">
            {/*  */}

            {/*  */}
            <AvatarComponent
              item={item}
              disableOrganizerLink={shouldDisableOrganizerLink}
            />
            {/*  */}

            {/* {item.category && (
              <Button
                size="sm"
                className="border-0 bg-gradient-to-r from-pink-500 to-purple-500 font-semibold text-white hover:from-pink-600 hover:to-purple-600"
              >
                {item.category}
              </Button>
            )} */}

            <p className="bg-linear-to-r from-pink-400 to-cyan-400 bg-clip-text font-bold text-transparent lg:text-base xl:text-2xl 2xl:text-3xl">
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
