import { cn } from "@/lib/utils";
import { GuestAvatar, getInitials, getAvatarColor } from "@/components/seating/GuestAvatar";
import { HistoricalGuest } from "@/types/marketing";

interface AvatarStackProps {
  guests?: HistoricalGuest[];
  count?: number;
  maxVisible?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
  onMoreClick?: () => void;
}

const sizeClasses = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-11 h-11"
};

const overlapClasses = {
  sm: "-ml-2",
  md: "-ml-3",
  lg: "-ml-4"
};

export const AvatarStack = ({
  guests = [],
  count,
  maxVisible,
  max = 5,
  size = "md",
  showCount = true,
  className,
  onMoreClick
}: AvatarStackProps) => {
  const maxToShow = maxVisible || max;
  const totalCount = count || guests.length;
  const displayGuests = guests.slice(0, maxToShow);
  const remainingCount = Math.max(0, totalCount - maxToShow);

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center">
        {displayGuests.map((guest, index) => (
          <div
            key={guest.id}
            className={cn(
              "relative transition-all duration-200 hover:z-10 hover:scale-110",
              index > 0 && overlapClasses[size]
            )}
            style={{ zIndex: displayGuests.length - index }}
          >
            <GuestAvatar
              name={guest.name}
              initials={getInitials(guest.name)}
              avatarColor={getAvatarColor(parseInt(guest.id.split('-')[1] || '0'))}
              size={size}
              className="border-2 border-background"
            />
          </div>
        ))}
        
        {showCount && remainingCount > 0 && (
          <div
            onClick={onMoreClick}
            className={cn(
              "relative rounded-full bg-gradient-to-br from-muted to-muted/80 text-muted-foreground font-semibold flex items-center justify-center border-2 border-background shadow-md transition-all duration-200",
              sizeClasses[size],
              overlapClasses[size],
              onMoreClick && "cursor-pointer hover:scale-110 hover:from-primary/20 hover:to-primary/10 hover:text-primary"
            )}
            style={{ zIndex: 0 }}
            title={`${remainingCount} more guest${remainingCount !== 1 ? 's' : ''}`}
          >
            <span className={size === "sm" ? "text-[10px]" : "text-xs"}>
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
