"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { getAllEvents } from "@/lib/mock-events";
import { cn } from "@/lib/utils";
import { MockEventData } from "@/type";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Share2,
  Trash,
  UserCheck,
  Mail,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-react";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { TeamDialog } from "@/components/preview/dashboard/TeamDialog";

type Props = {
  slug?: string;
};

type EventDate = {
  id: string;
  date: Date;
  timezone: string;
  timeSlots: {
    id: string;
    startTime: string;
    endTime: string;
  }[];
};

export default function EventDashboardHostingDetailImagesComponent({
  slug,
}: Props = {}) {
  // Get event data if slug is provided
  const event = useMemo<MockEventData | undefined>(() => {
    if (!slug) return undefined;
    return getAllEvents().find((e) => e.slug === slug);
  }, [slug]);

  // Initialize dates from event data - matching DateComponent logic
  const eventDates = useMemo<EventDate[]>(() => {
    if (!event?.startDate) {
      // Default placeholder dates
      const date1 = new Date();
      date1.setDate(date1.getDate() + 30);
      const date2 = new Date(date1);
      date2.setDate(date2.getDate() + 1);
      return [
        {
          id: `date-${Date.now()}`,
          date: date1,
          timezone: "America/New_York",
          timeSlots: [
            {
              id: `time-${Date.now()}`,
              startTime: "08:00",
              endTime: "17:00",
            },
          ],
        },
        {
          id: `date-${Date.now() + 1}`,
          date: date2,
          timezone: "America/New_York",
          timeSlots: [
            {
              id: `time-${Date.now() + 1}`,
              startTime: "08:00",
              endTime: "17:00",
            },
          ],
        },
      ];
    }
    // If event has startDate, create initial date entry
    const startDate = new Date(event.startDate);
    if (isNaN(startDate.getTime())) {
      const date1 = new Date();
      date1.setDate(date1.getDate() + 30);
      const date2 = new Date(date1);
      date2.setDate(date2.getDate() + 1);
      return [
        {
          id: `date-${Date.now()}`,
          date: date1,
          timezone: "America/New_York",
          timeSlots: [
            {
              id: `time-${Date.now()}`,
              startTime: "08:00",
              endTime: "17:00",
            },
          ],
        },
      ];
    }
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return [
      {
        id: `date-${Date.now()}`,
        date: startDate,
        timezone: "America/New_York",
        timeSlots: [
          {
            id: `time-${Date.now()}`,
            startTime: "08:00",
            endTime: "17:00",
          },
        ],
      },
      {
        id: `date-${Date.now() + 1}`,
        date: nextDay,
        timezone: "America/New_York",
        timeSlots: [
          {
            id: `time-${Date.now() + 1}`,
            startTime: "08:00",
            endTime: "17:00",
          },
        ],
      },
    ];
  }, [event?.startDate]);

  // Format date-time pairs - each date with its corresponding time slots
  const dateTimePairs = useMemo(() => {
    if (eventDates.length === 0) {
      return [
        {
          date: "Mar 15 - Mar 16, 2025",
          times: ["08:00 AM - 11:30 PM"],
        },
      ];
    }
    
    // Format time (convert 24h to 12h format)
    const formatTime = (time24: string) => {
      const [hours, minutes] = time24.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    };
    
    // Create pairs of date with its time slots
    return eventDates.map((day) => {
      const formattedDate = format(day.date, "EEEE, MMMM d, yyyy");
      const formattedTimes = day.timeSlots.length > 0
        ? day.timeSlots.map((slot) => `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`)
        : ["08:00 AM - 11:30 PM"];
      
      return {
        date: formattedDate,
        times: formattedTimes,
      };
    });
  }, [eventDates]);

  // Get location from event
  const location = useMemo(() => {
    return event?.locationMap || "Main Reception Hall";
  }, [event?.locationMap]);

  const [eventData, setEventData] = useState<Partial<MockEventData>>({
    category: event?.category || "Category",
    name: event?.name || "Name",
  });

  useEffect(() => {
    if (event) {
      setEventData({
        category: event.category || "Conference",
        name: event.name || "Summer Music Festival",
      });
    }
  }, [event]);
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
  const carouselItemPillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const updateSelectedScrollSnap = useCallback(() => {
    const selected = api?.selectedScrollSnap() ?? 0;
    setSelectedScrollSnap(selected);
    carouselItemPillRefs?.current[selected]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [api]);
  useEffect(() => {
    api?.on("select", () => updateSelectedScrollSnap());
    return () => {
      api?.off("select", () => updateSelectedScrollSnap());
    };
  }, [api]);
  const handleShareButton = useCallback(async () => {
    await navigator?.clipboard?.writeText(
      `${window.location.origin}${Routes.web.general.events}/test`,
    );
    toast("Link  Copied");
  }, []);

  const handleShareText = useCallback(async () => {
    const eventUrl = `${window.location.origin}${Routes.web.general.events}/${slug || "test"}`;
    const text = `Check out this event: ${eventData?.name || "Event"}\n${eventUrl}`;
    await navigator?.clipboard?.writeText(text);
    toast("Text copied to clipboard");
  }, [slug, eventData?.name]);

  const handleShareEmail = useCallback(() => {
    const eventUrl = `${window.location.origin}${Routes.web.general.events}/${slug || "test"}`;
    const subject = encodeURIComponent(`Check out this event: ${eventData?.name || "Event"}`);
    const body = encodeURIComponent(`I thought you might be interested in this event:\n\n${eventData?.name || "Event"}\n${eventUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }, [slug, eventData?.name]);

  const handleShareWhatsApp = useCallback(() => {
    const eventUrl = `${window.location.origin}${Routes.web.general.events}/${slug || "test"}`;
    const text = encodeURIComponent(`Check out this event: ${eventData?.name || "Event"}\n${eventUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }, [slug, eventData?.name]);

  const handleCopyLink = useCallback(async () => {
    const eventUrl = `${window.location.origin}${Routes.web.general.events}/${slug || "test"}`;
    await navigator?.clipboard?.writeText(eventUrl);
    toast("Link copied to clipboard");
  }, [slug]);
  const imageAlertTriggerRef = useRef<HTMLButtonElement | null>(null);
  const handleImageDeleteFN = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      imageAlertTriggerRef?.current?.click();
    },
    [],
  );

  const [showTeamDialog, setShowTeamDialog] = useState(false);
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
                <div className="flex flex-1 flex-col justify-between bg-linear-to-b from-white/0 from-50% to-black md:from-70%">
                  <div className="flex flex-wrap items-center justify-end gap-2 p-4 text-xs *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-full *:bg-white *:px-2 *:py-1 *:text-black *:*:nth-1:size-4 lg:text-sm lg:font-medium lg:*:px-3">
                    <button onClick={() => setShowTeamDialog(true)}>
                      <UserCheck />
                      <span>Team</span>
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <Share2 />
                          <span>Share</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={handleShareText}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Text</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleShareEmail}>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleShareWhatsApp}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>WhatsApp</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleCopyLink}>
                          <LinkIcon className="mr-2 h-4 w-4" />
                          <span>Copy Link</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex flex-col p-4 text-white">
                    <div className="w-fit rounded-full bg-blue-500 px-2 py-1 text-xs font-medium">
                      {eventData?.category}
                    </div>
                    <p className="line-clamp-2 text-4xl font-semibold md:text-5xl">
                      {eventData?.name}
                    </p>
                    <div className="mt-4 flex flex-col gap-y-2 text-xs md:font-medium lg:text-sm">
                      {dateTimePairs.map((pair, idx) => (
                        <div key={`pair-${idx}`} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="size-4" />
                            <p>{pair.date}</p>
                          </div>
                          {pair.times.map((timeStr, timeIdx) => (
                            <div key={`time-${idx}-${timeIdx}`} className="flex items-center gap-2">
                              <Clock className="size-4" />
                              <p>{timeStr}</p>
                            </div>
                          ))}
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4" />
                            <p>{location}</p>
                          </div>
                        </div>
                      ))}
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
        <CarouselContent className="">
          {imagesData?.map((item, index) => (
            <CarouselItem
              key={index}
              ref={(el) => {
                carouselItemPillRefs.current[index] = el;
              }}
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
                  "w-5": selectedScrollSnap === index,
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
                className={cn(
                  "flex size-10 cursor-pointer flex-col overflow-hidden rounded bg-cover bg-center hover:scale-90 hover:ring-2",
                  {
                    "scale-90 ring-2": selectedScrollSnap === index,
                  },
                )}
                style={{
                  backgroundImage: `url(${item})`,
                }}
              >
                <div className="group flex w-full flex-1 flex-col justify-end">
                  <button
                    onClick={handleImageDeleteFN}
                    className="flex cursor-pointer justify-center bg-black/50 py-1 text-red-500 hover:bg-white"
                  >
                    <Trash className="size-3" />
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className={cn("basis-auto", {})}>
            <div className="flex size-10 items-center justify-center rounded bg-black/10 dark:bg-white/20">
              <Plus />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <AlertDialog>
        <AlertDialogTrigger ref={imageAlertTriggerRef} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              image and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TeamDialog
        eventId={slug || event?.slug || "default-event"}
        open={showTeamDialog}
        onOpenChange={setShowTeamDialog}
      />
    </div>
  );
}
