import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompactSessionCardProps {
  session: EventSession;
  track?: SessionTrack;
}

const CompactSessionCard = ({ session, track }: CompactSessionCardProps) => {
  const getCapacityIcon = () => {
    const percentage = (session.registeredCount / session.capacity) * 100;
    if (percentage >= 100) return '🔴';
    if (percentage >= 80) return '🟡';
    return '🟢';
  };

  return (
    <TooltipProvider>
      <Card className="h-[70px] hover:shadow-md transition-all duration-200 border-l-4" style={{ borderLeftColor: track?.color || '#6b7280' }}>
        <CardContent className="p-2 h-full flex items-center gap-2">
          {/* Track Badge */}
          <Tooltip>
            <TooltipTrigger>
              <div className="h-8 w-8 rounded flex items-center justify-center text-xs font-bold" style={{ backgroundColor: track?.color || '#6b7280', color: 'white' }}>
                {track?.name.substring(0, 2).toUpperCase() || 'GN'}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{track?.name || 'General'}</p>
            </TooltipContent>
          </Tooltip>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-xs line-clamp-1 mb-1">
              {session.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-0.5">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-[80px]">{session.location}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{session.location}</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{session.startTime}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{session.startTime} - {session.endTime}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Capacity Indicator */}
          <Tooltip>
            <TooltipTrigger>
              <div className="flex flex-col items-center justify-center gap-0.5">
                <span className="text-sm">{getCapacityIcon()}</span>
                <span className="text-[10px] text-muted-foreground">
                  {session.registeredCount}/{session.capacity}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{session.registeredCount} / {session.capacity} registered</p>
              {session.waitlistCount > 0 && <p>{session.waitlistCount} on waitlist</p>}
            </TooltipContent>
          </Tooltip>

          {/* Type Badge */}
          <Badge variant="secondary" className="text-[10px] px-1 py-0 h-5">
            {session.type.substring(0, 3).toUpperCase()}
          </Badge>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default CompactSessionCard;