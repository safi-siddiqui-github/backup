
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Calendar,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import AttendingEventCard from "./AttendingEventCard";
import { MockAttendingEvent } from "@/data/mockAttendingEvents";

interface AttendingEventsNavigationProps {
  events: MockAttendingEvent[];
  onEventSelect?: (event: MockAttendingEvent) => void;
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
  eventsPerPage
}: AttendingEventsNavigationProps) => {
  const [activeTimeTab, setActiveTimeTab] = useState("upcoming");

  const now = new Date();

  // Categorize events by time
  const categorizeEventsByTime = () => {
    const upcoming = events.filter(event => new Date(event.startDate) > now);
    const ongoing = events.filter(event => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate || event.startDate);
      return startDate <= now && endDate >= now;
    });
    const past = events.filter(event => new Date(event.endDate || event.startDate) < now);
    
    return { upcoming, ongoing, past };
  };

  const { upcoming, ongoing, past } = categorizeEventsByTime();

  // Filter events based on search
  const filterEvents = (eventList: MockAttendingEvent[]) => {
    return eventList.filter(event => {
      const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.locations[0].name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.eventType.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  };

  const getCurrentEvents = () => {
    switch (activeTimeTab) {
      case "upcoming": return filterEvents(upcoming);
      case "ongoing": return filterEvents(ongoing);
      case "past": return filterEvents(past);
      default: return [];
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
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, currentEvents.length)} of {currentEvents.length} events
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(i + 1)}
                className="w-8 h-8 p-0"
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
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Navigation Header */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center mb-8">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold text-foreground">
            Events I'm Attending
          </h3>
          <Badge variant="outline" className="text-sm border-border bg-primary/10 text-primary">
            {events.length} total
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground h-11 rounded-xl"
          />
        </div>
      </div>

      {/* Enhanced Time-based Tab Navigation */}
      <Tabs value={activeTimeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card backdrop-blur-sm shadow-md border border-border h-14 p-1 rounded-xl">
          <TabsTrigger 
            value="upcoming" 
            className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Upcoming</span>
            <Badge className="bg-primary/20 text-primary text-xs ml-1 data-[state=active]:bg-white/20 data-[state=active]:text-white">
              {upcoming.length}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="ongoing" 
            className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-success data-[state=active]:text-success-foreground rounded-lg transition-all"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Ongoing</span>
            <Badge className="bg-success/20 text-success text-xs ml-1 data-[state=active]:bg-white/20 data-[state=active]:text-white">
              {ongoing.length}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="past" 
            className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-muted data-[state=active]:text-foreground rounded-lg transition-all"
          >
            <CalendarX className="w-4 h-4" />
            <span>Past</span>
            <Badge className="bg-muted text-muted-foreground text-xs ml-1">
              {past.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        {["upcoming", "ongoing", "past"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-6 mt-8">
            {paginatedEvents.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Calendar className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">
                  {currentEvents.length === 0 
                    ? `No ${tab} events found`
                    : "No events found matching your search"
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
