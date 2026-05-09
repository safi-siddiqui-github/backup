import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, User, Star } from "lucide-react";
import { EventSession } from "@/types/website";

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
  maxSessions 
}: SessionsGridProps) => {
  const displaySessions = maxSessions ? sessions.slice(0, maxSessions) : sessions;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            <Button variant="outline" size="sm">All Sessions</Button>
            <Button variant="outline" size="sm">Keynotes</Button>
            <Button variant="outline" size="sm">Workshops</Button>
            <Button variant="outline" size="sm">Panels</Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySessions.map((session) => (
            <Card key={session.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getLevelColor(session.level)}>
                    {session.level}
                  </Badge>
                  <Badge variant="outline">{session.category}</Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {session.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {session.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{session.speaker}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{session.startTime} - {session.endTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{session.location}</span>
                  </div>
                </div>

                {session.tags && session.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {session.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <Button className="w-full" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {maxSessions && sessions.length > maxSessions && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Sessions ({sessions.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};