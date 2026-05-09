"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScheduleItem } from "@/types/website";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";

interface MultiDayScheduleProps {
  schedule: ScheduleItem[];
  title?: string;
  description?: string;
  showFilters?: boolean;
}

export const MultiDaySchedule = ({
  schedule,
  title = "Event Schedule",
  description,
  showFilters = true,
}: MultiDayScheduleProps) => {
  const [selectedType, setSelectedType] = useState<string>("all");

  // Group schedule by date
  const scheduleByDate = schedule.reduce(
    (acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, ScheduleItem[]>,
  );

  // Sort dates
  const sortedDates = Object.keys(scheduleByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "keynote":
        return "bg-purple-100 text-purple-800";
      case "session":
        return "bg-blue-100 text-blue-800";
      case "workshop":
        return "bg-green-100 text-green-800";
      case "networking":
        return "bg-orange-100 text-orange-800";
      case "break":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredSchedule =
    selectedType === "all"
      ? scheduleByDate
      : Object.keys(scheduleByDate).reduce(
          (acc, date) => {
            const filtered = scheduleByDate[date].filter(
              (item) => item.type === selectedType,
            );
            if (filtered.length > 0) {
              acc[date] = filtered;
            }
            return acc;
          },
          {} as Record<string, ScheduleItem[]>,
        );

  const sessionTypes = ["all", ...new Set(schedule.map((item) => item.type))];

  return (
    <section className="bg-muted/30 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{title}</h2>
          {description && (
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              {description}
            </p>
          )}
        </div>

        {showFilters && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {sessionTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type === "all" ? "All Events" : type}
              </Button>
            ))}
          </div>
        )}

        {sortedDates.length > 1 ? (
          <Tabs
            defaultValue={sortedDates[0]}
            className="w-full"
          >
            <TabsList className="mb-8 grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {sortedDates.map((date) => (
                <TabsTrigger
                  key={date}
                  value={date}
                  className="text-sm"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(date)}
                </TabsTrigger>
              ))}
            </TabsList>

            {sortedDates.map((date) => (
              <TabsContent
                key={date}
                value={date}
              >
                <ScheduleDay
                  items={filteredSchedule[date] || []}
                  date={date}
                  getTypeColor={getTypeColor}
                  formatTime={formatTime}
                />
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          sortedDates.map((date) => (
            <ScheduleDay
              key={date}
              items={filteredSchedule[date] || []}
              date={date}
              getTypeColor={getTypeColor}
              formatTime={formatTime}
              showDate
            />
          ))
        )}
      </div>
    </section>
  );
};

interface ScheduleDayProps {
  items: ScheduleItem[];
  date: string;
  getTypeColor: (type: string) => string;
  formatTime: (time: string) => string;
  showDate?: boolean;
}

const ScheduleDay = ({
  items,
  date,
  getTypeColor,
  formatTime,
  showDate,
}: ScheduleDayProps) => {
  // Sort items by start time
  const sortedItems = [...items].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  return (
    <div className="space-y-4">
      {showDate && (
        <h3 className="mb-6 text-center text-2xl font-bold">
          {new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
      )}

      <div className="space-y-4">
        {sortedItems.map((item) => (
          <Card
            key={item.id}
            className="transition-shadow hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-shrink-0 md:w-32">
                  <div className="text-sm font-medium">
                    {formatTime(item.startTime)}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {formatTime(item.endTime)}
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <Badge className={getTypeColor(item.type)}>
                      {item.type}
                    </Badge>
                  </div>

                  {item.description && (
                    <p className="text-muted-foreground">{item.description}</p>
                  )}

                  <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                    {item.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                  >
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
