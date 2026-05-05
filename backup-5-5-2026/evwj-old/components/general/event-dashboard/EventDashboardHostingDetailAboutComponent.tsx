"use client";

import { EnhancedDescriptionEditor } from "@/components/preview/create-event/EnhancedDescriptionEditor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Images } from "@/lib/lib-images";
import { getAllEvents } from "@/lib/mock-events";
import { cn } from "@/lib/utils";
import { MockEventData } from "@/type";
import { format } from "date-fns";
import {
  Box,
  Calendar as CalendarIcon,
  Car,
  ChevronDown,
  CircleQuestionMark,
  Clock,
  Globe,
  Link2,
  LockIcon,
  MapPin,
  Pencil,
  Plus,
  Save,
  ScrollText,
  Store,
  Trash2,
  Users,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaXTwitter,
} from "react-icons/fa6";
import { toast } from "sonner";

type DescriptionBlock = {
  id: string;
  type: "text" | "image" | "video";
  content: string;
  order: number;
  alt?: string;
  caption?: string;
};

const AboutComponent = memo(
  ({ isEditing = false }: { isEditing?: boolean }) => {
    const [visibility, setVisibility] = useState("public");
    const hasInitialized = useRef(false);

    // Initialize with default content if empty
    const [richTextBlocks, setRichTextBlocks] = useState<DescriptionBlock[]>(
      () => {
        // Default content as rich text blocks
        return [
          {
            id: `block-intro-${Date.now()}`,
            type: "text",
            content: `<h2>Welcome to Our Annual Tech Innovation Summit</h2>
<p>Join us for an <strong>unforgettable experience</strong> at the most anticipated technology conference of the year. This premier event brings together industry leaders, innovators, and visionaries to explore the latest trends and breakthroughs in technology.</p>

<h3>What to Expect</h3>
<ul>
  <li>Keynote presentations from <em>renowned industry experts</em></li>
  <li>Interactive workshops and hands-on demonstrations</li>
  <li>Networking opportunities with professionals from around the globe</li>
  <li>Exclusive product launches and technology showcases</li>
  <li>Panel discussions on emerging technologies and future trends</li>
</ul>

<h3>Why Attend?</h3>
<p>This summit is designed to provide attendees with <strong>actionable insights</strong> and practical knowledge that can be applied immediately. Whether you're a seasoned professional or just starting your journey in tech, you'll find valuable content tailored to your needs.</p>

<p>Don't miss this opportunity to be part of a transformative experience that will shape the future of technology!</p>`,
            order: 0,
          },
        ];
      },
    );

    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-6">
          {/* Event Visibility Section - Moved to top */}
          <div className="flex flex-col">
            <div className="space-y-2">
              <Label>Event Visibility *</Label>
              <RadioGroup
                value={visibility}
                onValueChange={setVisibility}
                disabled={!isEditing}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="public"
                    id="public"
                  />
                  <Label
                    htmlFor="public"
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>Public</span>
                    <span className="text-muted-foreground text-xs">
                      (Available to everyone)
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="private"
                    id="private"
                  />
                  <Label
                    htmlFor="private"
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <LockIcon className="h-4 w-4 text-orange-500" />
                    <span>Private</span>
                    <span className="text-muted-foreground text-xs">
                      (Invite only)
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="org_members_only"
                    id="org_members_only"
                  />
                  <Label
                    htmlFor="org_members_only"
                    className="flex cursor-pointer items-center gap-2 font-normal"
                  >
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>Org members only</span>
                    <span className="text-muted-foreground text-xs">
                      (Only visible to organization members)
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <p className="text-2xl">Description:</p>

          {isEditing ? (
            <div className="flex flex-col">
              <EnhancedDescriptionEditor
                blocks={richTextBlocks}
                onChange={(blocks) => setRichTextBlocks(blocks)}
              />
              <p className="text-muted-foreground text-xs">
                Add text, images, and videos to describe your event. Drag blocks
                to reorder them.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {richTextBlocks.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {richTextBlocks
                    .sort((a, b) => a.order - b.order)
                    .map((block) => {
                      if (block.type === "text") {
                        return (
                          <div
                            key={block.id}
                            className="prose prose-sm dark:prose-invert max-w-none text-sm"
                            dangerouslySetInnerHTML={{ __html: block.content }}
                          />
                        );
                      } else if (block.type === "image") {
                        return (
                          <div
                            key={block.id}
                            className="flex flex-col gap-2"
                          >
                            <img
                              src={block.content}
                              alt={block.alt || "Event image"}
                              className="h-auto max-w-full rounded-lg"
                            />
                            {block.caption && (
                              <p className="text-muted-foreground text-xs italic">
                                {block.caption}
                              </p>
                            )}
                          </div>
                        );
                      } else if (block.type === "video") {
                        return (
                          <div
                            key={block.id}
                            className="flex flex-col gap-2"
                          >
                            <video
                              src={block.content}
                              controls
                              className="max-w-full rounded-lg"
                            />
                            {block.caption && (
                              <p className="text-muted-foreground text-xs italic">
                                {block.caption}
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No description content added yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

type EventDate = {
  id: string;
  date: Date;
  timezone: string;
  timeSlots: {
    id: string;
    startTime: string;
    endTime: string;
  }[];
};

type DateComponentProps = {
  slug?: string;
};

const DateComponent = memo(
  ({
    slug,
    isEditing = false,
  }: DateComponentProps & { isEditing?: boolean }) => {
    // Get event data if slug is provided
    const event = useMemo<MockEventData | undefined>(() => {
      if (!slug) return undefined;
      return getAllEvents().find((e) => e.slug === slug);
    }, [slug]);

    // Initialize dates from event data or default
    const [eventDates, setEventDates] = useState<EventDate[]>(() => {
      // If event has startDate, create initial date entry
      if (event?.startDate) {
        const startDate = new Date(event.startDate);
        const nextDay = new Date(startDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return [
          {
            id: `date-${Date.now()}`,
            date: startDate,
            timezone: "America/New_York",
            timeSlots: [
              {
                id: `time-${Date.now()}`,
                startTime: "08:00",
                endTime: "17:00",
              },
            ],
          },
          {
            id: `date-${Date.now() + 1}`,
            date: nextDay,
            timezone: "America/New_York",
            timeSlots: [
              {
                id: `time-${Date.now() + 1}`,
                startTime: "08:00",
                endTime: "17:00",
              },
            ],
          },
        ];
      }
      // Default placeholder dates
      const date1 = new Date();
      date1.setDate(date1.getDate() + 30);
      const date2 = new Date(date1);
      date2.setDate(date2.getDate() + 1);
      return [
        {
          id: `date-${Date.now()}`,
          date: date1,
          timezone: "America/New_York",
          timeSlots: [
            {
              id: `time-${Date.now()}`,
              startTime: "08:00",
              endTime: "17:00",
            },
          ],
        },
        {
          id: `date-${Date.now() + 1}`,
          date: date2,
          timezone: "America/New_York",
          timeSlots: [
            {
              id: `time-${Date.now() + 1}`,
              startTime: "08:00",
              endTime: "17:00",
            },
          ],
        },
      ];
    });

    const [isAddDayDialogOpen, setIsAddDayDialogOpen] = useState(false);
    const [newDate, setNewDate] = useState<Date | undefined>(undefined);
    const [newTimezone, setNewTimezone] = useState("UTC");
    const [newStartTime, setNewStartTime] = useState("09:00");
    const [newEndTime, setNewEndTime] = useState("17:00");

    // Check if dates are consecutive
    const areDatesConsecutive = (dates: Date[]): boolean => {
      if (dates.length <= 1) return true;

      const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
      for (let i = 1; i < sorted.length; i++) {
        const prev = new Date(sorted[i - 1]);
        prev.setHours(0, 0, 0, 0);
        const curr = new Date(sorted[i]);
        curr.setHours(0, 0, 0, 0);

        const diffDays = Math.floor(
          (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (diffDays !== 1) {
          return false;
        }
      }
      return true;
    };

    // Add a new day with time slot
    const handleAddDay = () => {
      if (!newDate) return;

      // Validation: Maximum 5 days
      if (eventDates.length >= 5) {
        toast.error("Maximum of 5 days allowed for an event.");
        return;
      }

      // Validation: Check if dates are consecutive
      const allDates = [...eventDates.map((d) => d.date), newDate];
      if (!areDatesConsecutive(allDates)) {
        toast.error(
          "All event days must be consecutive. Please select a date that is the day before or after an existing date.",
        );
        return;
      }

      const newDay: EventDate = {
        id: `date-${Date.now()}`,
        date: newDate,
        timezone: newTimezone,
        timeSlots: [
          {
            id: `time-${Date.now()}`,
            startTime: newStartTime,
            endTime: newEndTime,
          },
        ],
      };

      setEventDates([...eventDates, newDay]);
      setIsAddDayDialogOpen(false);
      setNewDate(undefined);
      setNewStartTime("09:00");
      setNewEndTime("17:00");
    };

    // Remove a day
    const handleRemoveDay = (dayId: string) => {
      setEventDates(eventDates.filter((day) => day.id !== dayId));
    };

    // Update date for an existing day (with validation)
    const handleUpdateDate = (dayId: string, newDate: Date) => {
      // Validation: Check if dates are consecutive
      const allDates = eventDates.map((d) =>
        d.id === dayId ? newDate : d.date,
      );
      if (!areDatesConsecutive(allDates)) {
        toast.error(
          "All event days must be consecutive. Please select a date that is the day before or after an existing date.",
        );
        return;
      }

      setEventDates(
        eventDates.map((day) =>
          day.id === dayId ? { ...day, date: newDate } : day,
        ),
      );
    };

    // Add a time slot to an existing day
    const handleAddTimeSlot = (dayId: string) => {
      setEventDates(
        eventDates.map((day) =>
          day.id === dayId
            ? {
                ...day,
                timeSlots: [
                  ...day.timeSlots,
                  {
                    id: `time-${Date.now()}`,
                    startTime: "09:00",
                    endTime: "17:00",
                  },
                ],
              }
            : day,
        ),
      );
    };

    // Remove a time slot from a day
    const handleRemoveTimeSlot = (dayId: string, timeSlotId: string) => {
      setEventDates(
        eventDates.map((day) =>
          day.id === dayId
            ? {
                ...day,
                timeSlots: day.timeSlots.filter(
                  (slot) => slot.id !== timeSlotId,
                ),
              }
            : day,
        ),
      );
    };

    // Update time slot
    const handleUpdateTimeSlot = (
      dayId: string,
      timeSlotId: string,
      field: "startTime" | "endTime",
      value: string,
    ) => {
      setEventDates(
        eventDates.map((day) =>
          day.id === dayId
            ? {
                ...day,
                timeSlots: day.timeSlots.map((slot) =>
                  slot.id === timeSlotId ? { ...slot, [field]: value } : slot,
                ),
              }
            : day,
        ),
      );
    };

    // Format time for display
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Event Dates & Times</p>
          {isEditing && (
            <Dialog
              open={isAddDayDialogOpen}
              onOpenChange={setIsAddDayDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                >
                  <Plus className="h-4 w-4" />
                  Add Day
                </Button>
              </DialogTrigger>
              <DialogContent className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
                <DialogHeader>
                  <DialogTitle>Add Event Day</DialogTitle>
                  <DialogDescription>
                    Add a new day and time slot for your event
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label>Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between !bg-white [background-color:white] font-normal backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                        >
                          {newDate ? (
                            format(newDate, "EEEE, MMMM d, yyyy")
                          ) : (
                            <span className="text-muted-foreground">
                              Select date
                            </span>
                          )}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto !bg-white [background-color:white] p-0 backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={newDate}
                          onSelect={(date) => setNewDate(date)}
                          disabled={(date) => {
                            // Disable past dates
                            if (date < new Date()) return true;

                            // If there are existing dates, only allow dates that are consecutive
                            if (eventDates.length > 0) {
                              const existingDates = eventDates.map((d) => {
                                const dCopy = new Date(d.date);
                                dCopy.setHours(0, 0, 0, 0);
                                return dCopy;
                              });
                              const minDate = new Date(
                                Math.min(
                                  ...existingDates.map((d) => d.getTime()),
                                ),
                              );
                              const maxDate = new Date(
                                Math.max(
                                  ...existingDates.map((d) => d.getTime()),
                                ),
                              );

                              const dateCopy = new Date(date);
                              dateCopy.setHours(0, 0, 0, 0);

                              // Only allow the day immediately before min date or immediately after max date
                              const dayBeforeMin = new Date(minDate);
                              dayBeforeMin.setDate(dayBeforeMin.getDate() - 1);
                              const dayAfterMax = new Date(maxDate);
                              dayAfterMax.setDate(dayAfterMax.getDate() + 1);

                              const isDayBefore =
                                dateCopy.getTime() === dayBeforeMin.getTime();
                              const isDayAfter =
                                dateCopy.getTime() === dayAfterMax.getTime();

                              // Disable all dates except the day immediately before or after
                              return !(isDayBefore || isDayAfter);
                            }

                            return false;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Timezone</Label>
                    <Select
                      value={newTimezone}
                      onValueChange={setNewTimezone}
                    >
                      <SelectTrigger className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
                        {newTimezone}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">
                          Eastern Time (ET)
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time (CT)
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time (MT)
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time (PT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={newStartTime}
                        onChange={(e) => setNewStartTime(e.target.value)}
                        className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={newEndTime}
                        onChange={(e) => setNewEndTime(e.target.value)}
                        className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDayDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    {isEditing && (
                      <Button
                        onClick={handleAddDay}
                        disabled={!newDate}
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:brightness-95"
                      >
                        Add Day
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {eventDates.length === 0 ? (
          <Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <CalendarIcon className="text-muted-foreground mb-4 h-12 w-12" />
              <p className="text-muted-foreground text-center">
                No dates added yet. Click "Add Day" to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {eventDates.map((day, dayIndex) => (
              <Card
                key={day.id}
                className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3"
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    {/* Day Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <div className="flex flex-col">
                          <p className="text-lg font-semibold">
                            {format(day.date, "EEEE, MMMM d, yyyy")}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Timezone: {day.timezone}
                          </p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveDay(day.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <Separator />

                    {/* Time Slots */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm font-medium">
                          Time Slots
                        </p>
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddTimeSlot(day.id)}
                            className="flex items-center gap-2 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                          >
                            <Plus className="h-3 w-3" />
                            Add Time
                          </Button>
                        )}
                      </div>

                      {day.timeSlots.length === 0 ? (
                        <p className="text-muted-foreground py-4 text-center text-sm">
                          No time slots for this day. Click "Add Time" to add
                          one.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {day.timeSlots.map((slot, slotIndex) => (
                            <div
                              key={slot.id}
                              className="flex items-center gap-3 rounded-lg border !bg-white [background-color:white] p-3 backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                            >
                              <Clock className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                              <div className="grid flex-1 grid-cols-2 gap-2">
                                <div className="flex flex-col gap-1">
                                  <Label className="text-muted-foreground text-xs">
                                    Start Time
                                  </Label>
                                  <Input
                                    type="time"
                                    value={slot.startTime}
                                    onChange={(e) =>
                                      handleUpdateTimeSlot(
                                        day.id,
                                        slot.id,
                                        "startTime",
                                        e.target.value,
                                      )
                                    }
                                    className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label className="text-muted-foreground text-xs">
                                    End Time
                                  </Label>
                                  <Input
                                    type="time"
                                    value={slot.endTime}
                                    onChange={(e) =>
                                      handleUpdateTimeSlot(
                                        day.id,
                                        slot.id,
                                        "endTime",
                                        e.target.value,
                                      )
                                    }
                                    className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                                  />
                                </div>
                              </div>
                              {day.timeSlots.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    isEditing &&
                                    handleRemoveTimeSlot(day.id, slot.id)
                                  }
                                  className={`flex-shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 ${!isEditing ? "hidden" : ""}`}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  },
);

type PhysicalLocation = {
  id: string;
  name: string;
  address: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  capacity?: string;
  specialFeatures?: string;
};

type VirtualLocation = {
  id: string;
  link: string;
  description?: string;
};

type LocationComponentProps = {
  slug?: string;
};

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
// Component to fit bounds when multiple locations exist
// Must be a child of MapContainer to use useMap hook
const FitBoundsInner = dynamic(
  () =>
    Promise.resolve().then(async () => {
      if (typeof window === "undefined") {
        return function FitBoundsInner() {
          return null;
        };
      }

      const { useMap } = await import("react-leaflet");
      return function FitBoundsInner({
        locations,
      }: {
        locations: PhysicalLocation[];
      }) {
        const map = useMap();

        useEffect(() => {
          if (!map || typeof window === "undefined") return;

          const locationsWithCoords = locations.filter(
            (loc) => loc.latitude && loc.longitude,
          );

          if (locationsWithCoords.length === 0) return;
          if (locationsWithCoords.length === 1) {
            map.setView(
              [
                locationsWithCoords[0].latitude!,
                locationsWithCoords[0].longitude!,
              ],
              13,
            );
            return;
          }

          // Fit bounds for multiple locations
          import("leaflet").then((L) => {
            const bounds = L.latLngBounds(
              locationsWithCoords.map((loc) => [loc.latitude!, loc.longitude!]),
            );
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
          });
        }, [map, locations]);

        return null;
      };
    }),
  { ssr: false },
);

const LocationComponent = memo(
  ({
    slug,
    isEditing = false,
  }: LocationComponentProps & { isEditing?: boolean }) => {
    const [locationType, setLocationType] = useState<
      "physical" | "virtual" | "hybrid"
    >("physical");
    const [physicalLocations, setPhysicalLocations] = useState<
      PhysicalLocation[]
    >([]);
    const [virtualLocations, setVirtualLocations] = useState<VirtualLocation[]>(
      [],
    );
    const [isMounted, setIsMounted] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState<
      Record<string, Array<{ display_name: string; lat: string; lon: string }>>
    >({});
    const [showSuggestions, setShowSuggestions] = useState<
      Record<string, boolean>
    >({});
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<
      Record<string, boolean>
    >({});
    const debounceTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
    const [locationIcon, setLocationIcon] = useState<any>(null);

    // Initialize Leaflet icon on client side only
    useEffect(() => {
      if (typeof window === "undefined") return;

      const initIcon = async () => {
        const L = await import("leaflet");
        // Dynamically load CSS
        if (typeof window !== "undefined") {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          link.integrity =
            "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
          link.crossOrigin = "";
          if (!document.querySelector(`link[href="${link.href}"]`)) {
            document.head.appendChild(link);
          }
        }

        // Fix Leaflet default icon paths
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Create custom marker icon
        const icon = L.divIcon({
          className: "custom-location-marker",
          html: `
					<div style="
						background: #8b5cf6;
						width: 32px;
						height: 32px;
						border-radius: 50% 50% 50% 0;
						transform: rotate(-45deg);
						border: 3px solid white;
						box-shadow: 0 2px 8px rgba(0,0,0,0.3);
						display: flex;
						align-items: center;
						justify-content: center;
					">
						<div style="
							transform: rotate(45deg);
							color: white;
							font-size: 16px;
						">📍</div>
					</div>
				`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        setLocationIcon(icon);
      };

      initIcon();
    }, []);

    // Get event data if slug is provided
    const event = useMemo<MockEventData | undefined>(() => {
      if (!slug) return undefined;
      return getAllEvents().find((e) => e.slug === slug);
    }, [slug]);

    // Initialize from event data
    useEffect(() => {
      setIsMounted(true);
      if (event?.latitude && event?.longitude && event?.locationMap) {
        setPhysicalLocations([
          {
            id: `location-${Date.now()}`,
            name: event.locationMap,
            address: event.locationMap,
            latitude: event.latitude,
            longitude: event.longitude,
          },
        ]);
      } else {
        // Default placeholder location - Times Square, New York
        setPhysicalLocations([
          {
            id: `location-${Date.now()}`,
            name: "Times Square",
            address: "Times Square, New York, NY 10036, United States",
            latitude: 40.758,
            longitude: -73.9855,
          },
        ]);
      }
    }, [event]);

    // Cleanup debounce timeouts on unmount
    useEffect(() => {
      return () => {
        Object.values(debounceTimeouts.current).forEach((timeout) => {
          if (timeout) clearTimeout(timeout);
        });
      };
    }, []);

    // Fetch address suggestions from Nominatim
    const fetchAddressSuggestions = useCallback(
      async (locationId: string, query: string): Promise<void> => {
        if (!query.trim() || query.length < 3) {
          setAddressSuggestions((prev) => ({ ...prev, [locationId]: [] }));
          setShowSuggestions((prev) => ({ ...prev, [locationId]: false }));
          return;
        }

        setIsLoadingSuggestions((prev) => ({ ...prev, [locationId]: true }));

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              query,
            )}&format=json&limit=5&addressdetails=1`,
            {
              headers: {
                "User-Agent": "EventDome/1.0",
              },
              signal: controller.signal,
            },
          );

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error("Failed to fetch suggestions");
          }

          const data = await response.json();
          setAddressSuggestions((prev) => ({
            ...prev,
            [locationId]: data || [],
          }));
          setShowSuggestions((prev) => ({ ...prev, [locationId]: true }));
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            console.warn("Address autocomplete error:", error.message);
          }
          setAddressSuggestions((prev) => ({ ...prev, [locationId]: [] }));
        } finally {
          setIsLoadingSuggestions((prev) => ({ ...prev, [locationId]: false }));
        }
      },
      [],
    );

    // Debounced search function
    const debouncedSearch = useCallback(
      (locationId: string, query: string) => {
        if (debounceTimeouts.current[locationId]) {
          clearTimeout(debounceTimeouts.current[locationId]);
        }
        debounceTimeouts.current[locationId] = setTimeout(() => {
          fetchAddressSuggestions(locationId, query);
        }, 300); // 300ms debounce
      },
      [fetchAddressSuggestions],
    );

    // Handle address selection from suggestions
    const handleAddressSelect = useCallback(
      (
        locationId: string,
        suggestion: { display_name: string; lat: string; lon: string },
      ) => {
        setPhysicalLocations((prev) =>
          prev.map((loc) =>
            loc.id === locationId
              ? {
                  ...loc,
                  address: suggestion.display_name,
                  latitude: parseFloat(suggestion.lat),
                  longitude: parseFloat(suggestion.lon),
                }
              : loc,
          ),
        );
        setShowSuggestions((prev) => ({ ...prev, [locationId]: false }));
        setAddressSuggestions((prev) => ({ ...prev, [locationId]: [] }));
        toast.success("Address selected and geocoded");
      },
      [],
    );

    // Add physical location
    const handleAddPhysicalLocation = () => {
      const newLocation: PhysicalLocation = {
        id: `location-${Date.now()}`,
        name: "",
        address: "",
      };
      setPhysicalLocations([...physicalLocations, newLocation]);
    };

    // Remove physical location
    const handleRemovePhysicalLocation = (id: string) => {
      setPhysicalLocations(physicalLocations.filter((loc) => loc.id !== id));
    };

    // Update physical location
    const handleUpdatePhysicalLocation = useCallback(
      (
        id: string,
        field: keyof PhysicalLocation,
        value: string | number | undefined,
      ) => {
        setPhysicalLocations((prev) =>
          prev.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc)),
        );
      },
      [],
    );

    // Add virtual location
    const handleAddVirtualLocation = () => {
      const newLocation: VirtualLocation = {
        id: `virtual-${Date.now()}`,
        link: "",
      };
      setVirtualLocations([...virtualLocations, newLocation]);
    };

    // Remove virtual location
    const handleRemoveVirtualLocation = (id: string) => {
      setVirtualLocations(virtualLocations.filter((loc) => loc.id !== id));
    };

    // Update virtual location
    const handleUpdateVirtualLocation = (
      id: string,
      field: keyof VirtualLocation,
      value: string,
    ) => {
      setVirtualLocations(
        virtualLocations.map((loc) =>
          loc.id === id ? { ...loc, [field]: value } : loc,
        ),
      );
    };

    // Calculate map center and bounds
    const mapCenter = useMemo(() => {
      const locationsWithCoords = physicalLocations.filter(
        (loc) => loc.latitude && loc.longitude,
      );
      if (locationsWithCoords.length === 0) {
        return [40.7128, -74.006] as [number, number]; // Default to NYC
      }
      if (locationsWithCoords.length === 1) {
        return [
          locationsWithCoords[0].latitude!,
          locationsWithCoords[0].longitude!,
        ] as [number, number];
      }
      // Center of multiple locations
      const avgLat =
        locationsWithCoords.reduce((sum, loc) => sum + loc.latitude!, 0) /
        locationsWithCoords.length;
      const avgLng =
        locationsWithCoords.reduce((sum, loc) => sum + loc.longitude!, 0) /
        locationsWithCoords.length;
      return [avgLat, avgLng] as [number, number];
    }, [physicalLocations]);

    const showPhysical =
      locationType === "physical" || locationType === "hybrid";
    const showVirtual = locationType === "virtual" || locationType === "hybrid";

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Event Locations</p>
        </div>

        {/* Location Type Selector */}
        <div className="flex flex-col gap-2">
          <Label>Location Type</Label>
          <Select
            value={locationType}
            onValueChange={(value) =>
              setLocationType(value as "physical" | "virtual" | "hybrid")
            }
          >
            <SelectTrigger className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
              {locationType === "physical"
                ? "Physical Location"
                : locationType === "virtual"
                  ? "Virtual Event"
                  : "Hybrid (Physical + Virtual)"}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physical">Physical Location</SelectItem>
              <SelectItem value="virtual">Virtual Event</SelectItem>
              <SelectItem value="hybrid">
                Hybrid (Physical + Virtual)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Physical Locations Section */}
        {showPhysical && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Physical Locations</p>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddPhysicalLocation}
                  className="flex items-center gap-2 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                >
                  <Plus className="h-4 w-4" />
                  Add Location
                </Button>
              )}
            </div>

            {physicalLocations.length === 0 ? (
              <Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <MapPin className="text-muted-foreground mb-4 h-12 w-12" />
                  <p className="text-muted-foreground text-center">
                    No physical locations added yet. Click "Add Location" to get
                    started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {physicalLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              isEditing &&
                              handleRemovePhysicalLocation(location.id)
                            }
                            className={`text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 ${!isEditing ? "hidden" : ""}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm">Location Name</Label>
                            <Input
                              placeholder="e.g., The Grand Ballroom"
                              value={location.name}
                              onChange={(e) =>
                                handleUpdatePhysicalLocation(
                                  location.id,
                                  "name",
                                  e.target.value,
                                )
                              }
                              className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label className="text-sm">Address</Label>
                            <div className="relative flex-1">
                              <Input
                                placeholder="Start typing an address..."
                                value={location.address || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Update address
                                  setPhysicalLocations((prev) =>
                                    prev.map((loc) =>
                                      loc.id === location.id
                                        ? {
                                            ...loc,
                                            address: value,
                                            // Clear coordinates when address is manually changed
                                            ...(loc.latitude && loc.longitude
                                              ? {
                                                  latitude: undefined,
                                                  longitude: undefined,
                                                }
                                              : {}),
                                          }
                                        : loc,
                                    ),
                                  );
                                  // Trigger autocomplete search
                                  if (value.trim().length >= 3) {
                                    debouncedSearch(location.id, value);
                                  } else {
                                    // Clear suggestions if query is too short
                                    setShowSuggestions((prev) => ({
                                      ...prev,
                                      [location.id]: false,
                                    }));
                                    setAddressSuggestions((prev) => ({
                                      ...prev,
                                      [location.id]: [],
                                    }));
                                  }
                                }}
                                onFocus={() => {
                                  if (
                                    location.address &&
                                    location.address.length >= 3
                                  ) {
                                    setShowSuggestions((prev) => ({
                                      ...prev,
                                      [location.id]: true,
                                    }));
                                  }
                                }}
                                onBlur={() => {
                                  // Delay hiding suggestions to allow click
                                  setTimeout(() => {
                                    setShowSuggestions((prev) => ({
                                      ...prev,
                                      [location.id]: false,
                                    }));
                                  }, 200);
                                }}
                                className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                              />
                              {showSuggestions[location.id] &&
                                ((addressSuggestions[location.id]?.length ??
                                  0) > 0 ||
                                  isLoadingSuggestions[location.id]) && (
                                  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg dark:bg-[#020617]">
                                    {isLoadingSuggestions[location.id] ? (
                                      <div className="text-muted-foreground p-3 text-center text-sm">
                                        Searching...
                                      </div>
                                    ) : (addressSuggestions[location.id]
                                        ?.length ?? 0) > 0 ? (
                                      <div className="p-1">
                                        {addressSuggestions[location.id]?.map(
                                          (suggestion, index) => (
                                            <button
                                              key={index}
                                              type="button"
                                              onMouseDown={(e) => {
                                                e.preventDefault(); // Prevent input blur
                                                handleAddressSelect(
                                                  location.id,
                                                  suggestion,
                                                );
                                              }}
                                              className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-start gap-2 rounded-sm px-3 py-2 text-left text-sm transition-colors"
                                            >
                                              <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                                              <span className="flex-1">
                                                {suggestion.display_name}
                                              </span>
                                            </button>
                                          ),
                                        )}
                                      </div>
                                    ) : (
                                      <div className="text-muted-foreground p-3 text-center text-sm">
                                        No suggestions found
                                      </div>
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>

                          {location.latitude && location.longitude && (
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {location.latitude.toFixed(6)},{" "}
                                {location.longitude.toFixed(6)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Map Display */}
                {isMounted &&
                  physicalLocations.some(
                    (loc) => loc.latitude && loc.longitude,
                  ) && (
                    <Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3">
                      <CardContent className="p-0">
                        <div className="h-[400px] w-full overflow-hidden rounded-lg">
                          <MapContainer
                            center={mapCenter}
                            zoom={physicalLocations.length > 1 ? 10 : 13}
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            scrollWheelZoom={true}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {locationIcon &&
                              physicalLocations.map(
                                (location) =>
                                  location.latitude &&
                                  location.longitude && (
                                    <Marker
                                      key={location.id}
                                      position={[
                                        location.latitude,
                                        location.longitude,
                                      ]}
                                      icon={locationIcon}
                                    >
                                      <Popup>
                                        <div className="p-2">
                                          <p className="font-semibold">
                                            {location.name || "Location"}
                                          </p>
                                          <p className="text-muted-foreground text-sm">
                                            {location.address}
                                          </p>
                                        </div>
                                      </Popup>
                                    </Marker>
                                  ),
                              )}
                            <FitBoundsInner locations={physicalLocations} />
                          </MapContainer>
                        </div>
                      </CardContent>
                    </Card>
                  )}
              </div>
            )}
          </div>
        )}

        {/* Virtual Locations Section */}
        {showVirtual && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">Virtual Locations</p>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddVirtualLocation}
                  className="flex items-center gap-2 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                >
                  <Plus className="h-4 w-4" />
                  Add Link
                </Button>
              )}
            </div>

            {virtualLocations.length === 0 ? (
              <Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Link2 className="text-muted-foreground mb-4 h-12 w-12" />
                  <p className="text-muted-foreground text-center">
                    No virtual links added yet. Click "Add Link" to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex flex-col gap-4">
                {virtualLocations.map((location) => (
                  <Card
                    key={location.id}
                    className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between">
                          <Link2 className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              isEditing &&
                              handleRemoveVirtualLocation(location.id)
                            }
                            className={`text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 ${!isEditing ? "hidden" : ""}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm">
                              Virtual Meeting Link
                            </Label>
                            <Input
                              type="url"
                              placeholder="https://zoom.us/j/..."
                              value={location.link}
                              onChange={(e) =>
                                handleUpdateVirtualLocation(
                                  location.id,
                                  "link",
                                  e.target.value,
                                )
                              }
                              className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                            />
                          </div>

                          <div className="flex flex-col gap-2">
                            <Label className="text-sm">
                              Description (Optional)
                            </Label>
                            <Input
                              placeholder="e.g., Online meeting arrangement"
                              value={location.description || ""}
                              onChange={(e) =>
                                handleUpdateVirtualLocation(
                                  location.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                              className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                            />
                          </div>

                          {location.link && (
                            <a
                              href={location.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
                            >
                              <Link2 className="h-4 w-4" />
                              {location.link}
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

type LogisticsData = {
  ageRestriction: {
    enabled: boolean;
    preset?: string;
    minAge?: number;
    maxAge?: number;
    minAgeEnabled: boolean;
    maxAgeEnabled: boolean;
    guardianRequired: boolean;
    customMessage?: string;
  };
  checkIn: {
    enabled: boolean;
    startTime?: string;
    allowEarly: boolean;
    allowLate: boolean;
    instructions?: string;
  };
  parking: {
    enabled: boolean;
    type?: string;
    validationAvailable: boolean;
    reservationRequired: boolean;
    details?: string;
  };
};

const LogisticComponent = memo(
  ({ isEditing = false }: { isEditing?: boolean }) => {
    const restrictionPresets = useMemo(
      () => [
        "18+ Adults Only",
        "21+ Adults Only",
        "13+ Teenagers & Adults",
        "All Ages Welcome",
        "Kids Event (Under 12)",
        "Family Friendly",
      ],
      [],
    );

    const parkingTypes = useMemo(
      () => [
        "Free Parking",
        "Paid Parking",
        "Valet Service",
        "Street Parking",
        "Parking Garage",
        "Parking Lot",
      ],
      [],
    );

    const [logistics, setLogistics] = useState<LogisticsData>({
      ageRestriction: {
        enabled: true,
        preset: "All Ages Welcome",
        minAgeEnabled: false,
        maxAgeEnabled: false,
        guardianRequired: false,
      },
      checkIn: {
        enabled: true,
        allowEarly: true,
        allowLate: false,
      },
      parking: {
        enabled: true,
        type: "Paid Parking",
        validationAvailable: true,
        reservationRequired: false,
      },
    });

    const updateAgeRestriction = (field: string, value: any) => {
      setLogistics((prev) => ({
        ...prev,
        ageRestriction: {
          ...prev.ageRestriction,
          [field]: value,
        },
      }));
    };

    const updateCheckIn = (field: string, value: any) => {
      setLogistics((prev) => ({
        ...prev,
        checkIn: {
          ...prev.checkIn,
          [field]: value,
        },
      }));
    };

    const updateParking = (field: string, value: any) => {
      setLogistics((prev) => ({
        ...prev,
        parking: {
          ...prev.parking,
          [field]: value,
        },
      }));
    };

    return (
      <div className="flex flex-col gap-6">
        <p className="text-2xl font-semibold">Event Logistics</p>
        <p className="text-muted-foreground text-sm">
          Age restrictions, check-in times, and parking details
        </p>

        <Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3">
          <CardContent className="p-4">
            <div className="flex flex-col gap-6">
              {/* Age Restriction Section */}
              <div className="flex flex-col gap-4">
                <Label className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  <span>Age Restriction</span>
                  <Switch
                    checked={logistics.ageRestriction.enabled}
                    onCheckedChange={(checked) =>
                      updateAgeRestriction("enabled", checked)
                    }
                    disabled={!isEditing}
                  />
                </Label>

                {logistics.ageRestriction.enabled && (
                  <div className="flex flex-col gap-4 pl-7">
                    <CardTitle className="text-base">
                      Configure Age Requirements
                    </CardTitle>

                    <div className="flex flex-col gap-4">
                      <p className="text-sm font-medium">Quick Presets</p>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {restrictionPresets.map((preset) => (
                          <Button
                            key={preset}
                            variant={
                              logistics.ageRestriction.preset === preset
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              isEditing &&
                              updateAgeRestriction("preset", preset)
                            }
                            disabled={!isEditing}
                            className={
                              logistics.ageRestriction.preset === preset
                                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 dark:from-purple-500 dark:to-cyan-500 dark:hover:from-purple-600 dark:hover:to-cyan-600"
                                : "!bg-white [background-color:white] backdrop-blur-sm dark:border-slate-600 dark:!bg-[#020617] dark:[background-color:#020617] dark:text-slate-200"
                            }
                          >
                            {preset}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <CardTitle className="text-base">
                        Custom Configuration
                      </CardTitle>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <Label className="flex items-center justify-between">
                            <span>Minimum Age</span>
                            <Switch
                              checked={logistics.ageRestriction.minAgeEnabled}
                              onCheckedChange={(checked) =>
                                updateAgeRestriction("minAgeEnabled", checked)
                              }
                              disabled={!isEditing}
                            />
                          </Label>
                          {logistics.ageRestriction.minAgeEnabled && (
                            <Input
                              type="number"
                              placeholder="eg: 12"
                              value={logistics.ageRestriction.minAge || ""}
                              onChange={(e) =>
                                updateAgeRestriction(
                                  "minAge",
                                  parseInt(e.target.value) || undefined,
                                )
                              }
                              disabled={!isEditing}
                              className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label className="flex items-center justify-between">
                            <span>Maximum Age</span>
                            <Switch
                              checked={logistics.ageRestriction.maxAgeEnabled}
                              onCheckedChange={(checked) =>
                                updateAgeRestriction("maxAgeEnabled", checked)
                              }
                              disabled={!isEditing}
                            />
                          </Label>
                          {logistics.ageRestriction.maxAgeEnabled && (
                            <Input
                              type="number"
                              placeholder="eg: 80"
                              value={logistics.ageRestriction.maxAge || ""}
                              onChange={(e) =>
                                updateAgeRestriction(
                                  "maxAge",
                                  parseInt(e.target.value) || undefined,
                                )
                              }
                              disabled={!isEditing}
                              className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                            />
                          )}
                        </div>
                      </div>

                      <Label className="flex items-center justify-between">
                        <span>Minors must be accompanied by guardian</span>
                        <Switch
                          checked={logistics.ageRestriction.guardianRequired}
                          onCheckedChange={(checked) =>
                            updateAgeRestriction("guardianRequired", checked)
                          }
                          disabled={!isEditing}
                        />
                      </Label>

                      <div className="flex flex-col gap-2">
                        <Label>Custom Message (Optional)</Label>
                        <Textarea
                          placeholder="eg: Valid ID required for verification"
                          value={logistics.ageRestriction.customMessage || ""}
                          onChange={(e) =>
                            updateAgeRestriction(
                              "customMessage",
                              e.target.value,
                            )
                          }
                          disabled={!isEditing}
                          rows={4}
                          className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);

const VendorBoothComponent = memo(
  ({ isEditing = false }: { isEditing?: boolean }) => {
    return <div className="">Vendor Booth Component</div>;
  },
);

type SpecialGuest = {
  id: string;
  profilePhoto?: string;
  fullName: string;
  title: string;
  bio?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  spotify?: string;
};

// URL validation functions
const validateURL = (url: string, domain: string): boolean => {
  if (!url.trim()) return true; // Empty is allowed
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    return urlObj.hostname.includes(domain);
  } catch {
    return false;
  }
};

const validateWebsite = (url: string): boolean => {
  if (!url.trim()) return true;
  try {
    new URL(url.startsWith("http") ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

const SpecialGuestsComponent = memo(
  ({ isEditing = false }: { isEditing?: boolean }) => {
    const [specialGuests, setSpecialGuests] = useState<SpecialGuest[]>(() => [
      {
        id: `guest-${Date.now()}`,
        profilePhoto: Images.avatarOne,
        fullName: "Sarah Johnson",
        title: "Keynote Speaker",
        bio: "Renowned technology innovator with over 15 years of experience in AI and machine learning.",
        website: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
        spotify: "",
      },
      {
        id: `guest-${Date.now() + 1}`,
        profilePhoto: Images.avatarTwo,
        fullName: "Michael Chen",
        title: "Industry Expert",
        bio: "Leading entrepreneur and founder of multiple successful tech startups.",
        website: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
        spotify: "",
      },
      {
        id: `guest-${Date.now() + 2}`,
        profilePhoto: Images.avatarThree,
        fullName: "Emily Rodriguez",
        title: "Thought Leader",
        bio: "Award-winning author and consultant specializing in digital transformation.",
        website: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
        spotify: "",
      },
    ]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
    const [deletingGuestId, setDeletingGuestId] = useState<string | null>(null);
    const [showMore, setShowMore] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState<SpecialGuest | null>(null);
    const [isBioDialogOpen, setIsBioDialogOpen] = useState(false);
    const [newGuest, setNewGuest] = useState<Partial<SpecialGuest>>({
      fullName: "",
      title: "",
      bio: "",
      website: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: "",
      spotify: "",
    });
    const [profilePhotoPreview, setProfilePhotoPreview] = useState<string>("");
    const [urlErrors, setUrlErrors] = useState<Record<string, string>>({});

    // Handle profile photo upload
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setProfilePhotoPreview(result);
          setNewGuest((prev) => ({ ...prev, profilePhoto: result }));
        };
        reader.readAsDataURL(file);
      }
    };

    // Validate URLs before saving
    const validateAllUrls = (): boolean => {
      const errors: Record<string, string> = {};

      if (newGuest.website && !validateWebsite(newGuest.website)) {
        errors.website = "Please enter a valid website URL";
      }

      if (
        newGuest.linkedin &&
        !validateURL(newGuest.linkedin, "linkedin.com")
      ) {
        errors.linkedin =
          "Please enter a valid LinkedIn URL (must contain linkedin.com)";
      }

      if (
        newGuest.twitter &&
        !validateURL(newGuest.twitter, "twitter.com") &&
        !validateURL(newGuest.twitter, "x.com")
      ) {
        errors.twitter =
          "Please enter a valid Twitter/X URL (must contain twitter.com or x.com)";
      }

      if (
        newGuest.instagram &&
        !validateURL(newGuest.instagram, "instagram.com")
      ) {
        errors.instagram =
          "Please enter a valid Instagram URL (must contain instagram.com)";
      }

      if (
        newGuest.facebook &&
        !validateURL(newGuest.facebook, "facebook.com")
      ) {
        errors.facebook =
          "Please enter a valid Facebook URL (must contain facebook.com)";
      }

      if (newGuest.spotify && !validateURL(newGuest.spotify, "spotify.com")) {
        errors.spotify =
          "Please enter a valid Spotify URL (must contain spotify.com)";
      }

      setUrlErrors(errors);
      return Object.keys(errors).length === 0;
    };

    // Add a new special guest
    const handleAddGuest = () => {
      if (!newGuest.fullName?.trim() || !newGuest.title?.trim()) {
        toast.error("Please fill in Full Name and Title/Role");
        return;
      }

      if (!validateAllUrls()) {
        toast.error("Please fix URL validation errors");
        return;
      }

      // Normalize URLs (add https:// if missing)
      const normalizeUrl = (url?: string) => {
        if (!url?.trim()) return "";
        return url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;
      };

      const guest: SpecialGuest = {
        id: `guest-${Date.now()}`,
        profilePhoto: newGuest.profilePhoto,
        fullName: newGuest.fullName,
        title: newGuest.title,
        bio: newGuest.bio,
        website: normalizeUrl(newGuest.website),
        linkedin: normalizeUrl(newGuest.linkedin),
        twitter: normalizeUrl(newGuest.twitter),
        instagram: normalizeUrl(newGuest.instagram),
        facebook: normalizeUrl(newGuest.facebook),
        spotify: normalizeUrl(newGuest.spotify),
      };

      setSpecialGuests([...specialGuests, guest]);
      setNewGuest({
        fullName: "",
        title: "",
        bio: "",
        website: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
        spotify: "",
      });
      setProfilePhotoPreview("");
      setUrlErrors({});
      setEditingGuestId(null);
      setIsAddDialogOpen(false);
      toast.success("Special guest added successfully");
    };

    // Remove a special guest
    const handleRemoveGuest = (id: string) => {
      setDeletingGuestId(id);
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
      if (deletingGuestId) {
        setSpecialGuests(
          specialGuests.filter((guest) => guest.id !== deletingGuestId),
        );
        toast.success("Special guest removed successfully");
        setDeletingGuestId(null);
      }
    };

    // Edit a special guest
    const handleEditGuest = (guest: SpecialGuest) => {
      setEditingGuestId(guest.id);
      setNewGuest({
        fullName: guest.fullName,
        title: guest.title,
        bio: guest.bio,
        website: guest.website,
        linkedin: guest.linkedin,
        twitter: guest.twitter,
        instagram: guest.instagram,
        facebook: guest.facebook,
        spotify: guest.spotify,
        profilePhoto: guest.profilePhoto,
      });
      setProfilePhotoPreview(guest.profilePhoto || "");
      setUrlErrors({});
      setIsAddDialogOpen(true);
    };

    // Update guest handler
    const handleUpdateGuest = () => {
      if (!newGuest.fullName?.trim() || !newGuest.title?.trim()) {
        toast.error("Please fill in Full Name and Title/Role");
        return;
      }

      if (!validateAllUrls()) {
        toast.error("Please fix URL validation errors");
        return;
      }

      if (!editingGuestId) return;

      // Normalize URLs (add https:// if missing)
      const normalizeUrl = (url?: string) => {
        if (!url?.trim()) return "";
        return url.startsWith("http://") || url.startsWith("https://")
          ? url
          : `https://${url}`;
      };

      setSpecialGuests(
        specialGuests.map((guest) =>
          guest.id === editingGuestId
            ? {
                ...guest,
                profilePhoto: newGuest.profilePhoto,
                fullName: newGuest.fullName || "",
                title: newGuest.title || "",
                bio: newGuest.bio,
                website: normalizeUrl(newGuest.website),
                linkedin: normalizeUrl(newGuest.linkedin),
                twitter: normalizeUrl(newGuest.twitter),
                instagram: normalizeUrl(newGuest.instagram),
                facebook: normalizeUrl(newGuest.facebook),
                spotify: normalizeUrl(newGuest.spotify),
              }
            : guest,
        ),
      );

      setNewGuest({
        fullName: "",
        title: "",
        bio: "",
        website: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
        spotify: "",
      });
      setProfilePhotoPreview("");
      setUrlErrors({});
      setEditingGuestId(null);
      setIsAddDialogOpen(false);
      toast.success("Special guest updated successfully");
    };

    const toggleShowMore = useCallback(() => {
      setShowMore(!showMore);
    }, [showMore]);

    const displayedGuests = showMore
      ? specialGuests
      : specialGuests.slice(0, 8);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-semibold">Special Guests</p>
          {isEditing && (
            <Dialog
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                >
                  <Plus className="h-4 w-4" />
                  Add Guest
                </Button>
              </DialogTrigger>
              <DialogContent className="flex max-h-screen flex-col !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
                <DialogHeader>
                  <DialogTitle>
                    {editingGuestId
                      ? "Edit Special Guest"
                      : "Add Special Guest"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingGuestId
                      ? "Update information about your VIP"
                      : "Add information about your VIPs"}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="flex flex-col gap-6">
                    {/* Profile Photo */}
                    <div className="flex flex-col gap-2">
                      <Label>Profile Photo</Label>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-20">
                          {profilePhotoPreview && (
                            <AvatarImage src={profilePhotoPreview} />
                          )}
                          <AvatarFallback>Photo</AvatarFallback>
                        </Avatar>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                        />
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <Label>Full Name *</Label>
                      <Input
                        placeholder="Guest Full Name"
                        value={newGuest.fullName || ""}
                        onChange={(e) =>
                          setNewGuest((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                      />
                    </div>

                    {/* Title / Role */}
                    <div className="flex flex-col gap-2">
                      <Label>Title / Role *</Label>
                      <Input
                        placeholder="eg: CEO, Keynote Speaker, Artist"
                        value={newGuest.title || ""}
                        onChange={(e) =>
                          setNewGuest((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                      />
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col gap-2">
                      <Label>Bio</Label>
                      <Textarea
                        placeholder="Brief biography or description of guest"
                        value={newGuest.bio || ""}
                        onChange={(e) =>
                          setNewGuest((prev) => ({
                            ...prev,
                            bio: e.target.value,
                          }))
                        }
                        rows={4}
                        className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                      />
                    </div>

                    {/* Website */}
                    <div className="flex flex-col gap-2">
                      <Label>Website</Label>
                      <Input
                        placeholder="https://website.com"
                        value={newGuest.website || ""}
                        onChange={(e) => {
                          setNewGuest((prev) => ({
                            ...prev,
                            website: e.target.value,
                          }));
                          if (urlErrors.website) {
                            setUrlErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.website;
                              return newErrors;
                            });
                          }
                        }}
                        onBlur={() => {
                          if (
                            newGuest.website &&
                            !validateWebsite(newGuest.website)
                          ) {
                            setUrlErrors((prev) => ({
                              ...prev,
                              website: "Please enter a valid website URL",
                            }));
                          }
                        }}
                        className={cn(
                          "!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]",
                          urlErrors.website && "border-red-500",
                        )}
                      />
                      {urlErrors.website && (
                        <p className="text-xs text-red-500">
                          {urlErrors.website}
                        </p>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div className="flex flex-col gap-2">
                      <Label>LinkedIn</Label>
                      <Input
                        placeholder="https://linkedin.com/in/username"
                        value={newGuest.linkedin || ""}
                        onChange={(e) => {
                          setNewGuest((prev) => ({
                            ...prev,
                            linkedin: e.target.value,
                          }));
                          if (urlErrors.linkedin) {
                            setUrlErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.linkedin;
                              return newErrors;
                            });
                          }
                        }}
                        onBlur={() => {
                          if (
                            newGuest.linkedin &&
                            !validateURL(newGuest.linkedin, "linkedin.com")
                          ) {
                            setUrlErrors((prev) => ({
                              ...prev,
                              linkedin:
                                "Please enter a valid LinkedIn URL (must contain linkedin.com)",
                            }));
                          }
                        }}
                        className={cn(
                          "!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]",
                          urlErrors.linkedin && "border-red-500",
                        )}
                      />
                      {urlErrors.linkedin && (
                        <p className="text-xs text-red-500">
                          {urlErrors.linkedin}
                        </p>
                      )}
                    </div>

                    {/* Twitter / X */}
                    <div className="flex flex-col gap-2">
                      <Label>Twitter / X</Label>
                      <Input
                        placeholder="https://twitter.com/username or https://x.com/username"
                        value={newGuest.twitter || ""}
                        onChange={(e) => {
                          setNewGuest((prev) => ({
                            ...prev,
                            twitter: e.target.value,
                          }));
                          if (urlErrors.twitter) {
                            setUrlErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.twitter;
                              return newErrors;
                            });
                          }
                        }}
                        onBlur={() => {
                          if (
                            newGuest.twitter &&
                            !validateURL(newGuest.twitter, "twitter.com") &&
                            !validateURL(newGuest.twitter, "x.com")
                          ) {
                            setUrlErrors((prev) => ({
                              ...prev,
                              twitter:
                                "Please enter a valid Twitter/X URL (must contain twitter.com or x.com)",
                            }));
                          }
                        }}
                        className={cn(
                          "!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]",
                          urlErrors.twitter && "border-red-500",
                        )}
                      />
                      {urlErrors.twitter && (
                        <p className="text-xs text-red-500">
                          {urlErrors.twitter}
                        </p>
                      )}
                    </div>

                    {/* Instagram */}
                    <div className="flex flex-col gap-2">
                      <Label>Instagram</Label>
                      <Input
                        placeholder="https://instagram.com/username"
                        value={newGuest.instagram || ""}
                        onChange={(e) => {
                          setNewGuest((prev) => ({
                            ...prev,
                            instagram: e.target.value,
                          }));
                          if (urlErrors.instagram) {
                            setUrlErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.instagram;
                              return newErrors;
                            });
                          }
                        }}
                        onBlur={() => {
                          if (
                            newGuest.instagram &&
                            !validateURL(newGuest.instagram, "instagram.com")
                          ) {
                            setUrlErrors((prev) => ({
                              ...prev,
                              instagram:
                                "Please enter a valid Instagram URL (must contain instagram.com)",
                            }));
                          }
                        }}
                        className={cn(
                          "!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]",
                          urlErrors.instagram && "border-red-500",
                        )}
                      />
                      {urlErrors.instagram && (
                        <p className="text-xs text-red-500">
                          {urlErrors.instagram}
                        </p>
                      )}
                    </div>

                    {/* Facebook */}
                    <div className="flex flex-col gap-2">
                      <Label>Facebook</Label>
                      <Input
                        placeholder="https://facebook.com/username"
                        value={newGuest.facebook || ""}
                        onChange={(e) => {
                          setNewGuest((prev) => ({
                            ...prev,
                            facebook: e.target.value,
                          }));
                          if (urlErrors.facebook) {
                            setUrlErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.facebook;
                              return newErrors;
                            });
                          }
                        }}
                        onBlur={() => {
                          if (
                            newGuest.facebook &&
                            !validateURL(newGuest.facebook, "facebook.com")
                          ) {
                            setUrlErrors((prev) => ({
                              ...prev,
                              facebook:
                                "Please enter a valid Facebook URL (must contain facebook.com)",
                            }));
                          }
                        }}
                        className={cn(
                          "!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]",
                          urlErrors.facebook && "border-red-500",
                        )}
                      />
                      {urlErrors.facebook && (
                        <p className="text-xs text-red-500">
                          {urlErrors.facebook}
                        </p>
                      )}
                    </div>

                    {/* Spotify */}
                    <div className="flex flex-col gap-2">
                      <Label>Spotify</Label>
                      <Input
                        placeholder="https://open.spotify.com/artist/..."
                        value={newGuest.spotify || ""}
                        onChange={(e) => {
                          setNewGuest((prev) => ({
                            ...prev,
                            spotify: e.target.value,
                          }));
                          if (urlErrors.spotify) {
                            setUrlErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.spotify;
                              return newErrors;
                            });
                          }
                        }}
                        onBlur={() => {
                          if (
                            newGuest.spotify &&
                            !validateURL(newGuest.spotify, "spotify.com")
                          ) {
                            setUrlErrors((prev) => ({
                              ...prev,
                              spotify:
                                "Please enter a valid Spotify URL (must contain spotify.com)",
                            }));
                          }
                        }}
                        className={cn(
                          "!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]",
                          urlErrors.spotify && "border-red-500",
                        )}
                      />
                      {urlErrors.spotify && (
                        <p className="text-xs text-red-500">
                          {urlErrors.spotify}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 border-t !bg-white [background-color:white] p-4 backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setEditingGuestId(null);
                      setNewGuest({
                        fullName: "",
                        title: "",
                        bio: "",
                        website: "",
                        linkedin: "",
                        twitter: "",
                        instagram: "",
                        facebook: "",
                        spotify: "",
                      });
                      setProfilePhotoPreview("");
                      setUrlErrors({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={
                      editingGuestId ? handleUpdateGuest : handleAddGuest
                    }
                    disabled={
                      !newGuest.fullName?.trim() || !newGuest.title?.trim()
                    }
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:brightness-95"
                  >
                    {editingGuestId ? "Update Guest" : "Add Guest"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {specialGuests.length === 0 ? (
          <Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617] py-3">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Users className="text-muted-foreground mb-4 h-12 w-12" />
              <p className="text-muted-foreground text-center">
                No special guests added yet. Click "Add Guest" to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            <div
              className={cn(
                "grid grid-cols-2 sm:grid-cols-3 gap-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7",
                {
                  "max-h-[400px] overflow-hidden": !showMore,
                  "h-fit": showMore,
                },
              )}
            >
              {displayedGuests.map((guest) => (
                <div
                  key={guest.id}
                  onClick={() => {
                    if (!isEditing) {
                      setSelectedGuest(guest);
                      setIsBioDialogOpen(true);
                    }
                  }}
                  className={cn(
                    "group relative flex  min-h-64 flex-col overflow-hidden rounded-xl",
                    !isEditing && "cursor-pointer transition-transform hover:scale-105"
                  )}
                >
                  {guest.profilePhoto ? (
                    <img
                      src={guest.profilePhoto}
                      alt={guest.fullName}
                      className="absolute inset-0 h-full w-full rounded-xl object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600" />
                  )}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-black/85" />
                  {isEditing && (
                    <div className="pointer-events-auto absolute top-2 right-2 z-20 flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleEditGuest(guest);
                        }}
                        className="pointer-events-auto z-20 text-white opacity-100 transition-opacity hover:bg-blue-500/50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleRemoveGuest(guest.id);
                        }}
                        className="pointer-events-auto z-20 text-white opacity-100 transition-opacity hover:bg-red-500/50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="pointer-events-none relative z-10 flex flex-1 flex-col items-center justify-end gap-2 pb-3 text-white">
                    <div className="pointer-events-none flex flex-col items-center px-3 text-center">
                      <p className="text-base font-semibold">
                        {guest.fullName}
                      </p>
                      <p className="text-xs text-white/90">{guest.title}</p>
                    </div>
                    {(guest.instagram ||
                      guest.facebook ||
                      guest.linkedin ||
                      guest.twitter ||
                      guest.spotify ||
                      guest.website) && (
                      <div className="pointer-events-auto flex items-center gap-1.5">
                        {guest.website && (
                          <Link
                            href={guest.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full border border-white/50 bg-white/10 p-1 backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            <Globe className="size-3" />
                          </Link>
                        )}
                        {guest.instagram && (
                          <Link
                            href={guest.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full border border-white/50 bg-white/10 p-1 backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            <FaInstagram className="size-3" />
                          </Link>
                        )}
                        {guest.facebook && (
                          <Link
                            href={guest.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full border border-white/50 bg-white/10 p-1 backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            <FaFacebook className="size-3" />
                          </Link>
                        )}
                        {guest.linkedin && (
                          <Link
                            href={guest.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full border border-white/50 bg-white/10 p-1 backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            <FaLinkedin className="size-3" />
                          </Link>
                        )}
                        {guest.twitter && (
                          <Link
                            href={guest.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full border border-white/50 bg-white/10 p-1 backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            <FaXTwitter className="size-3" />
                          </Link>
                        )}
                        {guest.spotify && (
                          <Link
                            href={guest.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full border border-white/50 bg-white/10 p-1 backdrop-blur-sm transition-colors hover:bg-white/20"
                          >
                            <FaSpotify className="size-3" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {specialGuests.length > 8 && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={toggleShowMore}
                  className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                >
                  {showMore ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Guest Bio Dialog */}
        <Dialog open={isBioDialogOpen} onOpenChange={setIsBioDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedGuest && (
              <>
                <DialogHeader>
                  <div className="flex items-start gap-4">
                    {selectedGuest.profilePhoto ? (
                      <img
                        src={selectedGuest.profilePhoto}
                        alt={selectedGuest.fullName}
                        className="h-20 w-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-purple-600 to-cyan-600 flex h-20 w-20 items-center justify-center rounded-full">
                        <Users className="h-10 w-10 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <DialogTitle className="text-2xl font-bold">
                        {selectedGuest.fullName}
                      </DialogTitle>
                      <p className="text-muted-foreground mt-1 text-lg">
                        {selectedGuest.title}
                      </p>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-6 space-y-6">
                  {selectedGuest.bio && (
                    <div>
                      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Biography
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedGuest.bio}
                      </p>
                    </div>
                  )}
                  {(selectedGuest.website ||
                    selectedGuest.linkedin ||
                    selectedGuest.twitter ||
                    selectedGuest.instagram ||
                    selectedGuest.facebook ||
                    selectedGuest.spotify) && (
                    <div>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Connect
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedGuest.website && (
                          <Link
                            href={selectedGuest.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <Globe className="h-4 w-4" />
                            Website
                          </Link>
                        )}
                        {selectedGuest.linkedin && (
                          <Link
                            href={selectedGuest.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                          >
                            <FaLinkedin className="h-4 w-4" />
                            LinkedIn
                          </Link>
                        )}
                        {selectedGuest.twitter && (
                          <Link
                            href={selectedGuest.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <FaXTwitter className="h-4 w-4" />
                            Twitter
                          </Link>
                        )}
                        {selectedGuest.instagram && (
                          <Link
                            href={selectedGuest.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700 transition-colors hover:bg-pink-100 dark:border-pink-800 dark:bg-pink-900/20 dark:text-pink-300 dark:hover:bg-pink-900/30"
                          >
                            <FaInstagram className="h-4 w-4" />
                            Instagram
                          </Link>
                        )}
                        {selectedGuest.facebook && (
                          <Link
                            href={selectedGuest.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                          >
                            <FaFacebook className="h-4 w-4" />
                            Facebook
                          </Link>
                        )}
                        {selectedGuest.spotify && (
                          <Link
                            href={selectedGuest.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30"
                          >
                            <FaSpotify className="h-4 w-4" />
                            Spotify
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          open={deletingGuestId !== null}
          onOpenChange={(open) => !open && setDeletingGuestId(null)}
          onConfirm={handleConfirmDelete}
          title="Delete Special Guest?"
          description={
            deletingGuestId
              ? `Are you sure you want to delete ${specialGuests.find((g) => g.id === deletingGuestId)?.fullName || "this guest"}? This action cannot be undone.`
              : ""
          }
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    );
  },
);

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

const FaqsComponent = memo(({ isEditing = false }: { isEditing?: boolean }) => {
  const [faqs, setFaqs] = useState<FAQ[]>(() => [
    {
      id: `faq-${Date.now()}`,
      question: "What is included in the event registration?",
      answer:
        "Event registration includes access to all keynote sessions, workshops, networking events, lunch and refreshments, event materials, and access to the event app. Premium ticket holders also receive exclusive access to VIP sessions and a welcome reception.",
    },
    {
      id: `faq-${Date.now() + 1}`,
      question: "Is there parking available at the venue?",
      answer:
        "Yes, parking is available at the venue. We offer both self-parking and valet parking options. Self-parking is available for $25 per day, while valet parking is $35 per day. We recommend arriving early as parking spaces are limited. Alternative parking options are also available nearby.",
    },
    {
      id: `faq-${Date.now() + 2}`,
      question: "What is the dress code for the event?",
      answer:
        "The dress code is business casual. We recommend comfortable attire as you'll be moving between sessions and networking areas throughout the day. The venue temperature is climate-controlled, but we suggest bringing a light jacket or sweater for your comfort.",
    },
    {
      id: `faq-${Date.now() + 3}`,
      question: "Will meals be provided during the event?",
      answer:
        "Yes, all registered attendees will receive breakfast, lunch, and refreshments during coffee breaks. We accommodate various dietary restrictions including vegetarian, vegan, gluten-free, and halal options. Please indicate your dietary requirements during registration or contact us at least 48 hours before the event.",
    },
    {
      id: `faq-${Date.now() + 4}`,
      question: "Can I get a refund if I cannot attend?",
      answer:
        "Refund requests must be submitted at least 14 days before the event date for a full refund. Refunds requested between 7-14 days before the event will receive a 50% refund. Unfortunately, we cannot provide refunds for cancellations made less than 7 days before the event. However, you may transfer your ticket to another person by contacting our support team.",
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Add a new FAQ
  const handleAddFAQ = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }

    const newFAQ: FAQ = {
      id: `faq-${Date.now()}`,
      question: newQuestion,
      answer: newAnswer,
    };

    setFaqs([...faqs, newFAQ]);
    setNewQuestion("");
    setNewAnswer("");
    setIsAddDialogOpen(false);
    toast.success("FAQ added successfully");
  };

  // Remove an FAQ
  const handleRemoveFAQ = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
    toast.success("FAQ removed successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">Frequently Asked Questions</p>
        {isEditing && (
          <Dialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
              >
                <Plus className="h-4 w-4" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="flex max-h-screen flex-col !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
              <DialogHeader>
                <DialogTitle>Add FAQ</DialogTitle>
                <DialogDescription>
                  Add a frequently asked question and its answer
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Question</Label>
                    <Input
                      placeholder="Enter the question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Answer</Label>
                    <Textarea
                      placeholder="Enter the answer"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      rows={4}
                      className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t !bg-white [background-color:white] p-4 backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddFAQ}
                  disabled={!newQuestion.trim() || !newAnswer.trim()}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:brightness-95"
                >
                  Add FAQ
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {faqs.length === 0 ? (
        <Card className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CircleQuestionMark className="text-muted-foreground mb-4 h-12 w-12" />
            <p className="text-muted-foreground text-center">
              No FAQs added yet. Click "Add FAQ" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-2"
        >
          {faqs.map((faq, index) => (
            <Card
              key={faq.id}
              className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
            >
              <CardContent className="p-0">
                <AccordionItem
                  value={String(index)}
                  className="border-none px-6"
                >
                  <div className="flex items-center justify-between py-4">
                    <AccordionTrigger className="flex-1 py-0 text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFAQ(faq.id)}
                        className="ml-2 flex-shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <AccordionContent className="pt-0 pb-4">
                    <p className="text-muted-foreground text-sm">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </CardContent>
            </Card>
          ))}
        </Accordion>
      )}
    </div>
  );
});

const tabsData = [
  {
    name: "Overview",
    BtnIcon: ScrollText,
    componentItem: AboutComponent,
  },
  {
    name: "Dates",
    BtnIcon: CalendarIcon,
    componentItem: DateComponent,
  },
  {
    name: "Locations",
    BtnIcon: MapPin,
    componentItem: LocationComponent,
  },
  {
    name: "Logistics",
    BtnIcon: Box,
    componentItem: LogisticComponent,
  },
  {
    name: "Vendor Booths",
    BtnIcon: Store,
    componentItem: VendorBoothComponent,
  },
  {
    name: "Special Guests",
    BtnIcon: Users,
    componentItem: SpecialGuestsComponent,
  },
  {
    name: "FAQs",
    BtnIcon: CircleQuestionMark,
    componentItem: FaqsComponent,
  },
];

const TabsTriggerComponent = memo(() =>
  tabsData?.map((item, index) => (
    <TabsTrigger
      key={index}
      value={item?.name}
      className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg dark:text-slate-300"
    >
      {item?.BtnIcon && <item.BtnIcon className="h-4 w-4" />}
      <span>{item?.name}</span>
    </TabsTrigger>
  )),
);
// Wrapper component to manage edit state for each tab
const TabContentWrapper = memo(
  ({
    tabName,
    children,
    onSave,
  }: {
    tabName: string;
    children: (isEditing: boolean) => React.ReactNode;
    onSave?: () => void;
  }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
      if (onSave) {
        onSave();
      }
      setIsEditing(false);
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 !bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
              >
                <Pencil className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="!bg-white [background-color:white] backdrop-blur-sm dark:!bg-[#020617] dark:[background-color:#020617]"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 dark:from-purple-500 dark:to-cyan-500 dark:hover:from-purple-600 dark:hover:to-cyan-600"
                >
                  <Save className="mr-2 h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        {children(isEditing)}
      </div>
    );
  },
);

const TabsContentComponent = memo(({ slug }: { slug?: string }) =>
  tabsData?.map((item, index) => (
    <TabsContent
      key={index}
      value={item?.name}
    >
      <TabContentWrapper
        tabName={item?.name}
        onSave={() => {
          // Handle save logic for each tab
          toast.success(`${item?.name} saved successfully`);
        }}
      >
        {(isEditing) =>
          item?.componentItem &&
          (item.name === "Dates" || item.name === "Locations" ? (
            <item.componentItem
              slug={slug}
              isEditing={isEditing}
            />
          ) : (
            <item.componentItem isEditing={isEditing} />
          ))
        }
      </TabContentWrapper>
    </TabsContent>
  )),
);

type EventDashboardHostingDetailAboutComponentProps = {
  slug?: string;
};

export default function EventDashboardHostingDetailAboutComponent({
  slug,
}: EventDashboardHostingDetailAboutComponentProps = {}) {
  const [selectedTab, setSelectedTab] = useState(tabsData[0]?.name || "");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          {/* Mobile/Tablet: Dropdown Select */}
          <div className="lg:hidden mb-4">
            <Select value={selectedTab} onValueChange={setSelectedTab}>
              <SelectTrigger className="w-fit min-w-[200px] !bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617] border border-gray-200 dark:border-gray-700 h-11">
                <SelectValue>
                  {(() => {
                    const currentTab = tabsData.find((tab) => tab.name === selectedTab);
                    if (!currentTab) return null;
                    const IconComponent = currentTab.BtnIcon;
                    return (
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 text-gray-700 dark:text-slate-300" />
                        )}
                        <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                          {currentTab.name}
                        </span>
                      </div>
                    );
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="!bg-white dark:!bg-[#020617] backdrop-blur-sm [background-color:white] dark:[background-color:#020617]">
                {tabsData.map((item, index) => {
                  const IconComponent = item.BtnIcon;
                  return (
                    <SelectItem key={index} value={item.name}>
                      <div className="flex items-center gap-2">
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 text-gray-700 dark:text-slate-300" />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop: Tab List */}
          <TabsList className="hidden lg:flex 2xs:*:*:nth-1:size-5! h-full w-full !bg-white [background-color:white] p-0 backdrop-blur-sm *:cursor-pointer *:py-2 *:*:nth-2:hidden md:*:w-1/8 md:*:hover:underline md:*:data-[state=inactive]:font-normal md:*:*:nth-1:size-4! md:*:*:nth-2:block md:*:*:nth-2:truncate lg:*:w-full 2xl:*:*:nth-1:size-5! 2xl:*:*:nth-2:text-base dark:!bg-[#020617] dark:[background-color:#020617]">
            <TabsTriggerComponent />
          </TabsList>
          <TabsContentComponent slug={slug} />
        </Tabs>
      </div>
    </div>
  );
}
