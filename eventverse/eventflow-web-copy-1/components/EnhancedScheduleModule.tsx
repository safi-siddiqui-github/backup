"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import { addDays } from "date-fns";
import { ArrowLeft, Calendar, Clock, Users } from "lucide-react";
import { useState } from "react";
import ConferenceCalendarView from "./conference/ConferenceCalendarView";
import MultiSessionScheduler from "./conference/MultiSessionScheduler";
import SessionBulkOperations from "./conference/SessionBulkOperations";
import SessionTrackManager from "./conference/SessionTrackManager";

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

const EnhancedScheduleModule = ({
  event,
  onBack,
}: EnhancedScheduleModuleProps) => {
  const eventStartDate =
    typeof event.startDate === "string"
      ? new Date(event.startDate)
      : event.startDate;
  const eventEndDate = event.endDate
    ? typeof event.endDate === "string"
      ? new Date(event.endDate)
      : event.endDate
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
  const [selectedCalendarDate, setSelectedCalendarDate] =
    useState<Date>(eventStartDate);

  // Sample tracks for demo
  const [tracks, setTracks] = useState<SessionTrack[]>([
    {
      id: "track-1",
      name: "AI & Machine Learning",
      description:
        "Latest developments in artificial intelligence and machine learning",
      color: "bg-blue-500",
    },
    {
      id: "track-2",
      name: "Cloud & DevOps",
      description: "Cloud infrastructure and development operations",
      color: "bg-green-500",
    },
    {
      id: "track-3",
      name: "Security & Privacy",
      description: "Cybersecurity and data privacy best practices",
      color: "bg-red-500",
    },
  ]);

  // Sample sessions for demo
  const [sessions, setSessions] = useState<EventSession[]>([
    {
      id: "session-1",
      title: "Opening Keynote: The Future of AI",
      description:
        "Exploring the transformative potential of artificial intelligence in the next decade",
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
      tags: ["keynote", "ai", "future"],
    },
    {
      id: "session-2",
      title: "Building Scalable ML Pipelines",
      description:
        "Hands-on workshop for creating production-ready machine learning pipelines",
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
      tags: ["workshop", "ml", "pipelines"],
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
      tags: ["security", "cloud", "best-practices"],
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
      tags: ["break", "networking"],
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
      tags: ["panel", "devops", "discussion"],
    },
  ]);

  const handleSessionEdit = (session: EventSession) => {
    // Switch to sessions tab and trigger edit
    setActiveTab("sessions");
    // The edit functionality is handled in MultiSessionScheduler
  };

  const handleSessionDelete = (sessionId: string) => {
    setSessions(sessions.filter((session) => session.id !== sessionId));
  };

  const handleBulkImport = (newSessions: EventSession[]) => {
    setSessions([...sessions, ...newSessions]);
  };

  const getTrackSessions = (trackId: string) => {
    return sessions.filter((session) => session.trackId === trackId);
  };

  const getTotalRegistrations = () => {
    return sessions.reduce(
      (total, session) => total + session.registeredCount,
      0,
    );
  };

  const getPopularSessions = () => {
    return sessions
      .filter((session) => session.registeredCount / session.capacity > 0.8)
      .sort(
        (a, b) =>
          b.registeredCount / b.capacity - a.registeredCount / a.capacity,
      )
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">
                Conference Schedule
              </h1>
              <p className="text-sm text-purple-100">{event.eventName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6 grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tracks">Tracks</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Tools</TabsTrigger>
          </TabsList>

          <TabsContent
            value="overview"
            className="space-y-6"
          >
            {/* Conference Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {eventDates.length}
                    </div>
                    <div className="text-sm text-gray-600">Conference Days</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {sessions.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Sessions</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {getTotalRegistrations()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Registrations
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Track Overview */}
            <div className="rounded-xl bg-white/95 p-6 shadow-lg backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Conference Tracks
              </h3>
              <div className="grid gap-4">
                {tracks.map((track) => {
                  const trackSessions = getTrackSessions(track.id);
                  return (
                    <div
                      key={track.id}
                      className="rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className={`${track.color} text-white`}>
                            {track.name}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {trackSessions.length} sessions
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {trackSessions.reduce(
                            (sum, s) => sum + s.registeredCount,
                            0,
                          )}{" "}
                          attendees
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {track.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Popular Sessions */}
            <div className="rounded-xl bg-white/95 p-6 shadow-lg backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Popular Sessions
              </h3>
              <div className="space-y-3">
                {getPopularSessions().map((session) => {
                  const fillPercentage =
                    (session.registeredCount / session.capacity) * 100;
                  const track = tracks.find((t) => t.id === session.trackId);

                  return (
                    <div
                      key={session.id}
                      className="rounded-lg border border-gray-200 p-3"
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {session.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2">
                            {track && (
                              <Badge
                                className={`${track.color} text-xs text-white`}
                              >
                                {track.name}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {session.startTime} - {session.endTime} •{" "}
                              {session.location}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            fillPercentage >= 100 ? "destructive" : "secondary"
                          }
                        >
                          {Math.round(fillPercentage)}% full
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-3 w-3" />
                        <span>
                          {session.registeredCount}/{session.capacity}
                          {session.waitlistCount > 0 &&
                            ` (+${session.waitlistCount} waitlist)`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracks">
            <div className="rounded-xl bg-white/95 p-6 shadow-lg backdrop-blur-sm">
              <SessionTrackManager
                tracks={tracks}
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

          <TabsContent value="bulk">
            <div className="rounded-xl bg-white/95 p-6 shadow-lg backdrop-blur-sm">
              <SessionBulkOperations
                tracks={tracks}
                eventDates={eventDates}
                locations={event.locations}
                onSessionsImport={handleBulkImport}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedScheduleModule;
