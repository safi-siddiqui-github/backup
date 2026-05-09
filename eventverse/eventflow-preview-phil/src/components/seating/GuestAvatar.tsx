import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Check, Clock } from "lucide-react";

interface GuestAvatarProps {
  name: string;
  initials?: string;
  avatarColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
  status?: "assigned" | "unassigned";
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl"
};

const statusBadgeSize = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
  xl: "w-5 h-5"
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const getAvatarColor = (id: number): string => {
  const colors = [
    "from-blue-500 to-purple-600",
    "from-green-500 to-teal-600",
    "from-orange-500 to-red-600",
    "from-pink-500 to-purple-600",
    "from-indigo-500 to-blue-600",
    "from-yellow-500 to-orange-600",
    "from-teal-500 to-green-600",
    "from-purple-500 to-pink-600",
  ];
  return colors[id % colors.length];
};

export const GuestAvatar = ({
  name,
  initials,
  avatarColor,
  size = "md",
  showStatus = false,
  status = "unassigned",
  onClick,
  className
}: GuestAvatarProps) => {
  const displayInitials = initials || getInitials(name);
  const gradientClass = avatarColor || "from-blue-500 to-purple-600";

  return (
    <div className="relative inline-block">
      <div
        onClick={onClick}
        className={cn(
          "rounded-full bg-gradient-to-br text-white font-semibold flex items-center justify-center shadow-md transition-all duration-150",
          sizeClasses[size],
          gradientClass,
          onClick && "cursor-pointer hover:scale-110 hover:shadow-lg",
          className
        )}
        title={name}
      >
        {displayInitials}
      </div>
      
      {showStatus && (
        <Badge
          variant={status === "assigned" ? "default" : "secondary"}
          className={cn(
            "absolute -bottom-0.5 -right-0.5 rounded-full p-0.5 flex items-center justify-center border-2 border-background",
            statusBadgeSize[size],
            status === "assigned" ? "bg-green-500 hover:bg-green-500" : "bg-orange-500 hover:bg-orange-500"
          )}
        >
          {status === "assigned" ? (
            <Check className={cn("text-white", size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5")} />
          ) : (
            <Clock className={cn("text-white", size === "sm" ? "w-2 h-2" : "w-2.5 h-2.5")} />
          )}
        </Badge>
      )}
    </div>
  );
};
