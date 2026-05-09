
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import HostingEventsNavigation from "@/components/HostingEventsNavigation";
import { mockHostingEvents, MockHostingEvent } from "@/data/mockHostingEvents";
import { useToast } from "@/hooks/use-toast";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<MockHostingEvent[]>(
    mockHostingEvents.map(event => ({
      ...event,
      isPublic: event.isPublic ?? true
    }))
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const eventsPerPage = 6;

  const handleEventStatusChange = (eventId: string, newStatus: 'draft' | 'published') => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, status: newStatus }
          : event
      )
    );

    const event = events.find(e => e.id === eventId);
    if (event) {
      if (newStatus === 'published') {
        toast({
          title: "Event Published",
          description: `${event.name} is now live and visible to guests.`,
        });
      } else {
        toast({
          title: "Event Unpublished", 
          description: `${event.name} has been moved to drafts. Guests have been notified.`,
          variant: "destructive",
        });
      }
    }
  };

  const handleEventSelect = (event: MockHostingEvent) => {
    // Create comprehensive event data for dashboard
    const fullEventData = {
      id: event.id,
      eventName: event.name,
      eventType: event.eventType || "Event",
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      time: event.time || getDefaultTimeForEventType(event.eventType),
      locations: event.locations || getDefaultLocationsForEvent(event),
      selectedModules: event.selectedModules || ["schedules", "rsvp"],
      weather: event.weather || getDefaultWeatherForEvent(event),
      createdAt: new Date()
    };
    
    // Store the event data and navigate to dashboard
    sessionStorage.setItem('currentEvent', JSON.stringify(fullEventData));
    window.location.href = '/';
  };

  const handleEditEvent = (event: MockHostingEvent) => {
    navigate('/create-event', { state: { editingEvent: event } });
  };

  const getDefaultTimeForEventType = (eventType?: string) => {
    const timeDefaults: Record<string, string> = {
      Wedding: "4:00 PM",
      Corporate: "9:00 AM",
      Cultural: "6:00 PM",
      Charity: "7:00 PM",
      Festival: "11:00 AM",
      Business: "5:30 PM",
      Personal: "2:00 PM",
      Wellness: "8:00 AM",
      Conference: "9:00 AM",
      Holiday: "6:00 PM",
      Educational: "10:00 AM"
    };
    return timeDefaults[eventType || ""] || "12:00 PM";
  };

  const getDefaultLocationsForEvent = (event: MockHostingEvent) => {
    if (event.locations) return event.locations;
    
    // Generate default locations based on event type
    const locationDefaults: Record<string, Array<{ name: string; address: string }>> = {
      Wedding: [
        { name: "Wedding Venue", address: event.location },
        { name: "Reception Hall", address: event.location }
      ],
      Corporate: [
        { name: "Main Conference Room", address: event.location },
        { name: "Networking Area", address: event.location }
      ],
      Cultural: [
        { name: "Main Gallery", address: event.location },
        { name: "VIP Area", address: event.location }
      ],
      Charity: [
        { name: "Main Ballroom", address: event.location },
        { name: "Auction Area", address: event.location }
      ],
      Festival: [
        { name: "Main Festival Area", address: event.location },
        { name: "Food Court", address: event.location }
      ]
    };

    return locationDefaults[event.eventType || ""] || [
      { name: "Main Venue", address: event.location }
    ];
  };

  const getDefaultWeatherForEvent = (event: MockHostingEvent) => {
    if (event.weather) return event.weather;
    
    // Generate default weather based on season/date
    const month = new Date(event.startDate).getMonth();
    const isWinter = month === 11 || month === 0 || month === 1;
    const isSummer = month >= 5 && month <= 7;
    
    return {
      temperature: isWinter ? 5 : isSummer ? 25 : 18,
      condition: "partly cloudy",
      icon: "cloud-sun"
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">My Events</h1>
                <p className="text-purple-100">Manage and view all your events</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/create-event')}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <HostingEventsNavigation
            events={events}
            onEventSelect={handleEventSelect}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            eventsPerPage={eventsPerPage}
            onEventStatusChange={handleEventStatusChange}
            onEditEvent={handleEditEvent}
          />
        </div>
      </div>

    </div>
  );
};

export default Events;
