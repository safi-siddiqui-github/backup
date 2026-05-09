import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Edit, Trash2 } from "lucide-react";
import { EventSession, SessionTrack } from "@/types/conferenceScheduling";
import { format } from "date-fns";

interface EnhancedSessionCardProps {
  session: EventSession;
  track?: SessionTrack;
  onEdit: (session: EventSession) => void;
  onDelete: (sessionId: string) => void;
  showDate?: boolean;
}

const getSessionTypeStyle = (type: string) => {
  const styles = {
    keynote: "bg-purple-500/10 border-purple-500/50 text-purple-700 dark:text-purple-300",
    session: "bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300",
    workshop: "bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-300",
    panel: "bg-orange-500/10 border-orange-500/50 text-orange-700 dark:text-orange-300",
    networking: "bg-pink-500/10 border-pink-500/50 text-pink-700 dark:text-pink-300",
    break: "bg-gray-500/10 border-gray-500/50 text-gray-700 dark:text-gray-300"
  };
  return styles[type as keyof typeof styles] || styles.session;
};

const EnhancedSessionCard = ({ session, track, onEdit, onDelete, showDate = false }: EnhancedSessionCardProps) => {
  const sessionDate = session.date instanceof Date ? session.date : new Date(session.date);
  const fillPercentage = (session.registeredCount / session.capacity) * 100;
  
  return (
    <div className="border border-border rounded-lg p-4 bg-card hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{session.title}</h3>
            <Badge variant="outline" className={getSessionTypeStyle(session.type)}>
              {session.type}
            </Badge>
            {track && (
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {track.name}
              </Badge>
            )}
          </div>
          
          {session.description && (
            <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            {showDate && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {format(sessionDate, "MMM d, yyyy")}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {session.startTime} - {session.endTime}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {session.location}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {session.registeredCount}/{session.capacity}
              {fillPercentage >= 80 && (
                <Badge variant={fillPercentage >= 100 ? "destructive" : "secondary"} className="ml-2 text-xs">
                  {Math.round(fillPercentage)}% full
                </Badge>
              )}
            </div>
          </div>
          
          {session.speakerNames.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              <span className="font-medium">Speakers:</span> {session.speakerNames.join(", ")}
            </p>
          )}
        </div>
        
        <div className="flex gap-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(session)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(session.id)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSessionCard;
