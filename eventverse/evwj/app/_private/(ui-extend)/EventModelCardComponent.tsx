"use client";

import { LibDateFormatHelper, LibTime24To12FormatHelper } from "@/lib/lib-date";
import { Images } from "@/lib/lib-images";
import { ResponseDataType } from "@/lib/lib-responses";
import { cn } from "@/lib/lib-shadcn";
import { Badge } from "@/shadcn/ui/badge";
import {
  BlendIcon,
  CalendarIcon,
  FlameIcon,
  GlobeIcon,
  MapPinIcon,
  TicketIcon,
} from "lucide-react";
import { ComponentProps, ElementType, useMemo } from "react";
import { ImageComponent } from "../(theme)/general/ImageComponent";
import GlassEffectCardComponent from "../(theme)/glass-effect/GlassEffectCardComponent";

export default function EventModelCardComponent(creds?: ResponseDataType) {
  const { name, eventDays, eventVenues, user } = creds?.event ?? {};
  return (
    <ImageComponent
      backgroundImage={Images?.asset?.page?.artSteve}
      className={cn("gap-60 rounded-2xl p-1 font-normal")}
    >
      <Badge className="bg-orange-700 text-current">
        <FlameIcon />
        <span>Popular</span>
      </Badge>

      <GlassEffectCardComponent className="gap-2 px-2 py-4 tracking-tight md:p-4">
        <p className="line-clamp-1 font-medium">{name}</p>
        <div className="flex flex-col gap-1">
          <EventDayComponent eventDays={eventDays} />
          <EventVenueComponent eventVenues={eventVenues} />
        </div>

        <div className="flex items-center justify-between overflow-hidden">
          <EventPriceComponent user={user} />
          <EventUserComponent user={user} />
        </div>
      </GlassEffectCardComponent>
    </ImageComponent>
  );
}

function IconTextComponent({
  Icon,
  text,
  props,
}: {
  Icon: ElementType;
  text?: string;
  props?: ComponentProps<"div">;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 overflow-hidden text-sm font-light text-slate-200 *:nth-1:size-4",
        props?.className,
      )}
    >
      <Icon />
      <p className="line-clamp-1">{text}</p>
    </div>
  );
}

function EventDayComponent(eventModel?: ResponseDataType["event"]) {
  const { eventDays } = eventModel ?? {};

  const textContent = useMemo(() => {
    if (!eventDays) {
      return "";
    }

    if ((eventDays?.length ?? 0) == 1) {
      const eventDay = eventDays?.at(0);
      const { eventDate, startTime } = eventDay ?? {};

      const dateString = LibDateFormatHelper(eventDate);
      const timeString = LibTime24To12FormatHelper(startTime);

      return `${dateString} - ${timeString}`;
    }

    if ((eventDays?.length ?? 0) > 1) {
      const firstEvent = eventDays?.at(0);
      const firstString = LibDateFormatHelper(firstEvent?.eventDate);

      const secondEvent = eventDays?.at(0);
      const secondString = LibDateFormatHelper(secondEvent?.eventDate);

      return `${firstString} - ${secondString}`;
    }
  }, [eventDays]);

  return (
    <IconTextComponent
      Icon={CalendarIcon}
      text={textContent}
      props={{
        className: "*:nth-1:text-orange-500",
      }}
    />
  );
}

function EventVenueComponent(eventModel?: ResponseDataType["event"]) {
  const { eventVenues } = eventModel ?? {};

  const textContent = useMemo(() => {
    let obj: {
      Icon?: ElementType;
      text?: string;
    } = {
      Icon: undefined,
      text: "",
    };

    if (!eventVenues) {
      return obj;
    }

    const eventVenue = eventVenues?.at(0);

    if (!eventVenue) {
      return obj;
    }

    const { name, venueType } = eventVenue ?? {};

    switch (venueType) {
      case "PHYSICAL":
        obj = {
          Icon: MapPinIcon,
          text: name ?? "physical",
        };

        break;

      case "VIRTUAL":
        obj = {
          Icon: GlobeIcon,
          text: "Virtual",
        };

        break;

      case "HYBRID":
        obj = {
          Icon: BlendIcon,
          text: "Hybrid",
        };

        break;

      default:
        break;
    }

    return obj;
  }, [eventVenues]);

  return (
    <IconTextComponent
      Icon={textContent?.Icon ? textContent?.Icon : GlobeIcon}
      text={textContent?.text}
      props={{
        className: "*:nth-1:text-red-500",
      }}
    />
  );
}

function EventUserComponent(eventModel?: ResponseDataType["event"]) {
  const { user } = eventModel ?? {};

  const textContent = useMemo(() => {
    if (!user) {
      return "";
    }

    const { firstname, lastname } = user ?? {};

    return (
      <div className="flex items-center gap-1">
        <ImageComponent
          backgroundImage={Images?.asset?.user?.clark}
          className="h-6 w-6 rounded-full"
        />
        <p className="line-clamp-1 text-sm text-slate-200">
          {firstname} {lastname}
        </p>
      </div>
    );
  }, [user]);

  return textContent;
}

function EventPriceComponent(eventModel?: ResponseDataType["event"]) {
  const {} = eventModel ?? {};

  // const textContent = useMemo(() => {
  //   return (
  //     <div className="flex items-center justify-end gap-1">
  //       <p className="">From</p>
  //       <p className="text-xl font-medium">$100*</p>
  //     </div>
  //   );

  //   return "Free";
  // }, []);

  return (
    <IconTextComponent
      Icon={TicketIcon}
      text={"From $149"}
      props={{
        className:
          "*:nth-2:text-white *:nth-2:font-medium *:nth-1:text-purple-500",
      }}
    />
  );
}
