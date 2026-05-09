import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Routes } from "@/lib/lib-routes";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarX,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EnhancedEventCard } from "./EnhancedEventCard";
import { EventViewControls } from "./EventViewControls";
import { MockHostingEvent } from "./mockHostingEvents";

interface HostingEventsNavigationProps {
  events: MockHostingEvent[];
  onEventSelect?: (event: MockHostingEvent) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  eventsPerPage: number;
  onEventStatusChange?: (
    eventId: string,
    newStatus: "draft" | "published",
  ) => void;
  onEditEvent?: (event: MockHostingEvent) => void;
}

const HostingEventsNavigation = ({
  events,
  onEventSelect,
  searchTerm,
  onSearchChange,
  currentPage,
  onPageChange,
  eventsPerPage,
  onEventStatusChange,
  onEditEvent,
}: HostingEventsNavigationProps) => {
  const [activeTimeTab, setActiveTimeTab] = useState("upcoming");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date-asc");

  const now = new Date();

  // Categorize events by time
  const categorizeEventsByTime = () => {
    const upcoming = events.filter((event) => new Date(event.startDate) > now);
    const ongoing = events.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate || event.startDate);
      return startDate <= now && endDate >= now;
    });
    const past = events.filter(
      (event) => new Date(event.endDate || event.startDate) < now,
    );
    const drafts = events.filter((event) => event.status === "draft");

    return { upcoming, ongoing, past, drafts };
  };

  const { upcoming, ongoing, past, drafts } = categorizeEventsByTime();
  // useEffect(() => {
  //   if ((ongoing?.length ?? 0) > 0) {
  //     setActiveTimeTab("ongoing");
  //   }
  // }, [ongoing]);

  // Get available event types
  const availableTypes = Array.from(new Set(events.map((e) => e.eventType)));

  // Filter events based on search and type
  const filterEvents = (eventList: MockHostingEvent[]) => {
    return eventList.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.eventType.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(event.eventType);

      return matchesSearch && matchesType;
    });
  };

  // Sort events
  const sortEvents = (eventList: MockHostingEvent[]) => {
    const sorted = [...eventList];

    switch (sortBy) {
      case "date-asc":
        return sorted.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        );
      case "date-desc":
        return sorted.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
      case "attendees":
        return sorted.sort((a, b) => b.attendees - a.attendees);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  };

  const getCurrentEvents = () => {
    let eventList: MockHostingEvent[] = [];

    switch (activeTimeTab) {
      case "upcoming":
        eventList = upcoming;
        break;
      case "ongoing":
        eventList = ongoing;
        break;
      case "past":
        eventList = past;
        break;
      case "drafts":
        eventList = drafts;
        break;
      default:
        eventList = [];
    }

    return sortEvents(filterEvents(eventList));
  };

  const currentEvents = getCurrentEvents();

  // Pagination logic
  const totalPages = Math.ceil(currentEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const paginatedEvents = currentEvents.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (term: string) => {
    onSearchChange(term);
    onPageChange(1);
  };

  // Reset to page 1 when tab changes
  const handleTabChange = (tab: string) => {
    console.log(tab);
    setActiveTimeTab(tab);
    onPageChange(1);
  };

  const getEventStatus = (event: MockHostingEvent) => {
    if (event.status === "draft") return "draft";
    const now = new Date();
    if (new Date(event.endDate) < now) return "past";
    if (new Date(event.startDate) <= now && new Date(event.endDate) >= now)
      return "ongoing";
    return "upcoming";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "past":
        return <Badge variant="secondary">Completed</Badge>;
      case "ongoing":
        return <Badge className="bg-green-500 hover:bg-green-600">Live</Badge>;
      case "upcoming":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    if (start === end) {
      return start;
    }
    return `${start} - ${end}`;
  };

  const navigate = useRouter();

  const handleViewEvent = (event: MockHostingEvent) => {
    // Create full event data for all events using the rich mock data
    const fullEventData = {
      id: event.id,
      eventName: event.name,
      eventType: event.eventType,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      time: event.time || "12:00 PM",
      locations: event.locations || [
        { name: event.location, address: event.location },
      ],
      selectedModules: event.selectedModules,
      weather: event.weather || {
        temperature: 20,
        condition: "clear",
        icon: "sun",
      },
      conferenceData: event.conferenceData,
      poster: event.poster,
      userId: event.userId || "demo-user-123",
      createdAt: new Date(),
    };

    // sessionStorage.setItem("currentEvent", JSON.stringify(fullEventData));
    // window.location.href = "/";
    navigate?.push(`${Routes.web.auth.dashboardEventDetail}/test`);
  };

  const PaginationControls = () => {
    return (
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, currentEvents.length)} of{" "}
          {currentEvents.length} events
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(i + 1)}
                className="h-8 w-8 p-0"
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <EventViewControls
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
        availableTypes={availableTypes}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Time-based Tab Navigation */}
      <Tabs
        value={activeTimeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-card/80 border-border/40 hidden h-12 w-full grid-cols-4 border shadow-sm backdrop-blur-sm md:grid">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 text-sm font-medium"
          >
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Upcoming</span>
            <Badge
              variant="secondary"
              className="text-xs"
            >
              {upcoming.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="ongoing"
            className="data-[state=active]:bg-success data-[state=active]:text-success-foreground flex items-center gap-2 text-sm font-medium"
          >
            <CalendarCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Today</span>
            <Badge
              variant="secondary"
              className="text-xs"
            >
              {ongoing.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-muted data-[state=active]:text-muted-foreground flex items-center gap-2 text-sm font-medium"
          >
            <CalendarX className="h-4 w-4" />
            <span className="hidden sm:inline">Past</span>
            <Badge
              variant="secondary"
              className="text-xs"
            >
              {past.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="drafts"
            className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground flex items-center gap-2 text-sm font-medium"
          >
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Drafts</span>
            <Badge
              variant="secondary"
              className="text-xs"
            >
              {drafts.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <div className="md:hidden">
          <SelectComponent
            activeTimeTab={activeTimeTab}
            lengthData={{
              upcomingLength: upcoming?.length,
              ongoingLength: ongoing?.length,
              pastLength: past?.length,
              draftsLength: drafts?.length,
            }}
            tabsData={[
              {
                value: "upcoming",
                label: "Upcoming",
                dataLength: upcoming?.length,
              },
              {
                value: "ongoing",
                label: "Ongoing",
                dataLength: ongoing?.length,
              },
              {
                value: "past",
                label: "Past",
                dataLength: past?.length,
              },
              {
                value: "drafts",
                label: "Drafts",
                dataLength: drafts?.length,
              },
            ]}
          />
        </div>

        {/* Tab Content */}
        {["upcoming", "ongoing", "past", "drafts"].map((tab) => (
          <TabsContent
            key={tab}
            value={tab}
            className="mt-6 space-y-4"
          >
            {paginatedEvents.length === 0 ? (
              <div className="py-16 text-center">
                <div className="bg-muted/50 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                  <Calendar className="text-muted-foreground h-10 w-10" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {currentEvents.length === 0
                    ? `No ${tab} events`
                    : "No matches found"}
                </h3>
                <p className="text-muted-foreground">
                  {currentEvents.length === 0
                    ? `You don't have any ${tab} events yet`
                    : "Try adjusting your search or filters"}
                </p>
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                      : "flex flex-col gap-4"
                  }
                >
                  {paginatedEvents.map((event) => (
                    <EnhancedEventCard
                      key={event.id}
                      event={event}
                      onViewEvent={handleViewEvent}
                      onEditEvent={onEditEvent}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
                <PaginationControls />
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HostingEventsNavigation;

function DropdownMenuComponent({
  lengthData,
  activeTimeTab,
}: {
  activeTimeTab?: string;
  lengthData?: {
    upcomingLength?: number;
    ongoingLength?: number;
    pastLength?: number;
    draftsLength?: number;
  };
}) {
  return (
    <TabsList
      className="h-full w-full"
      asChild
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-full"
            variant="outline"
          >
            <Calendar /> Select Events
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <TabsTrigger
            asChild
            value="upcoming"
            className="w-full"
          >
            <DropdownMenuCheckboxItem checked={activeTimeTab === "upcoming"}>
              Upcoming (<span>{lengthData?.upcomingLength}</span>)
            </DropdownMenuCheckboxItem>
          </TabsTrigger>

          <TabsTrigger
            asChild
            value="ongoing"
            className="w-full"
          >
            <DropdownMenuCheckboxItem checked={activeTimeTab === "ongoing"}>
              Ongoing (<span>{lengthData?.ongoingLength}</span>)
            </DropdownMenuCheckboxItem>
          </TabsTrigger>

          <TabsTrigger
            asChild
            value="past"
            className="w-full"
          >
            <DropdownMenuCheckboxItem checked={activeTimeTab === "past"}>
              Past (<span>{lengthData?.pastLength}</span>)
            </DropdownMenuCheckboxItem>
          </TabsTrigger>

          <TabsTrigger
            asChild
            value="drafts"
            className="w-full"
          >
            <DropdownMenuCheckboxItem checked={activeTimeTab === "drafts"}>
              Drafts (<span>{lengthData?.draftsLength}</span>)
            </DropdownMenuCheckboxItem>
          </TabsTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </TabsList>
  );
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectComponent({
  tabsData,
  lengthData,
  activeTimeTab,
}: {
  tabsData?: {
    value?: string;
    label?: string;
    dataLength?: number;
  }[];
  activeTimeTab?: string;
  lengthData?: {
    upcomingLength?: number;
    ongoingLength?: number;
    pastLength?: number;
    draftsLength?: number;
  };
}) {
  return (
    <TabsList asChild>
      <Select value={activeTimeTab}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tab" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {tabsData?.map((item, index) => (
              <TabsTrigger
                key={index}
                asChild
                value={item?.value ?? ""}
              >
                <SelectItem
                  className="justify-start"
                  value={item?.value ?? ""}
                >
                  {item?.label} ({item?.dataLength})
                </SelectItem>
              </TabsTrigger>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TabsList>
  );
}
