"use client";

import { ActionEventModelAll } from "@/actions/action-event-model";
import { CarouselComponent } from "@/app/_private/(shadcn)/CarouselComponent";
import { SkeletonCardComponent } from "@/app/_private/(shadcn)/SkeletonComponent";
import { HeadingTwoComponent } from "@/app/_private/(shadcn)/TextComponent";
import EventModelCardComponent from "@/app/_private/(ui-extend)/EventModelCardComponent";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function WebHomeUpcomingComponent() {
  const { data: eventModels } = useQuery({
    queryKey: ["event-model-all"],
    queryFn: ActionEventModelAll,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) => res?.data?.events,
  });

  const carouselArrayData = useMemo(() => {
    const eventData = eventModels?.slice(0, 12)?.map((item) => (
      <EventModelCardComponent
        key={item.id}
        event={item}
      />
    ));

    return eventData;
  }, [eventModels]);

  const carouselArraySkeleton = useMemo(() => {
    const eventData = Array.from({ length: 12 }, (_, index) => (
      <SkeletonCardComponent key={index} />
    ));

    return eventData;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-center">
        <HeadingTwoComponent>Upcoming Events</HeadingTwoComponent>
        <p className="">Check out the events that are happening soon.</p>
      </div>

      <CarouselComponent
        carouselArray={
          (carouselArrayData?.length ?? 0) > 0
            ? carouselArrayData
            : carouselArraySkeleton
        }
      />
    </div>
  );
}
