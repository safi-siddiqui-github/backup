"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  Calendar,
  CalendarDays,
  Clock,
  Filter,
  MapPin,
  Plus,
} from "lucide-react";
import { useState } from "react";

interface VendorCalendarProps {
  vendor: unknown;
}

const VendorCalendar = ({ vendor }: VendorCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const { toast } = useToast();

  const mockEvents = [
    {
      id: "1",
      title: "Johnson Wedding - Final Planning Meeting",
      type: "meeting",
      date: "2024-02-15",
      time: "14:00",
      duration: 120,
      location: "Office",
      client: "Sarah Johnson",
      status: "confirmed",
      priority: "high",
    },
    {
      id: "2",
      title: "Smith Engagement Session",
      type: "shoot",
      date: "2024-02-16",
      time: "16:00",
      duration: 180,
      location: "Golden Gate Park",
      client: "Mike & Lisa Smith",
      status: "confirmed",
      priority: "medium",
    },
    {
      id: "3",
      title: "Equipment Maintenance",
      type: "task",
      date: "2024-02-17",
      time: "10:00",
      duration: 60,
      location: "Studio",
      client: null,
      status: "pending",
      priority: "low",
    },
    {
      id: "4",
      title: "Johnson Wedding Day",
      type: "event",
      date: "2024-08-15",
      time: "08:00",
      duration: 600,
      location: "Napa Valley",
      client: "Sarah Johnson",
      status: "confirmed",
      priority: "high",
    },
  ];

  const mockTasks = [
    {
      id: "1",
      title: "Edit Johnson engagement photos",
      dueDate: "2024-02-20",
      client: "Sarah Johnson",
      priority: "high",
      status: "in_progress",
      progress: 60,
    },
    {
      id: "2",
      title: "Send Smith contract revision",
      dueDate: "2024-02-18",
      client: "Mike & Lisa Smith",
      priority: "medium",
      status: "pending",
      progress: 0,
    },
    {
      id: "3",
      title: "Order new camera lens",
      dueDate: "2024-02-25",
      client: null,
      priority: "low",
      status: "pending",
      progress: 0,
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "shoot":
        return "bg-green-100 text-green-800";
      case "event":
        return "bg-purple-100 text-purple-800";
      case "task":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const todaysEvents = mockEvents.filter(
    (event) =>
      new Date(event.date).toDateString() === selectedDate.toDateString(),
  );

  const upcomingTasks = mockTasks
    .filter((task) => new Date(task.dueDate) >= new Date())
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    );

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calendar & Tasks</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("week")}
          >
            Week
          </Button>
          <Button
            variant={viewMode === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("month")}
          >
            Month
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Calendar */}
        <div className="space-y-6 lg:col-span-2">
          {/* Mini Calendar Navigation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Simple calendar grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  ),
                )}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    i - 6,
                  );
                  const isSelected =
                    date.toDateString() === selectedDate.toDateString();
                  const hasEvents = mockEvents.some(
                    (event) =>
                      new Date(event.date).toDateString() ===
                      date.toDateString(),
                  );

                  return (
                    <div
                      key={i}
                      className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                        isSelected ? "bg-blue-500 text-white" : ""
                      } ${hasEvents ? "font-bold" : ""}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {date.getDate()}
                      {hasEvents && (
                        <div className="mx-auto mt-1 h-1 w-1 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate.toDateString() === new Date().toDateString()
                  ? "Today's Events"
                  : `Events for ${selectedDate.toLocaleDateString()}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todaysEvents.length > 0 ? (
                <div className="space-y-3">
                  {todaysEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-r-lg border-l-4 bg-gray-50 p-4 ${getPriorityColor(event.priority)}`}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {event.client}
                          </p>
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time} ({Math.floor(event.duration / 60)}h{" "}
                          {event.duration % 60}m)
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <CalendarDays className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <p>No events scheduled for this day</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Tasks and Upcoming Events */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border p-3"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="text-sm font-medium">{task.title}</h4>
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    {task.client && (
                      <p className="mb-2 text-xs text-gray-600">
                        {task.client}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      <span>{task.progress}% complete</span>
                    </div>
                    {task.progress > 0 && (
                      <div className="mt-2 h-1 w-full rounded-full bg-gray-200">
                        <div
                          className="h-1 rounded-full bg-blue-600"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Events</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Meetings</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tasks Due</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Revenue</span>
                  <span className="font-medium">$12,500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Week</span>
                  <Badge variant="outline">75% Booked</Badge>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>30 hrs booked</span>
                  <span>10 hrs available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorCalendar;
