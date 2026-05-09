"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Routes } from "@/lib/lib-routes";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWindowScroll } from "react-use";
import EventDetailCheckoutSectionComponent from "./EventDetailCheckoutSectionComponent";
import EventDetailDescriptionSectionComponent from "./EventDetailDescriptionSectionComponent";

import { cn } from "@/lib/utils";
import EventDetailMediaSectionComponent from "./EventDetailMediaSectionComponent";
import EventDetailOrganizerSectionComponent from "./EventDetailOrganizerSectionComponent";
import EventDetailScheduleSectionComponent from "./EventDetailScheduleSectionComponent";
import EventDetailSimilarEventsComponent from "./EventDetailSimilarEventsComponent";
import EventDetailSpecialGuestsSectionComponent from "./EventDetailSpecialGuestsSectionComponent";

// type TabType = "about" | "location" | "organizer" | "faqs" | "gallery";

type PropType = {
  slug: string;
};

export default function EventDetailDataSectionComponent(props: PropType) {
  //
  const [currentTab, setCurrentTab] = useState("");
  //
  const slug = props.slug;
  //
  const tabItems = useMemo(
    () => [
      {
        name: "About",
        key: "about",
        component: EventDetailDescriptionSectionComponent,
      },
      {
        name: "Schedule",
        key: "schedule",
        component: EventDetailScheduleSectionComponent,
        props: { slug },
      },
      {
        name: "Media",
        key: "media",
        component: EventDetailMediaSectionComponent,
        props: { slug },
      },
      {
        name: "Special Guests",
        key: "special-guests",
        component: EventDetailSpecialGuestsSectionComponent,
        props: { slug },
      },
      {
        name: "Organizer",
        key: "organizer",
        component: EventDetailOrganizerSectionComponent,
        props: { slug },
      },
    ],
    [slug],
  );
  //
  // const [tabValue, setTabValue] = useState<TabType>("about");
  //
  const handleManualScroll = (text: string) => {
    //
    const title = `#item-${text}`;
    //
    const item = document.querySelector(title);
    //
    const elem = item?.getBoundingClientRect();
    //
    window.scrollBy({ top: (elem?.y ?? 0) - 150 });
    //
    setCurrentTab(title);
    //
  };
  //
  //
  const handleAutoScrollSubSet = useCallback(
    (item: string) => {
      //
      const elem = document.querySelector(item);
      //
      if (elem) {
        const boundary = elem?.getBoundingClientRect();
        //
        const top = boundary?.top ?? 0;
        // const bottom = boundary?.bottom ?? 0;
        //
        // const valid = top < 200 && bottom - 100 > 0;
        const valid = top < 200 && top > 0;
        //
        if (valid && currentTab !== item) {
          // setTimeout(() => {
          // }, 1000);
          setCurrentTab(item);
        }
        //
      }
    },
    [currentTab],
  );
  //
  const handleAutoScroll = useCallback(() => {
    //
    handleAutoScrollSubSet("#item-about");
    handleAutoScrollSubSet("#item-schedule");
    handleAutoScrollSubSet("#item-media");
    handleAutoScrollSubSet("#item-special-guests");
    handleAutoScrollSubSet("#item-organizer");
    //
  }, [handleAutoScrollSubSet]);
  //
  const { y: positionY } = useWindowScroll();
  //
  useEffect(() => {
    handleAutoScroll();
  }, [handleAutoScroll, positionY]);
  //
  return (
    <div className="flex flex-col gap-10 py-10">
      {/* Section */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Details */}
        <div className="flex flex-col gap-10 lg:flex-1">
          <div className="sticky top-25 z-10 flex flex-wrap gap-2">
            {tabItems?.map((item, index) => {
              //
              const modified = `#item-${item.key}`;
              //
              return (
                <div
                  key={index}
                  className={cn(
                    "border-foreground flex rounded-full border px-4 py-2 text-sm font-medium backdrop-blur",
                    {
                      "bg-primary text-background dark:text-foreground border-none dark:bg-purple-700":
                        modified === currentTab,
                      // "bg-primary text-background dark:bg-background dark:text-foreground border-none":
                      //   modified === currentTab,
                    },
                  )}
                  onClick={() => handleManualScroll(item.key)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket */}
        <div className="hidden flex-col lg:flex lg:max-w-md lg:flex-1">
          <Card className="sticky top-30 flex w-full flex-col dark:bg-purple-800">
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Calendar />
                  <p className="font-medium">Friday 11 June, 11:50 AM</p>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin />
                  <p className="font-medium">Central Park, New York</p>
                </div>

                <div className="flex flex-col items-center">
                  <EventDetailCheckoutSectionComponent slug={slug} />
                </div>
              </div>
            </CardContent>

            <Separator />

            <CardContent>
              <div className="flex flex-col gap-4">
                <p className="">
                  <span className="font-medium">Refund Policy: </span>
                  <span>Refunds available up to 7 days before the event.</span>
                </p>

                <Link
                  href={`${Routes.web.general.eventDetail}/${slug}`}
                  className="text-primary flex items-center gap-2 font-medium"
                >
                  <span>Terms &amp; Condition</span>
                  <ChevronRight />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section */}
      <div className="flex flex-col">
        {/* Similar Events Section */}
        <div
          className="flex flex-col"
          id="item-similar-events"
        >
          <EventDetailSimilarEventsComponent slug={slug} />
        </div>

        {/* More from Organizer Section */}
        {/* <div
          className="flex flex-col border"
          id="item-organizer-events"
        >
          <EventDetailOrganizerEventsComponent slug={slug} />
        </div> */}
      </div>
    </div>
  );
}
