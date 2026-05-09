"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface EventItem {
  title: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
}

function EventItem({ title, date, time, status }: EventItem) {
  const statusConfig = {
    confirmed: {
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      label: "confirmed",
    },
    pending: {
      className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      label: "pending",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex border items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors gap-2">
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1 truncate">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {date} • {time}
        </p>
      </div>
      <Badge
        variant="secondary"
        className={`text-xs px-2 py-0.5 shrink-0 ${config.className}`}
      >
        {config.label}
      </Badge>
    </div>
  );
}

export default function UpcomingEvents() {
  const events: EventItem[] = [
    {
      title: "Sarah & Michael Wedding",
      date: "Dec 28, 2024",
      time: "2:00 PM",
      status: "confirmed",
    },
    {
      title: "Elite Events Corp Meeting",
      date: "Jan 2, 2025",
      time: "10:00 AM",
      status: "pending",
    },
    {
      title: "Johnson Wedding Consultation",
      date: "Jan 5, 2025",
      time: "3:30 PM",
      status: "confirmed",
    },
  ];

  return (
    <Card className="py-4 sm:py-5">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 shrink-0" />
          <CardTitle className="text-lg sm:text-xl font-bold">Upcoming Events</CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm">Your schedule for the next week</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1 mb-3 sm:mb-4">
          {events.map((event, index) => (
            <EventItem
              key={index}
              title={event.title}
              date={event.date}
              time={event.time}
              status={event.status}
            />
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <Calendar className="mr-2 h-4 w-4" />
          View Full Calendar
        </Button>
      </CardContent>
    </Card>
  );
}

