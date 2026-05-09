import { CalendarItem } from "@/types/calendar";
import { TimelineItem } from "./TimelineItem";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DateGroupProps {
  dateKey: string;
  items: CalendarItem[];
  onItemClick: (item: CalendarItem) => void;
  isPast: boolean;
}

export const DateGroup = ({ dateKey, items, onItemClick, isPast }: DateGroupProps) => {
  const date = new Date(dateKey);
  
  const getDateLabel = () => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isYesterday(date)) return "Yesterday";
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const getDayOfWeek = () => {
    if (isToday(date) || isTomorrow(date) || isYesterday(date)) {
      return format(date, 'EEEE, MMMM d');
    }
    return null;
  };

  return (
    <div className="relative">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex flex-col items-center">
          <div className={cn(
            "w-4 h-4 rounded-full border-2 border-background z-10",
            isPast ? "bg-muted" : "bg-primary/50"
          )} />
        </div>

        <div className="flex-1 pt-0.5">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h3 className={cn(
              "font-semibold text-lg",
              isPast && "text-muted-foreground"
            )}>
              {getDateLabel()}
            </h3>
            {getDayOfWeek() && (
              <span className="text-sm text-muted-foreground">
                {getDayOfWeek()}
              </span>
            )}
            <Badge variant="outline" className="text-xs ml-auto">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="ml-8 space-y-2">
        {items.map(item => (
          <TimelineItem
            key={item.id}
            item={item}
            onClick={onItemClick}
            isPast={isPast}
          />
        ))}
      </div>
    </div>
  );
};
