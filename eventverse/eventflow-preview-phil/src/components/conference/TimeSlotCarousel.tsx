import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users, Edit, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface TimeSlotCarouselProps {
  sessions: EventSession[];
  tracks: SessionTrack[];
  onEdit: (session: EventSession) => void;
  onDelete: (sessionId: string) => void;
}

const TimeSlotCarousel = ({ sessions, tracks, onEdit, onDelete }: TimeSlotCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const getTrackInfo = (trackId?: string) => {
    return tracks.find(t => t.id === trackId);
  };

  const getCapacityStatus = (session: EventSession) => {
    const percentage = (session.registeredCount / session.capacity) * 100;
    
    if (percentage >= 100) {
      return { 
        label: 'Full', 
        color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
        icon: '🔴'
      };
    } else if (percentage >= 80) {
      return { 
        label: 'Almost Full', 
        color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        icon: '🟡'
      };
    }
    return { 
      label: 'Available', 
      color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
      icon: '🟢'
    };
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {canScrollPrev && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-lg bg-background/95 backdrop-blur-sm"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      {canScrollNext && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-lg bg-background/95 backdrop-blur-sm"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3 px-1">
          {sessions.map((session) => {
            const track = getTrackInfo(session.trackId);
            const capacityStatus = getCapacityStatus(session);
            
            return (
              <div key={session.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]">
                <Card className="h-full hover:shadow-md transition-all duration-200 border-l-4" style={{ borderLeftColor: track?.color || '#6b7280' }}>
                  <CardContent className="p-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                          {session.title}
                        </h4>
                        {track && (
                          <Badge variant="outline" className="text-xs mb-1">
                            {track.name}
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs whitespace-nowrap">
                        {session.type}
                      </Badge>
                    </div>

                    {/* Details */}
                    <div className="space-y-1 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.startTime} - {session.endTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{session.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{session.registeredCount} / {session.capacity}</span>
                      </div>
                    </div>

                    {/* Capacity Status */}
                    <Badge className={`text-xs ${capacityStatus.color} border mb-2`}>
                      {capacityStatus.icon} {capacityStatus.label}
                    </Badge>

                    {/* Actions */}
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-1 mt-3">
        {Array.from({ length: Math.ceil(sessions.length / 4) }).map((_, index) => (
          <div
            key={index}
            className="h-1 w-8 rounded-full bg-muted"
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlotCarousel;