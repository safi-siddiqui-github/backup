"use client";

import { ActionEventModelAll } from "@/actions/action-event-model";
import ReactBitsLightRaysComponent from "@/app/_private/(react-bits)/ReactBitsLightRaysComponent";
import { CarouselComponent } from "@/app/_private/(shadcn)/CarouselComponent";
import { SkeletonCardComponent } from "@/app/_private/(shadcn)/SkeletonComponent";
import { HeadingOneComponent } from "@/app/_private/(shadcn)/TextComponent";
import ShadcnIORotatingTextComponent from "@/app/_private/(shadcn-io)/ShadcnIORotatingTextComponent";
import GlassEffectButtonComponent from "@/app/_private/(theme)/glass-effect/GlassEffectButtonComponent";
import EventModelCardComponent from "@/app/_private/(ui-extend)/EventModelCardComponent";
import { Routes } from "@/lib/lib-routes";
import { useQuery } from "@tanstack/react-query";
import { PlayIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function WebHomeHeroComponent() {
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

  const words = useMemo(
    () => ["HOSTING", "VENDOR", "MANAGEMENT", "MARKETPLACE"],
    [],
  );

  return (
    <div className="relative flex flex-col gap-10 px-4 pt-20 lg:pt-40">
      <div className="absolute top-0 left-0 flex h-full w-full flex-col">
        <ReactBitsLightRaysComponent
          rayLength={3}
          saturation={3}
          followMouse={false}
          lightSpread={2}
          raysSpeed={0}
          fadeDistance={0.5}
          className=""
        />
      </div>

      <div className="z-10 flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-8 text-center md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
            <div className="flex flex-col">
              <HeadingOneComponent className="">
                FULL EVENT &nbsp;
              </HeadingOneComponent>

              <div className="flex flex-wrap items-center justify-center">
                <HeadingOneComponent className="flex">
                  <ShadcnIORotatingTextComponent text={words} />
                  &nbsp;
                </HeadingOneComponent>

                <HeadingOneComponent className="">PLATFORM</HeadingOneComponent>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-wrap items-center gap-2 *:*:min-w-fit *:*:flex-1 *:*:gap-2">
                <Link href={Routes?.web?.general?.eventsDiscover}>
                  <GlassEffectButtonComponent>
                    <PlayIcon />
                    <span>Get Started</span>
                  </GlassEffectButtonComponent>
                </Link>
                <Link href={Routes?.web?.general?.eventsCreateBasic}>
                  <GlassEffectButtonComponent>
                    <PlusIcon />
                    <span>Create Event</span>
                  </GlassEffectButtonComponent>
                </Link>
              </div>

              <p className="">Manage your events, vendors, and more.</p>
            </div>
          </div>
        </div>

        <CarouselComponent
          carouselItemProps={
            {
              // className: "basis-1/4!",
            }
          }
          carouselArray={
            (carouselArrayData?.length ?? 0) > 0
              ? carouselArrayData
              : carouselArraySkeleton
          }
        />
      </div>
    </div>
  );
}
