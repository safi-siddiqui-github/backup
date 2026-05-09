
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Users, Edit, Trash2, Filter } from "lucide-react";
import { format } from "date-fns";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";

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
    if (percentage >= 100) return { status: "full", color: "bg-red-100 border-red-300" };
    if (percentage >= 80) return { status: "almost-full", color: "bg-orange-100 border-orange-300" };
    return { status: "available", color: "bg-green-100 border-green-300" };
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

      {/* Calendar Grid */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg overflow-x-auto">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </h3>
          <Badge variant="secondary">
            {getFilteredSessions().length} sessions
          </Badge>
        </div>

        <div className="grid grid-cols-[100px_1fr] gap-2 min-w-[800px]">
          {/* Time Header */}
          <div className="font-medium text-sm text-gray-600 p-2">Time</div>
          <div className="font-medium text-sm text-gray-600 p-2">Sessions</div>

          {/* Time Slots */}
          {timeSlots.map((timeSlot, index) => {
            const sessionsInSlot = getSessionsForTimeSlot(timeSlot);
            const isHalfHour = index % 2 === 1;
            
            return (
              <div key={timeSlot} className={`contents ${isHalfHour ? 'opacity-60' : ''}`}>
                {/* Time Column */}
                <div className={`p-2 text-sm text-gray-600 border-r ${isHalfHour ? 'border-t-0' : 'border-t'}`}>
                  {!isHalfHour && timeSlot}
                </div>
                
                {/* Sessions Column */}
                <div className={`p-2 min-h-[60px] border-r ${isHalfHour ? 'border-t-0' : 'border-t'}`}>
                  <div className="flex flex-wrap gap-2">
                    {sessionsInSlot.map((session) => {
                      const track = getTrackInfo(session.trackId);
                      const capacityStatus = getCapacityStatus(session);
                      const conflict = hasConflict(session, timeSlot);
                      
                      return (
                        <div
                          key={session.id}
                          className={`relative border rounded-lg p-3 min-w-[280px] ${capacityStatus.color} ${
                            conflict ? 'ring-2 ring-red-400' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {track && (
                                  <Badge className={`${track.color} text-white text-xs`}>
                                    {track.name}
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {session.type}
                                </Badge>
                              </div>
                              <h4 className="font-medium text-sm text-gray-900 mb-1">{session.title}</h4>
                              
                              <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{session.startTime} - {session.endTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{session.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{session.registeredCount}/{session.capacity}</span>
                                </div>
                              </div>
                              
                              {session.speakerNames.length > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {session.speakerNames.join(", ")}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex gap-1 ml-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => onSessionEdit(session)}
                                className="p-1 h-6 w-6"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => onSessionDelete(session.id)}
                                className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          {conflict && (
                            <div className="absolute top-1 right-1">
                              <Badge variant="destructive" className="text-xs">
                                Conflict
                              </Badge>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{getFilteredSessions().length}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {getFilteredSessions().reduce((sum, s) => sum + s.registeredCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Attendees</div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {new Set(getFilteredSessions().map(s => s.location)).size}
            </div>
            <div className="text-sm text-gray-600">Active Rooms</div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {getFilteredSessions().filter(s => (s.registeredCount / s.capacity) >= 0.8).length}
            </div>
            <div className="text-sm text-gray-600">High Demand</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceCalendarView;
