import { MapPin, Bell, Edit2, Trash2, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ScheduleItem {
  id: number;
  title: string;
  type: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  notificationMessage?: string;
  notificationTime?: string;
}

interface TimelineAgendaItemProps {
  item: ScheduleItem;
  isFirst: boolean;
  isLast: boolean;
  onEdit: (item: ScheduleItem) => void;
  onDelete: (id: number) => void;
}

const TimelineAgendaItem = ({ item, isFirst, isLast, onEdit, onDelete }: TimelineAgendaItemProps) => {
  const getTypeStyle = (type: string) => {
    const styles: Record<string, { gradient: string; bgColor: string; borderColor: string }> = {
      Session: {
        gradient: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        borderColor: "border-l-blue-500",
      },
      Workshop: {
        gradient: "from-green-500 to-green-600",
        bgColor: "bg-green-500/10 dark:bg-green-500/20",
        borderColor: "border-l-green-500",
      },
      Keynote: {
        gradient: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
        borderColor: "border-l-purple-500",
      },
      Break: {
        gradient: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
        borderColor: "border-l-orange-500",
      },
      Networking: {
        gradient: "from-pink-500 to-pink-600",
        bgColor: "bg-pink-500/10 dark:bg-pink-500/20",
        borderColor: "border-l-pink-500",
      },
      Panel: {
        gradient: "from-teal-500 to-teal-600",
        bgColor: "bg-teal-500/10 dark:bg-teal-500/20",
        borderColor: "border-l-teal-500",
      },
      Registration: {
        gradient: "from-indigo-500 to-indigo-600",
        bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
        borderColor: "border-l-indigo-500",
      },
    };
    return styles[type] || styles.Session;
  };

  const typeStyle = getTypeStyle(item.type);

  return (
    <div className="flex gap-4 group animate-fade-in">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          {/* Start Time Circle */}
          <div className={`relative z-10 w-4 h-4 rounded-full bg-gradient-to-br ${typeStyle.gradient} shadow-md ring-4 ring-background`} />
          
          {/* Connecting Line */}
          {!isLast && (
            <div className={`w-0.5 h-full min-h-[80px] bg-gradient-to-b ${typeStyle.gradient} opacity-30`} />
          )}
        </div>
      </div>

      {/* Content Card */}
      <div className={`flex-1 mb-6 border-l-4 ${typeStyle.borderColor}`}>
        <div className="bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 group-hover:scale-[1.01]">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              {/* Type Icon */}
              <div className={`p-2.5 rounded-lg bg-gradient-to-br ${typeStyle.gradient} shadow-md`}>
                <Clock className="w-5 h-5 text-white" />
              </div>

              {/* Title & Time */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs font-semibold">
                    {item.type}
                  </Badge>
                  {item.notificationMessage && (
                    <div className="relative">
                      <Bell className="w-4 h-4 text-primary animate-pulse" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">
                    {item.startTime} - {item.endTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(item)}
                className="hover:bg-primary/10 hover:text-primary"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{item.location}</span>
          </div>

          {/* Notification Message */}
          {item.notificationMessage && (
            <div className={`mt-3 p-3 rounded-lg ${typeStyle.bgColor} border border-border`}>
              <div className="flex items-start gap-2">
                <Bell className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-1 text-foreground">
                    Notification ({item.notificationTime})
                  </p>
                  <p className="text-xs text-muted-foreground">{item.notificationMessage}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineAgendaItem;
