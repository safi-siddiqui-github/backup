import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, Repeat, Info, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { EventFormData, EventRecurrence, EventSession } from "../EnhancedEventCreationDialog";
import { Badge } from "@/components/ui/badge";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const DateTimeManager = ({ formData, onUpdate }: Props) => {
  const [showRecurrence, setShowRecurrence] = useState(formData.recurrence.isRecurring);
  const [isExpanded, setIsExpanded] = useState(!formData.eventDates.startDate);
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [newSessionDate, setNewSessionDate] = useState<Date | undefined>(undefined);
  const [newSessionStartTime, setNewSessionStartTime] = useState("");
  const [newSessionEndTime, setNewSessionEndTime] = useState("");

  // Get suggested times based on event type
  const getSuggestedTimes = () => {
    const eventType = formData.eventType.toLowerCase();
    if (eventType.includes('wedding')) return { start: '15:00', end: '23:00' };
    if (eventType.includes('corporate') || eventType.includes('conference')) return { start: '09:00', end: '17:00' };
    if (eventType.includes('workshop') || eventType.includes('seminar')) return { start: '10:00', end: '16:00' };
    if (eventType.includes('party') || eventType.includes('celebration')) return { start: '18:00', end: '23:00' };
    if (eventType.includes('brunch')) return { start: '10:00', end: '14:00' };
    if (eventType.includes('dinner')) return { start: '18:00', end: '22:00' };
    return { start: '10:00', end: '16:00' };
  };

  const suggestedTimes = getSuggestedTimes();

  // Helper function to convert 24-hour time to 12-hour format
  const convertTo12Hour = (time: string): string => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Format date with time
  const formatDateTime = (date: Date, time: string): string => {
    const dateStr = format(date, "EEEE MMMM d, yyyy");
    return `${dateStr} at ${convertTo12Hour(time)}`;
  };

  const getSummaryText = () => {
    if (!formData.eventDates.startDate) return "Not set";
    
    const startTime = formData.eventDates.startTime || suggestedTimes.start;
    const sessions = formData.eventDates.sessions || [];
    
    if (formData.eventDates.isMultiDay && sessions.length > 0) {
      const firstSession = sessions[0];
      const additionalDays = sessions.length - 1;
      const dateStr = format(firstSession.date, "EEEE MMMM d, yyyy");
      const timeStr = convertTo12Hour(firstSession.startTime);
      if (additionalDays > 0) {
        return `${dateStr} at ${timeStr} + ${additionalDays} more day${additionalDays > 1 ? 's' : ''}`;
      }
      return `${dateStr} at ${timeStr}`;
    }
    
    const dateStr = format(formData.eventDates.startDate, "EEEE MMMM d, yyyy");
    return `${dateStr} at ${convertTo12Hour(startTime)}`;
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    onUpdate({
      eventDates: {
        ...formData.eventDates,
        startDate: date,
        // Initialize first session if multi-day is enabled
        sessions: formData.eventDates.isMultiDay ? [{
          id: '1',
          date: date,
          startTime: formData.eventDates.startTime || suggestedTimes.start,
          endTime: formData.eventDates.endTime || suggestedTimes.end
        }] : []
      }
    });
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', time: string) => {
    const updates: any = {
      eventDates: {
        ...formData.eventDates,
        [field]: time
      }
    };

    // Update first session if multi-day
    if (formData.eventDates.isMultiDay && formData.eventDates.sessions.length > 0) {
      updates.eventDates.sessions = formData.eventDates.sessions.map((session, index) => 
        index === 0 ? { ...session, [field]: time } : session
      );
    }

    onUpdate(updates);
  };

  const handleMultiDayToggle = (isMultiDay: boolean) => {
    const updates: any = {
      eventDates: {
        ...formData.eventDates,
        isMultiDay,
        endDate: null
      }
    };

    if (isMultiDay && formData.eventDates.startDate) {
      // Initialize with first session
      updates.eventDates.sessions = [{
        id: Date.now().toString(),
        date: formData.eventDates.startDate,
        startTime: formData.eventDates.startTime || suggestedTimes.start,
        endTime: formData.eventDates.endTime || suggestedTimes.end
      }];
    } else {
      updates.eventDates.sessions = [];
    }

    onUpdate(updates);
  };

  const handleAddSession = () => {
    if (!newSessionDate) return;

    const newSession: EventSession = {
      id: Date.now().toString(),
      date: newSessionDate,
      startTime: newSessionStartTime || suggestedTimes.start,
      endTime: newSessionEndTime || suggestedTimes.end
    };

    const sessions = [...formData.eventDates.sessions, newSession].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    onUpdate({
      eventDates: {
        ...formData.eventDates,
        sessions
      }
    });

    // Reset form
    setNewSessionDate(undefined);
    setNewSessionStartTime("");
    setNewSessionEndTime("");
  };

  const handleRemoveSession = (sessionId: string) => {
    const sessions = formData.eventDates.sessions.filter(s => s.id !== sessionId);
    onUpdate({
      eventDates: {
        ...formData.eventDates,
        sessions
      }
    });
  };

  const handleRecurrenceToggle = (isRecurring: boolean) => {
    setShowRecurrence(isRecurring);
    onUpdate({
      recurrence: {
        ...formData.recurrence,
        isRecurring
      }
    });
  };

  const handleRecurrenceChange = (updates: Partial<EventRecurrence>) => {
    onUpdate({
      recurrence: {
        ...formData.recurrence,
        ...updates
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <Card>
        <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Event Dates & Times
            </CardTitle>
            <div className="flex items-center gap-3">
              {!isExpanded && formData.eventDates.startDate && (
                <span className="text-sm text-gray-600">{getSummaryText()}</span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? (
                  <ChevronRight className="w-4 h-4 rotate-90" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="space-y-6">
            {/* Single Day Mode */}
            {!formData.eventDates.isMultiDay && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Event Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal h-12",
                            !formData.eventDates.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.eventDates.startDate 
                            ? format(formData.eventDates.startDate, "EEEE MMMM d, yyyy") 
                            : "Pick event date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.eventDates.startDate || undefined}
                          onSelect={handleDateChange}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Multi-day Event</Label>
                      <Switch
                        checked={formData.eventDates.isMultiDay}
                        onCheckedChange={handleMultiDayToggle}
                      />
                    </div>
                  </div>
                </div>

                {/* Time Selection for Single Day */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <Label className="text-base font-medium">Event Time</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={formData.eventDates.startTime || suggestedTimes.start}
                        onChange={(e) => handleTimeChange('startTime', e.target.value)}
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={formData.eventDates.endTime || suggestedTimes.end}
                        onChange={(e) => handleTimeChange('endTime', e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Time Zone</Label>
                      <Select 
                        value={formData.eventDates.timezone} 
                        onValueChange={(value) => onUpdate({
                          eventDates: { ...formData.eventDates, timezone: value }
                        })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="Europe/Paris">Paris</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Multi-day Mode */}
            {formData.eventDates.isMultiDay && (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Multi-day Event</Label>
                    <Switch
                      checked={formData.eventDates.isMultiDay}
                      onCheckedChange={handleMultiDayToggle}
                    />
                  </div>
                </div>

                {/* Time Zone (applies to all days) */}
                <div className="space-y-2">
                  <Label>Time Zone (applies to all days)</Label>
                  <Select 
                    value={formData.eventDates.timezone} 
                    onValueChange={(value) => onUpdate({
                      eventDates: { ...formData.eventDates, timezone: value }
                    })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* List of Event Days */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Event Days</Label>
                  
                  {formData.eventDates.sessions.map((session, index) => (
                    <Card key={session.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-sm mb-1">
                              Day {index + 1}
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatDateTime(session.date, session.startTime)} - {convertTo12Hour(session.endTime)}
                            </div>
                          </div>
                          {formData.eventDates.sessions.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveSession(session.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add New Day Form */}
                  <Card className="border-dashed border-2">
                    <CardContent className="p-4 space-y-3">
                      <Label className="text-sm font-medium">Add Another Day</Label>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !newSessionDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newSessionDate 
                                ? format(newSessionDate, "EEEE MMMM d, yyyy") 
                                : "Pick date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={newSessionDate}
                              onSelect={setNewSessionDate}
                              initialFocus
                              className="p-3 pointer-events-auto"
                              disabled={(date) => {
                                // Disable dates already in sessions
                                return formData.eventDates.sessions.some(
                                  s => format(s.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                                );
                              }}
                            />
                          </PopoverContent>
                        </Popover>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Start Time</Label>
                            <Input
                              type="time"
                              value={newSessionStartTime || suggestedTimes.start}
                              onChange={(e) => setNewSessionStartTime(e.target.value)}
                              className="h-10"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <Label className="text-xs">End Time</Label>
                            <Input
                              type="time"
                              value={newSessionEndTime || suggestedTimes.end}
                              onChange={(e) => setNewSessionEndTime(e.target.value)}
                              className="h-10"
                            />
                          </div>
                        </div>

                        <Button 
                          onClick={handleAddSession}
                          disabled={!newSessionDate}
                          className="w-full"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Day
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Smart Time Suggestions */}
            {formData.eventType && !formData.eventDates.isMultiDay && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-blue-800 mb-1">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-medium">Suggested for {formData.eventType}</span>
                </div>
                <p className="text-xs text-blue-600">
                  Based on your event type, we suggest {convertTo12Hour(suggestedTimes.start)} - {convertTo12Hour(suggestedTimes.end)}
                </p>
              </div>
            )}

            {/* Multi-day Notice */}
            {formData.eventDates.isMultiDay && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-purple-800 mb-1">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-medium">Multi-day Event</span>
                </div>
                <p className="text-xs text-purple-600">
                  You can create detailed schedules and sessions later in the Schedule module after creating your event.
                </p>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Recurring Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Repeat className="w-5 h-5" />
              Recurring Event
            </CardTitle>
            <Switch
              checked={showRecurrence}
              onCheckedChange={handleRecurrenceToggle}
            />
          </div>
        </CardHeader>
        
        {showRecurrence && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Repeat Pattern</Label>
                <Select 
                  value={formData.recurrence.pattern} 
                  onValueChange={(value: any) => handleRecurrenceChange({ pattern: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Every</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={formData.recurrence.frequency}
                    onChange={(e) => handleRecurrenceChange({ frequency: parseInt(e.target.value) || 1 })}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">
                    {formData.recurrence.pattern === 'daily' && 'day(s)'}
                    {formData.recurrence.pattern === 'weekly' && 'week(s)'}
                    {formData.recurrence.pattern === 'monthly' && 'month(s)'}
                    {formData.recurrence.pattern === 'yearly' && 'year(s)'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ends</Label>
                <Select 
                  value={formData.recurrence.endType} 
                  onValueChange={(value: any) => handleRecurrenceChange({ endType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="after">After X occurrences</SelectItem>
                    <SelectItem value="until">Until date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.recurrence.endType === 'after' && (
              <div className="space-y-2">
                <Label>Number of Occurrences</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g., 10"
                  value={formData.recurrence.endValue as number || ''}
                  onChange={(e) => handleRecurrenceChange({ endValue: parseInt(e.target.value) || undefined })}
                  className="w-32"
                />
              </div>
            )}

            {formData.recurrence.endType === 'until' && (
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.recurrence.endValue && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.recurrence.endValue ? format(formData.recurrence.endValue as Date, "PPP") : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.recurrence.endValue as Date || undefined}
                      onSelect={(date) => handleRecurrenceChange({ endValue: date })}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default DateTimeManager;
