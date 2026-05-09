import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AvatarStack } from "./AvatarStack";
import { HistoricalGuest, GuestSegment } from "@/types/marketing";
import { Users, DollarSign, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface SegmentPreviewProps {
  segment: GuestSegment;
  guests: HistoricalGuest[];
  className?: string;
}

export const SegmentPreview = ({ segment, guests, className }: SegmentPreviewProps) => {
  const segmentGuests = guests.filter(g => g.segments.includes(segment.id));
  const totalSpent = segmentGuests.reduce((sum, g) => sum + g.totalSpent, 0);
  const avgAttendance = segmentGuests.length > 0 
    ? Math.round(segmentGuests.reduce((sum, g) => sum + g.attendanceCount, 0) / segmentGuests.length)
    : 0;

  return (
    <Card className={cn("p-4 hover:shadow-lg transition-all duration-200", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold">{segment.name}</h4>
            <Badge variant={segment.type === "auto" ? "secondary" : "default"} className="text-xs">
              {segment.type === "auto" ? "Auto" : "Custom"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{segment.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <AvatarStack guests={segmentGuests} max={4} size="sm" />
        <div className="flex items-center gap-1 text-sm font-semibold text-primary">
          <Users className="w-4 h-4" />
          {segment.guestCount}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Total:</span>
          <span className="font-semibold">${totalSpent.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Avg:</span>
          <span className="font-semibold">{avgAttendance} events</span>
        </div>
      </div>

      {segment.filters.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex flex-wrap gap-1">
            {segment.filters.slice(0, 3).map((filter, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {filter.field}
              </Badge>
            ))}
            {segment.filters.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{segment.filters.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
