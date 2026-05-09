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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Edit,
  MapPin,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

interface MultiSessionSchedulerProps {
  sessions: EventSession[];
  tracks: SessionTrack[];
  eventDates: Date[];
  locations: Array<{ name: string; address?: string }>;
  onSessionsChange: (sessions: EventSession[]) => void;
}

const sessionTypes = [
  { value: "keynote", label: "Keynote" },
  { value: "session", label: "Session" },
  { value: "workshop", label: "Workshop" },
  { value: "panel", label: "Panel" },
  { value: "break", label: "Break" },
  { value: "networking", label: "Networking" },
];

const skillLevels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const MultiSessionScheduler = ({
  sessions,
  tracks,
  eventDates,
  locations,
  onSessionsChange,
}: MultiSessionSchedulerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<EventSession | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    eventDates[0] || new Date(),
  );
  const [activeTab, setActiveTab] = useState("list");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    trackId: "",
    speakerNames: [""],
    date: selectedDate,
    startTime: "",
    endTime: "",
    location: "",
    capacity: 50,
    level: "all",
    tags: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "",
      trackId: "",
      speakerNames: [""],
      date: selectedDate,
      startTime: "",
      endTime: "",
      location: "",
      capacity: 50,
      level: "all",
      tags: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.type ||
      !formData.startTime ||
      !formData.endTime
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const sessionData: EventSession = {
      id: editingSession?.id || `session-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      type: formData.type as EventSession["type"],
      trackId: formData.trackId || undefined,
      speakerNames: formData.speakerNames.filter((name) => name.trim() !== ""),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      capacity: formData.capacity,
      registeredCount: editingSession?.registeredCount || 0,
      waitlistCount: editingSession?.waitlistCount || 0,
      level: formData.level as EventSession["level"],
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    if (editingSession) {
      onSessionsChange(
        sessions.map((session) =>
          session.id === editingSession.id ? sessionData : session,
        ),
      );
      toast({
        title: "Session Updated",
        description: "Session has been updated successfully",
      });
    } else {
      onSessionsChange([...sessions, sessionData]);
      toast({
        title: "Session Created",
        description: "New session has been created successfully",
      });
    }

    handleCloseDialog();
  };

  const handleEdit = (session: EventSession) => {
    setEditingSession(session);
    setFormData({
      title: session.title,
      description: session.description,
      type: session.type,
      trackId: session.trackId || "",
      speakerNames:
        session.speakerNames.length > 0 ? session.speakerNames : [""],
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      location: session.location,
      capacity: session.capacity,
      level: session.level,
      tags: session.tags?.join(", ") || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (sessionId: string) => {
    onSessionsChange(sessions.filter((session) => session.id !== sessionId));
    toast({
      title: "Session Deleted",
      description: "Session has been removed successfully",
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSession(null);
    resetForm();
  };

  const getSessionsForDate = (date: Date) => {
    return sessions
      .filter((session) => {
        const sessionDate =
          session.date instanceof Date ? session.date : new Date(session.date);
        return format(sessionDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const addSpeaker = () => {
    setFormData((prev) => ({
      ...prev,
      speakerNames: [...prev.speakerNames, ""],
    }));
  };

  const removeSpeaker = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      speakerNames: prev.speakerNames.filter((_, i) => i !== index),
    }));
  };

  const updateSpeaker = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      speakerNames: prev.speakerNames.map((name, i) =>
        i === index ? value : name,
      ),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Session Management</h2>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Session
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Session List</TabsTrigger>
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>All Sessions ({sessions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.map((session) => {
                  const track = tracks.find((t) => t.id === session.trackId);
                  const sessionDate =
                    session.date instanceof Date
                      ? session.date
                      : new Date(session.date);

                  return (
                    <div
                      key={session.id}
                      className="rounded-lg border p-4"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">
                              {session.title}
                            </h3>
                            <Badge variant="outline">{session.type}</Badge>
                            {track && (
                              <Badge className={`${track.color} text-white`}>
                                {track.name}
                              </Badge>
                            )}
                          </div>
                          <p className="mb-2 text-sm text-gray-600">
                            {session.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(sessionDate, "MMM d, yyyy")}
                            </div>
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
                              {session.registeredCount}/{session.capacity}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(session)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(session.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {eventDates.map((date, index) => (
                <Button
                  key={index}
                  variant={
                    format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelectedDate(date)}
                  className="flex-shrink-0"
                >
                  {format(date, "MMM d")}
                </Button>
              ))}
            </div>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>
                  Schedule for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getSessionsForDate(selectedDate).map((session) => {
                    const track = tracks.find((t) => t.id === session.trackId);

                    return (
                      <div
                        key={session.id}
                        className="flex items-center gap-4 rounded-lg border p-3"
                      >
                        <div className="w-20 font-mono text-sm text-gray-600">
                          {session.startTime}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="font-medium">{session.title}</h4>
                            <Badge variant="outline">{session.type}</Badge>
                            {track && (
                              <Badge
                                className={`${track.color} text-xs text-white`}
                              >
                                {track.name}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {session.location} • {session.endTime}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(session)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(session.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Session Form Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSession ? "Edit Session" : "Create New Session"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="title">Session Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter session title"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Session description"
                  rows={3}
                />
              </div>

              <div>
                <Label>Session Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => {
                    console.log("Session type selected:", value);
                    setFormData((prev) => ({ ...prev, type: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTypes.map((type) => {
                      console.log(
                        "Rendering session type:",
                        type.value,
                        type.label,
                      );
                      if (!type.value || type.value === "") {
                        console.error(
                          "Empty session type value detected:",
                          type,
                        );
                        return null;
                      }
                      return (
                        <SelectItem
                          key={type.value}
                          value={type.value}
                        >
                          {type.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Track (Optional)</Label>
                <Select
                  value={formData.trackId}
                  onValueChange={(value) => {
                    console.log("Track selected:", value);
                    setFormData((prev) => ({ ...prev, trackId: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select track" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Track</SelectItem>
                    {tracks.map((track) => {
                      console.log("Rendering track:", track.id, track.name);
                      if (!track.id || track.id === "") {
                        console.error("Empty track id detected:", track);
                        return null;
                      }
                      return (
                        <SelectItem
                          key={track.id}
                          value={track.id}
                        >
                          {track.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Date *</Label>
                <Select
                  value={format(formData.date, "yyyy-MM-dd")}
                  onValueChange={(value) => {
                    console.log("Date selected:", value);
                    setFormData((prev) => ({ ...prev, date: new Date(value) }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventDates.map((date, index) => {
                      const dateValue = format(date, "yyyy-MM-dd");
                      console.log("Rendering date:", dateValue);
                      if (!dateValue || dateValue === "") {
                        console.error("Empty date value detected:", date);
                        return null;
                      }
                      return (
                        <SelectItem
                          key={index}
                          value={dateValue}
                        >
                          Day {index + 1} - {format(date, "MMM d, yyyy")}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => {
                    console.log("Location selected:", value);
                    setFormData((prev) => ({ ...prev, location: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location, index) => {
                      console.log("Rendering location:", location.name);
                      if (!location.name || location.name === "") {
                        console.error(
                          "Empty location name detected:",
                          location,
                        );
                        return null;
                      }
                      return (
                        <SelectItem
                          key={index}
                          value={location.name}
                        >
                          {location.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      capacity: parseInt(e.target.value) || 50,
                    }))
                  }
                  min="1"
                />
              </div>

              <div>
                <Label>Skill Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => {
                    console.log("Skill level selected:", value);
                    setFormData((prev) => ({ ...prev, level: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => {
                      console.log(
                        "Rendering skill level:",
                        level.value,
                        level.label,
                      );
                      if (!level.value || level.value === "") {
                        console.error(
                          "Empty skill level value detected:",
                          level,
                        );
                        return null;
                      }
                      return (
                        <SelectItem
                          key={level.value}
                          value={level.value}
                        >
                          {level.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Speakers Section */}
            <div>
              <Label>Speakers</Label>
              <div className="space-y-2">
                {formData.speakerNames.map((speaker, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >
                    <Input
                      value={speaker}
                      onChange={(e) => updateSpeaker(index, e.target.value)}
                      placeholder={`Speaker ${index + 1} name`}
                    />
                    {formData.speakerNames.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSpeaker(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSpeaker}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Speaker
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="e.g., ai, machine-learning, beginner"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {editingSession ? "Update Session" : "Create Session"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiSessionScheduler;
