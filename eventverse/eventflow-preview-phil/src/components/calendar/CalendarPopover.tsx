import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useCalendarData } from "@/hooks/useCalendarData";
import { TimelineItem } from "./TimelineItem";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CalendarItemDialog } from "./CalendarItemDialog";
import { CalendarItem } from "@/types/calendar";

export const CalendarPopover = () => {
  const { upcomingItems } = useCalendarData();
  const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const upcomingCount = upcomingItems.length;

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Calendar className="h-5 w-5" />
            {upcomingCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {upcomingCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="end">
          <div className="p-4 border-b bg-muted/50">
            <h3 className="font-semibold text-lg">Upcoming Events</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Next {upcomingCount} items on your calendar
            </p>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {upcomingItems.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  No upcoming events
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  All caught up! 🎉
                </p>
              </div>
            ) : (
              <div className="p-2">
                {upcomingItems.map((item) => (
                  <TimelineItem
                    key={item.id}
                    item={item}
                    onClick={(item) => {
                      setSelectedItem(item);
                      setIsOpen(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {upcomingItems.length > 0 && (
            <div className="p-3 border-t bg-muted/50">
              <Button
                asChild
                variant="ghost"
                className="w-full justify-between group"
              >
                <Link to="/calendar">
                  See Full Calendar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <CalendarItemDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      />
    </>
  );
};
