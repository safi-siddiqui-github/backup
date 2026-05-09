"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventSession } from "@/types/website";
import { Clock, MapPin, User } from "lucide-react";

interface SessionsGridProps {
  sessions: EventSession[];
  title?: string;
  description?: string;
  showFilters?: boolean;
  maxSessions?: number;
}

export const SessionsGrid = ({
  sessions,
  title = "Conference Sessions",
  description,
  showFilters = true,
  maxSessions,
}: SessionsGridProps) => {
  const displaySessions = maxSessions
    ? sessions.slice(0, maxSessions)
    : sessions;

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="px-4 py-16">
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
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
            >
              All Sessions
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              Keynotes
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              Workshops
            </Button>
            <Button
              variant="outline"
              size="sm"
            >
              Panels
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displaySessions.map((session) => (
            <Card
              key={session.id}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="mb-2 flex items-start justify-between">
                  <Badge className={getLevelColor(session.level)}>
                    {session.level}
                  </Badge>
                  <Badge variant="outline">{session.category}</Badge>
                </div>
                <CardTitle className="line-clamp-2 text-lg">
                  {session.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {session.description}
                </p>

                <div className="space-y-2">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{session.speaker}</span>
                  </div>

                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>
                      {session.startTime} - {session.endTime}
                    </span>
                  </div>

                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{session.location}</span>
                  </div>
                </div>

                {session.tags && session.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {session.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <Button
                  className="w-full"
                  size="sm"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {maxSessions && sessions.length > maxSessions && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
            >
              View All Sessions ({sessions.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
