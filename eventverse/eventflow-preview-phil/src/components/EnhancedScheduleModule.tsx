import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Tag, TrendingUp } from "lucide-react";
import { format, addDays } from "date-fns";
import SessionTrackManager from "./conference/SessionTrackManager";
import MultiSessionScheduler from "./conference/MultiSessionScheduler";
import ConferenceCalendarView from "./conference/ConferenceCalendarView";
import BulkActionsToolbar from "./conference/BulkActionsToolbar";
import HeroStatsCards from "./conference/HeroStatsCards";
import ConferenceHero from "./conference/ConferenceHero";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import { generateHighDensitySchedule } from "@/utils/mockConferenceData";

interface EventProps {
  eventName: string;
  startDate: Date | string;
  endDate?: Date | string;
  locations: Array<{ name: string; address?: string }>;
}

interface EnhancedScheduleModuleProps {
  event: EventProps;
  onBack: () => void;
}

const EnhancedScheduleModule = ({ event, onBack }: EnhancedScheduleModuleProps) => {
  const eventStartDate = typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate;
  const eventEndDate = event.endDate 
    ? (typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate)
    : eventStartDate;

  // Generate all event dates
  const getEventDates = () => {
    const dates: Date[] = [];
    let currentDate = new Date(eventStartDate);
    const endDate = new Date(eventEndDate);
    
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    return dates;
  };

  const eventDates = getEventDates();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(eventStartDate);

  // Sample tracks for demo
  const [tracks, setTracks] = useState<SessionTrack[]>([
    {
      id: "track-1",
      name: "AI & Machine Learning",
      description: "Latest developments in artificial intelligence and machine learning",
      color: "bg-blue-500"
    },
    {
      id: "track-2", 
      name: "Cloud & DevOps",
      description: "Cloud infrastructure and development operations",
      color: "bg-green-500"
    },
    {
      id: "track-3",
      name: "Security & Privacy",
      description: "Cybersecurity and data privacy best practices",
      color: "bg-red-500"
    }
  ]);

  // Mock attendees for high demand sessions
  const mockAttendees = [
    { name: "Alex Johnson", avatar: "AJ" },
    { name: "Sarah Williams", avatar: "SW" },
    { name: "Mike Chen", avatar: "MC" },
    { name: "Emma Davis", avatar: "ED" },
    { name: "John Smith", avatar: "JS" },
    { name: "Lisa Wong", avatar: "LW" },
    { name: "David Kim", avatar: "DK" },
    { name: "Maria Garcia", avatar: "MG" },
  ];

  const getAvatarColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-teal-500 to-teal-600',
    ];
    return colors[index % colors.length];
  };

  // Sample sessions for demo
  const [sessions, setSessions] = useState<EventSession[]>(() => {
    const initialSessions: EventSession[] = [
      {
        id: "session-1",
        title: "Opening Keynote: The Future of AI",
        description: "Exploring the transformative potential of artificial intelligence in the next decade",
        type: "keynote",
        trackId: "track-1",
        speakerNames: ["Dr. Sarah Chen", "Prof. Michael Rodriguez"],
        date: eventStartDate,
        startTime: "09:00",
        endTime: "10:00",
        location: event.locations[0]?.name || "Main Hall",
        capacity: 500,
        registeredCount: 450,
        waitlistCount: 25,
        level: "all",
        tags: ["keynote", "ai", "future"]
      },
      {
        id: "session-2",
        title: "Building Scalable ML Pipelines",
        description: "Hands-on workshop for creating production-ready machine learning pipelines",
        type: "workshop",
        trackId: "track-1",
        speakerNames: ["Alex Johnson"],
        date: eventStartDate,
        startTime: "10:30",
        endTime: "12:00",
        location: "Workshop Room A",
        capacity: 50,
        registeredCount: 48,
        waitlistCount: 12,
        level: "intermediate",
        tags: ["workshop", "ml", "pipelines"]
      },
      {
        id: "session-3",
        title: "Cloud Security Best Practices",
        description: "Essential security practices for cloud-native applications",
        type: "session",
        trackId: "track-3",
        speakerNames: ["Maria Garcia", "David Kim"],
        date: eventStartDate,
        startTime: "10:30",
        endTime: "11:30",
        location: "Conference Room B",
        capacity: 100,
        registeredCount: 75,
        waitlistCount: 0,
        level: "intermediate",
        tags: ["security", "cloud", "best-practices"]
      },
      {
        id: "session-4",
        title: "Coffee Break",
        description: "Networking break with refreshments",
        type: "break",
        speakerNames: [],
        date: eventStartDate,
        startTime: "10:00",
        endTime: "10:30",
        location: "Main Lobby",
        capacity: 500,
        registeredCount: 350,
        waitlistCount: 0,
        level: "all",
        tags: ["break", "networking"]
      },
      {
        id: "session-5",
        title: "DevOps Panel Discussion",
        description: "Industry experts discuss the future of DevOps practices",
        type: "panel",
        trackId: "track-2",
        speakerNames: ["John Smith", "Lisa Wong", "Carlos Rodriguez"],
        date: eventStartDate,
        startTime: "14:00",
        endTime: "15:00",
        location: event.locations[0]?.name || "Main Hall",
        capacity: 200,
        registeredCount: 180,
        waitlistCount: 15,
        level: "intermediate",
        tags: ["panel", "devops", "discussion"]
      }
    ];

    // Add high-density mock sessions for testing
    const highDensitySessions = generateHighDensitySchedule(
      eventStartDate,
      tracks,
      ['Main Hall', 'Room A', 'Room B', 'Room C', 'Room D', 'Workshop 1', 'Workshop 2', 'Workshop 3', 'Auditorium', 'Breakout 1', 'Breakout 2', 'Breakout 3']
    );

    return [...initialSessions, ...highDensitySessions];
  });

  const handleSessionEdit = (session: EventSession) => {
    // Switch to sessions tab and trigger edit
    setActiveTab("sessions");
    // The edit functionality is handled in MultiSessionScheduler
  };

  const handleSessionDelete = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  const handleBulkImport = (newSessions: EventSession[]) => {
    setSessions([...sessions, ...newSessions]);
  };

  const getTrackSessions = (trackId: string) => {
    return sessions.filter(session => session.trackId === trackId);
  };

  const getTotalRegistrations = () => {
    return sessions.reduce((total, session) => total + session.registeredCount, 0);
  };

  const getPopularSessions = () => {
    return sessions
      .filter(session => session.registeredCount / session.capacity > 0.8)
      .sort((a, b) => (b.registeredCount / b.capacity) - (a.registeredCount / a.capacity))
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Conference Schedule</h1>
              <p className="text-muted-foreground text-sm">{event.eventName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
        {/* Hero Section */}
        <ConferenceHero
          eventName={event.eventName}
          startDate={eventStartDate}
          endDate={eventEndDate}
          location={event.locations[0]?.name || 'Multiple Venues'}
          eventDays={eventDates.length}
        />

        {/* Stats Cards */}
        <HeroStatsCards
          conferenceDays={eventDates.length}
          totalSessions={sessions.length}
          totalRegistrations={getTotalRegistrations()}
        />

        {/* Quick Date Navigation & Bulk Actions */}
        <div className="bg-card border-border border rounded-xl p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {eventDates.length > 1 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-muted-foreground mr-2">Quick Navigate:</span>
                {eventDates.map((date, index) => (
                  <Button
                    key={index}
                    variant={format(date, 'yyyy-MM-dd') === format(selectedCalendarDate, 'yyyy-MM-dd') ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedCalendarDate(date);
                      setActiveTab("calendar");
                    }}
                  >
                    Day {index + 1}
                    <span className="ml-1 opacity-70">
                      {format(date, 'MMM d')}
                    </span>
                  </Button>
                ))}
              </div>
            )}
            
            {/* Bulk Actions Toolbar */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Bulk Actions:</span>
              <BulkActionsToolbar
                tracks={tracks}
                eventDates={eventDates}
                locations={event.locations}
                onSessionsImport={handleBulkImport}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview ({sessions.length})</TabsTrigger>
            <TabsTrigger value="tracks">Tracks ({tracks.length})</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Track Overview with Enhanced Visual Design */}
            <div className="bg-gradient-to-br from-primary/5 via-background to-background border-border border rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Tag className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Conference Tracks</h3>
                <Badge variant="secondary" className="ml-2">{tracks.length}</Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tracks.map((track, index) => {
                  const trackSessions = getTrackSessions(track.id);
                  const totalAttendees = trackSessions.reduce((sum, s) => sum + s.registeredCount, 0);
                  const totalCapacity = trackSessions.reduce((sum, s) => sum + s.capacity, 0);
                  const utilizationPercent = totalCapacity > 0 ? (totalAttendees / totalCapacity) * 100 : 0;
                  
                  return (
                    <div 
                      key={track.id} 
                      className="group relative border-l-4 border-l-primary bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {track.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{track.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-2 bg-primary/5">
                          {trackSessions.length}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{totalAttendees} attendees</span>
                          </div>
                          <span className="text-xs font-medium text-primary">{Math.round(utilizationPercent)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 rounded-full"
                            style={{ width: `${Math.min(utilizationPercent, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Popular Sessions with Enhanced Cards */}
            <div className="bg-gradient-to-br from-background to-primary/5 border-border border rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">High Demand Sessions</h3>
                <Badge variant="secondary" className="ml-2">{getPopularSessions().length}</Badge>
              </div>
              <div className="grid gap-4">
                {getPopularSessions().map((session, index) => {
                  const fillPercentage = (session.registeredCount / session.capacity) * 100;
                  const track = tracks.find(t => t.id === session.trackId);
                  
                  return (
                    <div 
                      key={session.id} 
                      className="group relative border-l-4 border-l-orange-500 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {session.title}
                            </h4>
                            {fillPercentage >= 100 && (
                              <Badge variant="destructive" className="animate-pulse">FULL</Badge>
                            )}
                            {fillPercentage >= 90 && fillPercentage < 100 && (
                              <Badge variant="secondary" className="bg-orange-500/10 text-orange-700 dark:text-orange-400">
                                Almost Full
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {track && (
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                {track.name}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">{session.type}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {session.startTime} - {session.endTime} • {session.location}
                            </span>
                          </div>

                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span className="font-medium">
                                  {session.registeredCount}/{session.capacity}
                                </span>
                              </div>
                              {session.waitlistCount > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{session.waitlistCount} waitlist
                                </Badge>
                              )}
                            </div>
                            
                            {/* Attendee Avatars */}
                            <div className="flex items-center gap-2">
                              <div className="flex -space-x-2">
                                {mockAttendees.slice(0, 5).map((attendee, idx) => (
                                  <div
                                    key={idx}
                                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(idx)} flex items-center justify-center text-xs font-semibold text-white border-2 border-background cursor-pointer hover:scale-110 transition-transform`}
                                    title={attendee.name}
                                  >
                                    {attendee.avatar}
                                  </div>
                                ))}
                                {session.registeredCount > 5 && (
                                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground border-2 border-background">
                                    +{session.registeredCount - 5}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div 
                            className="relative w-20 h-20 rounded-full flex items-center justify-center"
                            style={{
                              background: `conic-gradient(hsl(var(--primary)) ${fillPercentage * 3.6}deg, hsl(var(--muted)) 0deg)`
                            }}
                          >
                            <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
                              <span className="text-lg font-bold text-foreground">{Math.round(fillPercentage)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracks">
            <div className="bg-card border-border border rounded-xl p-6">
              <SessionTrackManager 
                tracks={tracks} 
                sessions={sessions}
                onTracksChange={setTracks} 
              />
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <MultiSessionScheduler
              sessions={sessions}
              tracks={tracks}
              eventDates={eventDates}
              locations={event.locations}
              onSessionsChange={setSessions}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <ConferenceCalendarView
              sessions={sessions}
              tracks={tracks}
              eventDates={eventDates}
              selectedDate={selectedCalendarDate}
              onSessionEdit={handleSessionEdit}
              onSessionDelete={handleSessionDelete}
              onDateChange={setSelectedCalendarDate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedScheduleModule;
