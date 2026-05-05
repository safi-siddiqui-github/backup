"use client";

import { Images } from "@/lib/lib-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/shadcn/ui/carousel";
import { LayoutFileType } from "@/type/type-layout";
import { CalendarDays } from "lucide-react";
import { useMemo } from "react";
import WebHeaderComponent from "../../_private/WebHeaderComponent";

export default function WebGuestLayoutComponent({ children }: LayoutFileType) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="hidden flex-1 flex-col lg:flex">
        <ImageComponent />
      </div>
      <div className="flex max-w-5xl flex-1 flex-col">
        <div className="flex flex-col">
          <WebHeaderComponent />
        </div>

        <div className="flex flex-1 flex-col justify-center p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function ImageComponent() {
  return (
    <div
      className="flex flex-1 flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Images?.asset?.page?.guest})` }}
    >
      <div className="flex flex-1 flex-col items-center justify-center bg-black/60 p-4 text-white">
        <div className="3xl:max-w-xl flex max-w-md flex-col gap-8 xl:max-w-lg">
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-white/10 p-2">
              <CalendarDays className="size-10" />
            </div>
            <div className="flex flex-col">
              <p className="text-xl font-bold">Create Unforgettable Events</p>
              <p className="">Where Moments Become Memories</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-4xl font-bold">Create Unforgettable Events</p>
            <p className="">
              Join thousands of event planners who trust EventVerse to bring
              their visions to life with powerful tools and intuitive design.
            </p>
          </div>
          <ReviewCarousel />
        </div>
      </div>
    </div>
  );
}

function ReviewCarousel() {
  const carouselData = useMemo(
    () => [
      {
        avatar: Images?.asset?.user?.charlie,
        review:
          "“EventVerse transformed how we plan our company events. The ROI has been incredible!”",
        name: "Micheal R.",
        userRole: "HR Director at TechCorp",
      },
      {
        avatar: Images?.asset?.user?.clark,
        review:
          "“The seating chart feature alone saved me hours. Everything just works beautifully.”",
        name: "Jack L.",
        userRole: "Wedding Planner",
      },
      {
        avatar: Images?.asset?.user?.jeffrey,
        review:
          "“The seating chart feature alone saved me hours. Everything just works beautifully.”",
        name: "John E.",
        userRole: "Event Coordinator",
      },
    ],
    [],
  );
  return (
    <Carousel className="flex flex-col">
      <CarouselContent>
        {carouselData?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex cursor-grab gap-4 rounded-md bg-white/5 p-4 backdrop-blur-xs">
                <Avatar className="size-20">
                  <AvatarImage
                    src={item?.avatar}
                    className="object-cover object-center"
                  />
                  <AvatarFallback>{item?.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4">
                  <p className="italic">{item?.review}</p>
                  <div className="flex flex-col">
                    <p className="font-medium">{item?.name}</p>
                    <p className="">{item?.userRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
