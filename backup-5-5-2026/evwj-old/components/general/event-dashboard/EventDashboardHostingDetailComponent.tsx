"use client";

import AnnouncementComponent from "@/components/general/announcement/AnnouncementComponent";
import TravelAccomodation from "@/components/general/travel-accomodation/travel-accomodation";
import PreviewRsvpTabComponent from "@/components/preview/rsvp/PreviewRsvpComponent";
import ModuleSeating from "@/components/preview/seating/ModuleSeating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ClientPropType, MockEventData } from "@/type";
import {
  Armchair,
  CalendarClock,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Gamepad2,
  Globe,
  ImagesIcon,
  LayoutDashboard,
  Megaphone,
  PanelLeftClose,
  PanelLeftOpen,
  Plane,
  Rocket,
  ScrollText,
  Ticket,
  TriangleAlert,
  Tv,
  UserCheck,
  Wallet,
} from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import BudgetComponent from "../budget/BudgetComponent";
import GamesActivitiesLandingComponent from "../games/GamesActivitiesLandingComponent";
import MarketingCampaignsComponent from "../marketing/MarketingCampaignsComponent";
import { MediaCenterTabComponent } from "../media-center";
import SchedulePageComponent from "../schedule-page/schedule-page";
import SurveyPageComponent from "../survey/core/SurveyComponent";
import { TicketingComponent } from "../ticket";
import WebsiteBuilderComponent from "../website-builder/website-builder";
import EventDashboardHostingDetailAboutComponent from "./EventDashboardHostingDetailAboutComponent";
import EventDashboardHostingDetailImagesComponent from "./EventDashboardHostingDetailImagesComponent";
import AnalyticsAndReportingComponent from "@/app/(web)/(test)/analytics/_private/analytics-reporting";
import AnalyticsAndReporting from "@/app/(web)/(test)/analytics/page";

const tabsData = [
  {
    key: "about",
    name: "About",
    BtnIcon: ScrollText,
    componentItem: EventDashboardHostingDetailAboutComponent,
  },
  {
    key: "rsvp",
    name: "Rsvp",
    BtnIcon: UserCheck,
    componentItem: PreviewRsvpTabComponent,
  },
  {
    key: "seating",
    name: "Seating",
    BtnIcon: Armchair,
    componentItem: ModuleSeating,
  },
  {
    key: "schedule",
    name: "Schedule",
    BtnIcon: CalendarClock,
    componentItem: SchedulePageComponent,
  },
  {
    key: "budget",
    name: "Budget",
    BtnIcon: Wallet,
    componentItem: BudgetComponent,
  },
  {
    key: "announcement",
    name: "Announcement",
    BtnIcon: Megaphone,
    componentItem: AnnouncementComponent,
  },
  {
    key: "ticket",
    name: "Ticket",
    BtnIcon: Ticket,
    componentItem: TicketingComponent,
  },
  {
    key: "survey",
    name: "Survey",
    BtnIcon: ClipboardList,
    componentItem: SurveyPageComponent,
  },
  {
    key: "travel",
    name: "Travel",
    BtnIcon: Plane,
    componentItem: TravelAccomodation,
  },
  {
    key: "website",
    name: "Website",
    BtnIcon: Globe,
    componentItem: WebsiteBuilderComponent,
  },
  {
    key: "media",
    name: "Media",
    BtnIcon: ImagesIcon,
    componentItem: MediaCenterTabComponent,
  },
  {
    key: "game",
    name: "Games",
    BtnIcon: Gamepad2,
    componentItem: GamesActivitiesLandingComponent,
  },
  {
    key: "marketing",
    name: "Marketing",
    BtnIcon: Tv,
    componentItem: MarketingCampaignsComponent,
  },
  {
    key: "analytics",
    name: "Analytics",
    BtnIcon: ScrollText,
    componentItem: AnalyticsAndReporting,
  }

];

const TabsContentComponent = memo(({ slug }: { slug?: string }) =>
  tabsData?.map((item, index) => (
    <TabsContent
      key={index}
      value={item?.key}
      className="flex flex-col"
    >
      {item?.componentItem &&
        (item.key === "about" ? (
          <item.componentItem slug={slug} />
        ) : (
          <item.componentItem />
        ))}
    </TabsContent>
  )),
);

const showStatusData = [
  {
    name: "Event has a name",
    type: "success",
  },
  {
    name: "Configure RSVP settings",
    type: "warning",
  },
  {
    name: "Event date is set",
    type: "success",
  },
  {
    name: "Create a welcome announcement",
    type: "warning",
  },
];

const ShowStatusButtonsComponent = memo(() =>
  showStatusData?.map((item, index) => {
    const IconComponent = item?.type === "success" ? Check : TriangleAlert;
    const btnStatus = item?.type === "success" ? "active" : "inactive";
    return (
      <button
        key={index}
        data-status-button={btnStatus}
      >
        <IconComponent />
        <span>{item?.name}</span>
      </button>
    );
  }),
);

export default function EventDashboardHostingDetailComponent({
  slug,
}: ClientPropType) {
  const [eventData, setEventData] = useState<Partial<MockEventData>>({
    category: "Category",
    name: "Name",
  });
  useEffect(() => {
    setEventData({
      category: "Conference",
      name: "Summer Music Festival",
    });
  }, []);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("about");
  const tabButtonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleTabClick = useCallback((tabKey: string, buttonElement: HTMLButtonElement | null) => {
    setSelectedTab(tabKey);
    // Scroll the clicked button into view
    if (buttonElement) {
      setTimeout(() => {
        buttonElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 0);
    }
  }, []);

  const TabsButtons = memo(() =>
    tabsData?.map((item, index) => {
      const Icon = item.BtnIcon;
      const isActive = selectedTab === item?.key;
      return (
        <button
          key={index}
          ref={(el) => {
            tabButtonRefs.current[item.key] = el;
          }}
          onClick={(e) => {
            const button = e.currentTarget;
            handleTabClick(item?.key, button);
          }}
          data-state-tab={isActive ? "active" : "inactive"}
        >
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item?.name}</span>
        </button>
      );
    }),
  );

  // Scroll active tab into view when selectedTab changes
  useEffect(() => {
    if (selectedTab && tabButtonRefs.current[selectedTab]) {
      const button = tabButtonRefs.current[selectedTab];
      if (button) {
        setTimeout(() => {
          button.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }, 100);
      }
    }
  }, [selectedTab]);

  // Scrollable Tab Bar Component with arrows
  const ScrollableTabBar = memo(() => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = useCallback(() => {
      if (!scrollContainerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }, []);

    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // Initial check
      checkScrollability();

      // Check on scroll
      container.addEventListener("scroll", checkScrollability);
      
      // Check on resize
      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        resizeObserver.disconnect();
      };
    }, [checkScrollability]);

    const scrollLeft = useCallback(() => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }, []);

    const scrollRight = useCallback(() => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }, []);

    return (
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 dark:bg-black/95 dark:border-gray-800">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-purple-700 shadow-sm dark:bg-white/10 dark:text-cyan-200 flex-shrink-0">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0">
            Modules
          </p>
        </div>
        <div className="relative flex items-center">
          {/* Left Arrow with gradient fade */}
          {canScrollLeft && (
            <div className="absolute left-0 z-30 flex h-full w-16 items-center">
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent dark:from-black/95 dark:via-black/70 pointer-events-none" />
              <button
                onClick={scrollLeft}
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer transition-all pointer-events-auto"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-slate-300" />
              </button>
            </div>
          )}
          
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className={`flex items-center gap-2 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth ${
              canScrollLeft ? "pl-16" : "pl-4"
            } ${canScrollRight ? "pr-16" : "pr-4"}`}
          >
            <div className="flex items-center gap-2 text-xs *:flex *:flex-shrink-0 *:cursor-pointer *:flex-row *:items-center *:gap-1.5 *:rounded-full *:px-3 *:py-2 *:text-xs *:font-semibold *:text-gray-700 *:whitespace-nowrap *:transition-all *:data-[state-tab=active]:bg-linear-to-r *:data-[state-tab=active]:from-purple-600 *:data-[state-tab=active]:to-cyan-600 *:data-[state-tab=active]:text-white *:data-[state-tab=active]:shadow-lg *:data-[state-tab=inactive]:bg-gray-100 *:data-[state-tab=inactive]:shadow-sm *:data-[state-tab=inactive]:hover:bg-gray-200 dark:*:text-slate-300 dark:*:data-[state-tab=inactive]:bg-white/10 dark:*:data-[state-tab=inactive]:hover:bg-white/20 *:*:nth-1:size-4">
              <TabsButtons />
            </div>
          </div>

          {/* Right Arrow with gradient fade */}
          {canScrollRight && (
            <div className="absolute right-0 z-30 flex h-full w-16 items-center justify-end">
              <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/70 to-transparent dark:from-black/95 dark:via-black/70 pointer-events-none" />
              <button
                onClick={scrollRight}
                className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer transition-all pointer-events-auto"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-4 w-4 text-gray-700 dark:text-slate-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  });
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col">
          <EventDashboardHostingDetailImagesComponent slug={slug || undefined} />
        </div>
        <div className="relative flex flex-col">
          <div className="z-10 flex flex-col lg:flex-row">
            <div className="flex flex-col lg:w-fit">
              <div className="flex flex-col lg:hidden">
                {/* Mobile/Tablet: Horizontal Scrollable Tab Bar */}
                <ScrollableTabBar />
              </div>
              <div className="hidden flex-col lg:flex">
                <div
                  className="flex flex-col gap-4 p-4 data-[state-sidebar-open=active]:w-full data-[state-sidebar-open=inactive]:items-center data-[state-sidebar-open=inactive]:*:nth-1:*:nth-1:hidden data-[state-sidebar-open=inactive]:*:nth-2:*:*:nth-2:hidden lg:hover:data-[state-sidebar-open=inactive]:w-full lg:hover:data-[state-sidebar-open=inactive]:items-stretch lg:hover:data-[state-sidebar-open=inactive]:*:nth-1:*:nth-1:block lg:hover:data-[state-sidebar-open=inactive]:*:nth-2:*:*:nth-2:block"
                  data-state-sidebar-open={sidebarOpen ? "active" : "inactive"}
                >
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="text-lg font-medium">MENU</p>
                    <button
                      className="cursor-pointer rounded-sm bg-white p-1.5 shadow dark:bg-white/20"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                      {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 text-sm tracking-tight *:flex *:cursor-pointer *:items-center *:gap-2 *:rounded-full *:px-4 *:py-1.5 *:text-xs *:font-semibold *:text-gray-700 *:data-[state-tab=active]:bg-linear-to-r *:data-[state-tab=active]:from-purple-600 *:data-[state-tab=active]:to-cyan-600 *:data-[state-tab=active]:text-white *:data-[state-tab=active]:shadow-lg *:data-[state-tab=inactive]:hover:underline *:*:nth-1:size-5 dark:*:text-slate-300">
                    <TabsButtons />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden lg:flex-1">
              <div className="flex w-full flex-col overflow-auto p-4">
                <Tabs value={selectedTab}>
                  <TabsContentComponent slug={slug || undefined} />
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EventDashboardGoLiveFooter() {
  const showStatusRef = useRef<HTMLButtonElement | null>(null);
  const handleShowStatusToggle = useCallback(() => {
    showStatusRef?.current?.click();
  }, []);

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40">
      <div className="flex flex-col border-t bg-white/95 p-2 shadow-2xl backdrop-blur-md md:px-4 dark:bg-black/90">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs tracking-tighter">GO Live Status</p>
            <div className="flex size-12 flex-col rounded-full bg-conic from-green-500 to-white to-80% p-2 dark:to-black">
              <div className="flex flex-1 flex-col items-center justify-center rounded-full bg-white text-xs font-medium dark:bg-black">
                <p className="">60 %</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 *:items-center *:gap-2 *:rounded-md *:px-4 *:py-2 *:*:nth-1:size-4 *:*:nth-2:text-xs *:*:nth-3:size-4">
            <button
              className="flex bg-black/5 dark:bg-white/15"
              onClick={handleShowStatusToggle}
            >
              <CheckCircle />
              <span>View Checklist</span>
              <ChevronDown />
              {/* {showStatus ? <ChevronUp /> : <ChevronDown />} */}
            </button>
            <button className="hidden bg-blue-500 text-white md:flex">
              <Rocket />
              <span>Publish</span>
            </button>
          </div>
        </div>
        <Accordion
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger
              ref={showStatusRef}
              className="hidden"
            />
            {/* <AccordionContent className="flex flex-wrap gap-2 text-xs *:flex *:flex-1 *:cursor-pointer *:flex-col *:items-center *:gap-1 *:rounded *:px-3 *:py-2 *:data-[state-tab=active]:bg-blue-500 *:data-[state-tab=active]:font-medium *:data-[state-tab=active]:text-white *:data-[state-tab=inactive]:bg-black/5 *:data-[state-tab=inactive]:shadow-sm *:*:nth-1:size-4 dark:*:data-[state-tab=inactive]:bg-white/10"> */}
            <AccordionContent className="mt-2 flex flex-wrap gap-2 *:flex *:items-center *:gap-2 *:rounded-md *:px-2 *:py-1 *:text-xs *:data-[status-button=active]:bg-green-100 *:data-[status-button=inactive]:bg-red-100 *:*:nth-1:size-4 *:data-[status-button=active]:*:nth-1:text-green-500 *:data-[status-button=inactive]:*:nth-1:text-red-500 dark:*:data-[status-button=active]:bg-green-100/25 dark:*:data-[status-button=inactive]:bg-red-100/25">
              <ShowStatusButtonsComponent />
              <ShowStatusButtonsComponent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
