"use client";

import { ActionEventCategoryAllAction } from "@/actions/action-event-category";
import { SkeletonCardComponent } from "@/app/_private/(shadcn)/SkeletonComponent";
import { HeadingTwoComponent } from "@/app/_private/(shadcn)/TextComponent";
import { ImageComponent } from "@/app/_private/(theme)/general/ImageComponent";
import { Images } from "@/lib/lib-images";
import { ResponseDataType } from "@/lib/lib-responses";
import { Routes } from "@/lib/lib-routes";
import { CardDescription } from "@/shadcn/ui/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";

export default function WebHomeCategoryComponent() {
  const { data: eventCategoryData = [] } = useQuery({
    queryKey: ["event-category-home"],
    queryFn: ActionEventCategoryAllAction,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (res) => res?.data?.eventCategories ?? [],
  });

  const modifyEventCategoryData = useMemo(() => {
    return eventCategoryData?.slice(0, 12);
  }, [eventCategoryData]);

  const modifyEventCategorySkeleton = useMemo(() => {
    const eventData = Array.from({ length: 12 }, (_, index) => (
      <SkeletonCardComponent key={index} />
    ));

    return eventData;
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-radial-gradient flex flex-col bg-radial from-teal-900 py-10 lg:items-center">
        <div className="flex w-full flex-col gap-10 overflow-hidden lg:max-w-3xl">
          <div className="flex flex-col gap-2">
            <HeadingTwoComponent>Explore Event Categories</HeadingTwoComponent>
            <CardDescription className="">
              Whatever your vibe, we&apos;ve got you covered
            </CardDescription>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4">
            {(modifyEventCategoryData?.length ?? 0) > 0
              ? modifyEventCategoryData?.map((eventCategory) => {
                  return (
                    <Link
                      key={eventCategory.id}
                      href={Routes?.web?.general?.eventsDiscover}
                      className="flex flex-1 flex-col"
                    >
                      <CategoryCardComponent eventCategory={eventCategory} />
                    </Link>
                  );
                })
              : modifyEventCategorySkeleton}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryCardComponent(creds?: ResponseDataType) {
  const { name } = creds?.eventCategory || {};

  return (
    <ImageComponent
      backgroundImage={Images?.asset?.page?.bgRedDots}
      className="flex aspect-square flex-1 flex-col justify-end rounded-2xl px-4 pt-20 pb-4"
    >
      <p className="line-clamp-2 font-medium md:text-lg">{name}</p>
      <CardDescription>10 Events</CardDescription>
    </ImageComponent>
  );
}
