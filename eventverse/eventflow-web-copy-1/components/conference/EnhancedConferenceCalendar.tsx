"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

interface ConferenceSession {
  id: string;
  title: string;
  description: string;
  speakers: string[];
  track: string;
  trackColor: string;
  type: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  registered: number;
  waitlist: number;
  level: string;
  tags: string[];
  isKeynote?: boolean;
}

interface EnhancedConferenceCalendarProps {
  sessions: ConferenceSession[];
  selectedSessions: string[];
  onSessionToggle: (sessionId: string) => void;
}

const EnhancedConferenceCalendar = ({
  sessions,
  selectedSessions,
  onSessionToggle,
}: EnhancedConferenceCalendarProps) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    day: string;
    time: string;
  } | null>(null);
  const { toast } = useToast();

  // Generate time slots from 9:00 to 18:00 in 30-minute increments
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 18) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }

  // Get unique days from sessions
  const days = Array.from(new Set(sessions.map((s) => s.day))).sort();

  // Get ONLY SELECTED sessions for a specific day and time slot
  const getSelectedSessionsForSlot = (day: string, time: string) => {
    return sessions.filter((session) => {
      if (session.day !== day) return false;
      if (!selectedSessions.includes(session.id)) return false; // Only show selected sessions

      const sessionStart = session.startTime;
      const sessionEnd = session.endTime;

      // Check if the time slot overlaps with the session
      const slotTime = parseInt(time.replace(":", ""));
      const nextSlotTime = slotTime + 30;
      const startTime = parseInt(sessionStart.replace(":", ""));
      const endTime = parseInt(sessionEnd.replace(":", ""));

      return slotTime >= startTime && slotTime < endTime;
    });
  };

  // Get available sessions that can be added to a time slot
  const getAvailableSessionsForSlot = (day: string, time: string) => {
    return sessions.filter((session) => {
      if (session.day !== day) return false;
      if (selectedSessions.includes(session.id)) return false;

      const sessionStart = session.startTime;
      return sessionStart === time;
    });
  };

  // Check if there are conflicts for adding a session
  const hasConflict = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return false;

    const mySchedule = sessions.filter((s) => selectedSessions.includes(s.id));

    return mySchedule.some((mySession) => {
      if (mySession.day !== session.day) return false;

      const sessionStart = parseInt(session.startTime.replace(":", ""));
      const sessionEnd = parseInt(session.endTime.replace(":", ""));
      const myStart = parseInt(mySession.startTime.replace(":", ""));
      const myEnd = parseInt(mySession.endTime.replace(":", ""));

      return sessionStart < myEnd && sessionEnd > myStart;
    });
  };

  const handleAddSession = (sessionId: string) => {
    if (hasConflict(sessionId)) {
      toast({
        title: "Schedule Conflict",
        description:
          "This session conflicts with another session in your schedule",
        variant: "destructive",
      });
      return;
    }

    onSessionToggle(sessionId);
    setSelectedTimeSlot(null);
  };

  const openAddSessionDialog = (day: string, time: string) => {
    setSelectedTimeSlot({ day, time });
  };

  const getSessionDuration = (session: ConferenceSession) => {
    const start = parseInt(session.startTime.replace(":", ""));
    const end = parseInt(session.endTime.replace(":", ""));
    return (end - start) / 30; // Number of 30-minute slots
  };

  const getSessionTypeStyles = (session: ConferenceSession) => {
    if (session.isKeynote) {
      return "bg-gradient-to-r from-purple-500 to-blue-500 text-white";
    }

    switch (session.type.toLowerCase()) {
      case "workshop":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "panel":
        return "bg-gradient-to-r from-orange-500 to-amber-500 text-white";
      case "session":
      case "talk":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "lightning talk":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white";
      case "networking":
        return "bg-gradient-to-r from-indigo-500 to-purple-500 text-white";
      default:
        return "bg-purple-100 border-purple-300 text-gray-900";
    }
  };

  const renderSessionBlock = (session: ConferenceSession) => {
    const duration = getSessionDuration(session);
    const isFull = session.registered >= session.capacity;
    const sessionStyles = getSessionTypeStyles(session);

    return (
      <div
        key={session.id}
        className={`absolute right-1 left-1 rounded-md border p-2 text-xs ${sessionStyles} cursor-pointer transition-shadow hover:shadow-md`}
        style={{
          height: `${duration * 60 - 4}px`,
          zIndex: 10,
        }}
        onClick={() => onSessionToggle(session.id)}
      >
        <div className="mb-1 flex items-start justify-between">
          <h4 className="flex-1 truncate leading-tight font-medium">
            {session.title}
          </h4>
          <CheckCircle className="ml-1 h-3 w-3 flex-shrink-0 text-green-500" />
        </div>

        <div className="mb-1 flex items-center gap-1">
          <Badge
            className={`${session.trackColor} px-1 py-0 text-xs text-white`}
          >
            {session.track}
          </Badge>
          {isFull && <AlertTriangle className="h-3 w-3 text-orange-500" />}
        </div>

        <div className="text-xs opacity-75">
          <div className="flex items-center gap-1">
            <MapPin className="h-2 w-2" />
            <span className="truncate">{session.location}</span>
          </div>
          {session.speakers.length > 0 && (
            <div className="flex items-center gap-1">
              <User className="h-2 w-2" />
              <span className="truncate">{session.speakers[0]}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTimeSlot = (day: string, time: string) => {
    const selectedSessionsInSlot = getSelectedSessionsForSlot(day, time);
    const availableSessions = getAvailableSessionsForSlot(day, time);
    const hasSelectedSession = selectedSessionsInSlot.length > 0;

    return (
      <div
        key={`${day}-${time}`}
        className="relative h-16 border-b border-gray-100"
      >
        {/* Render selected session blocks */}
        {selectedSessionsInSlot.map((session) => {
          const sessionStart = session.startTime;
          if (sessionStart === time) {
            return renderSessionBlock(session);
          }
          return null;
        })}

        {/* Add button for empty slots */}
        {!hasSelectedSession && availableSessions.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute inset-1 flex h-auto flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500 hover:border-purple-400 hover:text-purple-600"
            onClick={() => openAddSessionDialog(day, time)}
          >
            <Plus className="mb-1 h-4 w-4" />
            <span className="text-xs">Add ({availableSessions.length})</span>
          </Button>
        )}
      </div>
    );
  };

  const availableSessionsForSlot = selectedTimeSlot
    ? getAvailableSessionsForSlot(selectedTimeSlot.day, selectedTimeSlot.time)
    : [];

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            My Conference Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Days Header */}
          <div className="grid grid-cols-4 gap-px overflow-hidden rounded-lg bg-gray-200">
            <div className="bg-gray-50 p-3 text-center font-medium">Time</div>
            {days.map((day) => (
              <div
                key={day}
                className="bg-gray-50 p-3 text-center font-medium"
              >
                {format(parseISO(day), "EEE, MMM d")}
              </div>
            ))}
          </div>

          {/* Time Slots Grid */}
          <div className="grid grid-cols-4 gap-px bg-gray-200">
            {timeSlots.map((time) => (
              <>
                <div
                  key={`time-${time}`}
                  className="flex items-center justify-center bg-white p-2 text-sm font-medium text-gray-600"
                >
                  {time}
                </div>
                {days.map((day) => (
                  <div
                    key={`${day}-${time}`}
                    className="bg-white"
                  >
                    {renderTimeSlot(day, time)}
                  </div>
                ))}
              </>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Session Dialog */}
      <Dialog
        open={!!selectedTimeSlot}
        onOpenChange={() => setSelectedTimeSlot(null)}
      >
        <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Add Session for{" "}
              {selectedTimeSlot &&
                format(parseISO(selectedTimeSlot.day), "EEE, MMM d")}{" "}
              at {selectedTimeSlot?.time}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {availableSessionsForSlot.map((session) => {
              const isFull = session.registered >= session.capacity;
              const fillPercentage =
                (session.registered / session.capacity) * 100;

              return (
                <Card
                  key={session.id}
                  className="p-4"
                >
                  <CardContent className="p-0">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="mb-1 font-semibold">{session.title}</h4>
                        <p className="mb-2 text-sm text-gray-600">
                          {session.description}
                        </p>

                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge
                            className={`${session.trackColor} text-xs text-white`}
                          >
                            {session.track}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            {session.level}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs"
                          >
                            {session.type}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.startTime} - {session.endTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {session.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {session.registered}/{session.capacity}
                          </div>
                          {session.speakers.length > 0 && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span className="truncate">
                                {session.speakers.join(", ")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Button
                          size="sm"
                          variant={isFull ? "secondary" : "default"}
                          onClick={() => handleAddSession(session.id)}
                          className="text-xs"
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          {isFull ? "Waitlist" : "Add"}
                        </Button>

                        {fillPercentage > 80 && (
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            <span className="text-xs text-orange-600">
                              {Math.round(fillPercentage)}% full
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {availableSessionsForSlot.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No sessions available for this time slot
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedConferenceCalendar;
