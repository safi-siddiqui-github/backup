
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Filter } from "lucide-react";
import { format } from "date-fns";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import StackedSessionCards from "./StackedSessionCards";

interface ConferenceCalendarViewProps {
  sessions: EventSession[];
  tracks: SessionTrack[];
  eventDates: Date[];
  selectedDate: Date;
  onSessionEdit: (session: EventSession) => void;
  onSessionDelete: (sessionId: string) => void;
  onDateChange: (date: Date) => void;
}

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];

const ConferenceCalendarView = ({
  sessions,
  tracks,
  eventDates,
  selectedDate,
  onSessionEdit,
  onSessionDelete,
  onDateChange
}: ConferenceCalendarViewProps) => {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = session.date instanceof Date ? session.date : new Date(session.date);
      return format(sessionDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    });
  };

  const getFilteredSessions = () => {
    let filtered = getSessionsForDate(selectedDate);
    
    if (selectedTrack !== "all") {
      filtered = filtered.filter(session => session.trackId === selectedTrack);
    }
    
    if (selectedLocation !== "all") {
      filtered = filtered.filter(session => session.location === selectedLocation);
    }
    
    return filtered;
  };

  const getSessionsForTimeSlot = (timeSlot: string) => {
    return getFilteredSessions().filter(session => {
      const sessionStart = session.startTime;
      const sessionEnd = session.endTime;
      return timeSlot >= sessionStart && timeSlot < sessionEnd;
    });
  };

  const getUniqueLocations = () => {
    const locations = new Set(sessions.map(session => session.location));
    return Array.from(locations);
  };

  const getTrackInfo = (trackId?: string) => {
    return tracks.find(track => track.id === trackId);
  };

  const getCapacityStatus = (session: EventSession) => {
    const percentage = (session.registeredCount / session.capacity) * 100;
    if (percentage >= 100) return { status: "full", color: "bg-red-500/10 border-red-500/50 dark:bg-red-500/20" };
    if (percentage >= 80) return { status: "almost-full", color: "bg-orange-500/10 border-orange-500/50 dark:bg-orange-500/20" };
    return { status: "available", color: "bg-green-500/10 border-green-500/50 dark:bg-green-500/20" };
  };

  const hasConflict = (session: EventSession, timeSlot: string) => {
    const concurrentSessions = getSessionsForTimeSlot(timeSlot);
    return concurrentSessions.filter(s => s.location === session.location && s.id !== session.id).length > 0;
  };

  return (
    <div className="space-y-4">
      {/* Date and Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="flex gap-2 overflow-x-auto">
          {eventDates.map((date, index) => (
            <Button
              key={index}
              variant={format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") ? "default" : "outline"}
              className={`whitespace-nowrap ${
                format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : ""
              }`}
              onClick={() => onDateChange(date)}
            >
              {format(date, "MMM d")}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2 items-center">
          <Filter className="w-4 h-4 text-gray-500" />
          <Select value={selectedTrack} onValueChange={setSelectedTrack}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Tracks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tracks</SelectItem>
              {tracks.map(track => (
                <SelectItem key={track.id} value={track.id}>{track.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {getUniqueLocations().map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

        <div className="bg-card border-border border rounded-xl p-4">
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </h3>
            <Badge variant="secondary">
              {getFilteredSessions().length} sessions
            </Badge>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-2 min-w-[800px]">
            {/* Time Header */}
            <div className="font-medium text-sm text-muted-foreground p-2">Time</div>
            <div className="font-medium text-sm text-muted-foreground p-2">Sessions</div>

          {/* Time Slots */}
          {timeSlots.map((timeSlot, index) => {
            const sessionsInSlot = getSessionsForTimeSlot(timeSlot);
            const isHalfHour = index % 2 === 1;
            
            return (
              <div key={timeSlot} className={`contents ${isHalfHour ? 'opacity-60' : ''}`}>
                {/* Time Column */}
                <div className={`p-2 text-sm text-muted-foreground border-r border-border ${isHalfHour ? 'border-t-0' : 'border-t'}`}>
                  {!isHalfHour && timeSlot}
                </div>
                
                {/* Sessions Column */}
                <div className={`p-2 min-h-[60px] border-r border-border ${isHalfHour ? 'border-t-0' : 'border-t'}`}>
                  {sessionsInSlot.length > 0 && (
                    <StackedSessionCards
                      sessions={sessionsInSlot}
                      timeSlot={timeSlot}
                      tracks={tracks}
                      onEdit={onSessionEdit}
                      onDelete={onSessionDelete}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border-border border rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{getFilteredSessions().length}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </div>
        </div>
        <div className="bg-card border-border border rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {getFilteredSessions().reduce((sum, s) => sum + s.registeredCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Attendees</div>
          </div>
        </div>
        <div className="bg-card border-border border rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {new Set(getFilteredSessions().map(s => s.location)).size}
            </div>
            <div className="text-sm text-muted-foreground">Active Rooms</div>
          </div>
        </div>
        <div className="bg-card border-border border rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {getFilteredSessions().filter(s => (s.registeredCount / s.capacity) >= 0.8).length}
            </div>
            <div className="text-sm text-muted-foreground">High Demand</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceCalendarView;
