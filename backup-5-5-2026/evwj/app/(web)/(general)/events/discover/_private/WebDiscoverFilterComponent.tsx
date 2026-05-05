"use client";

import { ActionEventModelAll } from "@/actions/action-event-model";
import { SkeletonCardComponent } from "@/app/_private/(shadcn)/SkeletonComponent";
import GlassEffectButtonComponent from "@/app/_private/(theme)/glass-effect/GlassEffectButtonComponent";
import EventModelCardComponent from "@/app/_private/(ui-extend)/EventModelCardComponent";
import {
  MultiplePlacesComponent,
  MultiplePlacesComponentType,
} from "@/lib/lib-google-map";
import { cn } from "@/lib/lib-shadcn";
import { Badge } from "@/shadcn/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shadcn/ui/input-group";
import { useQuery } from "@tanstack/react-query";
import {
  BookmarkIcon,
  CalendarIcon,
  DollarSignIcon,
  MapIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export default function WebDiscoverFilterComponent() {
  return (
    <div className="flex flex-col p-4">
      <FilterComponents />
    </div>
  );
}

function FilterComponents() {
  const { data: eventModels } = useQuery({
    queryKey: ["event-model-all"],
    queryFn: ActionEventModelAll,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) => res?.data?.events,
  });

  const gridArrayData = useMemo(() => {
    const eventData = eventModels?.slice(0, 12)?.map((item) => (
      <EventModelCardComponent
        key={item.id}
        event={item}
      />
    ));

    return eventData;
  }, [eventModels]);

  const gridArraySkeleton = useMemo(() => {
    const eventData = Array.from({ length: 12 }, (_, index) => (
      <SkeletonCardComponent key={index} />
    ));

    return eventData;
  }, []);

  const [showMap, setShowMap] = useState(false);
  const toggleMap = useCallback(() => setShowMap(!showMap), [showMap]);

  const MapBtnCmp = useMemo(() => {
    return (
      <GlassEffectButtonComponent
        onClick={toggleMap}
        className="gap-1"
      >
        <MapIcon />
        <span>Map View</span>
      </GlassEffectButtonComponent>
    );
  }, [toggleMap]);

  const MapViewCmp = useMemo(() => {
    const places = eventModels
      ?.map((item) => item?.eventVenues)
      ?.map((item) => item?.at(0))
      ?.filter((item) => item !== undefined)
      ?.filter((item) => item?.venueType !== "VIRTUAL")
      // ?.filter((item) => item?.placeId !== null)
      // ?.filter((item) => item?.latitude !== null)
      // ?.filter((item) => item?.latitude !== undefined)
      ?.map<MultiplePlacesComponentType["poi"]>((item) => ({
        id: String(item?.id ?? 0),
        placeId: String(item?.placeId ?? 0),
        name: item?.name ?? "",
        location: {
          lat: Number(item?.latitude),
          lng: Number(item?.longitude),
        },
      }))
      ?.filter((item) => item !== undefined);

    return (
      <MultiplePlacesComponent
        //  places={places}
        pois={places}
      />
    );
  }, [eventModels]);

  const GridViewCmp = useMemo(() => {
    return (
      <div
        className={cn("grid grid-cols-1 gap-4 md:grid-cols-2", {
          "lg:grid-cols-2 xl:grid-cols-3": showMap,
          "lg:grid-cols-3 xl:grid-cols-4": !showMap,
        })}
      >
        {!gridArrayData ? gridArraySkeleton : gridArrayData}
      </div>
    );
  }, [gridArrayData, showMap, gridArraySkeleton]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col pt-10 md:items-center">
        <div className="flex w-full flex-col items-center gap-4 md:max-w-lg">
          {/* <HeadingTwoComponent>All Events</HeadingTwoComponent> */}

          <div className="flex w-full gap-2">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <GlassEffectButtonComponent>Search</GlassEffectButtonComponent>
          </div>

          <div className="flex flex-wrap gap-2 *:gap-1 *:*:nth-1:size-4 *:*:nth-2:text-sm">
            <GlassEffectButtonComponent className="*:nth-1:text-orange-500">
              <BookmarkIcon />
              <span>Type</span>
            </GlassEffectButtonComponent>
            <GlassEffectButtonComponent className="*:nth-1:text-red-500">
              <CalendarIcon />
              <span>Date</span>
            </GlassEffectButtonComponent>
            <GlassEffectButtonComponent className="*:nth-1:text-purple-500">
              <DollarSignIcon />
              <span>Price</span>
            </GlassEffectButtonComponent>
          </div>

          <div className="flex gap-2">
            <Badge variant={"outline"}>
              <span> New York</span>
              <XIcon className="text-red-500" />
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-4 lg:hidden">
          {MapBtnCmp}

          {showMap && <div className="flex h-96 flex-col">{MapViewCmp}</div>}

          {GridViewCmp}
        </div>

        <div className="hidden flex-col gap-4 lg:flex">
          <div className="self-end">{MapBtnCmp}</div>

          <div className="flex gap-4">
            <div className="flex-1 xl:flex-1/7">{GridViewCmp}</div>
            {showMap && (
              <div className="flex flex-1 flex-col">
                <div className="sticky top-20 flex h-full max-h-[830] flex-col overflow-hidden rounded-2xl">
                  {MapViewCmp}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
