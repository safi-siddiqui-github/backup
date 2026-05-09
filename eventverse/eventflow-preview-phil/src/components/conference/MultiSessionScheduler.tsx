import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Clock, Users, MapPin, Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { EventSession, SessionTrack, Attendee } from "@/types/conferenceScheduling";
import { useToast } from "@/hooks/use-toast";
import { getRandomAttendeesForSession } from "@/utils/mockConferenceData";
import AttendeeList from "./AttendeeList";
import TimeSlotCarousel from "./TimeSlotCarousel";

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
  { value: "networking", label: "Networking" }
];

const skillLevels = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" }
];

const MultiSessionScheduler = ({ 
  sessions, 
  tracks, 
  eventDates, 
  locations, 
  onSessionsChange 
}: MultiSessionSchedulerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<EventSession | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(eventDates[0] || new Date());
  const [activeTab, setActiveTab] = useState("list");
  const [sessionAttendees, setSessionAttendees] = useState<Map<string, Attendee[]>>(new Map());
  const [scheduleFilters, setScheduleFilters] = useState({
    sessionType: "all",
    trackId: "all",
    location: "all",
    searchTerm: ""
  });
  
  // Filters for Session List tab
  const [listFilters, setListFilters] = useState({
    sessionType: 'all',
    trackId: 'all',
    location: 'all',
    dateFilter: 'all',
    searchTerm: ''
  });
  
  const { toast } = useToast();

  // Generate attendees for sessions on mount
  useEffect(() => {
    const attendeesMap = new Map<string, Attendee[]>();
    sessions.forEach(session => {
      const attendees = getRandomAttendeesForSession(
        session.capacity,
        session.registeredCount
      );
      attendeesMap.set(session.id, attendees);
    });
    setSessionAttendees(attendeesMap);
  }, [sessions.length]); // Only regenerate when sessions count changes

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
    tags: ""
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
      tags: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.startTime || !formData.endTime) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const sessionData: EventSession = {
      id: editingSession?.id || `session-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      type: formData.type as EventSession['type'],
      trackId: formData.trackId || undefined,
      speakerNames: formData.speakerNames.filter(name => name.trim() !== ""),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      capacity: formData.capacity,
      registeredCount: editingSession?.registeredCount || 0,
      waitlistCount: editingSession?.waitlistCount || 0,
      level: formData.level as EventSession['level'],
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "")
    };

    if (editingSession) {
      onSessionsChange(sessions.map(session => 
        session.id === editingSession.id ? sessionData : session
      ));
      toast({
        title: "Session Updated",
        description: "Session has been updated successfully"
      });
    } else {
      onSessionsChange([...sessions, sessionData]);
      toast({
        title: "Session Created", 
        description: "New session has been created successfully"
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
      speakerNames: session.speakerNames.length > 0 ? session.speakerNames : [""],
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      location: session.location,
      capacity: session.capacity,
      level: session.level,
      tags: session.tags?.join(", ") || ""
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (sessionId: string) => {
    onSessionsChange(sessions.filter(session => session.id !== sessionId));
    toast({
      title: "Session Deleted",
      description: "Session has been removed successfully"
    });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingSession(null);
    resetForm();
  };

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = session.date instanceof Date ? session.date : new Date(session.date);
      return format(sessionDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getFilteredSessions = (sessionsToFilter: EventSession[]) => {
    return sessionsToFilter.filter(session => {
      // Session type filter
      if (scheduleFilters.sessionType !== "all" && session.type !== scheduleFilters.sessionType) {
        return false;
      }
      
      // Track filter
      if (scheduleFilters.trackId !== "all" && session.trackId !== scheduleFilters.trackId) {
        return false;
      }
      
      // Location filter
      if (scheduleFilters.location !== "all" && session.location !== scheduleFilters.location) {
        return false;
      }
      
      // Search filter
      if (scheduleFilters.searchTerm) {
        const searchLower = scheduleFilters.searchTerm.toLowerCase();
        const matchesTitle = session.title.toLowerCase().includes(searchLower);
        const matchesSpeaker = session.speakerNames.some(name => 
          name.toLowerCase().includes(searchLower)
        );
        if (!matchesTitle && !matchesSpeaker) {
          return false;
        }
      }
      
      return true;
    });
  };

  const getUniqueLocations = () => {
    const locationSet = new Set(sessions.map(s => s.location));
    return Array.from(locationSet).sort();
  };

  const getFilteredSessionsList = () => {
    return sessions.filter(session => {
      // Session type filter
      if (listFilters.sessionType !== 'all' && session.type !== listFilters.sessionType) {
        return false;
      }
      
      // Track filter
      if (listFilters.trackId !== 'all' && session.trackId !== listFilters.trackId) {
        return false;
      }
      
      // Location filter
      if (listFilters.location !== 'all' && session.location !== listFilters.location) {
        return false;
      }

      // Date filter
      if (listFilters.dateFilter !== 'all') {
        const sessionDate = session.date instanceof Date ? session.date : new Date(session.date);
        const selectedDate = eventDates.find(d => format(d, 'yyyy-MM-dd') === listFilters.dateFilter);
        if (selectedDate && format(sessionDate, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd')) {
          return false;
        }
      }
      
      // Search filter
      if (listFilters.searchTerm) {
        const searchLower = listFilters.searchTerm.toLowerCase();
        const matchesTitle = session.title.toLowerCase().includes(searchLower);
        const matchesDescription = session.description?.toLowerCase().includes(searchLower);
        const matchesSpeaker = session.speakerNames.some(name => 
          name.toLowerCase().includes(searchLower)
        );
        const matchesLocation = session.location.toLowerCase().includes(searchLower);
        
        if (!matchesTitle && !matchesDescription && !matchesSpeaker && !matchesLocation) {
          return false;
        }
      }
      
      return true;
    });
  };

  const getTimeGroupedSessions = (date: Date) => {
    const dateSessions = getSessionsForDate(date);
    const filteredSessions = getFilteredSessions(dateSessions);
    
    // Group by start time
    const grouped = filteredSessions.reduce((acc, session) => {
      const timeSlot = session.startTime;
      if (!acc[timeSlot]) {
        acc[timeSlot] = [];
      }
      acc[timeSlot].push(session);
      return acc;
    }, {} as Record<string, EventSession[]>);

    // Convert to array and sort by time
    return Object.entries(grouped)
      .map(([timeSlot, sessions]) => ({ timeSlot, sessions }))
      .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
  };

  const addSpeaker = () => {
    setFormData(prev => ({
      ...prev,
      speakerNames: [...prev.speakerNames, ""]
    }));
  };

  const removeSpeaker = (index: number) => {
    setFormData(prev => ({
      ...prev,
      speakerNames: prev.speakerNames.filter((_, i) => i !== index)
    }));
  };

  const updateSpeaker = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      speakerNames: prev.speakerNames.map((name, i) => i === index ? value : name)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Session Management</h2>
        <Button 
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Session
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Session List</TabsTrigger>
          <TabsTrigger value="schedule">Daily Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="space-y-4">
            {/* Filters Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Filter Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {/* Search Input */}
                  <div className="xl:col-span-2">
                    <Input
                      placeholder="Search sessions, speakers, locations..."
                      value={listFilters.searchTerm}
                      onChange={(e) => setListFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  {/* Session Type Filter */}
                  <div>
                    <Select
                      value={listFilters.sessionType}
                      onValueChange={(value) => setListFilters(prev => ({ ...prev, sessionType: value }))}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Types</SelectItem>
                        {sessionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Track Filter */}
                  <div>
                    <Select
                      value={listFilters.trackId}
                      onValueChange={(value) => setListFilters(prev => ({ ...prev, trackId: value }))}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All Tracks" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Tracks</SelectItem>
                        {tracks.map(track => (
                          <SelectItem key={track.id} value={track.id}>
                            {track.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <Select
                      value={listFilters.location}
                      onValueChange={(value) => setListFilters(prev => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Locations</SelectItem>
                        {getUniqueLocations().map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Filter */}
                  <div>
                    <Select
                      value={listFilters.dateFilter}
                      onValueChange={(value) => setListFilters(prev => ({ ...prev, dateFilter: value }))}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="All Dates" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Dates</SelectItem>
                        {eventDates.map(date => (
                          <SelectItem key={format(date, 'yyyy-MM-dd')} value={format(date, 'yyyy-MM-dd')}>
                            {format(date, 'MMM d, yyyy')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="xl:col-span-5 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Showing {getFilteredSessionsList().length} of {sessions.length} sessions
                    </div>
                    {(listFilters.sessionType !== 'all' || listFilters.trackId !== 'all' || 
                      listFilters.location !== 'all' || listFilters.dateFilter !== 'all' || 
                      listFilters.searchTerm !== '') && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setListFilters({
                          sessionType: 'all',
                          trackId: 'all',
                          location: 'all',
                          dateFilter: 'all',
                          searchTerm: ''
                        })}
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sessions List */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getFilteredSessionsList().length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p className="text-lg mb-2">No sessions found</p>
                      <p className="text-sm">Try adjusting your filters or search term</p>
                    </div>
                  ) : (
                    getFilteredSessionsList().map((session) => {
                  const track = tracks.find(t => t.id === session.trackId);
                  const sessionDate = session.date instanceof Date ? session.date : new Date(session.date);
                  const attendees = sessionAttendees.get(session.id) || [];
                  
                  // Get session type gradient
                  const getSessionTypeGradient = (type: EventSession['type']) => {
                    switch (type) {
                      case 'keynote':
                        return 'from-purple-500/10 to-purple-600/5 border-l-purple-500';
                      case 'workshop':
                        return 'from-orange-500/10 to-orange-600/5 border-l-orange-500';
                      case 'panel':
                        return 'from-blue-500/10 to-blue-600/5 border-l-blue-500';
                      case 'networking':
                        return 'from-green-500/10 to-green-600/5 border-l-green-500';
                      case 'break':
                        return 'from-gray-500/10 to-gray-600/5 border-l-gray-500';
                      default:
                        return 'from-primary/10 to-primary/5 border-l-primary';
                    }
                  };

                  const capacityPercent = (session.registeredCount / session.capacity) * 100;
                  const getCapacityColor = () => {
                    if (capacityPercent >= 90) return 'text-red-500';
                    if (capacityPercent >= 70) return 'text-yellow-500';
                    return 'text-green-500';
                  };
                  
                  return (
                    <div 
                      key={session.id} 
                      className={`border-l-4 border border-border rounded-lg p-5 bg-gradient-to-br ${getSessionTypeGradient(session.type)} hover:shadow-md transition-all group`}
                    >
                      {/* Header Section */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-foreground">{session.title}</h3>
                            <Badge variant="outline">{session.type}</Badge>
                            {track && (
                              <Badge className="bg-primary/10 text-primary border-primary/20">
                                {track.name}
                              </Badge>
                            )}
                            <Badge variant="secondary" className={`${getCapacityColor()}`}>
                              {Math.round(capacityPercent)}% Full
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                          
                          {/* Session Details */}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(sessionDate, "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.startTime} - {session.endTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.location}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(session)}
                            className="opacity-70 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(session.id)}
                            className="text-destructive hover:text-destructive opacity-70 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Attendee List */}
                      <AttendeeList
                        attendees={attendees}
                        sessionId={session.id}
                        maxCapacity={session.capacity}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>

        <TabsContent value="schedule">
          <div className="space-y-6">
            {/* Date Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {eventDates.map((date, index) => (
                <Button
                  key={index}
                  variant={format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") ? "default" : "outline"}
                  onClick={() => setSelectedDate(date)}
                  className="flex-shrink-0"
                >
                  {format(date, "MMM d")}
                </Button>
              ))}
            </div>

            {/* Filters */}
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="md:col-span-1">
                    <Input
                      placeholder="Search sessions..."
                      value={scheduleFilters.searchTerm}
                      onChange={(e) => setScheduleFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  {/* Session Type Filter */}
                  <div>
                    <Select
                      value={scheduleFilters.sessionType}
                      onValueChange={(value) => setScheduleFilters(prev => ({ ...prev, sessionType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Types</SelectItem>
                        {sessionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Track Filter */}
                  <div>
                    <Select
                      value={scheduleFilters.trackId}
                      onValueChange={(value) => setScheduleFilters(prev => ({ ...prev, trackId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Tracks" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Tracks</SelectItem>
                        {tracks.map(track => (
                          <SelectItem key={track.id} value={track.id}>
                            {track.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <Select
                      value={scheduleFilters.location}
                      onValueChange={(value) => setScheduleFilters(prev => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="all">All Locations</SelectItem>
                        {getUniqueLocations().map(location => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time-Grouped Schedule */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>
                  Schedule for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getTimeGroupedSessions(selectedDate).map((group) => (
                    <div key={group.timeSlot} className="space-y-3">
                      {/* Time Slot Header */}
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                          group.sessions.length <= 2 ? 'bg-green-500/10' :
                          group.sessions.length <= 4 ? 'bg-amber-500/10' :
                          group.sessions.length <= 6 ? 'bg-orange-500/10' :
                          'bg-red-500/10'
                        }`}>
                          <Clock className={`w-4 h-4 ${
                            group.sessions.length <= 2 ? 'text-green-600' :
                            group.sessions.length <= 4 ? 'text-amber-600' :
                            group.sessions.length <= 6 ? 'text-orange-600' :
                            'text-red-600'
                          }`} />
                          <span className={`font-mono font-medium ${
                            group.sessions.length <= 2 ? 'text-green-700 dark:text-green-400' :
                            group.sessions.length <= 4 ? 'text-amber-700 dark:text-amber-400' :
                            group.sessions.length <= 6 ? 'text-orange-700 dark:text-orange-400' :
                            'text-red-700 dark:text-red-400'
                          }`}>
                            {group.timeSlot}
                          </span>
                        </div>
                        {group.sessions.length > 1 && (
                          <Badge variant="secondary" className="text-xs">
                            {group.sessions.length} concurrent sessions
                          </Badge>
                        )}
                        {group.sessions.length >= 7 && (
                          <Badge className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20 text-xs">
                            High Density - Using Carousel
                          </Badge>
                        )}
                      </div>

                      {/* Concurrent Sessions Grid */}
                      <div className={`grid gap-4 ${
                        group.sessions.length === 1 ? 'grid-cols-1' : 
                        group.sessions.length === 2 ? 'md:grid-cols-2' :
                        group.sessions.length <= 4 ? 'md:grid-cols-2 lg:grid-cols-3' :
                        group.sessions.length <= 6 ? 'md:grid-cols-2 lg:grid-cols-4' :
                        'grid-cols-1' // 7+ will use carousel
                      }`}>
                        {group.sessions.length >= 7 ? (
                          // Use carousel for 7+ sessions
                          <div className="col-span-full">
                            <TimeSlotCarousel 
                              sessions={group.sessions}
                              tracks={tracks}
                              onEdit={handleEdit}
                              onDelete={handleDelete}
                            />
                          </div>
                        ) : (
                          // Regular grid for <= 6 sessions
                          group.sessions.map((session) => {
                          const track = tracks.find(t => t.id === session.trackId);
                          const capacityPercent = (session.registeredCount / session.capacity) * 100;
                          const getCapacityColor = () => {
                            if (capacityPercent >= 90) return 'text-red-500';
                            if (capacityPercent >= 70) return 'text-orange-500';
                            return 'text-green-500';
                          };

                          const getSessionTypeBorder = (type: EventSession['type']) => {
                            switch (type) {
                              case 'keynote': return 'border-l-purple-500 bg-purple-500/5';
                              case 'workshop': return 'border-l-orange-500 bg-orange-500/5';
                              case 'panel': return 'border-l-blue-500 bg-blue-500/5';
                              case 'networking': return 'border-l-green-500 bg-green-500/5';
                              case 'break': return 'border-l-gray-500 bg-gray-500/5';
                              default: return 'border-l-primary bg-primary/5';
                            }
                          };

                          return (
                            <div
                              key={session.id}
                              className={`border-l-4 border border-border rounded-lg p-4 hover:shadow-lg transition-all ${getSessionTypeBorder(session.type)}`}
                            >
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1">
                                  <div className="flex items-start gap-2 mb-2 flex-wrap">
                                    <h4 className="font-semibold text-foreground">{session.title}</h4>
                                    <Badge variant="outline" className="text-xs">{session.type}</Badge>
                                  </div>
                                  
                                  {track && (
                                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs mb-2">
                                      {track.name}
                                    </Badge>
                                  )}

                                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{session.startTime} - {session.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      <span>{session.location}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-sm">
                                      <Users className={`w-4 h-4 ${getCapacityColor()}`} />
                                      <span className={getCapacityColor()}>
                                        {session.registeredCount}/{session.capacity}
                                      </span>
                                    </div>
                                    <Badge className={`text-xs ${getCapacityColor()}`}>
                                      {Math.round(capacityPercent)}% Full
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(session)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(session.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Session Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle>
              {editingSession ? "Edit Session" : "Create New Session"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Session Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter session title"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
                    setFormData(prev => ({ ...prev, type: value }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTypes.map((type) => {
                      console.log("Rendering session type:", type.value, type.label);
                      if (!type.value || type.value === "") {
                        console.error("Empty session type value detected:", type);
                        return null;
                      }
                      return (
                        <SelectItem key={type.value} value={type.value}>
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
                    setFormData(prev => ({ ...prev, trackId: value }))
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
                        <SelectItem key={track.id} value={track.id}>
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
                    setFormData(prev => ({ ...prev, date: new Date(value) }))
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
                        <SelectItem key={index} value={dateValue}>
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
                    setFormData(prev => ({ ...prev, location: value }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location, index) => {
                      console.log("Rendering location:", location.name);
                      if (!location.name || location.name === "") {
                        console.error("Empty location name detected:", location);
                        return null;
                      }
                      return (
                        <SelectItem key={index} value={location.name}>
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
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 50 }))}
                  min="1"
                />
              </div>

              <div>
                <Label>Skill Level</Label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value) => {
                    console.log("Skill level selected:", value);
                    setFormData(prev => ({ ...prev, level: value }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => {
                      console.log("Rendering skill level:", level.value, level.label);
                      if (!level.value || level.value === "") {
                        console.error("Empty skill level value detected:", level);
                        return null;
                      }
                      return (
                        <SelectItem key={level.value} value={level.value}>
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
                  <div key={index} className="flex gap-2">
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
                  <Plus className="w-3 h-3 mr-1" />
                  Add Speaker
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g., ai, machine-learning, beginner"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
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
