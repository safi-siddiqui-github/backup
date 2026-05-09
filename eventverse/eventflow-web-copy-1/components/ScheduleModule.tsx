"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { addDays, format } from "date-fns";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  Clock,
  Edit,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface ScheduleItem {
  id: number;
  title: string;
  type: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  notificationMessage: string;
  notificationTime: number;
}

interface EventProps {
  eventName: string;
  startDate: Date | string;
  endDate?: Date | string;
  locations: Array<{ name: string; address?: string }>;
}

interface ScheduleModuleProps {
  event: EventProps;
  onBack: () => void;
}

const agendaTypes = [
  "Registration",
  "Welcome",
  "Keynote",
  "Session",
  "Workshop",
  "Break",
  "Lunch",
  "Dinner",
  "Networking",
  "Reception",
  "Entertainment",
  "Closing",
  "Check-out",
  "Transportation",
];

const notificationOptions = [
  { value: 5, label: "5 minutes" },
  { value: 10, label: "10 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 hour" },
  { value: 120, label: "2 hours" },
  { value: 240, label: "4 hours" },
  { value: 1440, label: "1 day" },
];

const ScheduleModule = ({ event, onBack }: ScheduleModuleProps) => {
  // Ensure dates are proper Date objects
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
  const [selectedDate, setSelectedDate] = useState<Date>(eventStartDate);
  const [showAddAgenda, setShowAddAgenda] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    {
      id: 1,
      title: "Registration & Welcome",
      type: "Registration",
      date: eventStartDate,
      startTime: "09:00",
      endTime: "09:30",
      location: event.locations[0]?.name || "Main Hall",
      description: "Guest registration and welcome reception",
      notificationMessage: "Welcome! Please proceed to registration.",
      notificationTime: 5,
    },
    {
      id: 2,
      title: "Opening Keynote",
      type: "Keynote",
      date: eventStartDate,
      startTime: "10:00",
      endTime: "11:00",
      location: event.locations[0]?.name || "Main Hall",
      description: "Opening ceremony and keynote presentation",
      notificationMessage:
        "Keynote starting in 5 minutes. Please take your seats.",
      notificationTime: 5,
    },
  ]);

  const [newItem, setNewItem] = useState<Partial<ScheduleItem>>({
    title: "",
    type: "",
    date: selectedDate,
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    notificationMessage: "",
    notificationTime: 5,
  });

  const handleAddAgendaItem = () => {
    const itemToAdd: ScheduleItem = {
      ...(newItem as ScheduleItem),
      id: Date.now(),
      date: newItem.date || selectedDate,
    };
    setScheduleItems([...scheduleItems, itemToAdd]);
    resetForm();
    setShowAddAgenda(false);
  };

  const handleEditItem = (item: ScheduleItem) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddAgenda(true);
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      setScheduleItems(
        scheduleItems.map((item) =>
          item.id === editingItem.id
            ? { ...(newItem as ScheduleItem), id: editingItem.id }
            : item,
        ),
      );
      setEditingItem(null);
      resetForm();
      setShowAddAgenda(false);
    }
  };

  const handleDeleteItem = (itemId: number) => {
    setScheduleItems(scheduleItems.filter((item) => item.id !== itemId));
  };

  const resetForm = () => {
    setNewItem({
      title: "",
      type: "",
      date: selectedDate,
      startTime: "",
      endTime: "",
      location: "",
      description: "",
      notificationMessage: "",
      notificationTime: 5,
    });
  };

  const getItemsForDate = (date: Date) => {
    return scheduleItems
      .filter((item) => {
        const itemDate =
          item.date instanceof Date ? item.date : new Date(item.date);
        return format(itemDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getDayStats = (date: Date) => {
    const dayItems = getItemsForDate(date);
    return {
      total: dayItems.length,
      duration:
        dayItems.length > 0
          ? `${dayItems[0]?.startTime} - ${dayItems[dayItems.length - 1]?.endTime}`
          : "No agenda",
    };
  };

  const todayItems = getItemsForDate(selectedDate);

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
              <h1 className="text-lg font-bold text-white">Event Schedule</h1>
              <p className="text-sm text-purple-100">{event.eventName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-md px-4 py-6">
        {/* Event Dates Selection */}
        <div className="mb-6 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm">
          <h3 className="mb-3 font-semibold text-gray-800">Event Days</h3>
          <div className="space-y-2">
            {eventDates.map((date, index) => {
              const stats = getDayStats(date);
              const isSelected =
                format(date, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");

              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "outline"}
                  className={`h-auto w-full justify-between p-3 ${
                    isSelected ? "bg-purple-600 hover:bg-purple-700" : ""
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="text-left">
                    <div className="font-medium">
                      Day {index + 1} - {format(date, "MMM d, yyyy")}
                    </div>
                    <div className="text-xs opacity-75">
                      {stats.total} items • {stats.duration}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isSelected ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              );
            })}
          </div>
        </div>

        {/* Daily Agenda */}
        <div className="mb-6 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">
                {format(selectedDate, "EEEE, MMM d")}
              </h3>
              <p className="text-sm text-gray-600">
                {todayItems.length} agenda items
              </p>
            </div>
            <Button
              onClick={() => setShowAddAgenda(true)}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Schedule
            </Button>
          </div>

          {todayItems.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <Clock className="mx-auto mb-3 h-12 w-12 opacity-50" />
              <p>No agenda items for this day</p>
              <Button
                onClick={() => setShowAddAgenda(true)}
                variant="outline"
                className="mt-3"
              >
                Add First Item
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {todayItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          {item.type}
                        </Badge>
                        <span className="text-sm font-medium text-gray-600">
                          {item.startTime} - {item.endTime}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">{item.location}</p>
                      {item.description && (
                        <p className="mt-1 text-xs text-gray-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditItem(item)}
                        className="h-8 w-8 p-1"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="h-8 w-8 p-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {item.notificationMessage && (
                    <div className="mt-2 rounded-lg bg-blue-50 p-2">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Bell className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          Guest notification ({item.notificationTime} min
                          before):
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-blue-700">
                        {item.notificationMessage}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Schedule Overview */}
        <div className="rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
          <h4 className="mb-3 font-semibold text-gray-800">
            Schedule Overview
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {scheduleItems.length}
              </div>
              <div className="text-xs text-gray-600">Total Items</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {eventDates.length}
              </div>
              <div className="text-xs text-gray-600">Event Days</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {todayItems.length}
              </div>
              <div className="text-xs text-gray-600">Today&apos;s Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Agenda Item Dialog */}
      <Dialog
        open={showAddAgenda}
        onOpenChange={setShowAddAgenda}
      >
        <DialogContent className="mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Schedule Item" : "Add Schedule Item"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Agenda Title *</Label>
              <Input
                id="title"
                placeholder="Enter agenda item title"
                value={newItem.title || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Agenda Type *</Label>
              <Select
                value={newItem.type || ""}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select agenda type" />
                </SelectTrigger>
                <SelectContent>
                  {agendaTypes.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Event Day *</Label>
              <Select
                value={newItem.date ? format(newItem.date, "yyyy-MM-dd") : ""}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, date: new Date(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event day" />
                </SelectTrigger>
                <SelectContent>
                  {eventDates.map((date, index) => (
                    <SelectItem
                      key={index}
                      value={format(date, "yyyy-MM-dd")}
                    >
                      Day {index + 1} - {format(date, "MMM d, yyyy")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={newItem.startTime || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, startTime: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={newItem.endTime || ""}
                  onChange={(e) =>
                    setNewItem({ ...newItem, endTime: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={newItem.location || ""}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, location: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {event.locations.map((location, index) => (
                    <SelectItem
                      key={index}
                      value={location.name}
                    >
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Agenda item description"
                value={newItem.description || ""}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-3 rounded-lg bg-blue-50 p-3">
              <Label className="font-medium text-blue-800">
                Guest Notification
              </Label>

              <div className="space-y-2">
                <Label htmlFor="notificationTime">Notify guests before</Label>
                <Select
                  value={newItem.notificationTime?.toString() || "5"}
                  onValueChange={(value) =>
                    setNewItem({
                      ...newItem,
                      notificationTime: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationMessage">
                  Notification message
                </Label>
                <Textarea
                  id="notificationMessage"
                  placeholder="e.g., Please make your way to the reception hall"
                  value={newItem.notificationMessage || ""}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      notificationMessage: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddAgenda(false);
                  setEditingItem(null);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={editingItem ? handleUpdateItem : handleAddAgendaItem}
                disabled={
                  !newItem.title ||
                  !newItem.type ||
                  !newItem.startTime ||
                  !newItem.endTime
                }
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleModule;
