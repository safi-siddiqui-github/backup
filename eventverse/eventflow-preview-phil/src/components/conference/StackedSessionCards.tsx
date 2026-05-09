import { useState } from "react";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Edit, Trash2, Tag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CompactSessionCard from "./CompactSessionCard";
import { cn } from "@/lib/utils";

interface StackedSessionCardsProps {
  sessions: EventSession[];
  timeSlot: string;
  tracks: SessionTrack[];
  onEdit: (session: EventSession) => void;
  onDelete: (sessionId: string) => void;
  maxVisibleCards?: number;
}

const StackedSessionCards = ({ 
  sessions, 
  timeSlot, 
  tracks, 
  onEdit, 
  onDelete,
  maxVisibleCards = 3 
}: StackedSessionCardsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (sessions.length === 0) return null;
  
  // Determine if we need compact mode (5+ sessions)
  const isHighDensity = sessions.length >= 5;
  const visibleSessions = sessions.slice(0, maxVisibleCards);
  const hiddenCount = Math.max(0, sessions.length - maxVisibleCards);

  const getTrackInfo = (trackId?: string) => {
    return tracks.find(t => t.id === trackId);
  };

  const getCapacityStatus = (session: EventSession) => {
    const percentage = (session.registeredCount / session.capacity) * 100;
    
    if (percentage >= 100) {
      return { 
        label: 'Full', 
        color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20'
      };
    } else if (percentage >= 80) {
      return { 
        label: 'Almost Full', 
        color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
      };
    }
    return { 
      label: 'Available', 
      color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
    };
  };

  const getSessionTypeColor = (type: EventSession['type']) => {
    switch (type) {
      case 'keynote': return 'border-l-purple-500 bg-purple-500/5';
      case 'workshop': return 'border-l-orange-500 bg-orange-500/5';
      case 'panel': return 'border-l-blue-500 bg-blue-500/5';
      case 'networking': return 'border-l-green-500 bg-green-500/5';
      case 'break': return 'border-l-gray-500 bg-gray-500/5';
      default: return 'border-l-primary bg-primary/5';
    }
  };

  // Single session - no stacking needed
  if (sessions.length === 1) {
    const session = sessions[0];
    const track = getTrackInfo(session.trackId);
    const capacityStatus = getCapacityStatus(session);

    return (
      <div
        className={cn(
          "border-l-4 border bg-card rounded-lg p-4 transition-all duration-300 hover:shadow-lg",
          getSessionTypeColor(session.type)
        )}
      >
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2 flex-wrap">
              <h4 className="font-semibold text-foreground">{session.title}</h4>
              {track && (
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  {track.name}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{session.startTime} - {session.endTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{session.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{session.registeredCount}/{session.capacity}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">{session.type}</Badge>
              <Badge className={cn("text-xs", capacityStatus.color)}>
                {capacityStatus.label}
              </Badge>
            </div>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(session)}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(session.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // HIGH DENSITY MODE: 5+ sessions with compact cards and scrollable expansion
  if (isHighDensity) {
    return (
      <div 
        className="relative min-h-[140px]"
      >
        {/* Session count badge */}
        <Badge 
          className="absolute top-2 right-2 z-50 bg-primary text-primary-foreground shadow-lg text-xs pointer-events-none"
        >
          {sessions.length} sessions
        </Badge>

        {!isExpanded && (
          // Collapsed: Show only first 3 cards in compact mode
          <div 
            className="space-y-2"
            onMouseEnter={() => setIsExpanded(true)}
          >
            {visibleSessions.map((session, index) => {
              const track = getTrackInfo(session.trackId);
              return (
                <div
                  key={session.id}
                  className="transition-all duration-300"
                  style={{
                    transform: `translateY(${index * -8}px)`,
                    zIndex: visibleSessions.length - index
                  }}
                >
                  <CompactSessionCard session={session} track={track} />
                </div>
              );
            })}
            {hiddenCount > 0 && (
              <Badge variant="secondary" className="mt-2 text-xs">
                +{hiddenCount} more sessions
              </Badge>
            )}
          </div>
        )}

        {isExpanded && (
          // Expanded: Show all sessions in scrollable container
          <div 
            className="absolute top-0 left-0 right-0 z-50 bg-background border-2 border-primary shadow-2xl rounded-lg"
            onMouseLeave={() => setIsExpanded(false)}
          >
            <ScrollArea className="h-[600px] w-full">
              <div className="space-y-2 p-3">
                {sessions.map((session) => {
                  const track = getTrackInfo(session.trackId);
                  const capacityStatus = getCapacityStatus(session);
                  
                  return (
                    <Card 
                      key={session.id} 
                      className="hover:shadow-md transition-all duration-200 border-l-4"
                      style={{ borderLeftColor: track?.color || '#6b7280' }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{session.title}</h4>
                            {track && (
                              <Badge variant="outline" className="text-xs">
                                {track.name}
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">{session.type}</Badge>
                        </div>

                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {session.description}
                        </p>

                        <div className="space-y-1 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{session.startTime} - {session.endTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{session.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{session.registeredCount} / {session.capacity}</span>
                          </div>
                        </div>

                        <Badge className={`text-xs ${capacityStatus.color} mb-2`}>
                          {capacityStatus.label}
                        </Badge>

                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 h-7 text-xs"
                            onClick={() => onEdit(session)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 h-7 text-xs text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => onDelete(session.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    );
  }

  // NORMAL STACKED MODE: 2-4 sessions
  return (
    <div className="relative">
      <div 
        className={cn(
          "space-y-2 transition-all duration-300",
          isExpanded ? "space-y-3" : ""
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {sessions.map((session, index) => {
          const track = getTrackInfo(session.trackId);
          const capacityStatus = getCapacityStatus(session);
          const isFirst = index === 0;
          
          return (
            <div
              key={session.id}
              className={cn(
                "border-l-4 border bg-card rounded-lg transition-all duration-300",
                getSessionTypeColor(session.type),
                isExpanded ? "p-4 shadow-lg hover:shadow-xl" : "p-3 shadow-sm",
                !isFirst && !isExpanded && "opacity-90"
              )}
              style={{
                transform: !isExpanded && !isFirst ? `translateY(-${(sessions.length - index) * 8}px)` : 'translateY(0)',
                zIndex: isExpanded ? 10 + index : sessions.length - index,
              }}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2 flex-wrap">
                    <h4 className={cn(
                      "font-semibold text-foreground transition-all",
                      isExpanded ? "text-base" : "text-sm truncate"
                    )}>
                      {session.title}
                    </h4>
                    {track && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs flex-shrink-0">
                        {track.name}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Expanded state - show all details */}
                  {isExpanded && (
                    <>
                      {session.description && (
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {session.description}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{session.startTime} - {session.endTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{session.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{session.registeredCount}/{session.capacity}</span>
                        </div>
                      </div>

                      {session.speakerNames.length > 0 && (
                        <p className="text-xs text-muted-foreground mb-2">
                          <span className="font-medium">Speakers:</span> {session.speakerNames.join(", ")}
                        </p>
                      )}

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">{session.type}</Badge>
                        <Badge className={cn("text-xs", capacityStatus.color)}>
                          {capacityStatus.label}
                        </Badge>
                        {session.level !== 'all' && (
                          <Badge variant="secondary" className="text-xs">
                            {session.level}
                          </Badge>
                        )}
                      </div>
                    </>
                  )}

                  {/* Collapsed state - minimal info */}
                  {!isExpanded && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{session.location}</span>
                    </div>
                  )}
                </div>

                {/* Action buttons - only show on expanded */}
                {isExpanded && (
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(session)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(session.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Session count badge - only show when collapsed */}
      {!isExpanded && sessions.length > 1 && (
        <div className="absolute -top-2 -right-2 z-50">
          <Badge className="bg-primary text-primary-foreground shadow-lg">
            {sessions.length} sessions
          </Badge>
        </div>
      )}
    </div>
  );
};

export default StackedSessionCards;
