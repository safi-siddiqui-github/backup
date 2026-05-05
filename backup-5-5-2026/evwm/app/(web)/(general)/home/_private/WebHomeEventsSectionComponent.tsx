"use client";

import { useEffect, useMemo, useState } from "react";
import NextLink from "next/link";
import { Routes } from "@/lib/lib-routes";
import { Button } from "@/shadcn/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
 
import { ArrowRightIcon, Calendar, CalendarHeart, Link, MapPin } from "lucide-react";
import { Images } from "@/lib/lib-images";
import { MockEventData } from "../../_private/EventsMockData";
import {   getAllEvents,
  getCommunityEvents,
  getRecommendedEvents,
  getSeasonalEvents,
  getSportsFitnessEvents,
  getThisMonthEvents,
  getThisWeekEvents,
  getTodayEvents, } from "../../_private/web-home-healper";
 

type HomePageProp = {
  events?: MockEventData[];
  sectionType?: string;
  event?: MockEventData;
};

export default function WebHomeEventsSectionComponent() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleClickFN = ({
    sectionType,
    btnFilter,
  }: {
    sectionType?: string;
    btnFilter?: string;
  }) => {
    console.log("Clicked Filter:", sectionType, btnFilter);
  };

  const sectionType = "recommended";

  const filterButtons = useMemo(
    () => [
      {
        btnText: "All",
        BtnIcon: Calendar,
        btnFilter: "all",
        handleClick: handleClickFN,
      },
      {
        btnText: "Today",
        BtnIcon: Calendar,
        btnFilter: "today",
        handleClick: handleClickFN,
      },
      {
        btnText: "This Week",
        BtnIcon: Calendar,
        btnFilter: "week",
        handleClick: handleClickFN,
      },
      {
        btnText: "This Month",
        BtnIcon: Calendar,
        btnFilter: "month",
        handleClick: handleClickFN,
      },
    ],
    []
  );

  const eventData = useMemo(() => {
    return {
      all: getAllEvents(),
      today: getTodayEvents(),
      week: getThisWeekEvents(),
      month: getThisMonthEvents(),
      recommended: getRecommendedEvents(),
      seasonal: getSeasonalEvents(28),
      community: getCommunityEvents(),
      sports: getSportsFitnessEvents(),
    };
  }, []);

  const events = useMemo(() => {
    switch (selectedFilter) {
      case "all":
        return eventData.all;
      case "today":
        return eventData.today;
      case "week":
        return eventData.week;
      case "month":
        return eventData.month;
      default:
        return eventData.recommended;
    }
  }, [selectedFilter, eventData]);

  return (
    <div className="  flex flex-col container mx-auto w-full px-4 py-10 md:py-16 lg:py-20 gap-8 spacy-y-10">
      {/* Upcoming Event */}
      <div className="relative flex flex-col">
        <div className="flex flex-col gap-5">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Upcoming Events
          </p>

          <div className="flex flex-wrap gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-full *:px-2 *:py-2 *:text-xs *:font-medium *:data-[state-filter-btn=active]:bg-linear-to-r *:data-[state-filter-btn=active]:from-purple-600 *:data-[state-filter-btn=active]:to-cyan-600 *:data-[state-filter-btn=active]:text-white *:data-[state-filter-btn=inactive]:bg-white *:*:nth-1:size-4 md:gap-4 2xl:*:px-4 2xl:*:text-sm dark:*:data-[state-filter-btn=inactive]:bg-white/15 dark:*:data-[state-filter-btn=inactive]:text-white">
            {filterButtons?.map((item, index) => (
              <button
                key={index}
                data-state-filter-btn={
                  selectedFilter === item?.btnFilter ? "active" : "inactive"
                }
                onClick={() => {
                  setSelectedFilter(item?.btnFilter);
                  if (item?.handleClick) {
                    item.handleClick({
                      sectionType: sectionType,
                      btnFilter: item?.btnFilter,
                    });
                  }
                }}
                disabled={selectedFilter === item?.btnFilter}
              >
                {item?.BtnIcon && <item.BtnIcon />}
                {item?.btnText}
              </button>
            ))}
          </div>

          {(events?.length ?? 0) > 0 ? (
            <>
              <HomeCarouselComponent
                events={events}
                sectionType={sectionType}
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

      {/* Recommended For You */}
      <div className="relative flex flex-col">
        <div className="flex flex-col gap-5">
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            Recommended For You
          </p>

          <div className="flex flex-wrap gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-full *:px-2 *:py-2 *:text-xs *:font-medium *:data-[state-filter-btn=active]:bg-linear-to-r *:data-[state-filter-btn=active]:from-purple-600 *:data-[state-filter-btn=active]:to-cyan-600 *:data-[state-filter-btn=active]:text-white *:data-[state-filter-btn=inactive]:bg-white *:*:nth-1:size-4 md:gap-4 2xl:*:px-4 2xl:*:text-sm dark:*:data-[state-filter-btn=inactive]:bg-white/15 dark:*:data-[state-filter-btn=inactive]:text-white">
            {filterButtons?.map((item, index) => (
              <button
                key={index}
                data-state-filter-btn={
                  selectedFilter === item?.btnFilter ? "active" : "inactive"
                }
                onClick={() => {
                  setSelectedFilter(item?.btnFilter);
                  if (item?.handleClick) {
                    item.handleClick({
                      sectionType: sectionType,
                      btnFilter: item?.btnFilter,
                    });
                  }
                }}
                disabled={selectedFilter === item?.btnFilter}
              >
                {item?.BtnIcon && <item.BtnIcon />}
                {item?.btnText}
              </button>
            ))}
          </div>

          {(events?.length ?? 0) > 0 ? (
            <>
              <HomeCarouselComponent
                events={events}
                sectionType={sectionType}
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
    </div>
  );
}

function HomeCarouselComponent({ events, sectionType }: HomePageProp) {
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
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <HomeCardComponent event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center gap-2" id={sectionType}>
        {events?.map((_, index) => (
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
        ))}
      </div>
    </div>
  );
}

function HomeCardComponent(prop?: HomePageProp) {
  const { event } = prop ?? {};

  return (
    <div className="group relative flex flex-1 flex-col lg:p-2">
      <NextLink
        href={`${Routes.web.general.eventsDiscover}/${event?.slug}`}
        className="z-10 flex flex-1 flex-col rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:scale-105 hover:border-pink-400/50 dark:hover:border-purple-400/50"
        style={{ minHeight: '320px' }} // Increased card height
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
