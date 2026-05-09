"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface ScheduleItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  type: "session" | "break" | "networking" | "keynote" | "workshop";
  location?: string;
  speaker?: string;
  description?: string;
}

interface ScheduleTimelineSectionProps {
  title?: string;
  description?: string;
  schedule?: ScheduleItem[];
  style?: React.CSSProperties;
}

const getTypeColor = (type: string) => {
  const colors = {
    keynote: "bg-primary text-primary-foreground",
    session: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    workshop:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    break:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    networking:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const defaultSchedule: ScheduleItem[] = [
  {
    id: "1",
    title: "Registration & Coffee",
    startTime: "08:00",
    endTime: "09:00",
    date: "2024-06-15",
    type: "networking",
    location: "Main Lobby",
  },
  {
    id: "2",
    title: "Opening Keynote",
    startTime: "09:00",
    endTime: "10:00",
    date: "2024-06-15",
    type: "keynote",
    location: "Main Auditorium",
    speaker: "Dr. Sarah Johnson",
    description: "Welcome address and industry overview",
  },
  {
    id: "3",
    title: "Panel Discussion: Future Trends",
    startTime: "10:15",
    endTime: "11:15",
    date: "2024-06-15",
    type: "session",
    location: "Conference Room A",
    speaker: "Multiple Speakers",
    description: "Industry experts discuss emerging trends and technologies",
  },
  {
    id: "4",
    title: "Coffee Break",
    startTime: "11:15",
    endTime: "11:45",
    date: "2024-06-15",
    type: "break",
    location: "Networking Area",
  },
  {
    id: "5",
    title: "Workshop: Hands-on Training",
    startTime: "12:00",
    endTime: "13:30",
    date: "2024-06-15",
    type: "workshop",
    location: "Workshop Room B",
    speaker: "Technical Team",
    description: "Interactive workshop with practical exercises",
  },
];

export const ScheduleTimelineSection = ({
  title = "Event Schedule",
  description = "Don't miss out on these exciting sessions",
  schedule = defaultSchedule,
  style,
}: ScheduleTimelineSectionProps) => {
  // Group schedule by date
  const scheduleByDate = schedule.reduce(
    (acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = [];
      }
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, ScheduleItem[]>,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section
      style={style}
      className="px-4 py-16"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground text-lg">{description}</p>
          )}
        </div>

        <div className="space-y-8">
          {Object.entries(scheduleByDate).map(([date, items]) => (
            <div key={date}>
              <div className="mb-6 flex items-center gap-3">
                <Calendar className="text-primary h-5 w-5" />
                <h3 className="text-xl font-semibold">{formatDate(date)}</h3>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="bg-border absolute top-0 bottom-0 left-4 w-0.5" />

                <div className="space-y-6">
                  {items
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="relative flex gap-6"
                      >
                        {/* Timeline dot */}
                        <div className="relative z-10">
                          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                            <Clock className="text-primary-foreground h-4 w-4" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <Card className="transition-shadow hover:shadow-md">
                            <CardContent className="p-6">
                              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div className="flex-1">
                                  <div className="mb-2 flex items-center gap-3">
                                    <Badge className={getTypeColor(item.type)}>
                                      {item.type.charAt(0).toUpperCase() +
                                        item.type.slice(1)}
                                    </Badge>
                                    <span className="text-muted-foreground text-sm font-medium">
                                      {formatTime(item.startTime)} -{" "}
                                      {formatTime(item.endTime)}
                                    </span>
                                  </div>

                                  <h4 className="mb-2 text-lg font-semibold">
                                    {item.title}
                                  </h4>

                                  {item.description && (
                                    <p className="text-muted-foreground mb-3">
                                      {item.description}
                                    </p>
                                  )}

                                  <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                                    {item.speaker && (
                                      <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        <span>{item.speaker}</span>
                                      </div>
                                    )}
                                    {item.location && (
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{item.location}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
