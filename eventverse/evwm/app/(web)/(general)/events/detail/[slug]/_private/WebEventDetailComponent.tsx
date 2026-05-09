"use client";
import NextLink from "next/link";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { Accordion } from "@radix-ui/react-accordion";
import {
  ArrowRightIcon,
  Calendar,
  CalendarHeart,
  Clock,
  ExternalLink,
  Heart,
  Home,
  Info,
  MapPin,
  MessageCircle,
  Music,
  Plus,
  Ticket,
  User,
  Users,
  Zap,
} from "lucide-react";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaTwitter,
  FaXTwitter,
} from "react-icons/fa6";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";

import { Images } from "@/lib/lib-images";
import { Routes } from "@/lib/lib-routes";
import { cn } from "@/lib/lib-shadcn";
import { Button } from "@/shadcn/ui/button";
import Image from "next/image";
import {
  getAllEvents,
  // getThisMonthEvents,
  // getThisWeekEvents,
  // getTodayEvents,
} from "@/app/(web)/(general)/_private/web-home-healper";
// ------------------- TYPES ------------------- //
export type MockEventData = {
  name: string;
  startDate: string;
  locationMap: string;
  price: number;
  featured?: boolean;
  category?: string;
  imageUrl?: string;
  videoUrl?: string;
  slug?: string;
  username?: string;
  userProfilePicture?: string;
  latitude?: number;
  longitude?: number;
};
// type EventModel = object;
// type GuestGroup = object;
// type EventCategory = object;
// type ModuleCategory = object;
// type RsvpModule = object;
// type ScheduleModule = object;
// type SurveyModule = object;
// type AnnouncementModule = object;
// type MediaModule = object;
// type TicketModule = object;
// type TravelModule = object;
// type GameModule = object;
// type Session = object;
// type User = object;
// type Organization = object;
// type OrganizationMember = object;
// type OrganizationInvitation = object;
// type FullEventModel = Partial<EventModel> & {
//   eventCategory?: Partial<EventCategory>;
//   rsvpModule?: FullRsvpModule;
//   seatingModule?: FullSeatingModule;
//   scheduleModule?: FullScheduleModule;
//   surveyModule?: FullSurveyModule;
//   announcementModule?: FullAnnouncementModule;
//   mediaModule?: FullMediaModule;
//   ticketModule?: FullTicketModule;
//   travelModule?: FullTravelModule;
//   gameModule?: FullGameModule;
//   budgetModule?: FullBudgetModule;
// };
// type FullModuleCategory = Partial<ModuleCategory> & {
//   parent?: Partial<ModuleCategory>;
// };
// type FullRsvpModule = Partial<RsvpModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullSeatingModule = Partial<RsvpModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullScheduleModule = Partial<ScheduleModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullSurveyModule = Partial<SurveyModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullAnnouncementModule = Partial<AnnouncementModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullMediaModule = Partial<MediaModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullTicketModule = Partial<TicketModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullTravelModule = Partial<TravelModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullGameModule = Partial<GameModule> & {
//   moduleCategory?: FullModuleCategory;
// };
// type FullBudgetModule = {
//   id?: number;
//   slug?: string;
//   isActive?: boolean;
//   moduleCategory?: FullModuleCategory;
//   eventModelId?: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// };
// type FullGuestGroup = Partial<GuestGroup> & {};

// export type ActionResponseDataType = {
//   session?: Partial<Session> | null;
//   user?: Partial<User> | null;
//   eventModel?: FullEventModel | null;
//   eventModels?: FullEventModel[];
//   //
//   rsvpModule?: FullRsvpModule | null;
//   seatingModule?: FullSeatingModule | null;
//   scheduleModule?: FullScheduleModule | null;
//   surveyModule?: FullSurveyModule | null;
//   announcementModule?: FullAnnouncementModule | null;
//   mediaModule?: FullMediaModule | null;
//   ticketModule?: FullTicketModule | null;
//   travelModule?: FullTravelModule | null;
//   gameModule?: FullGameModule | null;
//   budgetModule?: FullBudgetModule | null;
//   //
//   guestGroup?: FullGuestGroup | null;
//   guestGroups?: FullGuestGroup[];
//   //
//   organization?: Partial<Organization> | null;
//   organizations?: Partial<Organization>[];
//   organizationMember?: Partial<OrganizationMember> | null;
//   organizationMembers?: Partial<OrganizationMember>[];
//   organizationInvitation?: Partial<OrganizationInvitation> | null;
//   organizationInvitations?: Partial<OrganizationInvitation>[];
//   notification?: Partial<Notification> | null;
//   notifications?: Partial<Notification>[];
//   unreadCount?: number;
//   totalCount?: number;
//   users?: Partial<User>[];
//   //
// };

//   type ClientPropType = {
//   children?: ReactNode | null;
//   //
//   slug?: string | null;
//   rsvpSlug?: string | null;
//   scheduleSlug?: string | null;
//   seatingSlug?: string | null;
//   ticketSlug?: string | null;
//   mediaSlug?: string | null;
//   travelSlug?: string | null;
//   websiteSlug?: string | null;
//   gameSlug?: string | null;
//   creategamesSlug?: string | null;
//   budgetSlug?: string | null;
//   //
//   homeEventCarouselObject?: {
//     index?: number | null;
//     activeSlides?: {
//       first?: number | null;
//       second?: number | null;
//       third?: number | null;
//     };
//   };
//   //
//   handleTrigger?: () => void;
//   //
//   triggerRef?: RefObject<HTMLButtonElement | null>;
//   actionResponseDataType?: ActionResponseDataType;
//   //
// };
export type ServerPropType = {
  params?: {
    slug?: string | null;
  };
};
// ------------------- COMPONENT ------------------- //
export default function WebEventDetailComponent({
  slug,
}: {
  slug?: string | null;
}) {
  return (
    <div className="whatsapp-doodle-bg    flex flex-col  bg-white dark:bg-black">
      <div className="relative flex flex-1 flex-col   ">
        {/* Blurred gradient orbs backdrop (aligned with home/dashboard style) */}
        <div className="pointer-events-none absolute top-0 flex h-full w-full flex-col">
          {/* Primary center orbs */}
          <div className="sticky top-32 flex w-full justify-center gap-4">
            <div className="h-56 max-w-xl flex-1 bg-blue-300/30 blur-3xl 2xl:max-w-2xl dark:bg-blue-600/30" />
            <div className="h-56 max-w-xl flex-1 bg-purple-300/30 blur-3xl 2xl:max-w-2xl dark:bg-purple-600/30" />
          </div>

          {/* Mid-page side orbs */}
          <div className="mt-[35vh] flex w-full justify-between px-6 md:px-12">
            <div className="h-40 w-40 rounded-full bg-blue-300/25 blur-3xl dark:bg-blue-600/25" />
            <div className="h-40 w-40 rounded-full bg-purple-300/25 blur-3xl dark:bg-purple-600/25" />
          </div>

          {/* Lower ambient orbs */}
          <div className="mt-auto mb-24 flex w-full justify-center gap-8">
            <div className="h-44 w-44 rounded-full bg-blue-300/20 blur-3xl dark:bg-blue-600/25" />
            <div className="h-44 w-44 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-600/25" />
          </div>
        </div>
        <EventDetailImagesComponent />
        <div className="  max-w-8xl px-6">
          <div className="flex flex-col gap-4 px-4 lg:flex-row lg:items-start ">
            <div className="flex flex-col lg:flex-1  ">
              <EventDetailTabComponent
                slug={typeof slug === "string" ? slug : undefined}
              />
            </div>
            <div className="sticky top-20 hidden max-w-72 flex-1 flex-col lg:flex  ">
              <EventDetailTicketComponent />
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full flex-col items-stretch px-4 lg:px-10 2xl:mx-auto  ">
          <EventDetailUpcomingEventsSectionComponent />
        </div>
        <div className="fixed bottom-10 z-10 flex w-full flex-col items-center lg:hidden">
          <button className="2xs:text-3xl w-fit rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-8 py-2 text-center text-2xl font-medium text-white md:px-14 md:py-4">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------- EVENT DETAIL IMAGES COMPONENT ------------------- //
function EventDetailImagesComponent() {
  const imagesData = useMemo(
    () => [
      Images?.asset?.page.background,
      Images?.asset?.page.background,
      Images?.asset?.page.guest,
      Images?.asset?.page.background,
      Images?.asset?.page.guest,
      Images?.asset?.page.background,
      Images?.asset?.page.guest,
      Images?.asset?.page.background,
      Images?.asset?.page.guest,
      Images?.asset?.page.background,
      Images?.asset?.page.background,
      Images?.asset?.page.guest,
      Images?.asset?.page.background,
      Images?.asset?.page.background,
      Images?.asset?.page.guest,
    ],
    []
  );

  const [api, setApi] = useState<CarouselApi>();
  const [selectedScrollSnap, setSelectedScrollSnap] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setSelectedScrollSnap(index);

      document
        ?.querySelector('[data-carousel-state="active"]')
        ?.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full overflow-x-hidden  ">
      {/* ===== MAIN CAROUSEL ===== */}
      <Carousel className="relative w-full overflow-hidden" setApi={setApi}>
        <CarouselContent>
          {imagesData.map((item, index) => (
            <CarouselItem key={index}>
              <div
                className="flex h-72 w-full flex-col overflow-hidden  bg-cover bg-center xl:h-96"
                style={{ backgroundImage: `url(${item})` }}
              >
                <div className="flex flex-1 flex-col justify-between bg-linear-to-r via-white/0 to-black/70 text-white">
                  <div className="flex justify-end text-right">
                    <div className="p-4">
                      <p className="text-2xl font-semibold">January 11</p>
                      <p className="text-sm font-medium">Wednesday</p>
                      <p className="text-sm">Starts at 11:00 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-end text-right">
                    <div className="p-4">
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

        <CarouselPrevious className="left-2 backdrop-blur-md" />
        <CarouselNext className="right-2 backdrop-blur-md" />
      </Carousel>

      {/* ===== MOBILE DOT INDICATORS ===== */}
      <Carousel className="mx-auto mt-4 w-full max-w-44 overflow-hidden lg:hidden">
        <CarouselContent className="flex justify-center gap-2">
          {imagesData.map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-auto"
              onClick={() => api?.scrollTo(index)}
              data-carousel-state={
                selectedScrollSnap === index ? "active" : "inactive"
              }
            >
              <div
                className={cn(
                  "h-2 w-2 rounded-full bg-blue-500 transition-all",
                  {
                    "w-5": selectedScrollSnap === index,
                  }
                )}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* ===== DESKTOP THUMBNAILS ===== */}
      <Carousel className="my-8 px-5 hidden w-full overflow-hidden lg:block max-w-8xl">
        <CarouselContent className="flex gap-2">
          {imagesData.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-auto"
              onClick={() => api?.scrollTo(index)}
            >
              <div
                className={cn(
                  "size-10 rounded bg-cover bg-center transition-all",
                  {
                    "scale-90 ring-2 ring-primary":
                      selectedScrollSnap === index,
                  }
                )}
                style={{ backgroundImage: `url(${item})` }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
// ------------------- EVENT DETAIL TAB COMPONENT ------------------- //
function EventDetailTabComponent({ slug }: { slug?: string }) {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="overview" className="min-h-155">
        <TabsList className="space-x-1 overflow-hidden p-0 *:cursor-pointer *:rounded-full *:bg-white *:text-xs *:data-[state=active]:bg-linear-to-r *:data-[state=active]:from-purple-600 *:data-[state=active]:to-cyan-600 *:data-[state=active]:text-white dark:bg-transparent dark:*:bg-white/5 *:data-[state=inactive]:[&>p]:hidden *:data-[state=inactive]:[&>p]:md:block">
          <TabsTrigger value="overview" className="flex">
            <Home />
            <p className="">About</p>
          </TabsTrigger>
          <TabsTrigger value="location" className="flex">
            <MapPin />
            <p className="">Location</p>
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar />
            <p className="">Schedule</p>
          </TabsTrigger>
          <TabsTrigger value="special">
            <Users />
            <p className="">Special Guest</p>
          </TabsTrigger>
          <TabsTrigger value="faqs">
            <Info />
            <p className="">FAQs</p>
          </TabsTrigger>
          <TabsTrigger value="organizer">
            <User />
            <p className="">Organizer</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <EventDetailOverviewComponent />
        </TabsContent>
        <TabsContent value="location">
          <EventDetailLocationComponent slug={slug} />
        </TabsContent>
        <TabsContent value="schedule">
          <EventDetailScheduleComponent  />
        </TabsContent>
        <TabsContent value="special">
          <EventDetailSpecialGuestComponent />
          {/* <EventDetailPerformersComponent /> */}
        </TabsContent>
        <TabsContent value="faqs">
          <EventDetailFaqsComponent />
        </TabsContent>
        <TabsContent value="organizer">
          <EventDetailOrganizerComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EventDetailFaqsComponent() {
  const faqData = useMemo(
    () => [
      {
        question: "What is this question one?",
        answer: "What you see!",
      },
      {
        question: "What is this question two?",
        answer: "What you see!",
      },
      {
        question: "What is this question three?",
        answer: "What you see!",
      },
    ],
    []
  );
  return (
    <div className="flex flex-col">
      <Accordion
        type="single"
        collapsible
        className=""
        // defaultValue="0"
      >
        {faqData?.map((item, index) => (
          <AccordionItem key={index} value={String(index)}>
            <AccordionTrigger>{item?.question}</AccordionTrigger>
            <AccordionContent>{item?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
function EventDetailOrganizerComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold tracking-tight md:text-xl lg:text-2xl">
          Organizer
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Avatar className="size-20 lg:size-30">
            <AvatarImage
              src={Images?.asset?.user.charlie}
              alt="user"
              className="object-cover"
            />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-xl font-semibold tracking-tight">John Doe</p>
            <p className="text-sm tracking-tight">Event Organizer</p>
          </div>
        </div>
        <p className="line-clamp-5 text-sm tracking-tight">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
          officia dolorum, quia odio aut soluta, quo fugit error distinctio ut,
          qui sint quae. Totam, a modi nulla dolores sunt sit eius natus qui
          excepturi impedit omnis nam sapiente aliquam dicta autem earum tempore
          rem laborum eum commodi numquam magni rerum?
        </p>
        <div className="flex flex-col">
          <p className="font-medium">Contact the Organizer</p>
          <p className="text-sm">
            Have questions about this event? Contact the organizer directly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/organizer/${"john-doe"}`}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow hover:underline dark:bg-blue-900"
          >
            <ExternalLink className="size-4" />
            <span>Open Profile</span>
          </Link>
          <Link
            href={"#"}
            className="flex items-center gap-2 rounded-full bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow hover:underline dark:bg-rose-900"
          >
            <MessageCircle className="size-4" />
            <span>Start Conversation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
type Guest = {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socials?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
};

// ================= HELPERS =================
const getInitialCount = () => {
  if (typeof window === "undefined") return 8;
  if (window.innerWidth >= 1536) return 12; // 2xl+
  if (window.innerWidth >= 1024) return 8; // lg
  return 6; // md & below
};

function EventDetailSpecialGuestComponent() {
  const guests = useMemo<Guest[]>(
    () => [
      {
        id: 1,
        name: "John Doe",
        role: "Keynote Speaker",
        image: Images.asset.user.charlie,
        bio: "Renowned technology innovator with over 15 years of experience in AI and machine learning. John has been at the forefront of digital transformation, helping companies leverage cutting-edge technologies to drive growth and innovation.",
        socials: {
          instagram: "#",
          linkedin: "#",
          twitter: "#",
        },
      },
      {
        id: 2,
        name: "Sarah Clark",
        role: "Product Strategist",
        image: Images.asset.user.clark,
        bio: "Sarah is a globally recognized product strategist who has helped multiple startups scale their products to millions of users worldwide.",
        socials: {
          linkedin: "#",
        },
      },
      {
        id: 3,
        name: "Jeffrey Miles",
        role: "AI Researcher",
        image: Images.asset.user.jeffrey,
        bio: "Jeffrey specializes in applied AI research and has published multiple papers in top international journals.",
        socials: {
          instagram: "#",
          facebook: "#",
        },
      },
      {
        id: 4,
        name: "Emily Watson",
        role: "UX Design Lead",
        image: Images.asset.user.charlie,
        bio: "Emily leads UX teams focused on building inclusive, human-centered digital products used by millions of people worldwide.",
        socials: {
          instagram: "#",
          linkedin: "#",
        },
      },
      {
        id: 5,
        name: "Michael Chen",
        role: "Cloud Solutions Architect",
        image: Images.asset.user.clark,
        bio: "Michael designs and implements scalable cloud infrastructures for enterprise-grade applications across multiple industries.",
        socials: {
          linkedin: "#",
          twitter: "#",
        },
      },
      {
        id: 6,
        name: "Aisha Rahman",
        role: "Cybersecurity Analyst",
        image: Images.asset.user.jeffrey,
        bio: "Aisha helps organizations protect critical systems through advanced threat detection and security architecture design.",
        socials: {
          linkedin: "#",
        },
      },
      {
        id: 7,
        name: "Daniel Rodriguez",
        role: "Startup Mentor",
        image: Images.asset.user.charlie,
        bio: "Daniel mentors early-stage startups, focusing on fundraising strategies, growth planning, and team leadership.",
        socials: {
          instagram: "#",
          linkedin: "#",
          facebook: "#",
        },
      },
      {
        id: 8,
        name: "Priya Nair",
        role: "Data Science Manager",
        image: Images.asset.user.clark,
        bio: "Priya leads data science teams building predictive models and analytics platforms for global enterprises.",
        socials: {
          linkedin: "#",
          twitter: "#",
        },
      },
      {
        id: 9,
        name: "Robert King",
        role: "DevOps Evangelist",
        image: Images.asset.user.jeffrey,
        bio: "Robert advocates modern DevOps practices, helping engineering teams improve deployment speed and reliability.",
        socials: {
          twitter: "#",
        },
      },
      {
        id: 10,
        name: "Sophia Martinez",
        role: "Digital Marketing Specialist",
        image: Images.asset.user.charlie,
        bio: "Sophia specializes in data-driven marketing strategies that improve customer engagement and brand visibility.",
        socials: {
          instagram: "#",
          facebook: "#",
          linkedin: "#",
        },
      },
      {
        id: 11,
        name: "James Patel",
        role: "Blockchain Consultant",
        image: Images.asset.user.clark,
        bio: "James advises enterprises on blockchain adoption, smart contracts, and decentralized application architecture.",
        socials: {
          linkedin: "#",
          twitter: "#",
        },
      },
      {
        id: 12,
        name: "Olivia Brooks",
        role: "AI Ethics Researcher",
        image: Images.asset.user.jeffrey,
        bio: "Olivia researches ethical AI systems, focusing on fairness, transparency, and responsible technology deployment.",
        socials: {
          linkedin: "#",
        },
      },
    ],
    []
  );
  const [initialCount, setInitialCount] = useState(getInitialCount);
  const [showMore, setShowMore] = useState(false);
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null);

  // update count on resize
  useEffect(() => {
    const handleResize = () => {
      setInitialCount(getInitialCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleGuests = showMore ? guests : guests.slice(0, initialCount);

  const toggleShowMore = useCallback(() => {
    setShowMore((prev) => !prev);
  }, []);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section className="flex flex-col gap-6 pb-10">
        <h3 className="text-lg font-semibold md:text-xl">Special Guests</h3>

        {/* ================= GRID ================= */}
        <div
          className={cn(
            "grid gap-4",
            "grid-cols-2",
            "sm:grid-cols-3",
            "lg:grid-cols-4",
            "2xl:grid-cols-6"
          )}
        >
          {visibleGuests.map((guest) => (
            <div
              key={guest.id}
              onClick={() => setActiveGuest(guest)}
              className="
                group relative  aspect-square w-full overflow-hidden
                rounded-xl cursor-pointer
              "
            >
              {/* Image */}
              <Image
                src={guest.image}
                alt={guest.name}
                fill
                sizes="(max-width: 640px) 50vw,
                       (max-width: 1024px) 33vw,
                       (max-width: 1280px) 25vw,
                       16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/90" />

              {/* Content */}
              <div className="absolute bottom-0 w-full p-3 text-center text-white">
                <p className="text-sm font-semibold">{guest.name}</p>
                <p className="text-xs opacity-90 mb-2">{guest.role}</p>

                {/* Social Icons */}
                <div className="flex justify-center gap-3">
                  {guest.socials?.facebook && (
                    <a
                      href={guest.socials.facebook}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-blue-400 transition"
                    >
                      <FaFacebookF className="text-sm" />
                    </a>
                  )}
                  {guest.socials?.twitter && (
                    <a
                      href={guest.socials.twitter}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-sky-400 transition"
                    >
                      <FaTwitter className="text-sm" />
                    </a>
                  )}
                  {guest.socials?.linkedin && (
                    <a
                      href={guest.socials.linkedin}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-blue-500 transition"
                    >
                      <FaLinkedinIn className="text-sm" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= SHOW MORE ================= */}
        {guests.length > initialCount && (
          <div className="flex justify-center">
            <button
              onClick={toggleShowMore}
              className="
                rounded-full border border-black/10 px-5 py-2 text-sm font-medium
                transition hover:bg-black hover:text-white
                dark:border-white/20 dark:hover:bg-white dark:hover:text-black
              "
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </section>

      {/* ================= MODAL ================= */}
      {activeGuest && (
        <GuestModal guest={activeGuest} onClose={() => setActiveGuest(null)} />
      )}
    </>
  );
}

function GuestModal({ guest, onClose }: { guest: Guest; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-sm text-gray-500 hover:text-black dark:hover:text-white"
        >
          ✕
        </button>

        {/* Image */}
        <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full">
          <Image
            src={guest.image}
            alt={guest.name}
            className="h-full w-full object-cover"
            width={100}
            height={100}
            style={{ width: "100%", height: "100%" }}
            unoptimized={false}
            priority={false}
          />
        </div>

        {/* Info */}
        <div className="text-center">
          <h4 className="text-xl font-semibold">{guest.name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {guest.role}
          </p>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <h5 className="mb-1 text-sm font-semibold">Biography</h5>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {guest.bio}
          </p>
        </div>

        {/* Socials */}
        {guest.socials && (
          <div className="mt-6">
            <h5 className="mb-2 text-sm font-semibold">Connect</h5>
            <div className="flex justify-center gap-4">
              {guest.socials.instagram && (
                <SocialIcon href={guest.socials.instagram} icon={FaInstagram} />
              )}
              {guest.socials.facebook && (
                <SocialIcon href={guest.socials.facebook} icon={FaFacebook} />
              )}
              {guest.socials.linkedin && (
                <SocialIcon href={guest.socials.linkedin} icon={FaLinkedin} />
              )}
              {guest.socials.twitter && (
                <SocialIcon href={guest.socials.twitter} icon={FaXTwitter} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  icon: Icon,
}: {
  href: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="rounded-full border border-gray-300 p-2 text-gray-600 transition hover:bg-black hover:text-white dark:border-white/20 dark:text-gray-300"
    >
      <Icon className="h-4 w-4" />
    </Link>
  );
}

// ------------------- EVENT DETAIL PERFORMERS COMPONENT ------------------- //
function EventDetailScheduleComponent( ) {
  const scheduleData = useMemo(
    () => [
      {
        category: "Networking",
        categoryColor: "purple",
        timeRange: "08:00 AM - 09:00 AM",
        name: "Registration & Coffee",
        locationName: "Main Lobby",
      },
      {
        category: "Keynote",
        categoryColor: "blue",
        timeRange: "09:00 AM - 10:00 AM",
        name: "Opening Keynote",
        locationName: "Main Auditorium",
      },
      {
        category: "AI & ML",
        categoryColor: "red",
        timeRange: "10:00 AM - 11:00 AM",
        name: "Learning AI ML",
        locationName: "Main Reception Hall",
      },
    ],
    []
  );

  const conferenceData = useMemo(
    () => [
      {
        eventDate: "Friday 11, June 2025",
        eventDateFilter: "Fri 11, Jun",
        subEvents: [
          {
            category: "Workshop",
            categoryColor: "green",
            timeRange: "08:00 AM - 09:00 AM",
            name: "AI Workshop",
            locationName: "Workshop Room 1",
          },
          {
            category: "Networking",
            categoryColor: "orange",
            timeRange: "10:00 AM - 11:00 AM",
            name: "Networking Lunch",
            locationName: "Dining Hall",
          },
          {
            category: "Showcase",
            categoryColor: "purple",
            timeRange: "08:00 AM - 09:00 AM",
            name: "Registration & Coffee",
            locationName: "Main Lobby",
          },
        ],
      },
      {
        eventDate: "Saturday 12, June 2025",
        eventDateFilter: "Sat 12, Jun",
        subEvents: [
          {
            category: "Networking",
            categoryColor: "purple",
            timeRange: "08:00 AM - 09:00 AM",
            name: "Registration & Coffee",
            locationName: "Main Lobby",
          },
          {
            category: "Keynote",
            categoryColor: "blue",
            timeRange: "09:00 AM - 10:00 AM",
            name: "Opening Keynote",
            locationName: "Main Auditorium",
          },
          {
            category: "AI & ML",
            categoryColor: "red",
            timeRange: "10:00 AM - 11:00 AM",
            name: "Learning AI ML",
            locationName: "Main Reception Hall",
          },
        ],
      },
    ],
    []
  );
  const conferenceFilters = useMemo(
    () => [...conferenceData?.map((item) => item?.eventDateFilter)],
    []
  );
  const [selectedCF, setSelectedCF] = useState(conferenceFilters[0]);
  const conferenceFiltered = useMemo(
    () => conferenceData?.find((item) => item?.eventDateFilter === selectedCF),
    [selectedCF]
  );

  console.log(event)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold">Friday, March 15 2025</p>
          <div className="flex flex-col gap-3">
            {scheduleData?.map((item, index) => {
              return (
                <div key={index} className="flex flex-wrap md:gap-4">
                  <div className="hidden flex-col items-center md:flex">
                    <Clock />
                    <div className="w-0.5 flex-1 rounded-full bg-current"></div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 rounded-md bg-white p-4 shadow dark:bg-blue-900/30">
                    <div className="flex flex-wrap items-center gap-2">
                      <div
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-medium text-white",
                          {
                            "bg-purple-500": item?.categoryColor === "purple",
                            "bg-red-500": item?.categoryColor === "red",
                            "bg-blue-500": item?.categoryColor === "blue",
                          }
                        )}
                      >
                        {item?.category}
                      </div>
                      <p className="text-sm font-medium">{item?.timeRange}</p>
                    </div>
                    <p className="text-lg font-semibold">{item?.name}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <MapPin className="size-4" />
                      <p className="text-sm font-medium">
                        {item?.locationName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2 *:data-[state-conference-filter=active]:bg-blue-500 *:data-[state-conference-filter=active]:text-white *:data-[state-conference-filter=inactive]:bg-white *:data-[state-conference-filter=inactive]:text-black">
          {conferenceFilters?.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => setSelectedCF(item)}
                className="rounded-full px-4 py-2 text-sm font-medium"
                data-state-conference-filter={
                  item === selectedCF ? "active" : "inactive"
                }
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold">
            {conferenceFiltered?.eventDate}
          </p>
          <div className="flex flex-col gap-3">
            {conferenceFiltered?.subEvents?.map((item, index) => {
              return (
                <div key={index} className="flex flex-wrap md:gap-4">
                  <div className="hidden flex-col items-center md:flex">
                    <Clock />
                    <div className="w-0.5 flex-1 rounded-full bg-current"></div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 rounded-md bg-white p-4 shadow dark:bg-blue-900/30">
                    <div className="flex flex-wrap items-center gap-2">
                      <div
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-medium text-white",
                          {
                            "bg-purple-500": item?.categoryColor === "purple",
                            "bg-red-500": item?.categoryColor === "red",
                            "bg-blue-500": item?.categoryColor === "blue",
                            "bg-green-500": item?.categoryColor === "green",
                            "bg-orange-500": item?.categoryColor === "orange",
                          }
                        )}
                      >
                        {item?.category}
                      </div>
                      <p className="text-sm font-medium">{item?.timeRange}</p>
                    </div>
                    <p className="text-lg font-semibold">{item?.name}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <MapPin className="size-4" />
                      <p className="text-sm font-medium">
                        {item?.locationName}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
function EventDetailOverviewComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <EventDetailAboutComponent />
        <div className={cn("flex flex-col gap-4 overflow-hidden", {})}>
          <p className="text-sm tracking-tight">
            Enjoy an evening of smooth jazz performances by local and
            international artists. Dinner packages available.
          </p>
          <div className="flex flex-col gap-1">
            <p className="font-medium">What you will get</p>
            <ul className="flex flex-col">
              <li className="list-inside list-disc">
                Access to all event activities
              </li>
              <li className="list-inside list-disc">
                Networking opportunities with like-minded people
              </li>
              <li className="list-inside list-disc">
                Certificate of participation
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-medium">Who should attend</p>
            <ul className="flex flex-col">
              <li className="list-inside list-disc">
                Enthusiasts and professionals in the field
              </li>
              <li className="list-inside list-disc">
                People looking to expand their network
              </li>
              <li className="list-inside list-disc">
                Anyone interested in learning more about Music
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:hidden">
          <Link
            href={"#"}
            className="flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <ExternalLink className="size-4" />
            Refund Policy
          </Link>
          <Link
            href={"#"}
            className="flex items-center gap-2 text-sm font-medium hover:underline"
          >
            <ExternalLink className="size-4" />
            Terms & Condition
          </Link>
        </div>
      </div>
    </div>
  );
}
function EventDetailAboutComponent() {
  const [follow, setfollow] = useState(true);
  const toggleFollow = useCallback(() => {
    setfollow(!follow);
  }, [follow]);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Summer Music Festival 2025
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-background flex items-center gap-1.5 rounded-full px-2 py-0.5 shadow">
            <Music className="size-3 text-purple-500" />
            <p className="text-xs font-semibold text-purple-500 dark:text-white">
              Music
            </p>
          </div>
          <div className="bg-background flex items-center gap-1.5 rounded-full px-2 py-0.5 shadow">
            <Zap className="size-3 text-orange-500" />
            <p className="text-xs font-semibold text-orange-500 dark:text-white">
              Most Popular
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-8 lg:size-10">
              <AvatarImage
                src={Images?.asset?.user.charlie}
                alt="user"
                className="object-cover"
              />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <Link
              href={`${Routes.web.general.eventsDiscover}/sophia-lee`}
              className="group tracking-tight"
            >
              <span>By </span>
              <span className="font-semibold group-hover:underline">
                John Doe
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={toggleFollow}
              className={cn(
                "bg-background flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-blue-500 shadow dark:bg-blue-500 dark:text-white",
                {
                  hidden: follow,
                }
              )}
            >
              <Plus className="size-4" />
              <p className="text-sm font-semibold">Follow</p>
            </button>
            <button
              onClick={toggleFollow}
              className={cn(
                "bg-background flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-rose-500 shadow dark:bg-rose-500 dark:text-white",
                {
                  hidden: !follow,
                }
              )}
            >
              <Heart className="size-4 fill-current" />
              <p className="text-sm font-semibold">Following</p>
            </button>
          </div>
        </div>
        <div className="hidden flex-col gap-1 lg:gap-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 lg:size-5" />
            <p className="text-sm font-medium lg:text-base">
              Central Park, New York
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 lg:size-5" />
            <p className="text-sm font-medium lg:text-base">
              From 11 Dec, 2025 - To 15 Jan, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// ------------------- EVENT DETAIL TICKET COMPONENT ------------------- //
function EventDetailTicketComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 rounded-md bg-black/5 p-4">
        <p className="">
          <span className="">Starting at </span>
          <span className="text-lg font-semibold">$35.95</span>
        </p>
        <button className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-cyan-600 py-2 font-medium text-white hover:brightness-95">
          <Ticket />
          <span>Get Tickets</span>
        </button>
        <Link
          href={"#"}
          className="flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ExternalLink className="size-4" />
          Refund Policy
        </Link>
        <Link
          href={"#"}
          className="flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ExternalLink className="size-4" />
          Terms & Condition
        </Link>
      </div>
    </div>
  );
}

// ------------------- EVENT DETAIL UPCOMING EVENTS SECTION COMPONENT ------------------- //

// Define HomePageProp type for use in this file
type HomePageProp = {
  heading?: string;
  events?: Partial<MockEventData>[];
  filterButtons?: {
    btnText: string;
    BtnIcon?: React.ElementType;
    btnFilter: string;
    handleClick?: (prop: HomePageProp["handleClickProp"]) => void;
  }[];
  sectionType?: string;
  defaultFilter?: string;
  handleClickProp?: {
    sectionType?: string;
    btnFilter?: string;
  };
  filters?: string;
  event?: Partial<MockEventData>;
};

function EventDetailUpcomingEventsSectionComponent() {
  return (
    <div className="flex flex-col gap-5">
      <HomeFilterSectionOneComponent />
    </div>
  );
}

function HomeFilterSectionOneComponent() {
  const eventData = useMemo(() => {
    return {
      all: getAllEvents(),
    };
  }, []);
  const handleClickFN = useCallback(
    ({
      sectionType,
      btnFilter,
    }: {
      sectionType?: string;
      btnFilter?: string;
    }) => {
      console.log("Clicked Filter:", sectionType, btnFilter);
    },
    []
  );

  const filterButtons = useMemo(
    () => [
      {
        btnText: "All",
        BtnIcon: Calendar,
        btnFilter: "all",
        handleClick: handleClickFN,
      },
      {
        btnText: "Today",
        BtnIcon: Calendar,
        btnFilter: "today",
        handleClick: handleClickFN,
      },
      {
        btnText: "This Week",
        BtnIcon: Calendar,
        btnFilter: "week",
        handleClick: handleClickFN,
      },
      {
        btnText: "This Month",
        BtnIcon: Calendar,
        btnFilter: "month",
        handleClick: handleClickFN,
      },
    ],
    [handleClickFN]
  );

  const [selectedFilter, setSelectedFilter] = useState("all");
  const sectionType = "recommended";

  const events = useMemo(() => {
    const filteredEvents = eventData.all;
    return filteredEvents;
  }, [eventData]);
  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col gap-5">
        <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Recommended For You
        </p>

        <div className="flex flex-wrap gap-2 *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-full *:px-2 *:py-2 *:text-xs *:font-medium *:data-[state-filter-btn=active]:bg-linear-to-r *:data-[state-filter-btn=active]:from-purple-600 *:data-[state-filter-btn=active]:to-cyan-600 *:data-[state-filter-btn=active]:text-white *:data-[state-filter-btn=inactive]:bg-white *:*:nth-1:size-4 md:gap-4 2xl:*:px-4 2xl:*:text-sm dark:*:data-[state-filter-btn=inactive]:bg-white/15 dark:*:data-[state-filter-btn=inactive]:text-white">
          {filterButtons?.map((item, index) => (
            <button
              key={index}
              data-state-filter-btn={
                selectedFilter === item?.btnFilter ? "active" : "inactive"
              }
              onClick={() => {
                setSelectedFilter(item?.btnFilter);
                if (item?.handleClick) {
                  item.handleClick({
                    sectionType: sectionType,
                    btnFilter: item?.btnFilter,
                  });
                }
              }}
              disabled={selectedFilter === item?.btnFilter}
            >
              {item?.BtnIcon && <item.BtnIcon />}
              {item?.btnText}
            </button>
          ))}
        </div>

        {(events?.length ?? 0) > 0 ? (
          <>
            <HomeCarouselComponent events={events} sectionType={sectionType} />
            <div className="flex justify-center">
              <NextLink
                href={Routes.web.general.eventsDiscover}
                className="flex items-center gap-2 rounded-full bg-linear-to-r from-cyan-600 to-purple-600 px-4 py-2 text-sm font-medium text-white"
              >
                <span>See More Events</span>
                <ArrowRightIcon />
              </NextLink>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 p-6">
            <Calendar className="size-10" />
            <p className="text-2xl font-semibold">No Events Found</p>
            <p className="max-w-xs text-center text-sm opacity-60">
              There are no events for this time period.
            </p>
            <NextLink href={Routes.web.general.eventsDiscover}>
              <Button className="rounded-full">Show All Events</Button>
            </NextLink>
          </div>
        )}
      </div>
    </div>
  );
}

function HomeCarouselComponent({ events, sectionType }: HomePageProp) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col gap-4">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", slidesToScroll: "auto" }}
      >
        <CarouselContent>
          {events?.map((event, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] max-w-[80%] md:basis-[48%] md:max-w-[48%] lg:basis-1/4 lg:max-w-1/4 xl:basis-1/5 xl:max-w-1/5"
            >
              <HomeCardComponent event={event} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center gap-2" id={sectionType}>
        {(() => {
          // Responsive: max 5 on mobile, 8 on desktop
          const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;
          const maxDots = isMobile ? 5 : 8;
          return (events ? events.slice(0, maxDots) : []).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`size-2 rounded-full ${
                index === current ? "w-5 bg-blue-500" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              title={`Go to slide ${index + 1}`}
            >
              <span className="sr-only">{`Go to slide ${index + 1}`}</span>
            </button>
          ));
        })()}
      </div>
    </div>
  );
}

function HomeCardComponent(prop?: HomePageProp) {
  const { event } = prop ?? {};

  return (
    <div className="group relative flex flex-1 flex-col lg:p-2">
      <NextLink
        href={`${Routes.web.general.eventsDiscover}/${event?.slug}`}
        className="z-10 flex flex-1 flex-col rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:scale-105 hover:border-pink-400/50 dark:hover:border-purple-400/50"
        style={{ minHeight: "320px" }} // Increased card height
      >
        <div
          className="h-40 overflow-hidden rounded-t-xl bg-cover bg-center lg:h-52" // Increased image height
          style={{
            backgroundImage: `url(${event?.imageUrl ?? Images.asset.page.background})`,
          }}
        />

        <div className="mt-2 flex flex-col gap-1 p-3 text-gray-900 dark:text-white">
          <p className="3xl:text-lg line-clamp-1 text-base font-semibold">
            {event?.name}
          </p>

          {event?.category && (
            <p className="3xl:text-xs text-xs text-gray-600 dark:text-gray-400">
              {event.category}
            </p>
          )}

          <div className="flex items-center gap-1 text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
            <CalendarHeart className="h-3 w-3 text-pink-400 dark:text-pink-500" />
            <p>{event?.startDate}</p>
          </div>

          <div className="flex items-center gap-1 text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
            <MapPin className="h-3 w-3 text-cyan-400 dark:text-cyan-500" />
            <p>{event?.locationMap}</p>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[10px] tracking-tighter text-gray-600 dark:text-gray-400">
              From
            </span>
            <p className="3xl:text-lg bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-base font-bold text-transparent">
              ${event?.price ?? 25.55}
            </p>
          </div>
        </div>
      </NextLink>
    </div>
  );
}

// ------------------- EVENT DETAIL LOCATION COMPONENT ------------------- //
function EventDetailLocationComponent({ slug }: { slug?: string }) {
  const location = {
    name: "Skyline Convention Center",
    address: "Plot 21, Tech Valley Road, Sector 9, Neo City, CA 94088, USA",
    date: "March 22, 2025",
    time: "10:00 AM – 6:00 PM",
    images: [
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1696574710529-dbdf19a13256?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1570841964538-c0406b497337?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.83988672637!2d-0.2664034848794909!3d51.528739805029666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sbd!4v1767353371417!5m2!1sen!2sbd",
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNextImage = () => {
    setActiveIndex((prev) =>
      prev === location.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:bg-black/50 md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          {/* Info */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{location.name}</h2>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {location.address}
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {location.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {location.time}
              </span>
            </div>
          </div>

          {/* IMAGE CAROUSEL */}
          <div
            onClick={handleNextImage}
            className="relative aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl group"
          >
            <img
              src={location.images[activeIndex]}
              alt={`Location image ${activeIndex + 1}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay hint */}
            <div className="absolute inset-0 flex items-end justify-end bg-black/0 p-3 transition group-hover:bg-black/20">
              <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                Click to view next
              </span>
            </div>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {location.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition ${
                    i === activeIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT – MAP */}
        <div className="relative h-[350px] overflow-hidden rounded-2xl border border-white/10 md:h-full">
          <iframe
            src={location.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-white/10 pt-4 text-xs text-gray-500">
        Event Slug: <span className="font-mono">{slug || "-"}</span>
      </div>
    </section>
  );
}
