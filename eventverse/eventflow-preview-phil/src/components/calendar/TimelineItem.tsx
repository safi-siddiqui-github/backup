import { CalendarItem } from "@/types/calendar";
import { format } from "date-fns";
import { Calendar, DollarSign, Users, CheckSquare, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  item: CalendarItem;
  onClick: (item: CalendarItem) => void;
  isPast?: boolean;
  isToday?: boolean;
}

const getTypeIcon = (type: string) => {
  const icons = {
    milestone: Calendar,
    payment: DollarSign,
    meeting: Users,
    task: CheckSquare,
    deadline: AlertCircle,
    rsvp: Clock,
  };
  return icons[type as keyof typeof icons] || Calendar;
};

export const TimelineItem = ({ item, onClick, isPast = false, isToday = false }: TimelineItemProps) => {
  const Icon = getTypeIcon(item.type);
  
  return (
    <div
      onClick={() => onClick(item)}
      className={cn(
        "flex gap-3 p-4 rounded-lg cursor-pointer transition-all group border",
        isPast && "opacity-60 hover:opacity-100",
        isToday && "bg-primary/5 border-primary shadow-sm",
        !isPast && !isToday && "bg-card hover:bg-accent hover:shadow-md"
      )}
    >
      {/* Event Color Indicator */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full mt-1.5"
          style={{ backgroundColor: item.eventColor }}
        />
        <div className="flex-1 w-px bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <Icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {item.title}
            </h4>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-xs capitalize flex-shrink-0",
              item.status === 'overdue' && "bg-destructive/10 text-destructive border-destructive/20",
              item.status === 'completed' && "bg-success/10 text-success border-success/20",
              item.status === 'in_progress' && "bg-primary/10 text-primary border-primary/20"
            )}
          >
            {item.status.replace('_', ' ')}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
          {item.eventName} {item.relatedTo && `• ${item.relatedTo}`}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="font-medium">
            {format(item.dueDate, 'MMM d, yyyy')}
          </span>
          {item.dueTime && (
            <span>
              {item.dueTime}
            </span>
          )}
          {item.priority && (
            <Badge variant="secondary" className="text-xs capitalize">
              {item.priority} priority
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
