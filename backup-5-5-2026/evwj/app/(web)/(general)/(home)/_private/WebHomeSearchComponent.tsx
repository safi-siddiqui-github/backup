"use client";

import {
  HeadingThreeComponent,
  HeadingTwoComponent,
} from "@/app/_private/(shadcn)/TextComponent";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function WebHomeSearchComponent() {
  const infoData = useMemo(
    () => [
      {
        id: 1,
        name: "Events Created",
        content: "14M+",
      },
      {
        id: 2,
        name: "Guest Served",
        content: "$36B+",
      },
      {
        id: 3,
        name: "Countries & Territories",
        content: "200+",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-4 overflow-hidden text-white">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-10">
          <HeadingTwoComponent className="max-w-xl text-center">
            Find the perfect event for your experience
          </HeadingTwoComponent>

          <div className="flex flex-col gap-2">
            <div className="flex items-center rounded-2xl bg-white/10 px-4 py-2">
              <SearchIcon />
              <Input
                placeholder="Start your Search here"
                className="border-0! ring-0!"
              />
              <Button
                size={"icon-lg"}
                variant={"outline"}
                className="text-black"
              >
                <ArrowRightIcon />
              </Button>
            </div>

            <Link
              href={Routes?.web?.general?.eventsDiscover}
              className="text-center"
            >
              <span>Not sure what to look for?</span>
              <span className="underline"> Discover Events</span>
            </Link>
          </div>

          <div />

          <div className="flex flex-col items-center gap-4 text-center">
            <AvatarGroup className="*:size-15 *:*:object-cover *:ring-0!">
              <Avatar>
                <AvatarImage
                  src={Images?.asset?.user?.charlie}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  src={Images?.asset?.user?.alex}
                  alt="@alex"
                />
                <AvatarFallback>AX</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  src={Images?.asset?.user?.clark}
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src={Images?.asset?.user?.jeffrey}
                  alt="@jeff"
                />
                <AvatarFallback>JF</AvatarFallback>
              </Avatar>

              <Avatar>
                <AvatarImage
                  src={Images?.asset?.user?.smith}
                  alt="@smith"
                />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
            </AvatarGroup>

            <HeadingThreeComponent>
              Trusted by 14 million event enthusiasts worldwide
            </HeadingThreeComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
