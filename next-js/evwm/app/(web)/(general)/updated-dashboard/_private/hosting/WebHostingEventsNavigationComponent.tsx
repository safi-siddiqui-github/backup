import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
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
import { Input } from "@/shadcn/ui/input";
import { Filter, Grid3x3, List, Search, SortAsc } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WebHostingEventCardComponent } from "./WebHostingEventCardComponent";
import { MockHostingEvent } from "./MockHostingEvents";

type HostingEventsNavigationProps = {
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
};

export default function WebHostingEventsNavigationComponent({
  events,
  onEventSelect,
  searchTerm,
  onSearchChange,
  currentPage,
  onPageChange,
  eventsPerPage,
  onEventStatusChange,
  onEditEvent,
}: HostingEventsNavigationProps) {
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

 
    navigate?.push(`${Routes.web.auth.dashboard}/test`);
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
                    <WebHostingEventCardComponent
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

type SelectComponentProps = {
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
};

function SelectComponent({
  tabsData,
  lengthData,
  activeTimeTab,
}: SelectComponentProps) {
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

type EventViewControlsProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
  availableTypes: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
};

  const EventViewControls = ({
	searchTerm,
	onSearchChange,
	viewMode,
	onViewModeChange,
	selectedTypes,
	onTypesChange,
	availableTypes,
	sortBy,
	onSortChange,
}: EventViewControlsProps) => {
	const handleTypeToggle = (type: string) => {
		if (selectedTypes.includes(type)) {
			onTypesChange(selectedTypes.filter((t) => t !== type));
		} else {
			onTypesChange([...selectedTypes, type]);
		}
	};

	const activeFiltersCount = selectedTypes.length;

	return (
		<div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
			{/* Search */}
			<div className="relative flex-1">
				<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
				<Input
					placeholder="Search events by name, type, location..."
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					className="bg-card border-border/40 pl-10"
				/>
			</div>

			{/* Filters */}
			<div className="hidden md:flex gap-2 ">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="border-border/40 gap-2"
						>
							<Filter className="h-4 w-4" />
							Types
							{activeFiltersCount > 0 && (
								<Badge
									variant="secondary"
									className="flex h-5 w-5 items-center justify-center p-0"
								>
									{activeFiltersCount}
								</Badge>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{availableTypes.map((type) => (
							<DropdownMenuCheckboxItem
								key={type}
								checked={selectedTypes.includes(type)}
								onCheckedChange={() => handleTypeToggle(type)}
							>
								{type}
							</DropdownMenuCheckboxItem>
						))}
						{selectedTypes.length > 0 && (
							<>
								<DropdownMenuSeparator />
								<Button
									variant="ghost"
									size="sm"
									onClick={() => onTypesChange([])}
									className="w-full"
								>
									Clear All
								</Button>
							</>
						)}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* Sort */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="border-border/40 gap-2"
						>
							<SortAsc className="h-4 w-4" />
							Sort
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Sort By</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuCheckboxItem
							checked={sortBy === "date-asc"}
							onCheckedChange={() => onSortChange("date-asc")}
						>
							Date (Earliest)
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={sortBy === "date-desc"}
							onCheckedChange={() => onSortChange("date-desc")}
						>
							Date (Latest)
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={sortBy === "attendees"}
							onCheckedChange={() => onSortChange("attendees")}
						>
							Attendees (Most)
						</DropdownMenuCheckboxItem>
						<DropdownMenuCheckboxItem
							checked={sortBy === "name"}
							onCheckedChange={() => onSortChange("name")}
						>
							Name (A-Z)
						</DropdownMenuCheckboxItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{/* View Mode Toggle */}
				<div className="border-border/40 flex overflow-hidden rounded-md border">
					<Button
						variant={viewMode === "grid" ? "secondary" : "ghost"}
						size="sm"
						onClick={() => onViewModeChange("grid")}
						className="border-border/40 rounded-none border-r"
					>
						<Grid3x3 className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "list" ? "secondary" : "ghost"}
						size="sm"
						onClick={() => onViewModeChange("list")}
						className="rounded-none"
					>
						<List className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
