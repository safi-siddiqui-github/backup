"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Images } from "@/lib/lib-images";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

export default function EventDetailImagesComponent() {
  const imagesData = useMemo(
    () => [
      Images.eventOne,
      Images.eventTwo,
      Images.eventThree,
      Images.eventFour,
      Images.eventFive,
      Images.eventSix,
      Images.eventSeven,
      Images.eventEight,
      Images.eventOne,
      Images.eventTwo,
      Images.eventThree,
      Images.eventFour,
      Images.eventFive,
      Images.eventSix,
      Images.eventSeven,
      Images.eventEight,
    ],
    [],
  );
  const [api, setApi] = useState<CarouselApi>();
  const [selectedScrollSnap, setSelectedScrollSnap] = useState(0);
  useEffect(() => {
    if (api) {
      setSelectedScrollSnap(api.selectedScrollSnap());
      api.on("select", () => {
        setSelectedScrollSnap(api.selectedScrollSnap());
        document
          ?.querySelector('[data-carousel-state="active"]')
          ?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
      });
    }
  }, [api]);
  return (
    <div className="flex flex-col gap-2 px-4">
      <Carousel
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent className="">
          {imagesData?.map((item, index) => (
            <CarouselItem key={index}>
              <div
                className="flex h-72 w-full flex-col overflow-hidden rounded-md bg-cover bg-center xl:h-96"
                style={{
                  backgroundImage: `url(${item})`,
                }}
              >
                <div className="flex flex-1 flex-col justify-between bg-linear-to-r via-white/0 to-black/70 text-white">
                  <div className="flex justify-end text-right">
                    <div className="flex flex-col items-end gap-0.5 p-4">
                      <p className="text-2xl font-semibold">January 11</p>
                      <p className="text-sm font-medium">Wednesday</p>
                      <p className="text-sm">Starts at 11:00 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-end text-right">
                    <div className="flex flex-col items-end gap-0.5 p-4">
                      <p className="text-sm font-medium">
                        Central Park, New York
                      </p>
                      <p className="text-2xl font-semibold">
                        Summer Music Festival 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 dark:backdrop-blur-2xl" />
        <CarouselNext className="right-0 dark:backdrop-blur-2xl" />
      </Carousel>
      <Carousel className="mx-auto w-full max-w-44 lg:hidden">
        <CarouselContent className="snap-x">
          {imagesData?.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn("basis-auto", {
                // "snap-center": selectedScrollSnap === index,
              })}
              onClick={() => api?.scrollTo(index)}
              data-carousel-state={
                selectedScrollSnap === index ? "active" : "inactive"
              }
            >
              <div
                className={cn("h-2 w-2 rounded-full bg-blue-500", {
                  "w-5 snap-center": selectedScrollSnap === index,
                })}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel className="hidden w-full lg:block">
        <CarouselContent className="lg:-space-x-2">
          {imagesData?.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn("basis-auto", {
                // "opacity-50": selectedScrollSnap === index,
              })}
              onClick={() => api?.scrollTo(index)}
            >
              <div
                className={cn("size-10 rounded bg-cover bg-center", {
                  "scale-90 ring-2": selectedScrollSnap === index,
                })}
                style={{
                  backgroundImage: `url(${item})`,
                }}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
