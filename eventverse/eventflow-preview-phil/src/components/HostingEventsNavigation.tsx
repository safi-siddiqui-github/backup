import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  Calendar,
  Clock,
  CheckCircle,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  MapPin,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Thermometer
} from "lucide-react";
import { MockHostingEvent } from "@/data/mockHostingEvents";

interface HostingEventsNavigationProps {
  events: MockHostingEvent[];
  onEventSelect?: (event: MockHostingEvent) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  eventsPerPage: number;
  onEventStatusChange?: (eventId: string, newStatus: 'draft' | 'published') => void;
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
  onEditEvent
}: HostingEventsNavigationProps) => {
  const [activeTimeTab, setActiveTimeTab] = useState("upcoming");
  const [selectedFormat, setSelectedFormat] = useState("all");

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
    const drafts = events.filter(event => event.status === 'draft');
    
    return { upcoming, ongoing, past, drafts };
  };

  const { upcoming, ongoing, past, drafts } = categorizeEventsByTime();

  // Filter events based on search
  const filterEvents = (eventList: MockHostingEvent[]) => {
    return eventList.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.eventType.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  };

  const getCurrentEvents = () => {
    switch (activeTimeTab) {
      case "upcoming": return filterEvents(upcoming);
      case "ongoing": return filterEvents(ongoing);
      case "past": return filterEvents(past);
      case "drafts": return filterEvents(drafts);
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

  const getEventStatus = (event: MockHostingEvent) => {
    if (event.status === 'draft') return 'draft';
    const now = new Date();
    if (new Date(event.endDate) < now) return 'past';
    if (new Date(event.startDate) <= now && new Date(event.endDate) >= now) return 'ongoing';
    return 'upcoming';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'past':
        return <Badge variant="secondary">Completed</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-500 hover:bg-green-600">Live</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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
      locations: event.locations || [{ name: event.location, address: event.location }],
      selectedModules: event.selectedModules,
      weather: event.weather || { temperature: 20, condition: "clear", icon: "sun" },
      conferenceData: event.conferenceData,
      createdAt: new Date()
    };
    
    sessionStorage.setItem('currentEvent', JSON.stringify(fullEventData));
    window.location.href = '/';
  };

  const EventCard = ({ event }: { event: MockHostingEvent }) => {
    const status = getEventStatus(event);
    const isConference = event.eventType === 'Conference';
    
    return (
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <CardTitle className="text-lg">{event.name}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {event.eventType}
                </Badge>
                {event.isDemo && (
                  <Badge className="bg-purple-500 text-white text-xs">
                    Demo
                  </Badge>
                )}
                {isConference && event.conferenceData && (
                  <Badge className="bg-blue-500 text-white text-xs">
                    {event.conferenceData.sessions?.length || 0} Sessions
                  </Badge>
                )}
              </div>
              <CardDescription className="mt-1">{event.description}</CardDescription>
            </div>
            {getStatusBadge(status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDateRange(event.startDate, event.endDate)}
              {event.time && <span className="ml-2">at {event.time}</span>}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {event.locations?.[0]?.name || event.location}
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {event.attendees} attendees
              </div>
              {event.weather && (
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                  <CloudSun className="w-3 h-3 text-blue-600" />
                  <span className="text-blue-800 text-xs">{event.weather.temperature}°C</span>
                </div>
              )}
            </div>
            {isConference && event.conferenceData && (
              <div className="flex flex-wrap gap-1 pt-2">
                {event.conferenceData.tracks.slice(0, 3).map((track) => (
                  <Badge key={track.id} variant="outline" className="text-xs" style={{ borderColor: track.color }}>
                    {track.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleViewEvent(event)}
            >
              Open Dashboard
            </Button>
            {!event.isDemo && (
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Events I'm Hosting
          </h3>
          <Badge variant="outline" className="text-sm">
            {events.length} total
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Enhanced Time-based Tab Navigation */}
      <Tabs value={activeTimeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-sm border h-12">
          <TabsTrigger 
            value="upcoming" 
            className="flex items-center gap-2 text-sm font-medium"
          >
            <CalendarDays className="w-4 h-4" />
            <span>Upcoming</span>
            <Badge className="bg-blue-500 text-white text-xs ml-1">
              {upcoming.length}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="ongoing" 
            className="flex items-center gap-2 text-sm font-medium"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Ongoing</span>
            <Badge className="bg-green-500 text-white text-xs ml-1">
              {ongoing.length}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="past" 
            className="flex items-center gap-2 text-sm font-medium"
          >
            <CalendarX className="w-4 h-4" />
            <span>Past</span>
            <Badge className="bg-gray-500 text-white text-xs ml-1">
              {past.length}
            </Badge>
          </TabsTrigger>

          <TabsTrigger 
            value="drafts" 
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Clock className="w-4 h-4" />
            <span>Drafts</span>
            <Badge className="bg-orange-500 text-white text-xs ml-1">
              {drafts.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        {["upcoming", "ongoing", "past", "drafts"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4 mt-6">
            {paginatedEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {currentEvents.length === 0 
                    ? `No ${tab} events found`
                    : "No events found matching your search"
                  }
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
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
