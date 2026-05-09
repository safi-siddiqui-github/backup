"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Clock, Info, Repeat } from "lucide-react";
import { useState } from "react";
import { EventFormData, EventRecurrence } from "../EnhancedEventCreationDialog";

interface Props {
  formData: EventFormData;
  onUpdate: (updates: Partial<EventFormData>) => void;
}

const DateTimeManager = ({ formData, onUpdate }: Props) => {
  const [showRecurrence, setShowRecurrence] = useState(
    formData?.recurrence?.isRecurring,
  );

  const handleDateChange = (
    field: "startDate" | "endDate",
    date: Date | undefined,
  ) => {
    onUpdate({
      eventDates: {
        ...formData.eventDates,
        [field]: date || null,
        isMultiDay:
          field === "endDate" && date ? true : formData?.eventDates?.isMultiDay,
      },
    });
  };

  const handleTimeChange = (field: "startTime" | "endTime", time: string) => {
    onUpdate({
      eventDates: {
        ...formData.eventDates,
        [field]: time,
      },
    });
  };

  const handleMultiDayToggle = (isMultiDay: boolean) => {
    onUpdate({
      eventDates: {
        ...formData.eventDates,
        isMultiDay,
        endDate: isMultiDay ? formData?.eventDates?.endDate : null,
      },
    });
  };

  const handleRecurrenceToggle = (isRecurring: boolean) => {
    setShowRecurrence(isRecurring);
    onUpdate({
      recurrence: {
        ...formData.recurrence,
        isRecurring,
      },
    });
  };

  const handleRecurrenceChange = (updates: Partial<EventRecurrence>) => {
    onUpdate({
      recurrence: {
        ...formData.recurrence,
        ...updates,
      },
    });
  };

  // Get suggested times based on event type
  const getSuggestedTimes = () => {
    const eventType = formData?.eventType?.toLowerCase();
    if (eventType?.includes("wedding")) return { start: "15:00", end: "23:00" };
    if (eventType?.includes("corporate") || eventType?.includes("conference"))
      return { start: "09:00", end: "17:00" };
    if (eventType?.includes("workshop") || eventType?.includes("seminar"))
      return { start: "10:00", end: "16:00" };
    if (eventType?.includes("party") || eventType?.includes("celebration"))
      return { start: "18:00", end: "23:00" };
    if (eventType?.includes("brunch")) return { start: "10:00", end: "14:00" };
    if (eventType?.includes("dinner")) return { start: "18:00", end: "22:00" };
    return { start: "10:00", end: "16:00" };
  };

  const suggestedTimes = getSuggestedTimes();

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Event Dates & Times
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left font-normal",
                      !formData?.eventDates?.startDate &&
                        "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData?.eventDates?.startDate
                      ? format(formData.eventDates.startDate, "PPP")
                      : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={formData?.eventDates?.startDate || undefined}
                    onSelect={(date) => handleDateChange("startDate", date)}
                    initialFocus
                    className="pointer-events-auto p-3"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Multi-day Event</Label>
                <Switch
                  checked={formData?.eventDates?.isMultiDay}
                  onCheckedChange={handleMultiDayToggle}
                />
              </div>

              {formData?.eventDates?.isMultiDay && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 w-full justify-start text-left font-normal",
                        !formData.eventDates.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.eventDates.endDate
                        ? format(formData.eventDates.endDate, "PPP")
                        : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={formData.eventDates.endDate || undefined}
                      onSelect={(date) => handleDateChange("endDate", date)}
                      initialFocus
                      className="pointer-events-auto p-3"
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <Label className="text-base font-medium">Event Time</Label>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={
                    formData?.eventDates?.startTime || suggestedTimes.start
                  }
                  onChange={(e) =>
                    handleTimeChange("startTime", e.target.value)
                  }
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={formData?.eventDates?.endTime || suggestedTimes.end}
                  onChange={(e) => handleTimeChange("endTime", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select
                  value={formData?.eventDates?.timezone}
                  onValueChange={(value) =>
                    onUpdate({
                      eventDates: { ...formData.eventDates, timezone: value },
                    })
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">
                      Eastern Time
                    </SelectItem>
                    <SelectItem value="America/Chicago">
                      Central Time
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time
                    </SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Smart Time Suggestions */}
            {formData.eventType && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <div className="mb-1 flex items-center gap-2 text-blue-800">
                  <Info className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Suggested for {formData.eventType}
                  </span>
                </div>
                <p className="text-xs text-blue-600">
                  Based on your event type, we suggest {suggestedTimes.start} -{" "}
                  {suggestedTimes.end}
                </p>
              </div>
            )}
          </div>

          {/* Multi-day Notice */}
          {formData?.eventDates?.isMultiDay && (
            <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
              <div className="mb-1 flex items-center gap-2 text-purple-800">
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">Multi-day Event</span>
              </div>
              <p className="text-xs text-purple-600">
                You can create detailed schedules and sessions later in the
                Schedule module after creating your event.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recurring Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Repeat className="h-5 w-5" />
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
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="space-y-2">
                <Label>Repeat Pattern</Label>
                <Select
                  value={formData?.recurrence?.pattern}
                  onValueChange={(value) =>
                    handleRecurrenceChange({
                      pattern: value as EventRecurrence["pattern"],
                    })
                  }
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
                    value={formData?.recurrence?.frequency}
                    onChange={(e) =>
                      handleRecurrenceChange({
                        frequency: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">
                    {formData?.recurrence?.pattern === "daily" && "day(s)"}
                    {formData?.recurrence?.pattern === "weekly" && "week(s)"}
                    {formData?.recurrence?.pattern === "monthly" && "month(s)"}
                    {formData?.recurrence?.pattern === "yearly" && "year(s)"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ends</Label>
                <Select
                  value={formData?.recurrence?.endType}
                  onValueChange={(value) =>
                    handleRecurrenceChange({
                      endType: value as EventRecurrence["endType"],
                    })
                  }
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

            {formData?.recurrence?.endType === "after" && (
              <div className="space-y-2">
                <Label>Number of Occurrences</Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="e.g., 10"
                  value={(formData.recurrence.endValue as number) || ""}
                  onChange={(e) =>
                    handleRecurrenceChange({
                      endValue: parseInt(e.target.value) || undefined,
                    })
                  }
                  className="w-32"
                />
              </div>
            )}

            {formData?.recurrence?.endType === "until" && (
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData?.recurrence?.endValue &&
                          "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.recurrence.endValue
                        ? format(formData.recurrence.endValue as Date, "PPP")
                        : "Pick end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={
                        (formData.recurrence.endValue as Date) || undefined
                      }
                      onSelect={(date) =>
                        handleRecurrenceChange({ endValue: date })
                      }
                      initialFocus
                      className="pointer-events-auto p-3"
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
