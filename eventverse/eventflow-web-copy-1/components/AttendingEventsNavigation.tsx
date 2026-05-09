"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarX,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { useState } from "react";
import AttendingEventCard from "./AttendingEventCard";
import { EventFormData } from "./EnhancedEventCreationDialog";

interface AttendingEventsNavigationProps {
  // events: MockAttendingEvent[];
  events: EventFormData[];
  // onEventSelect?: (event: MockAttendingEvent) => void;
  // onEventSelect?: (event: EventFormData) => void;
  onEventSelect?: (event: Partial<EventFormData>) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  eventsPerPage: number;
}

const AttendingEventsNavigation = ({
  events,
  onEventSelect,
  searchTerm,
  onSearchChange,
  currentPage,
  onPageChange,
  eventsPerPage,
}: AttendingEventsNavigationProps) => {
  const [activeTimeTab, setActiveTimeTab] = useState("upcoming");

  const now = new Date();

  // Categorize events by time
  const categorizeEventsByTime = () => {
    const upcoming = events.filter(
      (event) => new Date(String(event.startDate)) > now,
    );
    const ongoing = events.filter((event) => {
      const startDate = new Date(String(event.startDate));
      const endDate = new Date(String(event.endDate || event.startDate));
      return startDate <= now && endDate >= now;
    });
    const past = events.filter(
      (event) => new Date(String(event.endDate || event.startDate)) < now,
    );

    return { upcoming, ongoing, past };
  };

  const { upcoming, ongoing, past } = categorizeEventsByTime();

  // Filter events based on search
  // const filterEvents = (eventList: MockAttendingEvent[]) => {
  const filterEvents = (eventList: EventFormData[]) => {
    return eventList.filter((event) => {
      const matchesSearch =
        event?.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.locations &&
          event.locations[0]?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        event?.eventType?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  };

  const getCurrentEvents = () => {
    switch (activeTimeTab) {
      case "upcoming":
        return filterEvents(upcoming);
      case "ongoing":
        return filterEvents(ongoing);
      case "past":
        return filterEvents(past);
      default:
        return [];
    }
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
    setActiveTimeTab(tab);
    onPageChange(1);
  };

  const PaginationControls = () => {
    if (totalPages <= 1) return null;

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
      {/* Enhanced Navigation Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-foreground text-xl font-semibold">
            Events I&apos;m Attending
          </h3>
          <Badge
            variant="outline"
            className="border-border text-sm"
          >
            {events.length} total
          </Badge>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="bg-card border-border text-foreground placeholder:text-muted-foreground pl-10"
          />
        </div>
      </div>

      {/* Enhanced Time-based Tab Navigation */}
      <Tabs
        value={activeTimeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="bg-card/80 border-border grid h-12 w-full grid-cols-3 border shadow-sm backdrop-blur-sm">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-accent flex items-center gap-2 text-sm font-medium"
          >
            <CalendarDays className="h-4 w-4" />
            <span>Upcoming</span>
            <Badge className="ml-1 bg-blue-500 text-xs text-white">
              {upcoming.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="ongoing"
            className="data-[state=active]:bg-accent flex items-center gap-2 text-sm font-medium"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Ongoing</span>
            <Badge className="ml-1 bg-green-500 text-xs text-white">
              {ongoing.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-accent flex items-center gap-2 text-sm font-medium"
          >
            <CalendarX className="h-4 w-4" />
            <span>Past</span>
            <Badge className="ml-1 bg-gray-500 text-xs text-white">
              {past.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        {["upcoming", "ongoing", "past"].map((tab) => (
          <TabsContent
            key={tab}
            value={tab}
            className="mt-6 space-y-4"
          >
            {paginatedEvents.length === 0 ? (
              <div className="py-12 text-center">
                <Calendar className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                <p className="text-muted-foreground">
                  {currentEvents.length === 0
                    ? `No ${tab} events found`
                    : "No events found matching your search"}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedEvents.map((event) => (
                    <AttendingEventCard
                      key={event.id}
                      event={event}
                      onEventSelect={onEventSelect || (() => {})}
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

export default AttendingEventsNavigation;
