"use client";

import { ActionEventModelAll } from "@/actions/action-event-model";
import { CarouselComponent } from "@/app/_private/(shadcn)/CarouselComponent";
import { SkeletonCardComponent } from "@/app/_private/(shadcn)/SkeletonComponent";
import { HeadingTwoComponent } from "@/app/_private/(shadcn)/TextComponent";
import { ImageComponent } from "@/app/_private/(theme)/general/ImageComponent";
import EventModelCardComponent from "@/app/_private/(ui-extend)/EventModelCardComponent";
import { Images } from "@/lib/lib-images";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function WebDiscoverHeroComponent() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <ImageComponent
        backgroundImage={Images?.asset?.page?.bgCity}
        className="h-56 justify-end rounded-2xl md:h-80 lg:h-96"
      >
        <div className="flex flex-col gap-2 bg-linear-to-b from-black/0 to-black/60 to-50% px-2 pb-10 md:px-4">
          <div className="text-xs">Breadcrumbs</div>
          <HeadingTwoComponent className="tracking-tight">
            TOP PICKS IN NEW YORK
          </HeadingTwoComponent>
        </div>
      </ImageComponent>

      <FeaturedComponents />
    </div>
  );
}

function FeaturedComponents() {
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
      {/* <div className="flex flex-col gap-2 text-center">
        <HeadingThreeComponent>Top Picks in New York</HeadingThreeComponent>
        <p className="">
          Discover the best events that have been created by our users.
        </p>
      </div> */}

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
