"use client";

import NextLink from "next/link";
import { Button } from "@/shadcn/ui/button";
import { Separator } from "@/shadcn/ui/separator";
import { ArrowRightIcon, Calendar, CalendarHeart, ChevronDown, MapPin } from "lucide-react";
import { useRouter,  } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { CITY_DATA, DEFAULT_CITY } from "../page";
import { Routes } from "@/lib/lib-routes";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/ui/command";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shadcn/ui/carousel";
import { Images } from "@/lib/lib-images";
import WebDiscoverEventMapComponent from "./WebEventsDiscoverEventComponent";
import { getAllEvents } from "../../../_private/web-home-healper";
import { MockEventData } from "../../../_private/EventsMockData";

export default function WebEventDiscoverComponent({
  location,
  category,
}: {
  location: string;
  category?: string;
}) {
  return (
    <div className="whatsapp-doodle-bg flex min-h-screen flex-col bg-white dark:bg-transparent">
      {/* Content wrapper with orbs backdrop */}
      <div className="relative flex flex-1 flex-col">
        {/* Blurred gradient orbs backdrop (aligned with home/dashboard/event detail) */}
        <div className="pointer-events-none absolute top-0 flex h-full w-full flex-col">
          {/* Primary center orbs */}
          <div className="sticky top-32 flex w-full justify-center gap-4">
            <div className="h-56 max-w-xl flex-1 bg-blue-300/30 blur-3xl 2xl:max-w-2xl dark:bg-blue-600/30" />
            <div className="h-56 max-w-xl flex-1 bg-purple-300/30 blur-3xl 2xl:max-w-2xl dark:bg-purple-600/30" />
          </div>
          {/* Mid-page side orbs */}
          <div className="mt-[35vh] flex w-full justify-between px-6 md:px-12">
            <div className="h-40 w-40 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-600/25" />
            <div className="h-40 w-40 rounded-full bg-purple-300/25 blur-3xl dark:bg-purple-600/25" />
          </div>
          {/* Lower ambient orbs */}
          <div className="mt-auto mb-24 flex w-full justify-center gap-8">
            <div className="h-44 w-44 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/25" />
            <div className="h-44 w-44 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-600/25" />
          </div>
        </div>
        <div className="relative z-10">
          <Suspense>
            <EventsHeroSectionComponent
              location={location}
              category={category}
            />
            <WebEventsDiscoverEventComponent location={location} />

          </Suspense>
          <Separator />
          <div className="flex flex-col p-4 xl:p-8">
            <Suspense>  <WebDiscoverEventMapComponent />  </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsHeroSectionComponent({
  location,
  category,
}: {
  location?: string;
  category?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const city =
    location && CITY_DATA[location] ? CITY_DATA[location] : DEFAULT_CITY;

  const availableCities = Object.values(CITY_DATA);

  const handleLocationChange = (cityName: string) => {
    setOpen(false);
    router.push(
      `${Routes.web.general.eventsDiscover}/${encodeURIComponent(cityName)}`
    );
  };

  return (
    <div className="relative z-10 w-full">
      <div className="relative h-50 w-full overflow-hidden md:h-56.25 lg:h-96">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${city.imageUrl})`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/18 via-black/8 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10">
          {category ? (
            <>
              <h1 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
                {category}
              </h1>
              <p className="mt-1 text-sm text-white/90 md:text-base lg:text-lg">
                Discover events in {category}
              </p>
            </>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="group flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
                >
                  <h1 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
                    {city.name}
                  </h1>
                  <ChevronDown className="h-4 w-4 text-white/80 group-hover:text-white transition-colors md:h-5 md:w-5 lg:h-6 lg:w-6" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="px-2"
                align="start"
                side="top"
                sideOffset={8}
              >
                <Button variant={"outline"} className="w-full mb-2">
                  <MapPin />
                  Use Current Location
                </Button>

                <Command>
                  <CommandInput placeholder="Search Location" />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {availableCities.map((cityOption) => (
                        <CommandItem
                          key={cityOption.name}
                          value={cityOption.name}
                          onSelect={() => handleLocationChange(cityOption.name)}
                        >
                          {cityOption.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

function WebEventsDiscoverEventComponent({
  location,
}: {
  location: string;
}) {

  const eventData = useMemo(() => {
    return {
      all: getAllEvents(),
     
    };
  }, []);

  const events = useMemo(() => {
    const filteredEvents = eventData.all;
    return filteredEvents;
  }, [ eventData]);

  return<>
        <div className="relative flex flex-col max-w-8xl mx-auto px-4 xl:px-8 py-8 gap-8">
        <div className="flex flex-col gap-5">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Top Picks in {location}
          </p>

        
          {(events?.length ?? 0) > 0 ? (
            <>
              <HomeCarouselComponent
                events={events}
                
              />
              <div className="flex justify-center">
                <NextLink
                  href={Routes.web.general.eventsDiscover}
                  className="flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
                >
                  <span>See More Events</span>
                  <ArrowRightIcon />
                </NextLink>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 p-6">
              <Calendar className="size-10" />
              <p className="text-2xl font-semibold">No Events Found</p>
              <p className="max-w-xs text-center text-sm opacity-60">
                There are no events for this time period.
              </p>
              <NextLink href={Routes.web.general.eventsDiscover}>
                <Button className="rounded-full">Show All Events</Button>
              </NextLink>
            </div>
          )}
        </div>
      </div>
  </>
}


function HomeCarouselComponent({ events }: {
  events?: MockEventData[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", slidesToScroll: "auto" }}
      >
        <CarouselContent>
          {events?.map((event, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] smax-w-[40%] md:basis-[48%] md:max-w-[48%] lg:basis-1/4 lg:max-w-1/4 xl:basis-1/5 xl:max-w-1/5"
            >
              <HomeCardComponent event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center gap-2" id="carousel-dots">
        {(() => {
          // Responsive: max 5 on mobile, 8 on desktop
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
          const maxDots = isMobile ? 5 : 8;
          return (events ? events.slice(0, maxDots) : []).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`size-2 rounded-full ${
                index === current ? "w-5 bg-blue-500" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              title={`Go to slide ${index + 1}`}
            >
              <span className="sr-only">{`Go to slide ${index + 1}`}</span>
            </button>
          ));
        })()}
      </div>
    </div>
  );
}


function HomeCardComponent(prop?: { event?: MockEventData }) {
  const { event } = prop ?? {};

  return (
    <div className="group relative flex flex-1 flex-col lg:p-2">
      <NextLink
        href={`${Routes.web.general.eventsDiscover}/${event?.slug}`}
        className="z-10 flex flex-1 flex-col rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:scale-105 hover:border-pink-400/50 dark:hover:border-purple-400/50"
        style={{ minHeight: "320px" }} // Increased card height
      >
        <div
          className="h-40 overflow-hidden rounded-t-xl bg-cover bg-center lg:h-52" // Increased image height
          style={{
            backgroundImage: `url(${event?.imageUrl ?? Images.asset.page.background})`,
          }}
        />

        <div className="mt-2 flex flex-col gap-1 p-3 text-gray-900 dark:text-white">
          <p className="3xl:text-lg line-clamp-1 text-base font-semibold">
            {event?.name}
          </p>

          {event?.category && (
            <p className="3xl:text-xs text-xs text-gray-600 dark:text-gray-400">
              {event.category}
            </p>
          )}

          <div className="flex items-center gap-1 text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
            <CalendarHeart className="h-3 w-3 text-pink-400 dark:text-pink-500" />
            <p>{event?.startDate}</p>
          </div>

          <div className="flex items-center gap-1 text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
            <MapPin className="h-3 w-3 text-cyan-400 dark:text-cyan-500" />
            <p>{event?.locationMap}</p>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
              From
            </span>
            <p className="3xl:text-lg bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-base font-bold text-transparent">
              ${event?.price ?? 25.55}
            </p>
          </div>
        </div>
      </NextLink>
    </div>
  );
}
